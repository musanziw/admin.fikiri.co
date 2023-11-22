import {ReactNode} from "react";
import Link from "next/link";
import Image from "next/image";
import logo from '@/public/logo.png'

interface SolutionSubmitCardProps {
    title: string
    children: ReactNode
}

export function SolutionSubmitCard({title, children}: SolutionSubmitCardProps) {
    return (
        <div className="relative py-16 bg-gray-100">
            <div className="container relative m-auto  px-6 md:px-12 xl:px-40">
                <div className="m-auto space-y-8 pt-12">
                    <div className="flex items-center justify-center w-full">
                        <Link href={'/'}>
                            <Image src={logo} alt="logo" className={'w-36'}/>
                        </Link>
                    </div>
                    <div
                        className="rounded-lg border border-gray-100 bg-white shadow-xl shadow-gray-600/30 backdrop-blur-2xl">
                        <div className="p-8 py-12 sm:p-16  flex flex-col">
                            <h2 className="mb-8 text-2xl font-bold text-gray-900 lg:text-3xl lg:mb-10">{title}</h2>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}