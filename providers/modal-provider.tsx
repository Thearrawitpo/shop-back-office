"use client";
import BannerModal from "@/components/modal/banner-modal";
import ShopModal from "@/components/modal/shop-modal";
import React, { useEffect, useState } from "react";

export default function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <ShopModal />
      <BannerModal />
    </div>
  );
}
