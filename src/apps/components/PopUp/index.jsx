
const DetailSuratModal = ({ surat, onClose, idPegawai }) => {
  if (!surat) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-2xl font-bold"
        >
          &times;
        </button>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-purple-600 text-xl">📄</span>
          <h3 className="text-xl font-bold text-gray-800">Detail Surat</h3>
        </div>

        <div className="space-y-3 text-sm text-gray-700">
          <p><span className="font-medium text-gray-600">Perihal:</span> {surat.PERIHAL}</p>
          <p><span className="font-medium text-gray-600">Pengirim:</span> {surat.PENGIRIM}</p>
          <p><span className="font-medium text-gray-600">No Surat:</span> {surat.NO_SURAT}</p>
          <p><span className="font-medium text-gray-600">Tanggal Surat:</span> {new Date(surat.TANGGAL_SURAT).toLocaleDateString()}</p>
          <p><span className="font-medium text-gray-600">Tanggal Terima:</span> {new Date(surat.TANGGAL_TERIMA).toLocaleDateString()}</p>
          <p><span className="font-medium text-gray-600">Keterangan:</span> {surat.KETERANGAN}</p>

          <p>
            <span className="font-medium text-gray-600">Catatan Disposisi:</span>{" "}
            {
              surat.DISPOSISI?.find(d => d.PEGAWAI.IDPEGAWAI === idPegawai)?.CATATAN || "-"
            }
          </p>

          <p>
            <span className="font-medium text-gray-600">File:</span>{" "}
            <a
              href={`/download?url=${encodeURIComponent(surat.FILE_PATH)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800 transition"
            >
              Unduh File
            </a>
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-sm rounded hover:bg-gray-300 transition"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailSuratModal;
