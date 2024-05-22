"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {sidebarLinks} from "@/constants";
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";
import Footer from "@/components/Footer";
import PlaidLink from "./PlaidLink";

const Sidebar: React.FC<SiderbarProps> = ({user}) => {

    const pathname = usePathname();

    return (<section className={"sidebar"}>
        <nav className={'flex flex-col gap-4'}>
            <Link className={'mb-12 cursor-pointer flex items-center gap-2'} href="/">
                <Image alt={'horizone logo'} src={'/icons/logo.svg'} width={34} height={34}
                       className={'size-[24px] max-xl:size-14'}/>
                <h1 className={'sidebar-logo'}>{'Baker\'s Bank'}</h1>
            </Link>
            {sidebarLinks.map((sidebarLink) => {
                const isActive = pathname === sidebarLink.route || pathname.startsWith(`${sidebarLink.route}/`);
                return (
                    <Link href={sidebarLink.route} key={sidebarLink.label}
                          className={cn('sidebar-link', {'bg-bank-gradient': isActive, '': !isActive})}>
                        <div className={'relative size-6'}>
                            <Image alt={sidebarLink.label} src={sidebarLink.imgURL} fill
                                   className={cn({'brightness-[3] invert-0': isActive})}/>
                        </div>
                        <p className={cn('sidebar-label', {'!text-white': isActive})}>{sidebarLink.label}</p>
                    </Link>
                );
            })}
            <PlaidLink user={user}/>
        </nav>
        <Footer user={user} type={'mobile'}/>
    </section>);
};

export default Sidebar;
