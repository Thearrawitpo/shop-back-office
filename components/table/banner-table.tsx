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
// import useAction from "@/hooks/use-action";
import { BannerType, deleteBannerById, getBanner } from "@/services/api/banner";
import Image from "next/image";
import useBannerModal from "@/hooks/use-banner-modal";

const columns: ColumnDef<BannerType>[] = [
  {
    id: "actions",
    header: () => {
      const modal = useBannerModal();
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
      const modal = useBannerModal();
      // const action = useAction();

      const handleDelete = async () => {
        if (!!rowData.id) {
          const res = await deleteBannerById(rowData.id);
          if (!!res) {
            //   action.toggleDelUser();
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
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const image = row.getValue("image");
      return (
        <div className=''>
          <Image
            src={`http://localhost:8000/images/${image}`}
            alt='banner'
            className='object-cover'
            width={50}
            height={25}
          />
        </div>
      );
    },
  },
];

type Props = {};

export default function BannerTable({}: Props) {
  const modal = useBannerModal();
  const [bannerList, setBannerList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const bannerList = await getBanner();
      setBannerList(bannerList);
    };
    fetchData();
  }, [modal.isOpen]);
  return (
    <div>
      <DataTable data={bannerList} columns={columns} />
    </div>
  );
}
