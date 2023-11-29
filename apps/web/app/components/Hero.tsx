import Link from "next/link";
import slide1 from "@/public/sliders2/COMING SOON-2.png";
import slide2 from "@/public/sliders2/FIKIRI-POSTER-1.png";
import slide3 from "@/public/sliders2/FIKIRI-POSTER-3.png";
import slide4 from "@/public/sliders2/FIKIRI-POSTER-B.png";
import slide5 from "@/public/sliders2/ODD 1-8.png";
import slide6 from "@/public/sliders2/ODD 13 15.png";
import slide7 from "@/public/sliders2/ODD 2-8.png";
import slide8 from "@/public/sliders2/ODD 3-8.png";
import slide9 from "@/public/sliders2/ODD 9.png";
import Image from "next/image";
import Topbar from "@/app/components/Topbar";

const IMAGES = [
  {
    src: slide1,
    name: "coming soon",
  },
  {
    src: slide2,
    name: "slide 2",
  },
  {
    src: slide3,
    name: "slide3",
  },
  {
    src: slide4,
    name: "slide 4",
  },
  {
    src: slide5,
    name: "slide 5",
  },
  {
    src: slide6,
    name: "slide 6",
  },
  {
    src: slide7,
    name: "slide 7",
  },
  {
    src: slide8,
    name: "slide 8",
  },
  {
    src: slide9,
    name: "slide 9",
  },
];

export function Hero() {
  return (
    <>
      <Topbar background={"bg-white"} />
      <div className={"py-16 bg-indigo-800 text-gray-50"}>
        <div
          className={"p-8 h-screen grid grid-cols-1 content-center md:grid-cols-2 md:mx-auto md:max-w-screen-lg"}>
          <div className={"flex flex-col justify-center items-start"}>
            <h2 className={`text-3xl text-gray-50 mb-6 font-semibold mt-6 fade-in-1`}>
              Cartographie des solutions innovantes locales pour accélérer
              l&apos;atteinte des ODD en RDC.
            </h2>
            <p className={"mb-10 fade-in-2"}>
              Fikiri est une plateforme web qui vise à cartographier les
              solutions locales en République Démocratique du Congo pour
              accélérer l&apos;atteinte des Objectifs de Développement Durable
              (ODD).
            </p>
            <Link href={"/solutions"} className={"px-6 fade-in-3 py-2 inline-block mb-10 rounded-md bg-indigo-500 text-white font-semibold"}>
              Soumettre une solution
            </Link>
          </div>

          <div className={"self-start md:justify-self-end md:w-3/4  relative overflow-hidden"}>
            <Image
              src={IMAGES[3].src}
              alt={IMAGES[3].name}
              className={"w-full h-full object-cover rounded-md"}
            />
          </div>
        </div>
      </div>
    </>
  );
}
