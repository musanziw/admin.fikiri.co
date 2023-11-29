import Topbar from "@/app/components/Topbar";
import { Footer } from "@/app/components/Footer";
import axios from "@/app/config/axios";
import { VideoPlayer } from "../components/VideoPlayer";

export default async function Solution({ params }: { params: { id: string } }) {
    const solution = await axios.get(`solutions/${params.id}`).then(({ data: apiResponse }) => apiResponse.data)
    return (
        <>
            <div className={'relative'}>
                <Topbar background={'bg-white'} />
                <div className="flex flex-col mx-6 justify-center max-w-screen-md md:mx-auto border-x border-dashed">
                    <div className="p-4 pt-24">
                        <p className="text-sm uppercase font-bold text-gray-800 mb-6">
                            {solution.thematics.map((thematic: any) => thematic.name).join(', ')}
                        </p>
                        <h2 className={'text-gray-600 text-4xl font-semibold mb-6 uppercase'}>
                            {solution.name}
                        </h2>
                        <h2 className={'font-semibold text-xl mb-4'}>
                            Desciption de la solution
                        </h2>
                        <p className={'font-medium mb-4'}>
                            {solution.description}
                        </p>
                    </div>

                    <div className="p-4">
                        <h2 className={'font-semibold text-xl mb-4'}>
                            Vidéo de présentation
                        </h2>
                    </div>

                    <div className="relative h-[420px] w-full pb-9/16">
                        <VideoPlayer link={solution.videoLink} />
                    </div>

                    <div className="p-4">
                        <h2 className={'font-semibold text-xl mb-4'}>
                            Problème résolu
                        </h2>
                        <p className={'font-medium mb-8'}>
                            {solution.solvedProblem}
                        </p>
                        <h2 className={'font-semibold text-xl mb-4'}>
                            Project d&apos;expension
                        </h2>
                        <p className={'font-medium mb-8'}>
                            {solution.expansion}
                        </p>
                        <h2 className={'font-semibold text-xl mb-4'}>
                            Impactes de la solution
                        </h2>
                        <p className={'font-medium mb-8'}>
                            {solution.impact}
                        </p>
                        <h2 className={'font-semibold text-xl mb-4'}>
                            Etapes
                        </h2>
                        <p className={'font-medium mb-8'}>
                            {solution.steps}
                        </p>
                    </div>
                </div>
                <Footer />
            </div >
        </>
    )
}