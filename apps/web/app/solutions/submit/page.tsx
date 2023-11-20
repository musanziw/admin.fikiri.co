import { AuthCard } from "@/app/(auth)/components/AuthCard";
import { Input } from "@/app/(auth)/components/Input";
import { Button } from "@/app/(auth)/components/Button";

export default function SubmitProject() {
  return (
    <AuthCard title={"Sumettez votre solution"}>
      <form action="" className="space-y-8 flex flex-col justify-center">
        <Input
          label={"Nom"}
          name={"name"}
          type={"text"}
          placeholder={"Titre du projet"}
        />
        <Input
          label={"Image d'illustration du projet"}
          name={"resume"}
          type={"file"}
          placeholder={""}
        />

        <textarea
          name=""
          id=""
          className="focus:outline-none text-sm block w-full rounded-md h-32 border border-gray-200 px-4 py-3 transition duration-300 invalid:ring-3 placeholder:text-gray-600 ring-inset invalid:ring-red-400 focus:ring-2 focus:ring-indigo-500"
          placeholder={"Description du projet"}
        ></textarea>

        <textarea
          name=""
          id=""
          className="focus:outline-none text-sm block w-full rounded-md h-32 border border-gray-200 px-4 py-3 transition duration-300 invalid:ring-3 placeholder:text-gray-600 ring-inset invalid:ring-red-400 focus:ring-2 focus:ring-indigo-500"
          placeholder={"Votre Solution"}
        ></textarea>
                <textarea
          name=""
          id=""
          className="focus:outline-none text-sm block w-full rounded-md h-32 border border-gray-200 px-4 py-3 transition duration-300 invalid:ring-3 placeholder:text-gray-600 ring-inset invalid:ring-red-400 focus:ring-2 focus:ring-indigo-500"
          placeholder={"Etapes de votre Solution"}
        ></textarea>

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
    </AuthCard>
  );
}
