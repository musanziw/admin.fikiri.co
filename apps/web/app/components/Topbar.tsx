'use client';
import {useState} from "react";
import Link from "next/link";


export default function Topbar() {
    const [isOpen, setIsOpen] = useState(false);

    function toggle() {
        setIsOpen(!isOpen);
    }

    return (
        <div
            className={'absolute w-screen top-0 p-8 z-10 flex items-center justify-between'}>
            <div>
                <h1 className={'text-white font-bold text-2xl'}>fikiri</h1>
            </div>

            <div className={`flex flex-col gap-2 lg:hidden ${isOpen && 'active'}`}
                 onClick={toggle}>
                <div className="h-[1px] w-6 bg-white transition-transform duration-300"></div>
                <div className="h-[1px] w-6 bg-white transition-transform duration-300"></div>
            </div>

            <div
                className={`absolute top-20 right-0 z-30 h-[88vh] w-3/4 bg-indigo-950 transition-transform duration-300 lg:hidden ${!isOpen && 'translate-x-full'}`}>
                <div className={'h-full text-lg p-10 flex flex-col gap-3 justify-center items-start'}>
                    <Link href={'/'}>Solutions</Link>
                    <Link href={''}>A propos</Link>
                    <Link href={'login'}>Se connecter</Link>
                    <Link href={''}>S'inscrire</Link>
                </div>
            </div>

            <div className={'hidden lg:flex items-center gap-6'}>
                <Link href={'/'}>Solutions</Link>
                <Link href={''}>A propos</Link>
                <Link href={'login'}>Se connecter</Link>
                <Link href={''}>S'inscrire</Link>
            </div>


        </div>
    )
}