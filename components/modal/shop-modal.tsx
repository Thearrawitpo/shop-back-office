"use client";
import React, { useEffect, useState } from "react";
import Modal from "../ui/modal";
import InputBox from "@/components/ui-components/input-box";
import { Button } from "../ui/button";
import { patchShopById, postShop } from "@/services/api/shop";
import useShopModal from "@/hooks/use-shop-modal";

type Props = {};

export default function ShopModal({}: Props) {
  const { isOpen, onClose, data } = useShopModal();
  const [name, setName] = useState<string>();
  const [lat, setLat] = useState<number>();
  const [lng, setLng] = useState<number>();

  useEffect(() => {
    if (!!data) {
      setName(data.name);
      setLat(data.lat);
      setLng(data.lng);
    }
  }, [data]);

  useEffect(() => {
    if (!isOpen) {
      setName(undefined);
      setLat(undefined);
      setLng(undefined);
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!!data && !!data.id) {
      const res = await patchShopById(data.id, {
        name: name || "",
        lat: Number(lat) || NaN,
        lng: Number(lng) || NaN,
      });
      if (!!res) {
        onClose();
      }
    } else {
      if (!!name && !!lat && !!lng) {
        const res = await postShop({
          name: name,
          lat: Number(lat),
          lng: Number(lng),
        });
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
          <InputBox label='Name' setState={setName} value={name} />
          <InputBox
            label='Latitude'
            type='number'
            setState={setLat}
            value={lat}
          />
          <InputBox
            label='Longitude'
            type='number'
            setState={setLng}
            value={lng}
          />
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
        {/* )} */}
      </div>
    </Modal>
  );
}
