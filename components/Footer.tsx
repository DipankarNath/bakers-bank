import React from "react";
import {cn} from "@/lib/utils";
import Image from "next/image";
import {logoutAccount} from "@/lib/actions/user.actions";
import {useRouter} from "next/navigation";

const Footer: React.FC<FooterProps> = ({user, type = 'desktop'}) => {

    const router = useRouter();
    const handleLogout = async () => {
        const logout = await logoutAccount();
        if (logout) router.push('/sign-in');
    };

    return (<div className={'footer'}>
        <div className={cn({'footer_name': type === 'desktop', 'footer_name-mobile': type === 'mobile'})}>
            <p className={'text-xl font-bold text-gray-700'}>{user.name}</p>
        </div>
        <div className={cn({'footer_email': type === 'desktop', 'footer_email-mobile': type === 'mobile'})}>
            <h1 className={'text-14 truncate front-semibold text-gray-700'}>{user?.name}</h1>
            <p className={'text-14 truncate front-normal text-gray-600'}>{user?.email}</p>
        </div>
        <div className={'footer_image'} onClick={handleLogout}>
            <Image alt={'logout'} src={'/icons/logout.svg'}/>
        </div>
    </div>);
};

export default Footer;
