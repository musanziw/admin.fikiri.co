import Topbar from "@/app/components/Topbar";
import {Footer} from "@/app/components/Footer";
import projectImg from "@/public/project.webp";
import Image from "next/image";

export default function Solution({params}: { params: { name: string } }) {
    return (
        <>
            <div className={'relative'}>
                <Topbar background={'bg-white'}/>
                <div className="flex flex-col mx-6 justify-center max-w-screen-md md:mx-auto border-x border-dashed">
                    <div className="p-4 pt-28">
                        <p className="text-sm uppercase font-bold text-gray-800 mb-6">
                            Lubumbashi, Santé et bien-être
                        </p>
                        <h2 className={'text-gray-600 text-4xl font-semibold mb-6 capitalize'}>
                            {params.name}
                        </h2>
                        <p className={'font-medium mb-4'}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, voluptatum.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, voluptatum.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, voluptatum.
                        </p>
                    </div>

                    <Image src={projectImg} alt={'Img'} className={'mb-4'}/>

                    <p className={'p-4 font-medium pb-20'}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, voluptatum.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, voluptatum.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, voluptatum.
                    </p>

                </div>
                <Footer/>

            </div>
        </>
    )
}