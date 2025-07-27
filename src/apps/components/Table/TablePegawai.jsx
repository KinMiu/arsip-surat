import SweetAlertService from "../../helper/sweetalertService";
import ServicePegawai from "../../api/service/Pegawai.service";
import { useNavigate } from "react-router-dom";

const TablePegawai = ({ dataSurat }) => {
  const navigate = useNavigate()

  const TableHead = [
    "No",
    "Nama",
    "Email",
    "No Telp",
    "Jabatan",
    "Alamat",
    "Action"
  ];

  const handleDelete = async (id) => {
    const result = await SweetAlertService.confirmDeletion();
    if (result.isConfirmed) {
      try {
        const response = await ServicePegawai.deletePegawai(id);
        SweetAlertService.showSuccess("Success", response.message);
        window.location.reload();
      } catch (error) {
        SweetAlertService.showError("Error", error.message);
      }
    }
  };

  const handleUpdate = (IDPEGAWAI) => {
    return navigate(`/pegawai-page/update-pegawai/${IDPEGAWAI}`)
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="w-full bg-gray-100 text-left text-sm">
            {TableHead.map((data, index) => (
              <th key={index} className="px-4 py-2 border-r">
                {data}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            dataSurat.length === 0 ?
            (
              <tr>
              <td colSpan={9} className="text-center py-4 text-gray-500 italic">
                Tidak ada data Pegawai.
              </td>
            </tr>
            ):(
              dataSurat.map((data, index) => (
            <tr key={data._id} className="border-b text-sm">
              <td className="px-4 py-2 border-r w-14">{index + 1}</td>
              <td className="px-4 py-2 border-r">{data.NAMA}</td>
              <td className="px-4 py-2 border-r">{data.EMAIL}</td>
              <td className="px-4 py-2 border-r">{data.NO_TELP}</td>
              <td className="px-4 py-2 border-r">{data.JABATAN.NAMA}</td>
              <td className="px-4 py-2 border-r">{data.ALAMAT}</td>
              <td className="px-4 py-2 flex flex-row gap-1">
                <button
                  onClick={() => handleUpdate(data.IDPEGAWAI)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(data.IDPEGAWAI)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Hapus
                </button>
              </td>
            </tr>
          )))}
        </tbody>
      </table>
    </div>
  );
};

export default TablePegawai;