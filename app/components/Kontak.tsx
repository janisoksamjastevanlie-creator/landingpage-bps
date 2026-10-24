export default function Kontak() {
  return (
    <section id="kontak" className="bg-gray-50 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl font-bold text-blue-900 md:text-3xl">
          Kontak & Alamat
        </h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
            <h3 className="font-semibold text-blue-900">Kantor BPS Minut</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>
                <span className="font-medium text-gray-800">Alamat:</span>{" "}
                Jl. Pahlawan Indonesia, Sangtombolang, Kabupaten Minahasa Tenggara,
                Sulawesi Utara
              </li>
              <li>
                <span className="font-medium text-gray-800">Telepon:</span> (0431)
                XXX-XXXX
              </li>
              <li>
                <span className="font-medium text-gray-800">Email:</span>{" "}
                bps8201@bps.go.id
              </li>
              <li>
                <span className="font-medium text-gray-800">Jam layanan:</span>{" "}
                Senin–Jumat, 08.00–16.00 WITA
              </li>
            </ul>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
            <h3 className="font-semibold text-blue-900">Sosial Media</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>Instagram: @bpsminut</li>
              <li>Facebook: BPS Kabupaten Minahasa Tenggara</li>
              <li>X (Twitter): @bpsminut</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
