const links = [
  { href: "#beranda", label: "Beranda" },
  { href: "#tentang", label: "Tentang" },
  { href: "#indikator", label: "Indikator" },
  { href: "#layanan", label: "Layanan" },
  { href: "#kontak", label: "Kontak" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-blue-900 text-white shadow-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="#beranda" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-400 font-bold text-blue-900">
            BPS
          </span>
          <span className="leading-tight">
            <span className="block font-semibold">BPS Kabupaten Minahasa Tenggara</span>
            <span className="block text-xs text-blue-200">
              Sumber Data Andalan Indonesia
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-6 text-sm font-medium md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded px-2 py-1 transition hover:text-amber-300"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
