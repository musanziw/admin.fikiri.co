import { SolutionSubmitCard } from "@/app/(auth)/components/SolutionSubmitCard";
import { Input } from "@/app/(auth)/components/Input";
import { Button } from "@/app/(auth)/components/Button";

export default function SubmitProject() {
  return (
    <SolutionSubmitCard title={"Sumettez votre solution"}>
      <form action="" className="space-y-8 flex flex-col justify-center">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="basis-1/3">
            <Input
              label={"Nom"}
              name={"name"}
              type={"text"}
              placeholder={"Titre du projet"}
            />
          </div>

          <div className="basis-1/3">
            <Input
              label={"Image d'illustration du projet"}
              name={"resume"}
              type={"file"}
              placeholder={""}
            />
          </div>

          <div className="basis-1/3">
            <label htmlFor="">Selectionner la Thématique</label>
            <select
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
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-5">
          <div className="basis-1/2">
            <textarea
              name=""
              id=""
              className="focus:outline-none text-sm block w-full rounded-md h-32 border border-gray-200 px-4 py-3 transition duration-300 invalid:ring-3 placeholder:text-gray-600 ring-inset invalid:ring-red-400 focus:ring-2 focus:ring-indigo-500"
              placeholder={"Description du projet"}
            ></textarea>
          </div>

          <div className="basis-1/2">
            <textarea
              name=""
              id=""
              className="focus:outline-none text-sm block w-full rounded-md h-32 border border-gray-200 px-4 py-3 transition duration-300 invalid:ring-3 placeholder:text-gray-600 ring-inset invalid:ring-red-400 focus:ring-2 focus:ring-indigo-500"
              placeholder={"Votre Solution"}
            ></textarea>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-5" >
          <div className="basis-1/2 ">
            <textarea
              name=""
              id=""
              className="focus:outline-none text-sm block w-full rounded-md h-32 border border-gray-200 px-4 py-3 transition duration-300 invalid:ring-3 placeholder:text-gray-600 ring-inset invalid:ring-red-400 focus:ring-2 focus:ring-indigo-500"
              placeholder={"Etapes de votre Solution"}
            ></textarea>
          </div>

          <div className="basis-1/2">
            <textarea
              name=""
              id=""
              className="focus:outline-none text-sm block w-full rounded-md h-32 border border-gray-200 px-4 py-3 transition duration-300 invalid:ring-3 placeholder:text-gray-600 ring-inset invalid:ring-red-400 focus:ring-2 focus:ring-indigo-500"
              placeholder={"Impacte et fait marquant"}
            ></textarea>
          </div>
        </div>

        <div>
          <textarea
            name=""
            id=""
            className="focus:outline-none text-sm block w-full rounded-md h-32 border border-gray-200 px-4 py-3 transition duration-300 invalid:ring-3 placeholder:text-gray-600 ring-inset invalid:ring-red-400 focus:ring-2 focus:ring-indigo-500"
            placeholder={"Projet d'expansion"}
          ></textarea>
        </div>

        <div>
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
