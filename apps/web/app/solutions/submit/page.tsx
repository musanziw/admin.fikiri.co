"use client";

import { useRef, RefObject, useState, FormEvent, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Select from "react-select";
import axios from "@/app/config/axios";
import Topbar from "@/app/components/Topbar";
import { Footer } from "@/app/components/Footer";
import { Button } from "@/app/(auth)/components/Button";
import { useAuthContext } from "@/app/context/store";
import { AuthCard } from "@/app/(auth)/components/AuthCard";

const SOLUTION_URI = "/solutions";

interface optionProps {
  id: number,
  name: string
}

export default function SubmitProject() {
  const { isLogged, setIsLogged } = useAuthContext();
  const projectTitleRef: RefObject<HTMLInputElement> = useRef(null);
  const projectLienYoutubeRef: RefObject<HTMLInputElement> = useRef(null);
  const projectDescriptionRef: RefObject<HTMLTextAreaElement> = useRef(null);
  const projectSolutionRef: RefObject<HTMLTextAreaElement> = useRef(null);
  const projectEtapeRef: RefObject<HTMLTextAreaElement> = useRef(null);
  const projectImpactRef: RefObject<HTMLTextAreaElement> = useRef(null);
  const projectExpansionRef: RefObject<HTMLTextAreaElement> = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [calls, setCalls] = useState<any[]>();
  const [thematics, setThematics] = useState<any[]>()
  const [selectedCall, setSelectedCall] = useState<any>()
  const [selectedThematics, setSelectedThematics] = useState<number[]>()

  const router = useRouter();

  useEffect(() => {
    axios.get(`calls`).then(({ data: apiResponse }) => {
      const options = apiResponse.data
      setCalls(
        options.map((option: optionProps) => ({
          value: option.id,
          label: option.name,
        }))
      );
    }).catch(() => { })
  }, [router]);

  const handleCallChange = (option: any) => {
    setSelectedCall(option.value)
    axios.get(`calls/${option.value}`).then(({ data: apiResponse }) => {
      const { thematics: options } = apiResponse.data
      setThematics(
        options.map((option: optionProps) => ({
          value: option.id,
          label: option.name,
        }))
      );
    }).catch(() => { })
  };

  const handleThematicsChange = (options: any) => {
    setSelectedThematics(options.map((option: any) => option.value))
  }

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    try {
      setIsLoading(true);
      const payload = {
        name: projectTitleRef.current?.value || "", //
        videoLink: projectLienYoutubeRef.current?.value || "", //
        description: projectDescriptionRef.current?.value || "", //
        solvedProblem: projectSolutionRef.current?.value || "", //
        steps: projectEtapeRef.current?.value || "", //
        expansion: projectExpansionRef.current?.value || "", //
        callId: selectedCall,
        impact: projectImpactRef.current?.value || "",
        thematics: selectedThematics
      };
      await axios.post(SOLUTION_URI, JSON.stringify(payload));
      toast.success("Solution soumis avec succès !");
      setIsLoading(false);
      setTimeout(() => {
        router.push('/')
      }, 2000)
    } catch {
      toast.error("Échec survenue lors de la soumission de la solution");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Topbar background={"bg-white"} />
      <AuthCard title={"Soumettez votre solution"}>
        <form onSubmit={onSubmit} className="space-y-8 flex flex-col justify-center">
          <div className="flex flex-col gap-10">
            <div className="space-y-2">
              <label htmlFor="email" className="text-gray-800">
                Nom de la solution
              </label>
              <input
                ref={projectTitleRef}
                type="text"
                name="title"
                required
                placeholder="Titre du projet"
                className="focus:outline-none text-sm block w-full rounded-md border border-gray-200 px-4 py-3 transition duration-300 invalid:ring-3 placeholder:text-gray-600 ring-inset invalid:ring-red-400 focus:ring-2 focus:ring-indigo-500 lg:text-lg"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="illustration" className="text-gray-800">
                {"Lien youtube de la vidéo"}
              </label>
              <input
                ref={projectLienYoutubeRef}
                placeholder="Coller le lien de la vidéo"
                type="text"
                required
                name="illustration"
                className="focus:outline-none text-sm block w-full rounded-md border border-gray-200 px-4 py-3 transition duration-300 invalid:ring-3 placeholder:text-gray-600 ring-inset invalid:ring-red-400 focus:ring-2 focus:ring-indigo-500 lg:text-lg"
              />
            </div>
          </div>

          {
            isLogged && (
              <>
                <div className="flex flex-col gap-3">
                  <label htmlFor="">Selectionner l&lsquo;appel</label>
                  <Select
                    options={calls}
                    onChange={handleCallChange}
                    className="h-12 rounded w-full mt-2 basic-select"
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <label htmlFor="">Selectionner une thématique</label>
                  <Select
                    isMulti
                    isClearable
                    options={thematics}
                    onChange={handleThematicsChange}
                    className="h-12 rounded w-full mt-2 basic-multi-select"
                  />
                </div>
              </>
            )
          }



          <div className="flex flex-col gap-5">
            <textarea
              ref={projectDescriptionRef}
              name=""
              id=""
              required
              className="focus:outline-none text-sm block w-full rounded-md h-32 border border-gray-200 px-4 py-3 transition duration-300 invalid:ring-3 placeholder:text-gray-600 ring-inset invalid:ring-red-400 focus:ring-2 focus:ring-indigo-500 lg:text-lg"
              placeholder={"Description du projet"}
            ></textarea>
          </div>

          <div className="basis-1/2">
            <textarea
              ref={projectSolutionRef}
              name=""
              id=""
              required
              className=" lg:text-lg focus:outline-none text-sm block w-full rounded-md h-32 border border-gray-200 px-4 py-3 transition duration-300 invalid:ring-3 placeholder:text-gray-600 ring-inset invalid:ring-red-400 focus:ring-2 focus:ring-indigo-500"
              placeholder={"Votre Solution"}
            ></textarea>
          </div>

          <div className="flex flex-col gap-5">
            <div className="basis-1/2 ">
              <textarea
                ref={projectEtapeRef}
                name=""
                id=""
                required
                className="lg:text-lg focus:outline-none text-sm block w-full rounded-md h-32 border border-gray-200 px-4 py-3 transition duration-300 invalid:ring-3 placeholder:text-gray-600 ring-inset invalid:ring-red-400 focus:ring-2 focus:ring-indigo-500"
                placeholder={"Etapes de votre Solution"}
              ></textarea>
            </div>

            <textarea
              ref={projectImpactRef}
              name=""
              id=""
              required
              className="lg:text-lg focus:outline-none text-sm block w-full rounded-md h-32 border border-gray-200 px-4 py-3 transition duration-300 invalid:ring-3 placeholder:text-gray-600 ring-inset invalid:ring-red-400 focus:ring-2 focus:ring-indigo-500"
              placeholder={"Impacte et fait marquant"}
            ></textarea>
          </div>

          <textarea
            ref={projectExpansionRef}
            name=""
            id=""
            required
            className="lg:text-lg focus:outline-none text-sm block w-full rounded-md h-32 border border-gray-200 px-4 py-3 transition duration-300 invalid:ring-3 placeholder:text-gray-600 ring-inset invalid:ring-red-400 focus:ring-2 focus:ring-indigo-500"
            placeholder={"Projet d'expansion"}
          ></textarea>
          <Button isLoading={isLoading} label={isLoading ? "Soumission en cours..." : "Soumettre"} />
        </form>
      </AuthCard>
      <Footer />
      <ToastContainer />
    </>
  );
}
