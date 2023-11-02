import { request } from "@/services/request";

export interface GroupType {
  id?: number;
  name: string;
  permissions: number[];
}

const subUrl = "/banner";

export const getGroup = async () => {
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

export const postGroup = async (body: GroupType) => {
  const url = subUrl;
  try {
    const data = await request({
      method: "post",
      url: url,
      body: JSON.stringify(body),
    });
    return data;
  } catch {
    return null;
  }
};

export const deleteGroupById = async (id: number) => {
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

export const getGroupById = async (id: number) => {
  const url = `${subUrl}/update-user/${id}`;
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

export const patchGroupById = async (id: number, body: GroupType) => {
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
