import { useEffect, useState } from "react";
import Layout from "../Layout";
import { useNavigate, useParams } from "react-router-dom";
import SweetAlertService from "../../helper/sweetalertService";
import ServiceSurat from "../../api/service/Surat.service";
import ServiceJenisSurat from "../../api/service/JenisSurat.service";

const FormEditSuratKeluar = () => {
  const navigate = useNavigate();
  const { idSuratKeluar } = useParams()
  const [tanggalKeluar, setTanggalKeluar] = useState("");
  const [tanggalSurat, setTanggalSurat] = useState("");
  const [noSurat, setNoSurat] = useState("");
  const [tujuan, setTujuan] = useState("");
  const [perihal, setPerihal] = useState("");
  const [jenisSurat, setJenisSurat] = useState("");
  const [keterangan, setKeterangan] = useState("-");
  // const [fileSurat, setFileSurat] = useState(null);
  const [dataJenisSurat, SetDataJenisSurat] = useState([])

  const [errors, setErrors] = useState({});

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`; // format sesuai kebutuhan input[type="date"]
  };

  const getSuratKeluarByID = async () => {
    try {
      const response = await ServiceSurat.getSuratKeluarByID(idSuratKeluar);
      setTanggalKeluar(formatDate(response.data.TANGGAL_KELUAR) )
      setTanggalSurat(formatDate(response.data.TANGGAL_SURAT))
      setNoSurat(response.data.NO_SURAT)
      setTujuan(response.data.TUJUAN)
      setPerihal(response.data.PERIHAL)
      setJenisSurat(response.data.JENIS_SURAT)
      setKeterangan(response.data.KETERANGAN)
      console.log(response)
      // setDataJabatan(response.data);
    } catch (error) {
      SweetAlertService.showError("Error", error.message);
    }
  }

  const getJenisSurat = async () => {
    try {
      const response = await ServiceJenisSurat.getJenisSurat()
      SetDataJenisSurat(response.data)
      // console.log(response)
    } catch (error) {
      SweetAlertService.showError('Error', error.message)
    }
  }

  const validate = () => {
    const newErrors = {};
    if (!tanggalKeluar) newErrors.tanggalTerima = "Tanggal terima wajib diisi";
    if (!tanggalSurat) newErrors.tanggalSurat = "Tanggal surat wajib diisi";
    if (!noSurat) newErrors.noSurat = "No surat wajib diisi";
    if (!tujuan) newErrors.tujuan = "Pengirim wajib diisi";
    if (!perihal) newErrors.perihal = "Perihal wajib diisi";
    if (!jenisSurat) newErrors.jenisSurat = "Jenis surat wajib dipilih";
    // if (!fileSurat) newErrors.fileSurat = "File surat wajib diunggah";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const formData = new FormData();
    formData.append("TANGGAL_KELUAR", tanggalKeluar);
    formData.append("TANGGAL_SURAT", tanggalSurat);
    formData.append("NO_SURAT", noSurat);
    formData.append("TUJUAN", tujuan); // Tetap pakai field pengirim di backend
    formData.append("PERIHAL", perihal);
    formData.append("JENIS_SURAT", jenisSurat);
    formData.append("KETERANGAN", keterangan);
    // formData.append("file", fileSurat);s

    const data = {
      TANGGAL_TERIMA: tanggalKeluar,
      TANGGAL_SURAT: tanggalSurat,
      NO_SURAT: noSurat,
      TUJUAN: tujuan,
      PERIHAL: perihal,
      JENIS_SURAT: jenisSurat,
      KETERANGAN: keterangan
      // FILE_PATH
    }

    try {
      const response = await ServiceSurat.editSuratKeluar(idSuratKeluar, data);
      if (response.status === false) {
        return SweetAlertService.showError("Gagal", response.message);
      }

      SweetAlertService.showSuccess("Berhasil", response.message);
      navigate("/surat-keluar-page");
    } catch (error) {
      SweetAlertService.showError("Error", error.message);
    }
  };

  useEffect(() => {
    getSuratKeluarByID()
    getJenisSurat()
  }, [])

  return (
    <Layout>
      <div className="flex flex-col gap-3 px-5 my-2 border-lg shadow w-full py-3 bg-white">
        <p className="text-lg font-bold uppercase">Edit Surat Masuk</p>
        <hr />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
          {/* Tanggal Terima */}
          <div className="flex flex-col">
              <label className="mb-1 font-medium text-sm">Tanggal Keluar</label>
            <input
              type="date"
              value={tanggalKeluar}
              onChange={(e) => setTanggalKeluar(e.target.value)}
              className={`border rounded px-3 py-2 w-full ${errors.tanggalTerima ? "border-red-500" : ""}`}
            />
            {errors.tanggalTerima && <span className="text-red-500 text-xs mt-1">{errors.tanggalTerima}</span>}
          </div>

          {/* Tanggal Surat */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-sm">Tanggal Surat</label>
            <input
              type="date"
              value={tanggalSurat}
              onChange={(e) => setTanggalSurat(e.target.value)}
              className={`border rounded px-3 py-2 w-full ${errors.tanggalSurat ? "border-red-500" : ""}`}
            />
            {errors.tanggalSurat && <span className="text-red-500 text-xs mt-1">{errors.tanggalSurat}</span>}
          </div>

          {/* No Surat */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-sm">No Surat</label>
            <input
              type="text"
              value={noSurat}
              onChange={(e) => setNoSurat(e.target.value)}
              className={`border rounded px-3 py-2 w-full ${errors.noSurat ? "border-red-500" : ""}`}
              placeholder="Masukkan nomor surat"
            />
            {errors.noSurat && <span className="text-red-500 text-xs mt-1">{errors.noSurat}</span>}
          </div>

          {/* Pengirim */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-sm">Tujuan</label>
            <input
              type="text"
              value={tujuan}
              onChange={(e) => setTujuan(e.target.value)}
              className={`border rounded px-3 py-2 w-full ${errors.pengirim ? "border-red-500" : ""}`}
              placeholder="Masukkan tujuan"
            />
            {errors.pengirim && <span className="text-red-500 text-xs mt-1">{errors.pengirim}</span>}
          </div>

          {/* Perihal */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-sm">Perihal</label>
            <input
              type="text"
              value={perihal}
              onChange={(e) => setPerihal(e.target.value)}
              className={`border rounded px-3 py-2 w-full ${errors.perihal ? "border-red-500" : ""}`}
              placeholder="Masukkan perihal"
            />
            {errors.perihal && <span className="text-red-500 text-xs mt-1">{errors.perihal}</span>}
          </div>

          {/* Jenis Surat */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-sm">Jenis Surat</label>
            <select
              value={jenisSurat}
              onChange={(e) => setJenisSurat(e.target.value)}
              className={`border rounded px-3 py-2 w-full bg-white ${errors.jenisSurat ? "border-red-500" : ""}`}
            >
              <option value="">-- Pilih Jenis Surat --</option>
              {dataJenisSurat.map((item) => (
                <option key={item.IDJENISSURAT} value={item.IDJENISSURAT}>
                  {item.NAMA}
                </option>
              ))}
            </select>
            {errors.jenisSurat && <span className="text-red-500 text-xs mt-1">{errors.jenisSurat}</span>}
          </div>

          {/* File Surat */}
          {/* <div className="flex flex-col col-span-1 md:col-span-2">
            <label className="mb-1 font-medium text-sm">Unggah File Surat</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.png"
              onChange={(e) => setFileSurat(e.target.files[0])}
              className={`border rounded px-3 py-2 w-full ${errors.fileSurat ? "border-red-500" : ""}`}
            />
            {errors.fileSurat && <span className="text-red-500 text-xs mt-1">{errors.fileSurat}</span>}
          </div> */}

          {/* Keterangan */}
          <div className="flex flex-col col-span-1 md:col-span-2">
            <label className="mb-1 font-medium text-sm">Keterangan</label>
            <textarea
              value={keterangan}
              onChange={(e) => setKeterangan(e.target.value)}
              className="border rounded px-3 py-2 w-full"
              placeholder="Masukkan keterangan (opsional)"
              rows={3}
            />
          </div>
        </div>

        <div className="px-6 pb-4">
          <button
            type="button"
            onClick={handleSubmit}
            className="mt-3 inline-flex justify-center rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-400"
          >
            Tambah
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default FormEditSuratKeluar;
