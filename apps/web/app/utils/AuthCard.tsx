import {ReactNode} from "react";
import BackArrow from "@/app/utils/BackArrow";

interface AuthCardProps {
    title: string
    children: ReactNode
}

export function AuthCard({title, children}: AuthCardProps) {
    return (
        <div className="relative py-16 bg-gray-100">
            <div className="container relative m-auto px-6 md:px-12 xl:px-40">
                <div className="m-auto space-y-8 md:w-8/12 lg:w-6/12 xl:w-6/12 mt-10">
                    <div
                        className="rounded-md border border-gray-100 bg-white shadow-sm shadow-gray-600/30 backdrop-blur-2xl">
                        <div className="p-8 py-12 sm:p-16">
                            <div className="flex items-start flex-col gap-3 mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                            </div>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}