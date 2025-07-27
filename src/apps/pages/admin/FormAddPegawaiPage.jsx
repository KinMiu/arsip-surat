import { useEffect, useState } from "react";
import Layout from "../Layout";
import SweetAlertService from "../../helper/sweetalertService";
import ServiceJabatan from "../../api/service/Jabatan.service";
import ServicePegawai from "../../api/service/Pegawai.service";
import { useNavigate } from "react-router-dom";

const FormAddPegawaiPage = () => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [noTelp, setTelp] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [alamat, setAlamat] = useState("");

  const [errors, setErrors] = useState({});
  const [dataJabatan, setDataJabatan] = useState([]);

  const navigate = useNavigate()

  const validate = () => {
    const newErrors = {};
    if (!nama) newErrors.nama = "Nama wajib diisi";
    if (!email) newErrors.email = "Email wajib diisi";
    if (!noTelp) newErrors.noTelp = "No Telepon wajib diisi";
    if (!jabatan) newErrors.jabatan = "Jabatan wajib dipilih";
    if (!alamat) newErrors.alamat = "Alamat wajib diisi";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      const data = {
        NAMA: nama,
        EMAIL: email,
        NO_TELP: noTelp,
        IDJABATAN: jabatan,
        ALAMAT: alamat,
      };

      const response = await ServicePegawai.addPegawai(data);
      if (response.status === false) {
        return SweetAlertService.showError("Gagal", response.message);
      }

      SweetAlertService.showSuccess("Berhasil", response.message);
      navigate('/pegawai-page')
      return window.location.reload();
    } catch (error) {
      // console.log(error)
      SweetAlertService.showError("Error !!", error.message);
    }
  };

  const getJabatan = async () => {
    try {
      const response = await ServiceJabatan.getJabatan();
      setDataJabatan(response.data);
    } catch (error) {
      SweetAlertService.showError("Error", error.message);
    }
  };

  useEffect(() => {
    getJabatan();
  }, []);

  return (
    <Layout>
      <div className="flex flex-col gap-3 px-5 my-2 border-lg shadow w-full py-3 bg-white">
        <p className="text-lg font-bold uppercase">Tambah Pegawai</p>
        <hr />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
          {/* Nama */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-sm">Nama</label>
            <input
              type="text"
              value={nama}
              onChange={(e) => {
                setNama(e.target.value);
                if (errors.nama) setErrors((prev) => ({ ...prev, nama: "" }));
              }}
              className={`border rounded px-3 py-2 w-full ${errors.nama ? "border-red-500" : ""}`}
              placeholder="Masukkan nama lengkap"
            />
            {errors.nama && <span className="text-red-500 text-xs mt-1">{errors.nama}</span>}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-sm">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
              }}
              className={`border rounded px-3 py-2 w-full ${errors.email ? "border-red-500" : ""}`}
              placeholder="Masukkan email"
            />
            {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email}</span>}
          </div>

          {/* No Telepon */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-sm">No Telepon</label>
            <input
              type="text"
              value={noTelp}
              onChange={(e) => {
                setTelp(e.target.value);
                if (errors.noTelp) setErrors((prev) => ({ ...prev, noTelp: "" }));
              }}
              className={`border rounded px-3 py-2 w-full ${errors.noTelp ? "border-red-500" : ""}`}
              placeholder="Masukkan nomor telepon"
            />
            {errors.noTelp && <span className="text-red-500 text-xs mt-1">{errors.noTelp}</span>}
          </div>

          {/* Jabatan */}
          <div className="flex flex-col">
            <label htmlFor="jabatan" className="mb-1 font-medium text-sm">Jabatan</label>
            <select
              id="jabatan"
              value={jabatan}
              onChange={(e) => {
                setJabatan(e.target.value);
                if (errors.jabatan) setErrors((prev) => ({ ...prev, jabatan: "" }));
              }}
              className={`border rounded px-3 py-2 w-full bg-white ${errors.jabatan ? "border-red-500" : ""}`}
            >
              <option value="">-- Pilih Jabatan --</option>
              {dataJabatan.map((item, index) => (
                <option key={index +1} value={item.IDJABATAN}>
                  {item.NAMA}
                </option>
              ))}
            </select>
            {errors.jabatan && <span className="text-red-500 text-xs mt-1">{errors.jabatan}</span>}
          </div>

          {/* Alamat */}
          <div className="flex flex-col col-span-1 md:col-span-2">
            <label className="mb-1 font-medium text-sm">Alamat</label>
            <textarea
              value={alamat}
              onChange={(e) => {
                setAlamat(e.target.value);
                if (errors.alamat) setErrors((prev) => ({ ...prev, alamat: "" }));
              }}
              className={`border rounded px-3 py-2 w-full ${errors.alamat ? "border-red-500" : ""}`}
              placeholder="Masukkan alamat lengkap"
              rows={4}
            />
            {errors.alamat && <span className="text-red-500 text-xs mt-1">{errors.alamat}</span>}
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

export default FormAddPegawaiPage;
