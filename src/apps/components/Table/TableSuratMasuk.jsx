import { useState } from "react";
import SweetAlertService from "../../helper/sweetalertService";
import ServiceSurat from "../../api/service/Surat.service";
import FormDisposisi from "../Form/FormDisposisi";
import { useNavigate } from "react-router-dom";

const TableSuratMasuk = ({ dataSurat, dataPegawai }) => {
  const navigate = useNavigate();
  const [selectedSurat, setSelectedSurat] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);

  const handleNavigate = (idSurat) => {
    navigate(`/surat-masuk-page/edit-surat/${idSurat}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await ServiceSurat.deleteSuratMasuk(id);
      SweetAlertService.showSuccess("Success", response.message);
      window.location.reload();
    } catch (error) {
      SweetAlertService.showError("Error", error.message);
    }
  };

  const handleDownload = async (url) => {
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
      const decodedUrl = decodeURIComponent(url);
      const parts = decodedUrl.split("/");
      let fileName = parts[parts.length - 1];
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
          <tr className="w-full bg-gray-100 text-left text-sm">
            {[
              "No",
              "Tanggal Terima",
              "Tanggal Surat",
              "No Surat",
              "Pengirim",
              "Perihal",
              "File",
              "Keterangan",
              "Action",
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
                Tidak ada data surat masuk.
              </td>
            </tr>
          ) : (
            dataSurat.map((data, index) => (
              <tr key={data._id} className="border-b text-sm">
                <td className="px-4 py-2 border-r w-14">{index + 1}</td>
                <td className="px-4 py-2 border-r">
                  {new Date(data.TANGGAL_TERIMA).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border-r">
                  {new Date(data.TANGGAL_SURAT).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border-r">{data.NO_SURAT}</td>
                <td className="px-4 py-2 border-r">{data.PENGIRIM}</td>
                <td className="px-4 py-2 border-r">{data.PERIHAL}</td>
                <td className="px-4 py-2 border-r">
                  <button
                    onClick={() => setPreviewFile(data.FILE_PATH)}
                    className="text-blue-500 underline"
                  >
                    Lihat Surat
                  </button>
                </td>
                <td className="px-4 py-2 border-r">{data.KETERANGAN}</td>
                <td className="px-4 py-2 flex flex-col gap-1">
                  <button
                    onClick={() => setSelectedSurat(data)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Disposisikan
                  </button>
                  <button
                    onClick={() => handleNavigate(data.IDSURATMASUK)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(data.IDSURATMASUK)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal Disposisi */}
      {selectedSurat && (
        <FormDisposisi
          suratId={selectedSurat.IDSURATMASUK}
          pegawaiList={dataPegawai}
          dataDisposisi={selectedSurat.DISPOSISI || []}
          onClose={() => setSelectedSurat(null)}
        />
      )}

      {/* Modal Preview Surat */}
      {previewFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow-lg w-11/12 md:w-3/4 h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center border-b px-4 py-2">
              <h2 className="text-lg font-semibold">Preview Surat</h2>
              <button
                onClick={() => setPreviewFile(null)}
                className="text-gray-500 hover:text-red-500 text-xl"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-2">
              <iframe
                src={`https://docs.google.com/gview?url=${encodeURIComponent(
                  previewFile
                )}&embedded=true`}
                className="w-full h-full"
                frameBorder="0"
                title="PDF Preview"
              ></iframe>
            </div>

            {/* Footer */}
            <div className="border-t px-4 py-2 flex justify-end gap-2">
              <button
                onClick={() => handleDownload(previewFile)}
                className="bg-green-500 text-white px-4 py-1 rounded"
              >
                Download
              </button>
              <button
                onClick={() => setPreviewFile(null)}
                className="bg-gray-500 text-white px-4 py-1 rounded"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableSuratMasuk;
