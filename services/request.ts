import toast from "react-hot-toast";
import axios from "axios";

interface RequestType {
  method: string;
  url: string;
  body?: string | FormData;
  contentType?: string;
  isToast?: boolean;
}

export const request = async ({
  method,
  url,
  body,
  contentType = "application/json",
  isToast = true,
}: RequestType) => {
  const tokens = { accessToken: "" };

  const path = "http://localhost:8000/api/v1";

  const handleGetDelete = async () => {
    if (!!tokens) {
      const res = await axios({
        method: method,
        url: `${path}${url}`,
        headers: {
          "Content-Type": contentType,
          Authorization: "Bearer " + String(tokens.accessToken),
        },
      });
      if (res.status === 200 || res.status === 204) {
        return res.data;
      } else {
        toast.error("Failed to fetch");
        return null;
      }
    } else {
      const res = await axios({
        method: method,
        url: `${path}${url}`,
        headers: {
          "Content-Type": contentType,
        },
      });
      if (res.status === 200 || res.status === 204) {
        return res.data;
      } else {
        toast.error("Failed to fetch");
        return null;
      }
    }
  };

  const handlePostPatch = async () => {
    if (!!tokens) {
      const res = await axios({
        method: method,
        url: `${path}${url}`,
        headers: {
          "Content-Type": contentType,
          Authorization: "Bearer " + String(tokens.accessToken),
        },
        data: body,
      });
      if (res.status === 200 || res.status === 201) {
        {
          isToast && toast.success("Success");
        }
        return res.data || null;
      } else {
        toast.error("Failed to Create of Update");
      }
    } else {
      const res = await axios({
        method: method,
        url: `${path}${url}`,
        headers: {
          "Content-Type": contentType,
        },
        data: body,
      });
      if (res.status === 200 || res.status === 201) {
        toast.success("Success");
        return res.data || null;
      } else {
        toast.error("Failed to Create of Update");
      }
    }
  };

  switch (method) {
    case "get": {
      const data = await handleGetDelete();
      return data;
    }
    case "delete": {
      const data = await handleGetDelete();
      return data;
    }
    case "post": {
      const data = await handlePostPatch();
      return data;
    }
    case "patch": {
      const data = await handlePostPatch();
      return data;
    }
  }

  return null;
};
