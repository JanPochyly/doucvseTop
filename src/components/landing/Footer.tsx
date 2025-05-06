import Image from "next/image";
import FooterLine from "/img/landing/FooterLine.svg";
import Logo2 from "/img/landing/Logo2.svg";

const Footer = () => {
  return (
    <footer className="relative text-white mt-64 overflow-visible">
      <Image
        src="/img/landing/FooterLine.svg"
        alt="Footer background"
        width={1920}
        height={500}
        className="absolute top-0 left-0 w-full h-[710px] object-cover z-0"
      />
      <div className="relative z-10 max-w-7xl mx-auto pt-80 pb-24 mt-0 grid grid-cols-1 md:grid-cols-4 gap-10 text-white md:items-start">
        <div className="flex justify-center md:justify-start md:text-left text-center items-center">
          <Image
            src="/img/landing/Logo2.svg"
            alt="Doucvse Logo"
            width={320}
            height={160}
            className="ml-[-250px]"
          />
        </div>
        <div className="text-center md:text-left">
          <h3 className="font-semibold text-lg mb-3">Menu</h3>
          <ul className="space-y-1">
            <li>Jak to funguje?</li>
            <li>Proč právě my?</li>
            <li>Recenze</li>
            <li>FAQ</li>
            <li>Kontakt</li>
          </ul>
        </div>
        <div className="text-center md:text-left">
          <h3 className="font-semibold text-lg mb-3">Kontakt</h3>
          <ul className="space-y-1">
            <li>Instagram</li>
            <li>Facebook</li>
            <li>Email</li>
          </ul>
        </div>
        <div className="text-center md:text-left">
          <h3 className="font-semibold text-lg mb-3">Registrace</h3>
          <ul className="space-y-1">
            <li>Přihlášení</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;