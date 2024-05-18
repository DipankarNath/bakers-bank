import React from "react";
import Image from "next/image";

const Home: React.FC<{ children: React.ReactNode }> = ({children}) => {
    return (
        <main className={'flex min-h-screen w-full justify-between font-inter'}>
            {children}
            <div className={'auth-asset'}>
                <div>
                    <Image alt={'auth image'} src={'/icons/auth-image.svg'} width={500} height={500}/>
                </div>
            </div>
        </main>
    );
};

export default Home;
