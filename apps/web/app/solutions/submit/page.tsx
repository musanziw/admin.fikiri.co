"use client";

import { useRef, RefObject, useState, FormEvent } from "react";
import Select from "react-select";

import { SolutionSubmitCard } from "@/app/(auth)/components/SolutionSubmitCard";
import { Button } from "@/app/(auth)/components/Button";

const options = [
    { value: 'mecanisationAgri', label: 'Mécanisation légère agricol' },
    { value: 'GestionCouvert', label: 'Gestion du couvert forestier ...' },
    { value: 'InclusionFinanci', label: 'Inclusion financière, numérique ..' }
  ]

export default function SubmitProject() {
  const projectTitleRef: RefObject<HTMLInputElement> = useRef(null);
  const projectLienYoutubeRef: RefObject<HTMLInputElement> = useRef(null);
  const projectThematiqueRef: RefObject<HTMLInputElement> = useRef(null);
  const projectDescriptionRef: RefObject<HTMLTextAreaElement> = useRef(null);
  const projectSolutionRef: RefObject<HTMLTextAreaElement> = useRef(null);
  const projectEtapeRef: RefObject<HTMLTextAreaElement> = useRef(null);
  const projectImpactRef: RefObject<HTMLTextAreaElement> = useRef(null);
  const projectExpansionRef: RefObject<HTMLTextAreaElement> = useRef(null);
  const projectObjectifAnswerRef: RefObject<HTMLInputElement> = useRef(null);

  const onSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const payload = {
      projectTitle: projectTitleRef.current?.value || "",
      projectLienYoutube: projectLienYoutubeRef.current?.value || "",
      projectDescription: projectDescriptionRef.current?.value || "",
      projectSolution: projectSolutionRef.current?.value || "",
      projectEtape: projectEtapeRef.current?.value || "",
      projectImpact: projectImpactRef.current?.value || "",
      projectExpansion: projectExpansionRef.current?.value || "",
    };

    console.log(payload); 
  };

  return (
    <SolutionSubmitCard title={"Sumettez votre solution"}>
      <form
        onSubmit={onSubmit}
        className="space-y-8 flex flex-col justify-center"
      >
        <div className="flex flex-col lg:flex-row gap-10 lg:text-lg">
          <div className="basis-1/3">
            <div className="space-y-2">
              <label htmlFor="email" className="text-gray-800">
                Titre du projet
              </label>
              <input
                ref={projectTitleRef}
                type="text"
                name="title"
                placeholder="Titre du projet"
                className="focus:outline-none text-sm block w-full rounded-md border border-gray-200 px-4 py-3 transition duration-300 invalid:ring-3 placeholder:text-gray-600 ring-inset invalid:ring-red-400 focus:ring-2 focus:ring-indigo-500 lg:text-lg"
              />
            </div>
          </div>

          <div className="basis-1/3">
            <div className="space-y-2">
              <label htmlFor="illustration" className="text-gray-800">
                {"Lien youtube de la vidéo"}
              </label>
              <input
                ref={projectLienYoutubeRef}
                placeholder="Coller le lien youtube de la vidéo decrivant le projet"
                type="text"
                name="illustration"
                className="focus:outline-none text-sm block w-full rounded-md border border-gray-200 px-4 py-3 transition duration-300 invalid:ring-3 placeholder:text-gray-600 ring-inset invalid:ring-red-400 focus:ring-2 focus:ring-indigo-500 lg:text-lg"
              />
            </div>
          </div>

          <div className="basis-1/3">
            <label htmlFor="">Selectionner la Thématique</label>
            {/* <select
              name=""
              id="thematique"
              className="h-12 rounded ps-5 w-full mt-2"
            >
              <option value="">Selectionner la Thématique</option>
              <option value="">Mécanisation légère agricol</option>
              <option value="">Gestion du couvert forestier ...</option>
              <option value="">Inclusion financière, numérique ..</option>
              <option value="">Amélioration de la mobilité urbaine</option>
              <option value="">
                {"Transparence et sécurité dans l'artisanat minier"}
              </option>
              <option value="">
                {"Transparence et sécurité dans l'artisanat minier"}
              </option>
            </select> */} 
            <Select isMulti options={options} className="h-12 rounded w-full mt-2 basic-multi-select"/>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-5">
          <div className="basis-1/2">
            <textarea
              ref={projectDescriptionRef}
              name=""
              id=""
              className="focus:outline-none text-sm block w-full rounded-md h-32 border border-gray-200 px-4 py-3 transition duration-300 invalid:ring-3 placeholder:text-gray-600 ring-inset invalid:ring-red-400 focus:ring-2 focus:ring-indigo-500 lg:text-lg"
              placeholder={"Description du projet"}
            ></textarea>
          </div>

          <div className="basis-1/2">
            <textarea
              ref={projectSolutionRef}
              name=""
              id=""
              className=" lg:text-lg focus:outline-none text-sm block w-full rounded-md h-32 border border-gray-200 px-4 py-3 transition duration-300 invalid:ring-3 placeholder:text-gray-600 ring-inset invalid:ring-red-400 focus:ring-2 focus:ring-indigo-500"
              placeholder={"Votre Solution"}
            ></textarea>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-5">
          <div className="basis-1/2 ">
            <textarea
              ref={projectEtapeRef}
              name=""
              id=""
              className="lg:text-lg focus:outline-none text-sm block w-full rounded-md h-32 border border-gray-200 px-4 py-3 transition duration-300 invalid:ring-3 placeholder:text-gray-600 ring-inset invalid:ring-red-400 focus:ring-2 focus:ring-indigo-500"
              placeholder={"Etapes de votre Solution"}
            ></textarea>
          </div>

          <div className="basis-1/2">
            <textarea
              ref={projectImpactRef}
              name=""
              id=""
              className="lg:text-lg focus:outline-none text-sm block w-full rounded-md h-32 border border-gray-200 px-4 py-3 transition duration-300 invalid:ring-3 placeholder:text-gray-600 ring-inset invalid:ring-red-400 focus:ring-2 focus:ring-indigo-500"
              placeholder={"Impacte et fait marquant"}
            ></textarea>
          </div>
        </div>

        <div>
          <textarea
            ref={projectExpansionRef}
            name=""
            id=""
            className="lg:text-lg focus:outline-none text-sm block w-full rounded-md h-32 border border-gray-200 px-4 py-3 transition duration-300 invalid:ring-3 placeholder:text-gray-600 ring-inset invalid:ring-red-400 focus:ring-2 focus:ring-indigo-500"
            placeholder={"Projet d'expansion"}
          ></textarea>
        </div>

        <div className="lg:text-lg">
          <p className={"mb-3"}>A quoi votre solution répont-elle ?</p>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <input type={"checkbox"} className={"p-3 w-5"}></input>
              <label htmlFor="email" className="text-gray-800">
                La nourriture
              </label>
            </div>
            <div className="flex items-center gap-3">
              <input type={"checkbox"} className={"p-3 w-5"}></input>
              <label htmlFor="email" className="text-gray-800">
                La santé
              </label>
            </div>
          </div>
        </div>

        <Button label={"Soumettre"} />
      </form>
    </SolutionSubmitCard>
  );
}
