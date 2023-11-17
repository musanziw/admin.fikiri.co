import Link from "next/link";

interface SolutionCardProps {
    solutions: any[]
}

export function SolutionCard({solutions}: SolutionCardProps) {
    return solutions.map((_solution, index) => {
        return (
            <div className={'relative flex flex-col overflow-hidden rounded-md border'} key={index}>
                <div className="p-8">
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
                    <Link href={`/solutions/projet-${index + 1}`}
                          className={'inline-block text-indigo-500 text-xs border-2 rounded-sm px-6 py-2.5 border-indigo-400 font-bold uppercase hover:bg-indigo-400 hover:text-gray-50 transition-colors duration-300'}>
                        plus de détails
                    </Link>
                </div>
            </div>
        )
    })
}