import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Tentang from "./components/Tentang";
import Indikator from "./components/Indikator";
import Layanan from "./components/Layanan";
import Kontak from "./components/Kontak";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="grow">
        <Hero />
        <Tentang />
        <Indikator />
        <Layanan />
        <Kontak />
      </main>
      <Footer />
    </>
  );
}
