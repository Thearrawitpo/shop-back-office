"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ShopType, getShop } from "@/services/api/shop";
// import { GenderType, getGenderList } from "@/services/api/master-data";
import { useEffect, useState } from "react";

type SelectGenderProps = {
  value?: string;
  setValue: (genderId: string) => void;
};

export default function SelectShop({ value, setValue }: SelectGenderProps) {
  const [itemList, setItemList] = useState<ShopType[]>();

  useEffect(() => {
    const fetchData = async () => {
      const itemList = await getShop();
      setItemList(itemList);
    };
    fetchData();
  }, []);

  return (
    <div className='flex flex-col gap-2 text-sm text-neutral-600 w-full'>
      <label>Shop</label>
      <Select onValueChange={(value) => setValue(value)} value={value}>
        <SelectTrigger className='w-full h-12'>
          <SelectValue placeholder='Shop' />
        </SelectTrigger>
        <SelectContent className='max-h-48 overflow-y-auto'>
          {itemList?.map((item) => (
            <SelectItem value={String(item.id)} key={item.id}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
