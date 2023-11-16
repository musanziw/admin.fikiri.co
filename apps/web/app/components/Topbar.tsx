'use client';
import {useState} from "react";
import Link from "next/link";


export default function Topbar() {
    const [isOpen, setIsOpen] = useState(false);

    const LINKS = [
        {
            name: 'Accueil',
            path: '/',
        }, {
            name: 'solutions',
            path: ''
        },
        {
            name: 'A propos',
            path: ''
        },
        {
            name: 'Se connecter',
            path: '/login'
        },
        {
            name: 'S\'inscrire',
            path: '/register'
        }
    ]

    return (
        <div
            className={'fixed bg-white shadow-xl text-gray-800 w-screen top-0 px-10 py-4 z-10 flex items-center justify-between'}>
            <div>
                <h1 className={'text-black font-bold text-2xl'}>fikiri</h1>
            </div>

            <div className={`flex flex-col gap-2 lg:hidden ${isOpen && 'active'}`}
                 onClick={() => setIsOpen(!isOpen)}>
                <div className="h-[1px] w-6 bg-black transition-transform duration-300"></div>
                <div className="h-[1px] w-6 bg-black transition-transform duration-300"></div>
            </div>

            <div
                className={`absolute top-14 z-30 w-3/4 bg-white transition-transform duration-300 right-0 lg:hidden ${!isOpen && 'translate-x-full'}`}>
                <div className={'text-lg p-10 flex flex-col gap-4 justify-center items-start'}>
                    {
                        LINKS.map((link, index) => (
                            <Link href={link.path} className={'hover:text-gray-950 font-medium transition-colors duration-300 capitalize'}
                                  key={index}>{link.name}</Link>
                        ))
                    }
                </div>
            </div>

            <div className={'hidden lg:flex items-center gap-6'}>
                {
                    LINKS.map((link, index) => (
                        <Link href={link.path} className={'hover:text-gray-200 transition-colors duration-300 capitalize'}
                              key={index}>{link.name}</Link>
                    ))
                }
            </div>


        </div>
    )
}