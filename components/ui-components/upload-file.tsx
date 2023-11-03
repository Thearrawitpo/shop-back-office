import React from "react";
import { BiSolidImage } from "react-icons/bi";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";

type UploadFileProps = {
  file: File[];
  setFile:
    | React.Dispatch<React.SetStateAction<File[]>>
    | ((file: File[]) => void);
  label: string;
  defaultFile?: string;
  className?: string;
};

export default function UploadFile({
  file,
  setFile,
  label,
  defaultFile,
  className,
}: UploadFileProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFile = e.target.files[0];
      if (newFile?.size <= 2097152) {
        setFile([newFile]);
      } else {
        toast.error("Your file is larger than 2 MB. Please try again");
      }
    }
  };
  return (
    <div className='flex flex-col gap-2'>
      <div className='text-sm text-neutral-600'>{label}</div>
      <div
        className={cn(
          `border-2 border-dashed border-neutral-200 h-48 w-full rounded-lg`,
          className
        )}
      >
        <div className='text-neutral-400 text-center mt-16 flex flex-col items-center'>
          {!!file[0] || !!defaultFile ? (
            <>
              <div className='flex justify-center relative w-40 h-40 -mt-12'>
                <Image
                  src={
                    !!!file[0] && !!defaultFile
                      ? defaultFile
                      : URL.createObjectURL(file[0])
                  }
                  alt='uploaded image'
                  fill
                  className='object-cover '
                />
                {!!file[0] && (
                  <div
                    className='text-white absolute right-0 bg-red-600 rounded-full 
                translate-x-1 -translate-y-1 cursor-pointer z-10'
                    onClick={() => {
                      setFile([]);
                    }}
                  >
                    <IoMdClose />
                  </div>
                )}
              </div>
              <div className='relative w-full'>
                <Input
                  type='file'
                  className={cn(
                    `opacity-0 absolute h-48 -translate-y-[180px] cursor-pointer`,
                    className
                  )}
                  accept='.png,.jpg,.jpeg'
                  onChange={handleFileChange}
                />
              </div>
            </>
          ) : (
            <>
              <div className='flex justify-center text-neutral-300'>
                <BiSolidImage size={30} />
              </div>
              <label>Upload your picture</label>
              <div className='relative'>
                <Input
                  type='file'
                  className={cn(
                    `opacity-0 absolute h-48 -translate-y-[120px] cursor-pointer`,
                    className
                  )}
                  accept='.png,.jpg,.jpeg'
                  onChange={handleFileChange}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
