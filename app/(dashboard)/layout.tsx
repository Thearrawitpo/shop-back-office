import Sidebar from "@/components/sidebar/sidebar";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className='h-full'>
      <Sidebar>{children}</Sidebar>
    </div>
  );
}
