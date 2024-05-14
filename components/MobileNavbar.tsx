"use client";

import React from "react";
import {
    Sheet, SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image";
import Link from "next/link";
import {sidebarLinks} from "@/constants";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";


const MobileNavbar: React.FC<MobileNavProps> = ({user}) => {
    const pathname = usePathname();

    return (<section className={'w-full max-w-[264px]'}>
        <Sheet>
            <SheetTrigger>
                <Image alt={'menu'} src={'/icons/hamburger.svg'} className={'cursor-pointer'} width={30} height={30}/>
            </SheetTrigger>
            <SheetContent side={'left'} className={'border-none bg-white'}>
                <Link className={'cursor-pointer flex items-center gap-1 px-4'} href="/">
                    <Image alt={'Baker\'s logo'} src={'/icons/logo.svg'} width={34} height={34}/>
                    <h1 className={'text-26 font-ibm-plex-serif font-bold text-black-1'}>{'Baker\'s Bank'}</h1>
                </Link>
                <div className={'mobilenav-sheet'}>
                    <SheetClose asChild>
                        <nav className={'flex h-full flex-col gap-6 pt-16 text-white'}>
                            {sidebarLinks.map((sidebarLink) => {
                                const isActive = pathname === sidebarLink.route || pathname.startsWith(`${sidebarLink.route}/`);
                                return (
                                    <SheetClose asChild key={sidebarLink.route}>
                                        <Link href={sidebarLink.route} key={sidebarLink.label}
                                              className={cn('mobilenav-sheet_close w-full', {
                                                  'bg-bank-gradient': isActive,
                                                  '': !isActive
                                              })}>
                                            <Image alt={sidebarLink.label} src={sidebarLink.imgURL} width={20}
                                                   height={20}
                                                   className={cn({'brightness-[3] invert-0': isActive})}/>
                                            <p className={cn('text-16 font-semibold text-black-2', {'text-white': isActive})}>{sidebarLink.label}</p>
                                        </Link>
                                    </SheetClose>
                                );
                            })}
                        </nav>
                    </SheetClose>
                </div>
            </SheetContent>
        </Sheet>

    </section>);
};

export default MobileNavbar;
