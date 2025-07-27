import { useState } from "react";
import SweetAlertService from "../../helper/sweetalertService";
import ServiceSurat from "../../api/service/Surat.service";
import FormDisposisi from "../Form/FormDisposisi";
import { useNavigate } from "react-router-dom";

const TableSuratMasuk = ({ dataSurat, dataPegawai }) => {
  const navigate = useNavigate()
  const [selectedSurat, setSelectedSurat] = useState(null);
  console.log(dataSurat) 

  const handleNavigate = (idSurat) => {
    return navigate(`/surat-masuk-page/edit-surat/${idSurat}`)
  }

  const handleDelete = async (id) => {
    try {
      // console.log(id)
      const response = await ServiceSurat.deleteSuratMasuk(id);
      SweetAlertService.showSuccess("Success", response.message);
      window.location.reload();
    } catch (error) {
      SweetAlertService.showError("Error", error.message);
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
                    onClick={() => downloadFile(data.FILE_PATH)}
                    // href={`/download?url=${encodeURIComponent(data.FILE_PATH)}`}
                    // target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Unduh File
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

      {selectedSurat && (
        <FormDisposisi
          suratId={selectedSurat.IDSURATMASUK}
          pegawaiList={dataPegawai}
          dataDisposisi={selectedSurat.DISPOSISI || []}
          onClose={() => setSelectedSurat(null)}
        />
      )}
    </div>
  );
};

export default TableSuratMasuk;
