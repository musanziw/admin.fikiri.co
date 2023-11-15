'use client';
import {useState} from "react";

interface SolutionFilterProps {
    title: string
    options: string[]
}

export function SolutionFilter({title, options}: SolutionFilterProps) {
    const [showFilter, setShowFilter] = useState(false)
    const [selectedFilter, setSelectedFilter] = useState('')

    return (
        <div className="flex flex-col gap-5 mb-6">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setShowFilter(!showFilter)}>
                <p className={'font-medium'}>{selectedFilter || title}</p>
                <svg xmlns="http://www.w3.org/2000/svg"
                     className={`bi bi-chevron-right w-3 h-4 fill-black transition-transform duration-300 ${showFilter && 'rotate-90'}`}
                     viewBox="0 0 16 16">
                    <path fillRule="evenodd"
                          d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </div>
            {showFilter && (
                <div
                    className={`flex flex-col gap-4`}>
                    <p className={'font-medium border-b pb-2'} onClick={() => {
                        setSelectedFilter('')
                        setShowFilter(!showFilter)
                    }}>
                        Aucun filtre
                    </p>

                    {
                        options.map((option, index) => (
                            <p className="font-medium border-b pb-2" onClick={() => {
                                setSelectedFilter('')
                                setSelectedFilter(option)
                                setShowFilter(!showFilter)
                            }} key={index}>
                                {
                                    option
                                }
                            </p>
                        ))
                    }
                </div>
            )}
        </div>
    )
}