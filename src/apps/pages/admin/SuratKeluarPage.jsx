import { useEffect, useState } from "react";
import Layout from "../Layout";
import SweetAlertService from "../../helper/sweetalertService";
import TableSuratKeluar from "../../components/Table/TableSuratKeluar";
import ServiceSurat from "../../api/service/Surat.service";
import ServiceJenisSurat from "../../api/service/JenisSurat.service";
import { useNavigate } from "react-router-dom";

const SuratKeluarPage = () => {
  const [dataSuratKeluar, setDataSuratKeluar] = useState([]);
  const [dataJenisSurat, setDataJenisSurat] = useState([]);

  const [searchPerihal, setSearchPerihal] = useState("");
  const [filterJenisSurat, setFilterJenisSurat] = useState("");
  const [tanggalMulai, setTanggalMulai] = useState("");
  const [tanggalAkhir, setTanggalAkhir] = useState("");
  const [filteredSurat, setFilteredSurat] = useState([]);

  const navigate = useNavigate();

  const getJenisSurat = async () => {
    try {
      const response = await ServiceJenisSurat.getJenisSurat();
      setDataJenisSurat(response.data);
    } catch (error) {
      SweetAlertService.showError("Error", error.message);
    }
  };

  const getSuratKeluar = async () => {
    try {
      const response = await ServiceSurat.getSuratKeluar();
      setDataSuratKeluar(response.data);
    } catch (error) {
      SweetAlertService.showError("Error", error.message);
    }
  };

  const handleNavigate = () => {
    navigate("/surat-keluar-page/add-surat");
  };

  const filterSurat = () => {
    const filtered = dataSuratKeluar.filter((surat) => {
      const cocokPerihal = surat.PERIHAL?.toLowerCase().includes(searchPerihal.toLowerCase());
      const cocokJenis = filterJenisSurat
        ? surat.JENIS_SURAT?.IDJENISSURAT === filterJenisSurat
        : true;
      const tanggalSurat = new Date(surat.TANGGAL_SURAT);
      const cocokTanggal =
        tanggalMulai && tanggalAkhir
          ? tanggalSurat >= new Date(tanggalMulai) && tanggalSurat <= new Date(tanggalAkhir)
          : true;

      return cocokPerihal && cocokJenis && cocokTanggal;
    });

    setFilteredSurat(filtered);
  };

  useEffect(() => {
    getSuratKeluar();
    getJenisSurat();
  }, []);

  useEffect(() => {
    filterSurat();
  }, [searchPerihal, filterJenisSurat, tanggalMulai, tanggalAkhir, dataSuratKeluar]);

  return (
    <Layout>
      <div className="flex flex-col gap-3 px-5 my-2 border-lg shadow w-full py-3 bg-white">
        <p className="text-lg font-bold uppercase">Data Surat Keluar</p>
        <hr />

        {/* Action Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handleNavigate}
            className="mt-3 inline-flex justify-center rounded-md bg-blue-400 px-3 py-2 text-sm text-white shadow-sm ring-1 ring-inset ring-blue-300 hover:bg-blue-300"
          >
            Tambah
          </button>
        </div>

        {/* Filter Options with Labels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 my-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Cari Perihal</label>
            <input
              type="text"
              placeholder="Masukkan perihal..."
              value={searchPerihal}
              onChange={(e) => setSearchPerihal(e.target.value)}
              className="px-3 py-2 border rounded-md shadow-sm text-sm"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Filter Jenis Surat</label>
            <select
              value={filterJenisSurat}
              onChange={(e) => setFilterJenisSurat(e.target.value)}
              className="px-3 py-2 border rounded-md shadow-sm text-sm bg-white"
            >
              <option value="">Semua Jenis Surat</option>
              {dataJenisSurat.map((jenis, idx) => (
                <option key={idx} value={jenis.IDJENISSURAT}>
                  {jenis.NAMA}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Tanggal Mulai</label>
            <input
              type="date"
              value={tanggalMulai}
              onChange={(e) => setTanggalMulai(e.target.value)}
              className="px-3 py-2 border rounded-md shadow-sm text-sm"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Tanggal Akhir</label>
            <input
              type="date"
              value={tanggalAkhir}
              onChange={(e) => setTanggalAkhir(e.target.value)}
              className="px-3 py-2 border rounded-md shadow-sm text-sm"
            />
          </div>
        </div>

        {/* Table */}
        <div>
          <TableSuratKeluar dataSurat={filteredSurat} />
        </div>
      </div>
    </Layout>
  );
};

export default SuratKeluarPage;
