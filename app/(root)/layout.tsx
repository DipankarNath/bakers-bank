import React from "react";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import MobileNavbar from "@/components/MobileNavbar";

const Home: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const loggedIn = {firstName: "Dipankar", lastName: "Nath"};

    return <main className={'flex h-screen w-full font-inter'}>
        <Sidebar user={loggedIn}/>
        <div className={'flex flex-col size-full'}>
            <div className={'root-layout'}>
                <Image alt={'logo'} src={'/icons/logo.svg'} width={30} height={30}/>
                <div>
                    <MobileNavbar user={loggedIn}/>
                </div>
            </div>
            {children}
        </div>
    </main>;
};

export default Home;
