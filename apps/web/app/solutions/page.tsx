import { Footer } from "@/app/components/Footer";
import { MappedSolutions } from "@/app/components/Solutions";
import Topbar from "@/app/components/Topbar";
export default function Solutions() {
  return (
    <>
      <Topbar background={"bg-white"} />
      <div className="relative h-[60vh] bg-banner bg-cover bg-center bg-no-repeat">
        <div className="absolute top-0 bottom-0 h-full w-full flex flex-col items-center justify-center bg-gradient-to-b from-indigo-600/90 to-indigo-600/70">
          <h2 className={'p-8 font-bold text-3xl text-center text-white uppercase leading-10 lg:w-1/2'}>
            Solutions innovantes locales cartographiées
          </h2>
        </div>
      </div>
      <MappedSolutions />
      <Footer />
    </>
  );
}
