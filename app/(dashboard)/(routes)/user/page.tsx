import ShopTable from "@/components/table/shop-table";

export default function UserPage() {
  return (
    <div className='flex flex-col gap-4'>
      <label className='font-semibold text-xl'>User management</label>
      <ShopTable />
    </div>
  );
}
