"use client";
import Sidebar from "@/components/sidebar/sidebar";
import { useUser } from "@/hooks/use-user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  const { user } = useUser();
  useEffect(() => {
    if (!!!user) {
      router.push("/login");
    } else {
      setIsMounted(true);
    }
  }, [user, router]);
  if (!isMounted || !!!user) {
    return <div></div>;
  }
  return (
    <div className='h-full'>
      <Sidebar>{children}</Sidebar>
    </div>
  );
}
