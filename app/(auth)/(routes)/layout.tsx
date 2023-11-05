"use client";
import { useUser } from "@/hooks/use-user";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  const { user } = useUser();
  useEffect(() => {
    if (!!user) {
      router.push("/");
    } else {
      setIsMounted(true);
    }
  }, [user, router]);
  if (!isMounted || !!user) {
    return <div></div>;
  }

  return (
    <div className='flex w-full h-full bg-neutral-200'>
      <div
        className='h-full w-96 flex justify-center pt-16 text-3xl font-semibold
      bg-white'
      >
        BackOffice
      </div>
      <div className='flex justify-center items-center w-[calc(100%-384px)] px-8'>
        {children}
      </div>
    </div>
  );
}
