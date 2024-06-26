import React from "react";
import AuthForm from "@/components/AuthForm";

const SignUp: React.FC<{ children: React.ReactNode }> = ({children}) => {
    return (<section className={'flex flex-center size-full max-sm:px-6'}>
        <AuthForm type={'sign-up'}/>
    </section>);
};

export default SignUp;
