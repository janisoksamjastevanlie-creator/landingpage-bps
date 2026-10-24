const indikator = [
  {
    label: "IPM",
    value: "75,42",
    satuan: "poin (Buku Stat Δ, 2024)",
    keterangan: "Kategori: RI (Rendah) - sedang menuju tinggi",
  },
  {
    label: "Jumlah Penduduk",
    value: "38.281",
    satuan: "jiwa (2023)",
    keterangan: "Kabupaten Minahasa Tenggara",
  },
  {
    label: "Pertumbuhan Ekonomi",
    value: "5,12%",
    satuan: "y-o-y (2023)",
    keterangan: "Didorong sektor perdagangan & pertanian",
  },
  {
    label: "PDRB per Kapita",
    value: "34.215",
    satuan: "juta rupiah (2023)",
    keterangan: "Harga konstan 2010",
  },
];

export default function Indikator() {
  return (
    <section id="indikator" className="bg-gray-50 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl font-bold text-blue-900 md:text-3xl">
          Indikator Utama
        </h2>
        <p className="mt-2 text-gray-500">
          Ringkasan indikator statistik Kabupaten Minahasa Tenggara (data
          contoh, dapat diganti dengan data terbitan BPS).
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {indikator.map((item) => (
            <div
              key={item.label}
              className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 transition hover:shadow-md"
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
                {item.label}
              </p>
              <p className="mt-3 text-3xl font-bold text-blue-900">
                {item.value}
              </p>
              <p className="mt-1 text-sm text-gray-500">{item.satuan}</p>
              <p className="mt-3 text-xs text-gray-400">{item.keterangan}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
