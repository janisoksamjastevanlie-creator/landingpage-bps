const layanan = [
  {
    judul: "Sensus Penduduk",
    deskripsi:
      "Pemutakhirkan dan sensus komprehensif kependudukan dalam layanan wilayah kabupaten.",
  },
  {
    judul: "Susenas",
    deskripsi:
      "Survei Sosial Ekonomi Nasional untuk menghasilkan data rinci kesejahteraan masyarakat.",
  },
  {
    judul: "Publikasi Statistik Daerah",
    deskripsi:
      "Kabupaten Minahasa Tenggara dalam Angka dan publikasi tematik lainnya.",
  },
  {
    judul: "Pelayanan Konsultasi Data",
    deskripsi:
      "Layanan kunjungan dan konsultasi kebutuhan data statistik bagi masyarakat dan instansi.",
  },
];

export default function Layanan() {
  return (
    <section id="layanan" className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl font-bold text-blue-900 md:text-3xl">
          Layanan & Publikasi Statistik
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {layanan.map((item) => (
            <div
              key={item.judul}
              className="rounded-xl border-l-4 border-amber-400 bg-gray-50 p-6 shadow-sm"
            >
              <h3 className="font-semibold text-blue-900">{item.judul}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                {item.deskripsi}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
