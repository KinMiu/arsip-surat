import { useState } from "react";
import SweetAlertService from "../../helper/sweetalertService";
import ServiceSurat from "../../api/service/Surat.service";
import { useNavigate } from "react-router-dom";

const TableSuratKeluar = ({ dataSurat }) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);

  const handleNavigate = (idSurat) => {
    return navigate(`/surat-keluar-page/edit-surat/${idSurat}`)
  }

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const response = await ServiceSurat.deleteSuratKeluar(id);
      SweetAlertService.showSuccess("Success", response.message);
      window.location.reload();
    } catch (error) {
      SweetAlertService.showError("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadFile = async (url) => {
    try {
      const filename = getFileNameFromUrl(url);
      const response = await fetch(url);
      const blob = await response.blob();

      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      link.click();

      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      alert("Gagal mengunduh file.");
      console.error(error);
    }
  };

  function getFileNameFromUrl(url) {
    try {
      const decodedUrl = decodeURIComponent(url); // decode agar %20 jadi spasi
      const parts = decodedUrl.split("/");
      let fileName = parts[parts.length - 1]; // ambil bagian terakhir

      // Jika tidak ada ekstensi, tambahkan .pdf
      if (!fileName.includes(".")) {
        fileName += ".pdf";
      }

      return fileName;
    } catch {
      return "file.pdf";
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-left text-sm">
            {[
              "No",
              "Tanggal Keluar",
              "Tanggal Surat",
              "No Surat",
              "Tujuan",
              "Perihal",
              "File",
              "Keterangan",
              "Aksi",
            ].map((data, index) => (
              <th key={index} className="px-4 py-2 border-r">
                {data}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataSurat.length === 0 ? (
            <tr>
              <td colSpan={9} className="text-center py-4 text-gray-500 italic">
                Tidak ada data surat keluar.
              </td>
            </tr>
          ) : (
            dataSurat.map((data, index) => (
              <tr key={data._id} className="border-b text-sm">
                <td className="px-4 py-2 border-r">{index + 1}</td>
                <td className="px-4 py-2 border-r">
                  {new Date(data.TANGGAL_KELUAR).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border-r">
                  {new Date(data.TANGGAL_SURAT).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border-r">{data.NO_SURAT}</td>
                <td className="px-4 py-2 border-r">{data.TUJUAN}</td>
                <td className="px-4 py-2 border-r">{data.PERIHAL}</td>
                <td className="px-4 py-2 border-r">
                  <button
                    onClick={() => downloadFile(data.FILE_PATH)}
                    // href={`/download?url=${encodeURIComponent(data.FILE_PATH)}`}
                    // target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Unduh File
                  </button>
                </td>
                <td className="px-4 py-2 border-r">{data.KETERANGAN || "-"}</td>
                <td className="px-4 py-2 flex flex-col gap-1">
                  <button
                    onClick={() => handleNavigate(data.IDSURATKELUAR)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(data.IDSURATKELUAR)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    disabled={loading}
                  >
                    {loading ? "Menghapus..." : "Hapus"}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableSuratKeluar;
