import { request } from "@/services/request";

export interface ShopType {
  id?: number;
  name: string;
  lat: number;
  lng: number;
}

const subUrl = "/shop";

export const getShop = async () => {
  const url = subUrl;
  try {
    const data = await request({
      method: "get",
      url: url,
    });
    return data;
  } catch {
    return null;
  }
};

export const postShop = async (body: ShopType) => {
  const url = subUrl;
  console.log(body);
  try {
    const data = await request({
      method: "post",
      url: url,
      body: body,
    });
    return data;
  } catch {
    return null;
  }
};

export const deleteShopById = async (id: number) => {
  const url = `${subUrl}/${id}`;
  try {
    const data = await request({
      method: "delete",
      url: url,
    });
    return data;
  } catch {
    return null;
  }
};

export const getShopById = async (id: number) => {
  const url = `${subUrl}/${id}`;
  try {
    const data = await request({
      method: "get",
      url: url,
    });
    return data;
  } catch {
    return null;
  }
};

export const patchShopById = async (id: number, body: ShopType) => {
  const url = `${subUrl}/${id}`;
  try {
    const data = await request({
      method: "patch",
      url: url,
      body: JSON.stringify(body),
    });
    return data;
  } catch {
    return null;
  }
};
