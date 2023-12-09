'use client'

import {useRouter} from "next/navigation";

interface ArrowProps {
    width: string,
    height: string,
    color: string
}

export default function BackArrow({width, height, color}: ArrowProps) {
    const router = useRouter()
    return (
        <div className={'flex items-center gap-4 cursor-pointer mb-5'} onClick={() => router.back()}>
            <svg xmlns="http://www.w3.org/2000/svg" className={`bi bi-arrow-left  fill-${color} w-${width} h-${height}`}
                 viewBox="0 0 16 16" >
                <path fillRule="evenodd"
                      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
            </svg>
           <p className={'font-semibold'}>
               Retour en arrière
           </p>
        </div>
    )
}