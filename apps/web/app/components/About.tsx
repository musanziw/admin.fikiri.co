import ingeniousCity from "@/public/partainers/1.png";
import unJourNouveau from "@/public/partainers/2.png";
import waza from "@/public/partainers/3.png";
import ukamili from "@/public/partainers/4.png";
import kadea from "@/public/partainers/5.png";
import ikiotahub from "@/public/partainers/6.png";
import workSpace from "@/public/partainers/7.png";
import kivuTech from "@/public/partainers/8.png";
import akili from "@/public/partainers/9.png";
import innovationHub from "@/public/partainers/10.png";
import habariRDC from "@/public/partainers/11.png";
import creationHub from "@/public/partainers/12.png";
import sadek from "@/public/partainers/13.png";
import base from "@/public/partainers/14.png";
import luBaHub from "@/public/partainers/15.png";
import yPardRDC from "@/public/partainers/16.png";
import about from "@/public/about.jpeg";
import Image from "next/image";

const PARTAINERS = [
  {
    id: 1,
    nom: " ingenious city",
    src: ingeniousCity,
  },
  {
    id: 2,
    nom: "Un jour nouveau",
    src: unJourNouveau,
  },
  {
    id: 3,
    nom: "waza",
    src: waza,
  },
  {
    id: 4,
    nom: "ukamili",
    src: ukamili,
  },
  {
    id: 5,
    nom: "kadea",
    src: kadea,
  },
  {
    id: 6,
    nom: "ikiotahub",
    src: ikiotahub,
  },
  {
    id: 7,
    nom: "work space",
    src: workSpace,
  },
  {
    id: 8,
    nom: "kivuTech",
    src: kivuTech,
  },
  {
    id: 9,
    nom: "akili",
    src: akili,
  },
  {
    id: 10,
    nom: "innovation hub",
    src: innovationHub,
  },
  {
    id: 11,
    nom: "habariRDC",
    src: habariRDC,
  },
  {
    id: 12,
    nom: "creationHub",
    src: creationHub,
  },
  {
    id: 13,
    nom: "sadek",
    src: sadek,
  },
  {
    id: 14,
    nom: "base",
    src: base,
  },
  {
    id: 15,
    nom: "luba hub",
    src: luBaHub,
  },
  {
    id: 16,
    nom: "yPardRDC",
    src: yPardRDC,
  },
];

export function About() {
  return (
    <div className={"p-8 bg-white"} id={"about"}>
      <div
        className={"lg:mx-auto border-t overflow-hidden lg:max-w-screen-lg py-20"}>

        <div className="grid grid-rows-1 md:grid-cols-2 gap-8 items-center content-center">

          <h1 className={"text-xl font-bold"}>
            Qui sommes-nous ?
            <span className={'font-medium md:text-lg block mt-4'}>
              Fikiri est une plateforme web qui vise à cartographier les solutions
              locales en République Démocratique du Congo pour accélérer
              l&apos;atteinte des Objectifs de Développement Durable (ODD).
              L&apos;objectif de Fikiri est de mettre en lumière les solutions
              locales qui contribuent à l&apos;atteinte des ODD en RDC. Cela
              permettra de faciliter la recherche des solutions locales par les
              organisations internationales et les bailleurs de fonds.
            </span>
          </h1>
          <Image
            src={about}
            alt={"About"}
            className={"rounded-lg"}
          />
        </div>

        <div className={"px-20 mx-auto lg:max-w-screen-sm"}>
          <div className="grid grid-cols-2 marquee-10">
            <div className={"flex items-center justify-center"}>
              {PARTAINERS.map((partainer, index) => (
                <Image
                  src={partainer.src}
                  alt={partainer.nom}
                  className={"ml-2 w-48"}
                  key={index}
                />
              ))}
            </div>
          </div>
        </div>

      </div >
    </div >
  );
}
