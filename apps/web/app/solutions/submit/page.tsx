"use client";

import {
  useRef,
  RefObject,
  useState,
  FormEvent,
  useEffect,
  useCallback,
  useMemo
} from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Select from "react-select";
import axios from "@/app/api/axios";
import Topbar from "@/app/components/Topbar";
import { Footer } from "@/app/components/Footer";

import { SolutionSubmitCard } from "@/app/(auth)/components/SolutionSubmitCard";
import { Button } from "@/app/(auth)/components/Button";

import { useDropzone } from "react-dropzone";

const SOLUTION_URI = "/solutions";


const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const focusedStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

function StyledDropzone(props) {
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({accept: {'image/*': []}});

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ]);

  return (
    <div className="container">
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <p>{"Faites glisser l'image ici ou cliquez pour sélectionner l'image."}</p>
      </div>
    </div>
  );
}


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

  const [options, setOptions] = useState();

  const [errors, setErrors] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [optionId, setOptionId] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchThematique = async () => {
      try {
        const response = await axios.get("/thematics", {
          withCredentials: true,
        });
        const data = response.data.data;

        setOptions(
          data.map((option) => ({
            value: option.id,
            label: option.name,
          }))
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchThematique();
  }, []);

  const addErrors = (newErrors: string) => {
    setErrors(newErrors);
  };

  const handleSelectChange = async (selectedOptions) => {
    setSelectedOptions(selectedOptions);
    setOptionId(selectedOptions.map((option) => option.value));
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
      const response = await axios.post(SOLUTION_URI, JSON.stringify(payload), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      toast.success("Solution soumis avec succès !");

      console.log(payload);
    } catch (e) {
      if (e.response) {
        addErrors(e.response.data.message || "An error occurred");
      } else if (e.request) {
        addErrors("No response received from the server");
      } else {
        addErrors("Error setting up the request");
      }
      toast.error("Échec survenue lors de la soumission de la solution");
    }finally {
      setIsLoading(false); 
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        console.log(binaryStr);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <>
      <Topbar />
      <SolutionSubmitCard title={"Soumettez votre solution"}>
        <form
          onSubmit={onSubmit}
          className="space-y-8 flex flex-col justify-center"
        >
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
            <div className="basis-1/2">
              <div className="space-y-2">
                <label htmlFor="email" className="text-gray-800">
                  {"Image d'illustration"}
                </label>
                {/* <input
                  ref={projectTitleRef}
                  type="text"
                  name="title"
                  placeholder="Titre du projet"
                  className="focus:outline-none text-sm block w-full rounded-md border border-gray-200 px-4 py-3 transition duration-300 invalid:ring-3 placeholder:text-gray-600 ring-inset invalid:ring-red-400 focus:ring-2 focus:ring-indigo-500 lg:text-lg"
                /> */}
                <StyledDropzone />
              </div>
            </div>

            <div className="basis-1/2">
              <label htmlFor="">Selectionner la Thématique</label>
              <Select
                isMulti
                options={options}
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
      <Footer />
      <ToastContainer />
    </>
  );
}
