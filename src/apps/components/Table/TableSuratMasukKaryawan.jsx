import SweetAlertService from "../../helper/sweetalertService";
import ServiceSurat from "../../api/service/Surat.service";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import DetailSuratModal from "../PopUp";

const TableSuratMasukKaryawan = ({ dataSurat }) => {
  const [selectedSurat, setSelectedSurat] = useState(null); 

  const token = localStorage.getItem("access-token");
    const decoded = token ? jwtDecode(token) : null;
    const idPegawai = decoded?.IDUSER;

  const handleDelete = async (id) => {
    try {
      const response = await ServiceSurat.deleteSuratMasuk(id);
      SweetAlertService.showSuccess("Success", response.message);
      window.location.reload();
    } catch (error) {
      SweetAlertService.showError("Error", error.message);
    }
  };

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
              "Status",
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
            dataSurat.map((data, index) =>{
              const disp = data.DISPOSISI.find(
                  (d) => d.PEGAWAI?.IDPEGAWAI === idPegawai
                );
                console.log(disp)
              return (
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
                  <a
                    href={`/download?url=${encodeURIComponent(data.FILE_PATH)}`}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Unduh File
                  </a>
                </td>
                <td className="px-4 py-2 border-r">{data.KETERANGAN}</td>
                <td className="border px-3 py-2 text-center">
                  {disp?.SUDAH_DILIHAT ? "✅ Dibaca" : "❌ Belum Dibaca"}
                </td>
                <td className="px-4 py-2 flex flex-col gap-1">
                  <button
                    onClick={() => setSelectedSurat(data)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Detail
                  </button>
                  <button
                    onClick={() => handleDelete(data._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            )
            } )
          )}
        </tbody>
      </table>
      <DetailSuratModal
        surat={selectedSurat}
        onClose={() => setSelectedSurat(null)}
        idPegawai={idPegawai}
      />
    </div>
  );
};

export default TableSuratMasukKaryawan;
