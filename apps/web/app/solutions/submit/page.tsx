"use client";

import {
    useRef,
    RefObject,
    useState,
    FormEvent,
    useEffect,
} from "react";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Select from "react-select";
import axios from "@/app/api/axios";
import Topbar from "@/app/components/Topbar";
import {Footer} from "@/app/components/Footer";
import {SolutionSubmitCard} from "@/app/(auth)/components/SolutionSubmitCard";
import {Button} from "@/app/(auth)/components/Button";


const SOLUTION_URI = "/solutions";


export default function SubmitProject() {
    const projectTitleRef: RefObject<HTMLInputElement> = useRef(null);
    const projectLienYoutubeRef: RefObject<HTMLInputElement> = useRef(null);
    const projectDescriptionRef: RefObject<HTMLTextAreaElement> = useRef(null);
    const projectSolutionRef: RefObject<HTMLTextAreaElement> = useRef(null);
    const projectEtapeRef: RefObject<HTMLTextAreaElement> = useRef(null);
    const projectImpactRef: RefObject<HTMLTextAreaElement> = useRef(null);
    const projectExpansionRef: RefObject<HTMLTextAreaElement> = useRef(null);

    const [options, setOptions] = useState<any>();
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [optionId, setOptionId] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        try {
            axios.get("/thematics").then(response => {
                const data: any[] = response.data.data;
                setOptions(
                    data.map((option: any) => ({
                        value: option?.id,
                        label: option?.name,
                    }))
                )
            });
        } catch (error) {
            console.log(error);
        }
    }, []);


    const handleSelectChange = async (selectedOptions: any) => {
        setSelectedOptions(selectedOptions);
        setOptionId(selectedOptions.map((option: any) => option.value));
    };

    const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();

        try {
            setIsLoading(true);
            const payload = {
                name: projectTitleRef.current?.value || "",
                video_link: projectLienYoutubeRef.current?.value || "",
                solution_description: projectDescriptionRef.current?.value || "",
                solved_problem: projectSolutionRef.current?.value || "",
                steps: projectEtapeRef.current?.value || "",
                thematics: optionId,
                projectImpact: projectImpactRef.current?.value || "",
                projectExpansion: projectExpansionRef.current?.value || "",
            };
            await axios.post(SOLUTION_URI, JSON.stringify(payload), {
                headers: {"Content-Type": "application/json"},
                withCredentials: true,
            });

            toast.success("Solution soumis avec succès !");

            console.log(payload);
        } catch (e: any) {
            console.log(e)
            toast.error("Échec survenue lors de la soumission de la solution");
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <>
            <Topbar background={"bg-white"}/>
            {
                isLoading ? <div className={'flex flex-col items-center justofy-center h-screen'}>
                    <h2 className={'text-2xl font-semibold'}>Chargement...</h2>
                </div> : (
                    <SolutionSubmitCard title={"Soumettez votre solution"}>
                        <form onSubmit={onSubmit} className="space-y-8 flex flex-col justify-center">
                            <div className="flex flex-col lg:flex-row gap-10 lg:text-lg">
                                <div className="basis-1/2">
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

                                <div className="basis-1/2">
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
                            </div>

                            <div className="flex flex-col lg:flex-row gap-10 lg:text-lg">
                                <div className="basis-full">
                                    <label htmlFor="">Selectionner la Thématique</label>
                                    <Select
                                        isMulti
                                        id={`${optionId}`}
                                        options={options}
                                        value={selectedOptions}
                                        onChange={handleSelectChange}
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
                                    placeholder={"Projet d'expansion"}></textarea>
                            </div>
                            <Button label={"Soumettre"}/>
                        </form>
                    </SolutionSubmitCard>
                )
            }
            <Footer/>
            <ToastContainer/>
        </>
    );
}
