import {SolutionCard} from "@/app/components/SolutionCard";

export function MappedSolutions() {
    const solutions = new Array(8).fill(0);

    return (
        <div className={'ml-4 px-4 py-20 text-gray-600 border-l border-dashed lg:mx-auto lg:max-w-screen-lg'}>
            <h3 className={'text-2xl font-bold mb-5'}>
                Les solutions innovantes de la communauté <span
                className={'text-indigo-700'}>({solutions.length})</span>
            </h3>
            <p className={'mb-10'}>
                Les solutions innovantes de la communauté sont des projets qui ont été mis en place par des
                organisations locales ou des individus pour résoudre les problèmes de la communauté.
            </p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <SolutionCard solutions={solutions}/>
            </div>
        </div>
    )
}