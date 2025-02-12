"use client";

import React from "react";
import AuthForm from "@/components/AuthForm";

const SignIn: React.FC<{ children: React.ReactNode }> = () => {

  return (
    <section className={"flex flex-center size-full max-sm:px-6"}>
      <AuthForm type={"sign-in"} />
    </section>
  );
};

export default SignIn;
