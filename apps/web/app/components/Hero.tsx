"use client";

import Link from "next/link";
import { Typewriter } from "react-simple-typewriter";
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
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Topbar from "@/app/components/Topbar";
import { useAuthContext } from "../context/store";

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
  const { isLogged } = useAuthContext()
  return (
    <>
      <Topbar background={"bg-white"} />
      <div className={"py-20 bg-indigo-800 text-gray-50"}>
        <div
          className={"p-8 h-full grid grid-cols-1 items-center md:grid-cols-2 md:mx-auto md:max-w-screen-lg"}>
          <div className={"flex flex-col justify-center items-start"}>
            <h1 className={`text-4xl font-bold text-gray-50`}>
              <Typewriter
                words={["Nous sommes", "Fikiri", "Postulez", "Dès maintenant"]}
                loop={false}
                cursor={true}
              />
              <span className={"text-5xl font-bold text-red-500"}> .</span>
            </h1>
            <h2
              className={`text-2xl text-gray-50 mb-6 font-semibold mt-6 fade-in-1`}
            >
              Cartographie des solutions innovantes locales pour accélérer
              l&apos;atteinte des ODD en RDC.
            </h2>
            <p className={"mb-10 fade-in-2"}>
              Fikiri est une plateforme web qui vise à cartographier les
              solutions locales en République Démocratique du Congo pour
              accélérer l&apos;atteinte des Objectifs de Développement Durable
              (ODD).
            </p>
            <Link
              href={isLogged ? "/solutions/submit" : "/login"}
              className={"px-6 fade-in-3 py-2 inline-block mb-10 rounded-md bg-indigo-500 text-white font-semibold"}>
              {isLogged ? "Soumettre une solution" : "Se connecter et postuler"}
            </Link>
          </div>

          <div
            className={
              "self-start md:justify-self-end md:w-3/4  relative overflow-hidden"
            }>
            <Carousel
              autoPlay={true}
              interval={3000}
              infiniteLoop={true}
              showThumbs={false}>
              {IMAGES.map((image, index) => (
                <Image
                  key={index}
                  src={image.src}
                  alt={image.name}
                  className={"w-full h-full object-cover rounded-md"}
                />
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
}
