"use client";

import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import toast from "react-hot-toast";

export type UserType = {
  createdAt: string;
  email: string;
  id?: number;
  updatedAt: string;
};

type UserContextType = {
  user: UserType | undefined;
  accessToken: string | undefined;
  register: (username: string, password: string) => void;
  loginUser: (username: string, password: string) => void;
  logoutUser: () => void;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export interface Props {
  children: React.ReactNode;
}

const UserProvider = ({ children }: Props) => {
  const [accessToken, setAccessToken] = useState<string>();
  const [refreshToken, setRefreshToken] = useState<string>();
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    const getTokensContext = async () => {
      const getTokens = getCookie("jwt");
      const tokens = !!getTokens ? JSON.parse(getTokens) : null;
      if (!!tokens) {
        getUserInfo(tokens.accessToken);
        setAccessToken(tokens.accessToken);
        setRefreshToken(tokens.refreshToken);
      }
    };
    getTokensContext();
  }, []);

  const getUserInfo = async (token: string) => {
    try {
      const res = await axios({
        method: "get",
        url: "http://localhost:8000/api/v1/users/profile",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      if (res.status === 200) {
        const data = res.data;
        setUser(res.data);
      } else {
        setUser(undefined);
        deleteCookie("jwt");
      }
    } catch (err) {
      setUser(undefined);
      deleteCookie("jwt");
    }
  };

  const register = async (email: string, password: string) => {
    if (!!email && !!password) {
      const response = await axios({
        method: "post",
        url: "http://localhost:8000/api/v1/auth/register",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          email: email,
          password: password,
        },
      });
      if (response.status === 200) {
        const tokens = await response.data;
        setCookie("jwt", JSON.stringify(tokens));
        setAccessToken(tokens.accessToken);
        setRefreshToken(tokens.refreshToken);
        getUserInfo(tokens.accessToken);
      }
    }
  };

  const loginUser = async (email: string, password: string) => {
    if (!!email && !!password) {
      try {
        const response = await axios({
          method: "post",
          url: "http://localhost:8000/api/v1/auth/login",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            email: email,
            password: password,
          },
        });
        if (response.status === 200) {
          const tokens = await response.data;
          setCookie("jwt", JSON.stringify(tokens));
          setAccessToken(tokens.accessToken);
          setRefreshToken(tokens.refreshToken);
          getUserInfo(tokens.accessToken);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const logoutUser = async () => {
    deleteCookie("jwt");
    setUser(undefined);
    // router.refresh()
  };

  useEffect(() => {
    const updateToken = async () => {
      try {
        const response = await axios({
          method: "post",
          url: "http://localhost:8000/api/v1/auth/refreshToken",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            refresh: refreshToken,
          },
        });
        if (response.status === 200) {
          const tokens = await response.data;
          setCookie("jwt", JSON.stringify(tokens));
          setAccessToken(tokens.accessToken);
          setRefreshToken(tokens.refreshToken);
          getUserInfo(tokens.accessToken);
        }
      } catch (err) {
        console.log(err);
      }
    };

    const fourMinutes = 1000 * 60 * 4;

    const interval = setInterval(() => {
      updateToken();
    }, fourMinutes);
    return () => clearInterval(interval);
  }, [refreshToken]);

  const contextData: UserContextType = {
    user: user,
    accessToken: accessToken,
    register: register,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };
  return (
    <UserContext.Provider value={contextData}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
