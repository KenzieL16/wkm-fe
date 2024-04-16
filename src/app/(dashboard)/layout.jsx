"use client";
import { Suspense, useEffect, useState } from "react";
import SidebarDesktop from "../../components/organisms/sidebar/sidebar-desktop";
import Header from "../../components/organisms/header/header";
import { signIn, useSession } from "next-auth/react";
import {  useSelectedLayoutSegment } from "next/navigation";
import SidebarMobile from "@/components/organisms/sidebar/sidebar-mobile";



export default function RootLayout({ children }) {
  const [open, setOpen] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const { data: session, status } = useSession();
  const segment = useSelectedLayoutSegment()

  useEffect(() => {
    console.log("ini status ", status)
    if (status === "unauthenticated") {
      void signIn(segment?segment:"");
    }
  }, [status, segment]);

  return (
          <>
          <SidebarMobile sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <SidebarDesktop open={open} setOpen={setOpen}/>
            <Header setSidebarOpen={setOpen} />
            <div className={`lg:pl-72 ${!open? "-translate-x-[220px]" : ""} duration-700 ease-in-out`}>
              <main>
                <div className="px-4 mx-auto mb-6 max-w-7xl sm:px-6 md:px-8 lg:mt-6 md:mt-4 sm:mt-2">
                  <Suspense>
                    {children}
                  </Suspense>
                </div>
              </main>
          </div>
          </>
  );
}
