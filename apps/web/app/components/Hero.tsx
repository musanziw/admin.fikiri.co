"use client"

import Link from "next/link";
import { Typewriter } from "react-simple-typewriter";
import slide1 from "@/public/sliders/slide-1.jpeg";
import slide2 from "@/public/sliders/slide-2.jpeg";
import slide3 from "@/public/sliders/slide-3.jpeg";
import slide4 from "@/public/sliders/slide-4.jpeg";
import slide5 from "@/public/sliders/slide-5.jpeg";
import slide6 from "@/public/sliders/slide-6.jpeg";
import slide7 from "@/public/sliders/slide-7.jpeg";
import slide8 from "@/public/sliders/slide-8.jpeg";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Topbar from "@/app/components/Topbar";

export function Hero() {
  return (
    <>
      <Topbar background={"bg-white"} />
      <div className={"py-32 pt-28 bg-indigo-800 text-gray-50"}>
        <div className={"p-8 h-full grid grid-cols-1 items-center md:grid-cols-2 md:mx-auto md:max-w-screen-lg"}>
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
              Cartographie des solutions innovantes locales pour accélérer l&apos;atteinte
              des ODD en RDC.
            </h2>
            <p className={"mb-10 fade-in-2"}>
              Fikiri est une plateforme web qui vise à cartographier les solutions
              locales en République Démocratique du Congo pour accélérer
              l&apos;atteinte des Objectifs de Développement Durable (ODD).
            </p>
            <Link href={"/solutions/submit"} className={"px-6 fade-in-3 py-2 inline-block mb-10 rounded-md bg-indigo-500 text-white font-semibold"}>
              Postuler maintenant
            </Link>
          </div>

          <div className={"self-start md:justify-self-end md:w-3/4  relative overflow-hidden"}>
            <Carousel autoPlay={true} interval={3000} infiniteLoop={true} showThumbs={false}>
              <Image
                src={slide1}
                alt={"Slide 1"}
                className={"w-full h-full object-cover rounded-md"}
              />
              <Image
                src={slide2}
                alt={"Slide 2"}
                className={"w-full h-full object-cover rounded-md"}
              />
              <Image
                src={slide3}
                alt={"Slide 3"}
                className={"w-full h-full object-cover rounded-md"}
              />
              <Image
                src={slide4}
                alt={"Slide 4"}
                className={"w-full h-full object-cover rounded-md"}
              />
              <Image
                src={slide5}
                alt={"Slide 5"}
                className={"w-full h-full object-cover rounded-md"}
              />
              <Image
                src={slide6}
                alt={"Slide 6"}
                className={"w-full h-full object-cover rounded-md"}
              />
              <Image
                src={slide7}
                alt={"Slide 7"}
                className={"w-full h-full object-cover rounded-md"}
              />
              <Image
                src={slide8}
                alt={"Slide 8"}
                className={"w-full h-full object-cover rounded-md"}
              />
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
}
