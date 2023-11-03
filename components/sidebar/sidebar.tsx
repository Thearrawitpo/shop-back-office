"use client";
import React from "react";
import UserMenu from "./user-menu";
import { useRouter } from "next/navigation";

type SidebarProps = { children: React.ReactNode };

export default function Sidebar({ children }: SidebarProps) {
  const router = useRouter();
  return (
    <div className='flex h-full'>
      <div
        className='flex flex-col gap-y-4 bg-black h-full w-64
      text-white px-4'
      >
        <div className='h-20 flex items-center justify-start'>
          <div className='text-3xl font-bold text-neutral-400'>LOGO</div>
        </div>
        <div className='flex flex-col justify-start gap-y-4'>
          <label className='text-neutral-400/80 text-xs'>Menu</label>
          {/* <label
            onClick={() => router.push("/user")}
            className='cursor-pointer'
          >
            User management
          </label> */}
          <label
            onClick={() => router.push("/banner")}
            className='cursor-pointer'
          >
            Banner management
          </label>
          <label
            onClick={() => router.push("/shop")}
            className='cursor-pointer'
          >
            Shop management
          </label>
        </div>
      </div>
      <div className='flex flex-col w-[calc(100%-256px)]'>
        <div className='bg-white h-20 shadow-md w-full px-8'>
          <div className='flex justify-end items-center h-full'>
            <UserMenu />
          </div>
        </div>
        <main className='h-full flex-1 overflow-y-auto p-4'>{children}</main>
      </div>
    </div>
  );
}
