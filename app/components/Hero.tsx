export default function Hero() {
  return (
    <section
      id="beranda"
      className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-600 text-white"
    >
      <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
        <p className="mb-3 inline-block rounded-full bg-amber-400 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-blue-900">
          Badan Pusat Statistik
        </p>
        <h1 className="max-w-2xl text-4xl font-bold leading-tight md:text-5xl">
          Sumber Data Andalan Indonesia
        </h1>
        <p className="mt-4 max-w-xl text-blue-100 md:text-lg">
          BPS Kabupaten Minahasa Tenggara menyediakan data dan informasi
          statistik yang lengkap, akurat, dan terkini untuk mendukung
          pembangunan daerah.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#indikator"
            className="rounded-lg bg-amber-400 px-6 py-3 font-semibold text-blue-900 transition hover:bg-amber-300"
          >
            Lihat Indikator Utama
          </a>
          <a
            href="#layanan"
            className="rounded-lg border border-white/60 px-6 py-3 font-semibold transition hover:bg-white/10"
          >
            Layanan Statistik
          </a>
        </div>
      </div>
    </section>
  );
}
