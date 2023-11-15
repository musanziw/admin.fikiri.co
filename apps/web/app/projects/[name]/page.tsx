import Topbar from "@/app/components/Topbar";

export default function Page({params}: { params: { name: string } }) {
    return (
        <div className={`relative h-screen bg-[url('/project.webp')] bg-no-repeat bg-cover bg-center`}>
            <Topbar />
            <div className="absolute p-10 h-full flex flex-col justify-center w-full bg-indigo-950 bg-opacity-70">
                <h2 className={'text-white text-5xl font-semibold mb-8 uppercase'}>
                    {params.name}
                </h2>
                <p className={'text-gray-50 text-xl font-thin'}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, voluptatum.
                </p>
            </div>
        </div>
    )
}