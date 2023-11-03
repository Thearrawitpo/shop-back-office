"use client";
import React, { useEffect, useState } from "react";
import Modal from "../ui/modal";
import InputBox from "@/components/ui-components/input-box";
import { Button } from "../ui/button";
import useBannerModal from "@/hooks/use-banner-modal";
import { patchBannerById, postBanner } from "@/services/api/banner";
import UploadFile from "../ui-components/upload-file";
import SelectShop from "../ui-components/select-shop";

type Props = {};

export default function BannerModal({}: Props) {
  const { isOpen, onClose, data } = useBannerModal();
  const [name, setName] = useState<string>();
  const [image, setImage] = useState<File[]>([]);
  const [defaultImage, setDefaultImage] = useState<string>();
  const [shopId, setShopId] = useState<string>();

  useEffect(() => {
    if (!!data) {
      setName(data.name);
      setDefaultImage(data.image);
    }
  }, [data]);

  useEffect(() => {
    if (!isOpen) {
      setName(undefined);
      setImage([]);
      setDefaultImage(undefined);
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!!data && !!data.id) {
      const bodyFormData: any = new FormData();
      const body = {
        name: name,
        image: image[0],
        shopId: Number(shopId),
      };
      Object.entries(body).forEach(([key, value]) => {
        bodyFormData.append(key, value);
      });
      const res = await patchBannerById(data.id, bodyFormData);
      if (!!res) {
        onClose();
      }
    } else {
      if (!!name && !!image[0]) {
        const bodyFormData: any = new FormData();
        const body = {
          name: name,
          image: image[0],
          shopId: Number(shopId),
        };
        Object.entries(body).forEach(([key, value]) => {
          bodyFormData.append(key, value);
        });
        console.log(body);
        const res = await postBanner(bodyFormData);
        if (!!res) {
          onClose();
        }
      }
    }
  };

  return (
    <Modal
      title='Group management'
      description='You can edit any group here'
      isOpen={isOpen}
      onClose={onClose}
    >
      <div>
        {/* {!!user && ( */}
        <div className='flex flex-col gap-4'>
          <InputBox
            label='Name'
            setState={setName}
            value={name}
            placeholder='Name'
          />
          <UploadFile
            file={image}
            setFile={setImage}
            label='Upload banner'
            defaultFile={
              !!defaultImage
                ? `http://localhost:8000/images/${defaultImage}`
                : undefined
            }
          />
          <SelectShop value={shopId} setValue={setShopId} />
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
        {/* )} */}
      </div>
    </Modal>
  );
}
