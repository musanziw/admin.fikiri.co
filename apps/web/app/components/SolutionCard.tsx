import Image from "next/image";
import projectImg from "@/public/project.webp";

interface SolutionCardProps {
    solutions: any[]
}

export function SolutionCard({solutions}: SolutionCardProps) {
    return solutions.map((_solution, index) => {
        return (
            <div className={'flex flex-col'} key={index}>
                <Image src={projectImg} alt={'Project img'}
                       className={'h-auto w-auto rounded-xl object-fill'}/>
                <div className="p-4">
                    <h5 className={'font-bold text-lg mb-2'}>
                        Projet titre {index + 1}
                    </h5>
                    <p className={'text-sm mb-3'}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, voluptatum?
                    </p>
                    <ul className="flex flex-wrap">
                        <li className="mr-1.5">
                            <div
                                className="flex items-center rounded-full bg-indigo-500/25 px-3 py-1 text-xs font-medium leading-5 text-indigo-900">Lubumbashi
                            </div>
                        </li>
                        <li className="mr-1.5">
                            <div
                                className="flex items-center rounded-full bg-indigo-500/25 px-3 py-1 text-xs font-medium leading-5 text-indigo-900">Sanitation
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        )
    })
}