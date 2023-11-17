import Image from "next/image";
import projectImg from "@/public/project.webp";
import Link from "next/link";

interface SolutionCardProps {
    solutions: any[]
}

export function SolutionCard({solutions}: SolutionCardProps) {
    return solutions.map((_solution, index) => {
        return (
            <div
                className={'flex flex-col overflow-hidden shadow-xl rounded-md after:block after:h-1 after:bg-indigo-300 hover:-translate-y-2 transition-transform duration-500'}
                key={index}>
                <div className="overflow-hidden h-[200px]">
                    <Image src={projectImg} alt={'Project img'}
                           className={'h-auto w-auto rounded-t-md'}/>
                </div>

                <div className="p-6">
                    <p className="text-xs uppercase font-bold text-indigo-400 mb-4">
                        Lubumbashi, Santé et bien-être
                    </p>

                    <h5 className={'font-bold text-sm uppercase mb-2'}>
                        Projet titre {index + 1}
                    </h5>

                    <p className={'text-sm mb-6'}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, voluptatum?
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, voluptatum?
                    </p>

                    <Link href={`projects/projet-${index + 1}`}
                          className={'inline-block text-indigo-500 text-xs border-2 rounded-sm px-6 py-2.5 border-indigo-400 font-bold uppercase hover:bg-indigo-400 hover:text-gray-50 transition-colors duration-300'}>
                        plus de détails
                    </Link>
                </div>
            </div>
        )
    })
}