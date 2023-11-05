"use client";
import { Button } from "@/components/ui/button";
import InputBox from "@/components/ui-components/input-box";
import React, { useEffect, useState } from "react";
import { useUser } from "@/hooks/use-user";

type Props = {};

export default function LoginPage({}: Props) {
  const { loginUser, register } = useUser();
  const [isLoginVariant, setIsLoginVariant] = useState(true);
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState();

  return (
    <div className='flex flex-col items-center w-[500px] gap-4 bg-white rounded-lg p-8'>
      <label>
        {isLoginVariant ? "Sign in your account" : "Create your account"}
      </label>
      <InputBox label='Email' setState={setEmail} type='email' />
      <InputBox label='Password' setState={setPassword} type='password' />
      <Button
        className='bg-black text-white w-full'
        onClick={() => {
          if (!!email && !!password) {
            if (isLoginVariant) {
              loginUser(email, password);
            } else {
              register(email, password);
            }
          }
        }}
      >
        {isLoginVariant ? "Login" : "Sign up"}
      </Button>
      <p className='text-sm'>
        {isLoginVariant ? "First time using App?" : "Already have an account?"}
        <span
          onClick={() => setIsLoginVariant(!isLoginVariant)}
          className='ml-1 cursor-pointer text-neutral-500 hover:underline'
        >
          {isLoginVariant ? "Create an account" : "Login"}
        </span>
      </p>
    </div>
  );
}
