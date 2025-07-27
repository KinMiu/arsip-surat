import { useState } from "react";
import SweetAlertService from "../../helper/sweetalertService";
import ServiceJenisSurat from "../../api/service/JenisSurat.service";

const FormAddSuratJenis = ({ onClose }) => {
  const [nama, setNama] = useState("");
  const [keterangan, setKeterangan] = useState("");

  const handleSubmit = async () => {
    try {
      const data = {
        NAMA: nama,
        DESKRIPSI: keterangan
      }
      const response = await ServiceJenisSurat.addJenisSurat(data);
      if (response.status === false) {
        return SweetAlertService.showError("Gagal", response.message);
      }
      SweetAlertService.showSuccess("Berhasil", response.message);
      window.location.reload();
    } catch (error) {
      SweetAlertService.showError("Error !!", error.message);
    }
  };

  return (
    <div className="relative z-10" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-800 bg-opacity-75" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative transform overflow-hidden rounded-lg bg-white shadow-xl sm:max-w-lg w-full">
            <div className="bg-white p-6 flex flex-col gap-3">
              <p className="text-xl font-semibold text-gray-900">
                Tambah Jenis Surat
              </p>
              <input
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="border rounded px-3 py-1 mt-5"
                placeholder="Nama Jenis Surat"
              />
              <input
                type="text"
                value={keterangan}
                onChange={(e) => setKeterangan(e.target.value)}
                className="border rounded px-3 py-1"
                placeholder="Keterangan"
              />
            </div>
            <div className="bg-gray-50 px-4 py-3 flex justify-end gap-2">
              <button
                onClick={handleSubmit}
                className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded"
              >
                Simpan Data
              </button>
              <button
                onClick={onClose}
                className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddSuratJenis;
