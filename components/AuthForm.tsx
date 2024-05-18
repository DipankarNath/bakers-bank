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
import {useRouter} from "next/navigation";
import {signIn, signUp} from "@/lib/actions/user.actions";


const AuthForm: React.FC<{ type: string }> = ({type}) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useRouter();
    const formSchema = authFormSchema(type);
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        setIsLoading(true);
//        console.log(values)

        try {
            if (type === 'sign-up') {
                const newUser = await signUp(values);
                setUser(newUser);
            }
            if (type === 'sign-in') {
                const user = await signIn({
                    email: values.email,
                    password: values.password,
                });
                console.log('user', user);
                if (user) {
                    navigation.push('/');
                }
            }

        } catch (e) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }

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
                        {type === 'sign-up' && (
                            <>
                                <div className={'flex gap-4'}>
                                    <CustomInput name={'firstName'} label={'First Name'}
                                                 placeholder={'Enter your first name'}
                                                 control={form.control}
                                                 type={'text'}/>

                                    <CustomInput name={'lastName'} label={'Last Name'}
                                                 placeholder={'Enter your last name'}
                                                 control={form.control}
                                                 type={'text'}/>
                                </div>
                                <CustomInput name={'address1'} label={'Address'} placeholder={'Enter your address'}
                                             control={form.control}
                                             type={'text'}/>
                                <CustomInput name={'city'} label={'City'} placeholder={'Enter your city name'}
                                             control={form.control}
                                             type={'text'}/>
                                <div className={'flex gap-4'}>
                                    <CustomInput name={'State'} label={'State'} placeholder={'Ex: CA'}
                                                 control={form.control}
                                                 type={'text'}/>
                                    <CustomInput name={'postalCode'} label={'Postal Code'} placeholder={'Ex: 1234'}
                                                 control={form.control}
                                                 type={'text'}/>
                                </div>
                                <div className={'flex gap-4'}>
                                    <CustomInput name={'dob'} label={'Date of Birth'} placeholder={'yyyy-mm-dd'}
                                                 control={form.control}
                                                 type={'text'}/>
                                    <CustomInput name={'ssn'} label={'SSN'} placeholder={'Ex: 1234'}
                                                 control={form.control}
                                                 type={'text'}/>
                                </div>
                            </>
                        )}
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
