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
        <div className="flex flex-col gap-3 rounded-md border mb-6 p-3">
            <div className="flex items-center justify-between" onClick={() => setShowFilter(!showFilter)}>
                <p className={'font-semibold'}>{selectedFilter || title}</p>
                <svg xmlns="http://www.w3.org/2000/svg"
                     className={`bi bi-chevron-right w-4 h-5 fill-black transition-transform duration-300 ${showFilter && 'rotate-90'}`}
                     viewBox="0 0 16 16">
                    <path fillRule="evenodd"
                          d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </div>
            {showFilter && (
                <div
                    className={`flex flex-col gap-4 bg-gray-50 p-4 border`}>
                    {
                        options.map((option, index) => (
                            <div key={index} className={'flex items-center gap-2'}>
                                <p className="" onClick={() => {
                                    setSelectedFilter(option)
                                    setShowFilter(!showFilter)
                                }}>
                                    {
                                        option
                                    }
                                </p>
                            </div>
                        ))
                    }
                </div>
            )}
        </div>
    )
}