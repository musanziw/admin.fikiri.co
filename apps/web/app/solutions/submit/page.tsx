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
import { useAuthContext } from "@/app/context/authContext";
import { AuthCard } from "@/app/(auth)/components/AuthCard";

const SOLUTION_URI = "/solutions";

interface optionProps {
  id: number,
  name: string
}

export default function SubmitProject() {
  const { isLogged, token } = useAuthContext();
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
  const [selectedThematic, setSelectedThematic] = useState<string>('')
  const [maturities, setMaturities] = useState<any[]>()
  const [selectedMaturity, setSelectedMaturity] = useState<string>('')
  const [challenges, setChallenges] = useState<any[]>()
  const [selectedChallenges, setSelectedChallenges] = useState<any>()
  const { account } = useAuthContext()
  const router = useRouter();

  useEffect(() => {
    if (token) {
      axios.get(`calls`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(({ data: apiResponse }) => {
        const options = apiResponse.data
        setCalls(
          options.map((option: optionProps) => ({
            value: option.id,
            label: option.name,
          }))
        );
      }).catch(() => { })


      axios.get(`maturities`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(({ data: apiResponse }) => {
        const options = apiResponse.data
        setMaturities(
          options.map((option: optionProps) => ({
            value: option.id,
            label: option.name,
          }))
        );
      }).catch(() => { })

    }
  }, [router, token]);

  const handleCallChange = (option: any) => {
    setSelectedCall(option.value)
    axios.get(`calls/${option.value}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(({ data: apiResponse }) => {
      const { thematics: options } = apiResponse.data


      setThematics(
        options.map((option: optionProps) => ({
          value: option.id,
          label: option.name,
        }))
      );
    }).catch(() => { })


  };

  const handleThematicsChange = (option: any) => {
    setSelectedThematic(option.value)
    axios.get(`thematics/${option.value}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(({ data: apiResponse }) => {
      console.log(apiResponse.data)
      const { challenges: options } = apiResponse.data
      setChallenges(
        options.map((option: optionProps) => ({
          value: option.id,
          label: option.name,
        }))
      );
    }).catch(() => { })
  }

  function handleChallenge(options: any) {
    setSelectedChallenges(
      options.map((option: any) => option.value)
    )
  }

  function handleMaturity(option: any) {
    setSelectedMaturity(option.value)
  }

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    try {
      setIsLoading(true);
      const payload = {
        name: projectTitleRef.current?.value || "", //
        videoLink: projectLienYoutubeRef.current?.value || "", //
        description: projectDescriptionRef.current?.value || "", //
        targetedProblem: projectSolutionRef.current?.value || "", //
        call: selectedCall,
        thematic: selectedThematic,
        maturity: selectedMaturity,
        user: account?.email,
        challenges: selectedChallenges
      };
      console.log(payload)
      await axios.post(SOLUTION_URI, JSON.stringify(payload), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
                Le titre de la solution
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
                {"Lien youtube de la vidéo (optionnel)"}
              </label>
              <input
                ref={projectLienYoutubeRef}
                placeholder="Coller le lien de la vidéo"
                type="text"
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
                  <label htmlFor="">Choisir une thématique</label>
                  <Select
                    options={thematics}
                    onChange={handleThematicsChange}
                    className="h-12 rounded w-full mt-2 basic-multi-select"
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <label htmlFor="">A quoi votre solution répond elle ?</label>
                  <Select
                    isMulti
                    options={challenges}
                    onChange={handleChallenge}
                    className="h-12 rounded w-full mt-2 basic-multi-select"
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <label htmlFor="">L&apos;étape de votre solution</label>
                  <Select
                    options={maturities}
                    onChange={handleMaturity}
                    className="h-12 rounded w-full mt-2 basic-multi-select"
                  />
                </div>
              </>
            )
          }




          <div className="flex flex-col gap-5">
            <label htmlFor="illustration" className="text-gray-800">
              La description de la solution
            </label>
            <textarea
              ref={projectDescriptionRef}
              name=""
              id=""
              required
              className="focus:outline-none text-sm block w-full rounded-md h-[180px] border border-gray-200 px-4 py-3 transition duration-300 invalid:ring-3 placeholder:text-gray-600 ring-inset invalid:ring-red-400 focus:ring-2 focus:ring-indigo-500 lg:text-lg"
              placeholder={"Decrire la solution ici..."}
            ></textarea>
          </div>

          <div className="basis-1/2">

            <label htmlFor="illustration" className="text-gray-800 inline-block mb-4">
              Problème ciblé
            </label>

            <textarea
              ref={projectSolutionRef}
              name=""
              id=""
              required
              className=" lg:text-lg focus:outline-none text-sm block w-full rounded-md h-[180px] border border-gray-200 px-4 py-3 transition duration-300 invalid:ring-3 placeholder:text-gray-600 ring-inset invalid:ring-red-400 focus:ring-2 focus:ring-indigo-500"
              placeholder={"Decrire le problème ici..."}
            ></textarea>
          </div>


          <Button isLoading={isLoading} label={isLoading ? "Soumission en cours..." : "Soumettre"} />
        </form>
      </AuthCard>
      <Footer />
      <ToastContainer />
    </>
  );
}
