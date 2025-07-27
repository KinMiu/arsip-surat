import { useState } from "react";
import SweetAlertService from "../../helper/sweetalertService";
import ServiceSurat from "../../api/service/Surat.service";

const FormDisposisi = ({ suratId, pegawaiList, dataDisposisi, onClose }) => {
  const [pegawai, setPegawai] = useState("");
  const [catatan, setCatatan] = useState("");

  const handleSubmit = async () => {
    if (!pegawai) return SweetAlertService.showError("Gagal", "Pegawai wajib dipilih.");

    try {
      const payload = {
        pegawai,
        catatan: catatan || "-",
      };
      const response = await ServiceSurat.addDisposisi(suratId, payload);
      if (response.status === false) {
        return SweetAlertService.showError("Gagal", response.message);
      }

      SweetAlertService.showSuccess("Berhasil", response.message);
      return window.location.reload()
    } catch (error) {
      SweetAlertService.showError("Error", error.message);
    }
  };

  const handleDeleteDisposisi = async (idPegawai) => {
    const result = await SweetAlertService.confirmDeletion();
    if (!result.isConfirmed) return;

    try {
      // console.log(idPegawai, suratId)
      const response = await ServiceSurat.deleteDisposisi(suratId, idPegawai);
      if (response.status === false) {
        return SweetAlertService.showError("Gagal", response.message);
      }

      SweetAlertService.showSuccess("Berhasil", response.message);
      return window.location.reload()
    } catch (error) {
      SweetAlertService.showError("Error", error.message);
    }
  };

  const handleOpenSurat = async (idPegawai) => {
    try {
      await ServiceSurat.tandaiSudahDilihat(suratId, idPegawai);
      return window.location.reload()
    } catch (error) {
      console.error("Gagal update status surat:", error);
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow w-full max-w-2xl">
        <h2 className="text-lg font-semibold mb-4">Form Disposisi</h2>

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Pilih Pegawai</label>
          <select
            value={pegawai}
            onChange={(e) => setPegawai(e.target.value)}
            className="border px-3 py-2 rounded w-full"
          >
            <option value="">-- Pilih Pegawai --</option>
            {pegawaiList.map((p) => (
              <option key={p.IDPEGAWAI} value={p.IDPEGAWAI}>
                {p.NAMA}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Catatan</label>
          <textarea
            rows={3}
            value={catatan}
            onChange={(e) => setCatatan(e.target.value)}
            className="border px-3 py-2 rounded w-full"
            placeholder="Masukkan catatan (opsional)"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-gray-300 rounded hover:bg-gray-400"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-500"
          >
            Simpan
          </button>
        </div>

        {dataDisposisi.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-semibold mb-2">Daftar Disposisi:</h3>
            <table className="w-full text-sm border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-2 py-1">Pegawai</th>
                  <th className="border px-2 py-1">Catatan</th>
                  <th className="border px-2 py-1">Tanggal</th>
                  <th className="border px-2 py-1">Status</th>
                  <th className="border px-2 py-1">Action</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {dataDisposisi.map((item, idx) => (
                  <tr key={idx}>
                    <td className="border px-2 py-1">{item.PEGAWAI?.NAMA || "-"}</td>
                    <td className="border px-2 py-1">{item.CATATAN}</td>
                    <td className="border px-2 py-1">
                      {item.TANGGAL_DISPOSISI
                        ? new Date(item.TANGGAL_DISPOSISI).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="border px-2 py-1">
                      {item.SUDAH_DILIHAT ? "✅ Dibaca" : "❌ Belum"}
                    </td>
                    <td className="border px-2 py-1">
                      {item.PEGAWAI?.IDPEGAWAI && (
                          
                          <button
                            onClick={() => handleDeleteDisposisi(item.PEGAWAI.IDPEGAWAI)}
                            className="bg-red-500 text-white px-2 py-1 rounded"
                          >
                            Hapus
                          </button>
                      )}
                      {
                        item.SUDAH_DILIHAT ?  
                          null
                        : 
                        <button
                            onClick={() => handleOpenSurat(item.PEGAWAI.IDPEGAWAI)}
                            className="bg-green-500 text-white px-2 py-1 rounded ms-2"
                          >
                            Ubah status
                          </button>
                      }
                    </td>
                  </tr>
                ))}
                {dataDisposisi.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-gray-500 italic py-2">
                      Belum ada disposisi.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormDisposisi;
