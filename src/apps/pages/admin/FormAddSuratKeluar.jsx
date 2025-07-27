import { useEffect, useState } from "react";
import Layout from "../Layout";
import { useNavigate } from "react-router-dom";
import SweetAlertService from "../../helper/sweetalertService";
import ServiceSurat from "../../api/service/Surat.service";
import ServiceJenisSurat from "../../api/service/JenisSurat.service";

const FormAddSuratKeluar = () => {
  const navigate = useNavigate();

  const [tanggalTerima, setTanggalTerima] = useState("");
  const [tanggalSurat, setTanggalSurat] = useState("");
  const [noSurat, setNoSurat] = useState("");
  const [penerima, setPenerima] = useState(""); // Surat keluar -> penerima
  const [perihal, setPerihal] = useState("");
  const [jenisSurat, setJenisSurat] = useState("");
  const [keterangan, setKeterangan] = useState("-");
  const [fileSurat, setFileSurat] = useState(null);
  const [dataJenisSurat, setDataJenisSurat] = useState([]);
  const [errors, setErrors] = useState({});

  const getJenisSurat = async () => {
    try {
      const response = await ServiceJenisSurat.getJenisSurat();
      setDataJenisSurat(response.data);
    } catch (error) {
      SweetAlertService.showError("Error", error.message);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!tanggalTerima) newErrors.tanggalTerima = "Tanggal terima wajib diisi";
    if (!tanggalSurat) newErrors.tanggalSurat = "Tanggal surat wajib diisi";
    if (!noSurat) newErrors.noSurat = "No surat wajib diisi";
    if (!penerima) newErrors.penerima = "Penerima wajib diisi";
    if (!perihal) newErrors.perihal = "Perihal wajib diisi";
    if (!jenisSurat) newErrors.jenisSurat = "Jenis surat wajib dipilih";
    if (!fileSurat) newErrors.fileSurat = "File surat wajib diunggah";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const formData = new FormData();
    formData.append("tanggal_keluar", tanggalTerima);
    formData.append("tanggal_surat", tanggalSurat);
    formData.append("no_surat", noSurat);
    formData.append("tujuan", penerima); // Tetap pakai field pengirim di backend
    formData.append("perihal", perihal);
    formData.append("jenis_surat", jenisSurat);
    formData.append("keterangan", keterangan);
    formData.append("file", fileSurat);

    try {
      const response = await ServiceSurat.addSuratKeluar(formData);
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
    getJenisSurat();
  }, []);

  return (
    <Layout>
      <div className="flex flex-col gap-3 px-5 my-2 border-lg shadow w-full py-3 bg-white">
        <p className="text-lg font-bold uppercase">Tambah Surat Keluar</p>
        <hr />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
          {/* Tanggal Terima */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-sm">Tanggal Keluar</label>
            <input
              type="date"
              value={tanggalTerima}
              onChange={(e) => setTanggalTerima(e.target.value)}
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

          {/* Penerima */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-sm">Penerima</label>
            <input
              type="text"
              value={penerima}
              onChange={(e) => setPenerima(e.target.value)}
              className={`border rounded px-3 py-2 w-full ${errors.penerima ? "border-red-500" : ""}`}
              placeholder="Masukkan nama penerima"
            />
            {errors.penerima && <span className="text-red-500 text-xs mt-1">{errors.penerima}</span>}
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
          <div className="flex flex-col col-span-1 md:col-span-2">
            <label className="mb-1 font-medium text-sm">Unggah File Surat</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.png"
              onChange={(e) => setFileSurat(e.target.files[0])}
              className={`border rounded px-3 py-2 w-full ${errors.fileSurat ? "border-red-500" : ""}`}
            />
            {errors.fileSurat && <span className="text-red-500 text-xs mt-1">{errors.fileSurat}</span>}
          </div>

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

export default FormAddSuratKeluar;
