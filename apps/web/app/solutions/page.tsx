"use client";

import { Footer } from "@/app/components/Footer";
import { MappedSolutions } from "@/app/components/Solutions";
import Topbar from "@/app/components/Topbar";
import { useAuthContext } from "../context/store";
import Login from "../(auth)/login/page";
import { useEffect } from "react";

export default function Solutions() {
const { account } = useAuthContext();

console.log(account);

  if (true) {
    return (
      <>
        <div className={"relative py-32 bg-indigo-800 text-gray-50"}>
          <Topbar background={"bg-white"} />
          <div className="mx-auto max-w-screen-sm">
            <h1 className={"font-semibold text-xl lg:text-4xl text-center"}>
              Le catalogue des solutions cartographiées
            </h1>
          </div>
        </div>
        <MappedSolutions />
        <Footer />
      </>
    );
  }

  if (false) {
    return <Login />;
  }
}
