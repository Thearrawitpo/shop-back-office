import ShopTable from "@/components/table/shop-table";

export default function ShopPage() {
  return (
    <div className='flex flex-col gap-4'>
      <label className='font-semibold text-xl'>Shop management</label>
      <ShopTable />
    </div>
  );
}
