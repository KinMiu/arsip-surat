import { useEffect, useState } from "react";
import ServiceSurat from "../../api/service/Surat.service";
import ServiceJenisSurat from "../../api/service/JenisSurat.service";
import Layout from "../Layout";
import SweetAlertService from "../../helper/sweetalertService";
import { jwtDecode } from "jwt-decode";
import DetailSuratModal from "../../components/PopUp";

const DashboardKaryawan = () => {
  const [dataSuratMasuk, setDataSuratMasuk] = useState([]);
  const [selectedSurat, setSelectedSurat] = useState(null);
  const [dataJenisSurat, setDataJenisSurat] = useState([]);
  const [previewFile, setPreviewFile] = useState(null);

  const [searchPerihal, setSearchPerihal] = useState("");
  const [filterJenisSurat, setFilterJenisSurat] = useState("");
  const [tanggalMulai, setTanggalMulai] = useState("");
  const [tanggalAkhir, setTanggalAkhir] = useState("");

  const token = localStorage.getItem("access-token");
  const decoded = token ? jwtDecode(token) : null;
  const idPegawai = decoded?.IDUSER;

  const getSuratMasuk = async () => {
    try {
      const response = await ServiceSurat.getSuratMasuk();
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

  const handleOpenSurat = async (surat) => {
    const sudahDilihat = surat.DISPOSISI?.some(
      (d) => d.PEGAWAI?.IDPEGAWAI === idPegawai && d.SUDAH_DILIHAT
    );

    setSelectedSurat(surat);

    if (!sudahDilihat) {
      try {
        await ServiceSurat.tandaiSudahDilihat(surat.IDSURATMASUK, idPegawai);

        const updatedSurat = {
          ...surat,
          DISPOSISI: surat.DISPOSISI.map((d) =>
            d.PEGAWAI?.IDPEGAWAI === idPegawai ? { ...d, SUDAH_DILIHAT: true } : d
          ),
        };

        setDataSuratMasuk((prev) =>
          prev.map((s) => (s.IDSURATMASUK === surat.IDSURATMASUK ? updatedSurat : s))
        );
      } catch (error) {
        console.error("Gagal update status surat:", error);
      }
    }
  };

  const suratUntukSaya = dataSuratMasuk.filter((surat) =>
    surat.DISPOSISI?.some((d) => d.PEGAWAI?.IDPEGAWAI === idPegawai)
  );

  const filteredSurat = suratUntukSaya.filter((surat) => {
    const cocokPerihal = surat.PERIHAL.toLowerCase().includes(searchPerihal.toLowerCase());
    const cocokJenis = filterJenisSurat ? surat.JENIS_SURAT === filterJenisSurat : true;
    const tanggalSurat = new Date(surat.TANGGAL_SURAT);
    const cocokTanggal =
      tanggalMulai && tanggalAkhir
        ? tanggalSurat >= new Date(tanggalMulai) && tanggalSurat <= new Date(tanggalAkhir)
        : true;
    return cocokPerihal && cocokJenis && cocokTanggal;
  });

  const kotakMasuk = filteredSurat.filter((surat) =>
    surat.DISPOSISI?.some(
      (d) => d.PEGAWAI?.IDPEGAWAI === idPegawai && !d.SUDAH_DILIHAT
    )
  );

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

  const handleLihatSurat = (surat) => {
  // Panggil logika update status
  handleOpenSurat(surat);

  // Set file untuk preview
  setPreviewFile(surat.FILE_PATH);
};

  useEffect(() => {
    getSuratMasuk();
    getJenisSurat();
  }, []);

  if (!token || !idPegawai) {
    return (
      <Layout>
        <div className="p-6 text-center text-red-600">
          ⚠️ Anda belum login atau token tidak valid.
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header */}
      <div className="flex flex-col gap-3 px-5 my-2 border-lg shadow w-full py-3 bg-white">
        <p className="text-lg font-medium">
          Selamat Datang di Website Pengarsipan Surat
        </p>
      </div>

      {/* Filter */}
      <div className="bg-white shadow w-full p-4 my-3 flex flex-wrap gap-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Cari Prihal</label>
          <input
            type="text"
            placeholder="Cari Perihal..."
            value={searchPerihal}
            onChange={(e) => setSearchPerihal(e.target.value)}
            className="px-3 py-2 border rounded-md shadow-sm text-sm w-48"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Cari Prihal</label>
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
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Tanggal Surat Mulai</label>
          <input
            type="date"
            value={tanggalMulai}
            onChange={(e) => setTanggalMulai(e.target.value)}
            className="px-3 py-2 border rounded-md shadow-sm text-sm w-48"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Tanggal Surat Akhir</label>
          <input
            type="date"
            value={tanggalAkhir}
            onChange={(e) => setTanggalAkhir(e.target.value)}
            className="px-3 py-2 border rounded-md shadow-sm text-sm w-48"
          />
        </div>
      </div>

      {/* Kotak Masuk */}
      {kotakMasuk.length > 0 && (
        <div className="bg-white shadow w-full p-4 my-3">
          <h2 className="text-md font-semibold mb-2">
            📥 Kotak Masuk (Belum Dibaca)
          </h2>
          <ul className="space-y-2">
            {kotakMasuk.map((surat, idx) => (
              <li
                key={idx}
                onClick={() => handleOpenSurat(surat)}
                className="cursor-pointer bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded border text-sm text-gray-800"
              >
                <strong>{surat.PERIHAL}</strong> dari {surat.PENGIRIM} (
                {new Date(surat.TANGGAL_SURAT).toLocaleDateString()})
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Semua Surat Disposisi */}
      <div className="bg-white shadow w-full p-4 my-3">
        <h2 className="text-md font-semibold mb-2">
          📑 Daftar Surat Disposisi
        </h2>
        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2">No</th>
              <th className="border px-3 py-2">Perihal</th>
              <th className="border px-3 py-2">Pengirim</th>
              <th className="border px-3 py-2">Tanggal Surat</th>
              <th className="border px-3 py-2">Surat</th>
              <th className="border px-3 py-2">Status</th>
              <th className="border px-3 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredSurat.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-3 text-gray-500 italic">
                  Tidak ada surat ditemukan.
                </td>
              </tr>
            ) : (
              filteredSurat.map((surat, idx) => {
                const disp = surat.DISPOSISI.find(
                  (d) => d.PEGAWAI?.IDPEGAWAI === idPegawai
                );
                return (
                  <tr key={idx}>
                    <td className="border px-3 py-2 text-center">{idx + 1}</td>
                    <td className="border px-3 py-2">{surat.PERIHAL}</td>
                    <td className="border px-3 py-2">{surat.PENGIRIM}</td>
                    <td className="border px-3 py-2">
                      {new Date(surat.TANGGAL_SURAT).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 border-r">
                      <button
                        onClick={() => handleLihatSurat(surat)}
                        className="text-blue-500 underline"
                      >
                        Lihat Surat
                      </button>
                    </td>
                    <td className="border px-3 py-2 text-center">
                      {disp?.SUDAH_DILIHAT ? "✅ Dibaca" : "❌ Belum Dibaca"}
                    </td>
                    <td className="border px-3 py-2 text-center">
                      <button
                        onClick={() => handleOpenSurat(surat)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pop-up Detail */}
      <DetailSuratModal
        surat={selectedSurat}
        onClose={() => setSelectedSurat(null)}
        idPegawai={idPegawai}
      />

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
    </Layout>
  );
};

export default DashboardKaryawan;
