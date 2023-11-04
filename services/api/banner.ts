import { request } from "@/services/request";

export interface BannerType {
  id?: number;
  name: string;
  image: string;
  shopId: number;
}

const subUrl = "/banner";

export const getBanner = async () => {
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

export const postBanner = async (body: FormData) => {
  const url = subUrl;
  try {
    const data = await request({
      method: "post",
      url: url,
      body: body,
      contentType: "multipart/form-data",
    });
    return data;
  } catch {
    return null;
  }
};

export const deleteBannerById = async (id: number) => {
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

export const getBannerById = async (id: number) => {
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

export const patchBannerById = async (id: number, body: FormData) => {
  const url = `${subUrl}/${id}`;
  try {
    const data = await request({
      method: "patch",
      url: url,
      body: body,
      contentType: "multipart/form-data",
    });
    return data;
  } catch {
    return null;
  }
};
