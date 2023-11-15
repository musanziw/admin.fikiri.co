import {ReactNode} from "react";
import Link from "next/link";
import Image from "next/image";

interface AuthCardProps {
    title: string
    children: ReactNode
}

export function AuthCard({title, children}: AuthCardProps) {
    return (
        <div className="relative py-16 bg-gray-100">
            <div className="container relative m-auto px-6 md:px-12 xl:px-40">
                <div className="m-auto space-y-8 md:w-8/12 lg:w-6/12 xl:w-6/12">
                    <Link href={'/'}>
                        <div className="flex items-center justify-center">
                            <Image src="/logo.png" loading="lazy" width={200} height={200} className="w-24" alt="Img"/>
                        </div>
                    </Link>
                    <div
                        className="rounded-md border border-gray-100 bg-white shadow-2xl shadow-gray-600/30 backdrop-blur-2xl">
                        <div className="p-8 py-12 sm:p-16">
                            <h2 className="mb-8 text-2xl font-bold text-gray-900">{title}</h2>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}