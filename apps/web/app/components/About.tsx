export function About() {
    return (
        <div className={'bg-indigo-950 p-8'}>
            <div className={'lg:mx-auto lg:max-w-screen-lg flex flex-col gap-4 lg:flex-row py-20'}>
                <h1 className={'text-white text-4xl font-bold mb-4 basis-10/12'}>
                    A propos de Fikiri
                </h1>
                <div className={'flex flex-col gap-5 lg:text-lg'}>
                    <p>
                        Fikiri est une plateforme web qui vise à cartographier les solutions locales en République
                        Démocratique du Congo pour accélérer l&apos;atteinte des Objectifs de Développement Durable (ODD).
                    </p>
                    <p>
                        L&apos;objectif de Fikiri est de mettre en lumière les solutions locales qui contribuent à l&apos;atteinte
                        des ODD en RDC. Cela permettra de faciliter la recherche des solutions locales par les
                        organisations internationales et les bailleurs de fonds.
                    </p>
                </div>
            </div>
        </div>
    )
}