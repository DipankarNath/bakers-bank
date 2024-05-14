"use client"

import React, {useState} from "react";
import Link from "next/link";
import Image from "next/image";

import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import CustomInput from "@/components/CustomInput";
import {authFormSchema} from "@/lib/utils";
import {Loader2} from "lucide-react";


const AuthForm: React.FC<{ type: string }> = ({type}) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // 1. Define your form.
    const form = useForm<z.infer<typeof authFormSchema>>({
        resolver: zodResolver(authFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof authFormSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        setIsLoading(true);
        console.log(values)
        setIsLoading(false);

    }

    return (
        <section className={'auth-form'}>
            <header className={'flex flex-col gap-5 md:gap-8'}>
                <Link className={'cursor-pointer flex items-center gap-1'} href="/">
                    <Image alt={'Baker\'s logo'} src={'/icons/logo.svg'} width={34} height={34}/>
                    <h1 className={'text-26 font-ibm-plex-serif font-bold text-black-1'}>{'Baker\'s Bank'}</h1>
                </Link>
                <div className={'flex flex-col md:gap-3'}>
                    <h1 className={'text-24 lg:text-36 font-semibold text-grey-900'}>
                        {user ? 'Link Acount' : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
                        <p className={'text-16 font-normal text-gray-600'}>
                            {user ? 'Link your account to get started' : 'Please enter your details'}
                        </p>
                    </h1>
                </div>
            </header>
            {user ? (
                <div className={'flex flex-col gap-4'}>Plaid Link</div>
            ) : <>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <CustomInput name={'email'} label={'Email'} placeholder={'Enter your email'}
                                     control={form.control}
                                     type={'email'}/>
                        <CustomInput name={'password'} label={'Password'} placeholder={'Enter your password'}
                                     control={form.control}
                                     type={'password'}/>
                        <div className={'flex flex-col gap-4'}>
                            <Button className={'form-btn'} type="submit" disabled={isLoading}>
                                {isLoading ? (<>
                                    <Loader2 size={20} className={'animate-spin mr-1'}/>
                                    Loading...
                                </>) : (type === 'sign-in') ? 'Sign In' : 'Sign Up'}
                            </Button>
                        </div>
                    </form>
                </Form>
                <footer className={'flex justify-center gap-1'}>
                    <p className={'text-14 font-normal text-gray-600'}>{
                        type === 'sign-in' ? 'Don\'t have an account?' : 'Already have an account?'
                    }</p>
                    <Link href={type === 'sign-up' ? '/sign-in' : '/sign-up'} className={'form-link'}>
                        {type === 'sign-up' ? 'Sign In' : 'Sign Up'}
                    </Link>
                </footer>
            </>}
        </section>
    );
};

export default AuthForm;
