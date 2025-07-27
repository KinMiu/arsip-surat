import { useEffect, useState } from "react";
import Layout from "../Layout";
import SweetAlertService from "../../helper/sweetalertService";
import ServiceSurat from "../../api/service/Surat.service";
import ServicePegawai from "../../api/service/Pegawai.service";
import ServiceJenisSurat from "../../api/service/JenisSurat.service";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import TableSuratMasukKaryawan from "../../components/Table/TableSuratMasukKaryawan";

const SuratMasukPegawaiPage = () => {
  const [dataSuratMasuk, setDataSuratMasuk] = useState([]);
  const [filteredSurat, setFilteredSurat] = useState([]);
  const [dataJenisSurat, setDataJenisSurat] = useState([]);

  const [searchPerihal, setSearchPerihal] = useState("");
  const [filterJenisSurat, setFilterJenisSurat] = useState("");
  const [tanggalMulai, setTanggalMulai] = useState("");
  const [tanggalAkhir, setTanggalAkhir] = useState("");

  const token = localStorage.getItem("access-token");
  const decoded = token ? jwtDecode(token) : null;
  const idPegawai = decoded?.IDUSER;

  const navigate = useNavigate();

  const getSuratMasuk = async () => {
    try {
      const response = await ServiceSurat.getSuratMasukByDisposisi(idPegawai);
      setDataSuratMasuk(response.data);
    } catch (error) {
      SweetAlertService.showError("Error", error.message);
    }
  };

  const getJenisSurat = async () => {
    try {
      const response = await ServiceJenisSurat.getJenisSurat();
      setDataJenisSurat(response.data);
    } catch (error) {
      SweetAlertService.showError("Error", error.message);
    }
  };

  const handleDeleteAll = async () => {
    SweetAlertService.confirmDeletion().then(async (e) => {
      if (e.isConfirmed) {
        try {
          const response = await ServicePegawai.deleteAll();
          if (response.status) {
            SweetAlertService.showSuccess("Sukses", response.message);
            window.location.reload();
          } else {
            SweetAlertService.showError("Error", response.message);
          }
        } catch (error) {
          SweetAlertService.showError("Error", error.response.data.message);
        }
      }
    });
  };

  const HandleNavigate = () => {
    navigate("/surat-masuk-page/add-surat");
  };

  const filterSurat = () => {
    const filtered = dataSuratMasuk.filter((surat) => {
      const cocokPerihal = surat.PERIHAL.toLowerCase().includes(searchPerihal.toLowerCase());
      const cocokJenis = filterJenisSurat ? surat.JENIS_SURAT === filterJenisSurat : true;
      const tanggalSurat = new Date(surat.TANGGAL_SURAT);
      const cocokTanggal =
        tanggalMulai && tanggalAkhir
          ? tanggalSurat >= new Date(tanggalMulai) &&
            tanggalSurat <= new Date(tanggalAkhir)
          : true;
      return cocokPerihal && cocokJenis && cocokTanggal;
    });
    setFilteredSurat(filtered);
  };

  useEffect(() => {
    getSuratMasuk();
    getJenisSurat();
  }, []);

  useEffect(() => {
    filterSurat();
  }, [searchPerihal, filterJenisSurat, tanggalMulai, tanggalAkhir, dataSuratMasuk]);

  return (
    <Layout>
      <div className="flex flex-col gap-3 px-5 my-2 border-lg shadow w-full py-3 bg-white">
        <p className="text-lg font-bold uppercase">Data Surat Masuk</p>
        <hr />

        {/* Aksi Tombol */}
        <div className="flex justify-between">
          <button
            onClick={HandleNavigate}
            className="mt-3 inline-flex justify-center rounded-md bg-blue-400 px-3 py-2 text-sm text-white shadow-sm ring-1 ring-inset ring-blue-300 hover:bg-blue-300"
          >
            Tambah
          </button>
          <button
            onClick={handleDeleteAll}
            className="mt-3 inline-flex justify-center rounded-md bg-red-500 px-3 py-2 text-sm text-white shadow-sm ring-1 ring-inset ring-red-300 hover:bg-red-400"
          >
            Delete All
          </button>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-4 mt-3">
          {/* Filter Perihal */}
          <input
            type="text"
            placeholder="Cari Perihal..."
            value={searchPerihal}
            onChange={(e) => setSearchPerihal(e.target.value)}
            className="px-3 py-2 border rounded-md shadow-sm text-sm w-48"
          />

          {/* Filter Jenis Surat */}
          <select
            value={filterJenisSurat}
            onChange={(e) => setFilterJenisSurat(e.target.value)}
            className="px-3 py-2 border rounded-md shadow-sm text-sm w-48"
          >
            <option value="">Semua Jenis Surat</option>
            {dataJenisSurat.map((jenis, idx) => (
              <option key={idx} value={jenis.IDJENISSURAT}>
                {jenis.NAMA}
              </option>
            ))}
          </select>

          {/* Filter Tanggal Surat */}
          <input
            type="date"
            value={tanggalMulai}
            onChange={(e) => setTanggalMulai(e.target.value)}
            className="px-3 py-2 border rounded-md shadow-sm text-sm w-48"
          />
          <input
            type="date"
            value={tanggalAkhir}
            onChange={(e) => setTanggalAkhir(e.target.value)}
            className="px-3 py-2 border rounded-md shadow-sm text-sm w-48"
          />
        </div>

        {/* Tabel Surat */}
        <div className="mt-3">
          <TableSuratMasukKaryawan dataSurat={filteredSurat} />
        </div>
      </div>
    </Layout>
  );
};

export default SuratMasukPegawaiPage;