import { useEffect, useState } from "react";
import Layout from "./Layout";
import ServiceSurat from "../api/service/Surat.service";
import SweetAlertService from "../helper/sweetalertService";

const DashboardAdmin = () => {
  const [dataSuratMasuk, setDataSuratMasuk] = useState([]);
  const [dataSuratKeluar, setDataSuratKeluar] = useState([]);

  const getSuratMasuk = async () => {
    try {
      const response = await ServiceSurat.getSuratMasuk();
      setDataSuratMasuk(response.data);
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

  useEffect(() => {
    getSuratMasuk();
    getSuratKeluar();
  }, []);

  const totalSuratMasuk = dataSuratMasuk.length;
  const totalSuratKeluar = dataSuratKeluar.length;
  const totalSurat = totalSuratMasuk + totalSuratKeluar;

  const totalDisposisi = dataSuratMasuk.reduce(
    (acc, surat) => acc + (surat.DISPOSISI?.length || 0),
    0
  );

  const totalBelumDibaca = dataSuratMasuk.reduce((acc, surat) => {
    return (
      acc +
      (surat.DISPOSISI?.filter((d) => !d.SUDAH_DILIHAT).length || 0)
    );
  }, 0);

  const totalSudahDibaca = totalDisposisi - totalBelumDibaca;

  const jumlahPerJenis = dataSuratMasuk.reduce((acc, surat) => {
    const jenis = surat.JENIS_SURAT?.NAMA || "Lainnya";
    acc[jenis] = (acc[jenis] || 0) + 1;
    return acc;
  }, {});

  return (
    <Layout>
      <div className="px-6 py-4">
        <h1 className="text-xl font-semibold mb-4">📊 Dashboard Admin</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-md font-medium mb-2">📥 Total Surat Masuk</h2>
            <p className="text-4xl font-bold text-blue-600">{totalSuratMasuk}</p>
          </div>

          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-md font-medium mb-2">📤 Total Surat Keluar</h2>
            <p className="text-4xl font-bold text-green-600">{totalSuratKeluar}</p>
          </div>

          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-md font-medium mb-2">📄 Total Seluruh Surat</h2>
            <p className="text-4xl font-bold text-purple-600">{totalSurat}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-md font-medium mb-2">📝 Total Disposisi</h2>
            <p className="text-4xl font-bold text-yellow-600">{totalDisposisi}</p>
          </div>

          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-md font-medium mb-2">✅ Sudah Dibaca</h2>
            <p className="text-4xl font-bold text-green-600">{totalSudahDibaca}</p>
          </div>

          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-md font-medium mb-2">📬 Belum Dibaca</h2>
            <p className="text-4xl font-bold text-red-600">{totalBelumDibaca}</p>
          </div>
        </div>

        <div className="bg-white p-4 shadow rounded mb-6">
          <h2 className="text-md font-medium mb-4">📂 Total Surat Masuk Berdasarkan Jenis</h2>
          <ul className="list-disc pl-5">
            {Object.entries(jumlahPerJenis).map(([jenis, jumlah], idx) => (
              <li key={idx} className="mb-1">
                <span className="font-semibold">{jenis}:</span> {jumlah} surat
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardAdmin;
