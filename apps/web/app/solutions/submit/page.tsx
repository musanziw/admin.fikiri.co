"use client";

import { useRef, RefObject, useState, FormEvent, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Select from "react-select";
import axios from "@/app/config/axios";
import Topbar from "@/app/components/Topbar";
import { Footer } from "@/app/components/Footer";
import { SolutionSubmitCard } from "@/app/(auth)/components/SolutionSubmitCard";
import { Button } from "@/app/(auth)/components/Button";
import { useAuthContext } from "@/app/context/store";

const SOLUTION_URI = "/solutions";

export default function SubmitProject() {
  const { account } = useAuthContext();
  const projectTitleRef: RefObject<HTMLInputElement> = useRef(null);
  const projectLienYoutubeRef: RefObject<HTMLInputElement> = useRef(null);
  const projectThematiqueRef: RefObject<HTMLInputElement> = useRef(null);
  const projectDescriptionRef: RefObject<HTMLTextAreaElement> = useRef(null);
  const projectSolutionRef: RefObject<HTMLTextAreaElement> = useRef(null);
  const projectEtapeRef: RefObject<HTMLTextAreaElement> = useRef(null);
  const projectImpactRef: RefObject<HTMLTextAreaElement> = useRef(null);
  const projectExpansionRef: RefObject<HTMLTextAreaElement> = useRef(null);
  const projectObjectifAnswerRef: RefObject<HTMLInputElement> = useRef(null);
  const [optionId, setOptionId] = useState([]);
  const [selectedthematics, setSelectedthematics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [calls, setCalls] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {

        const callsResponse = await axios.get("/calls");
        const calls = callsResponse.data.data;

        if (calls) {
          setCalls(
            calls.map((option: any) => ({
              value: option.id,
              label: option.name,
            }))
          );
        }
      } catch (error) { }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!account) {
      router.push("/login");
    }
  }, [account, router]);

  const handleThematicsChange = async (thematics: any) => {
    setSelectedthematics(thematics);
    setOptionId(thematics.map((option: any) => option.value));
  };


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
        thematics: optionId,
        expansion: projectExpansionRef.current?.value || "", //
        callId: 1,
      };
      await axios.post(SOLUTION_URI, JSON.stringify(payload));
      toast.success("Solution soumis avec succès !");
      setIsLoading(false);
    } catch (e: any) {
      console.log(e);
      toast.error("Échec survenue lors de la soumission de la solution");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Topbar background={"bg-white"} />
      <SolutionSubmitCard title={"Soumettez votre solution"}>
        <form onSubmit={onSubmit} className="space-y-8 flex flex-col justify-center">
          <div className="flex flex-col lg:flex-row gap-10 lg:text-lg">
            <div className="basis-1/2">
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
            </div>

            <div className="basis-1/2">
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
          </div>

          <div className="flex flex-col lg:flex-row gap-10 lg:text-lg">
            <div className="basis-full">
              <label htmlFor="">Selectionner l&lsquo;appel</label>
              <Select
                options={calls}
                onChange={handleThematicsChange}
                className="h-12 rounded w-full mt-2 basic-multi-select"
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-10 lg:text-lg">
            <div className="basis-full">
              <label htmlFor="">Selectionner une thématique</label>
              <Select
                options={calls}
                onChange={handleThematicsChange}
                className="h-12 rounded w-full mt-2 basic-multi-select"
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-5">
            <div className="basis-1/2">
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
          </div>

          <div className="flex flex-col lg:flex-row gap-5">
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

            <div className="basis-1/2">
              <textarea
                ref={projectImpactRef}
                name=""
                id=""
                required
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
              required
              className="lg:text-lg focus:outline-none text-sm block w-full rounded-md h-32 border border-gray-200 px-4 py-3 transition duration-300 invalid:ring-3 placeholder:text-gray-600 ring-inset invalid:ring-red-400 focus:ring-2 focus:ring-indigo-500"
              placeholder={"Projet d'expansion"}
            ></textarea>
          </div>
          <Button isLoading={isLoading} label={isLoading ? "Soumission en cours..." : "Soumettre"} />
        </form>
      </SolutionSubmitCard>
      <Footer />
      <ToastContainer />
    </>
  );
}
