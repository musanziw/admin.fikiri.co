import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from '@/public/logo.png'

interface AuthCardProps {
    title: string
    children: ReactNode
}

export function AuthCard({ title, children }: AuthCardProps) {
    return (
        <div className="relative py-16 bg-gray-100">
            <div className="container relative m-auto px-6 md:px-12 xl:px-40">
                <div className="m-auto space-y-8 md:w-8/12 lg:w-6/12 xl:w-6/12 mt-10">
                    <div className="flex items-center justify-center w-full">
                        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                    </div>
                    <div
                        className="rounded-lg border border-gray-100 bg-white shadow-xl shadow-gray-600/30 backdrop-blur-2xl">
                        <div className="p-8 py-12 sm:p-16">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}