'use client';
import {useState} from "react";
import Link from "next/link";
import logo from '@/public/logo.png'
import Image from "next/image";

interface TopbarProps {
    background?: string
}

export default function Topbar({background}: TopbarProps) {
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
            className={`fixed ${background} border-b border-dashed text-gray-800 w-screen top-0 px-10 py-4 z-10 flex items-center justify-between`}>
            <Link href={'/'}>
                <Image src={logo} alt={'Logo'} className={'cursor-pointer w-24'}/>
            </Link>

            <div className={`flex flex-col gap-2 lg:hidden ${isOpen && 'active'}`}
                 onClick={() => {
                     setIsOpen(!isOpen)
                 }}>
                <div className="h-[1px] w-6 bg-black transition-transform duration-300"></div>
                <div className="h-[1px] w-6 bg-black transition-transform duration-300"></div>
            </div>


            <div
                className={`absolute top-14 z-30 w-screen ${background} transition-transform shadow-xl duration-500 right-0 lg:hidden ${!isOpen && '-translate-y-[200%]'}`}>
                <div className={'text-lg p-10 flex flex-col gap-4 justify-start items-start'}>
                    {
                        LINKS.map((link, index) => (
                            <Link href={link.path}
                                  className={'hover:text-gray-950 font-medium transition-colors duration-300 capitalize'}
                                  key={index}>{link.name}</Link>
                        ))
                    }
                </div>
            </div>


            <div className={'hidden lg:flex items-center gap-6'}>
                {
                    LINKS.map((link, index) => (
                        <Link href={link.path}
                              className={'hover:text-gray-200 transition-colors duration-300 capitalize'}
                              key={index}>{link.name}</Link>
                    ))
                }
            </div>


        </div>
    )
}