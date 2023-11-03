"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { getShop } from "@/services/api/shop";
import { ColumnDef } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { BsFillCaretDownFill } from "react-icons/bs";
import { ShopType, deleteShopById } from "@/services/api/shop";
import useAction from "@/hooks/use-action";
import useShopModal from "@/hooks/use-shop-modal";

const columns: ColumnDef<ShopType>[] = [
  {
    id: "actions",
    header: () => {
      const modal = useShopModal();
      const handleCreate = async () => {
        modal.resetData();
        modal.onOpen();
      };
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='text-xs p-1'>
              <span className=''>Actions</span>
              <BsFillCaretDownFill size={10} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={handleCreate}>Create</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableHiding: false,
    cell: ({ row }) => {
      const rowData = row.original;
      const modal = useShopModal();
      const action = useAction();

      const handleDelete = async () => {
        if (!!rowData.id) {
          const res = await deleteShopById(rowData.id);
          if (!!res) {
            action.toggleDel();
          }
        }
      };
      const handleEdit = async () => {
        modal.setData(rowData);
        modal.onOpen();
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },

  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "lat",
    header: "Latitude",
  },
  {
    accessorKey: "lng",
    header: "Longitude",
  },
];

type Props = {};

export default function ShopTable({}: Props) {
  const modal = useShopModal();
  const [shopList, setShopList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const shopList = await getShop();
      setShopList(shopList);
    };
    fetchData();
  }, [modal.isOpen]);
  return (
    <div>
      <DataTable data={shopList} columns={columns} />
    </div>
  );
}
