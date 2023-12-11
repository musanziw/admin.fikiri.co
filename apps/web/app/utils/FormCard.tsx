'use client';

import { ReactNode } from 'react';

interface AuthCardProps {
  title: string;
  errors?: string;
  children: ReactNode;
  containsErrors?: boolean;
  onClearErrors?: () => void;
}

export function FormCard({ title, children, errors, containsErrors = false, onClearErrors }: AuthCardProps) {

  return (
    <div className="relative py-16 bg-gray-100">
      <div className="container relative m-auto px-6 md:px-12 xl:px-40">
        <div className="m-auto space-y-8 md:w-8/12 lg:w-6/12 xl:w-6/12 mt-14 relative">
          <div className="flex items-center flex-col mb-6">
            <h2 className="text-2xl font-extrabold">{title}</h2>
          </div>

          <div
            className={`absolute w-full h-14 top-4 mb-4 justify-between items-center p-4 border-b-4 border-b-red-500 bg-white rounded-t-md shadow-sm ${containsErrors ? 'flex opacity-1' : 'opacity-0'}`}>
            <svg xmlns="http://www.w3.org/2000/svg"
                 className="bi bi-exclamation-triangle-fill h-5 w-5 fill-red-600" viewBox="0 0 16 16">
              <path
                d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
            </svg>
            <h3 className="text-base">{errors}</h3>
            <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-x h-5 w-5 fill-gray-600 cursor-pointer"
                 viewBox="0 0 16 16" onClick={onClearErrors}>
              <path
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
            </svg>
          </div>

          <div
            className={`rounded-md border border-gray-100 bg-white shadow-sm shadow-gray-600/30 backdrop-blur-2xl transition-transform duration-300 ${containsErrors && 'translate-y-14'}`}>
            <div className="p-8 py-12 sm:p-16">
              <form action="" className="space-y-8 flex flex-col justify-center">
                {children}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}