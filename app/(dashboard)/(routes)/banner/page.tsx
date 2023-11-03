import BannerTable from "@/components/table/banner-table";

export default function BannerPage() {
  return (
    <div className='flex flex-col gap-4'>
      <label className='font-semibold text-xl'>Banner management</label>
      <BannerTable />
    </div>
  );
}
