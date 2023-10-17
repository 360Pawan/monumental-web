"use client";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

import Loader from "@/components/Loader";
import { EyeClose, EyeOpen } from "@/components/Icons";
import ErrorExpiredLink from "@/components/Error-expired-link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABSE_PROJECT_URL || "",
  process.env.NEXT_PUBLIC_SUPABSE_ANON_KEY || ""
);

export default function ResetPasswordPage() {
  const router = useRouter();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));

      if (hashParams.size === 0) {
        setError("Link expired");
        setLoading(false);
        return;
      }

      const error = hashParams.get("error") || "";

      if (error) {
        setError(hashParams.get("error_description") || "");
        setLoading(false);
        return;
      }

      setAccessToken(hashParams.get("access_token") || "");
      setRefreshToken(hashParams.get("refresh_token") || "");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const getSessionWithTokens = async () => {
      if (accessToken && refreshToken) {
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (error) {
          alert(`Error signing in: ${error.message}`);
        }
      }
    };

    if (accessToken && refreshToken) {
      getSessionWithTokens();
    }
  }, [accessToken, refreshToken]);

  const handlePasswordUpdate = async (newPassword: string) => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        setButtonLoading(false);
        toast.error(error.message);
        return;
      }

      if (data) {
        setButtonLoading(false);
        setPassword("");
        toast.success("Password has been updated successfully!");
        router.push("/password-success");
      }
    } catch (error: any) {
      setButtonLoading(false);
      toast.error(error.message);
    }
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    setButtonLoading(true);
    handlePasswordUpdate(password);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <ErrorExpiredLink error={error} />;
  }

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <h1 className="text-2xl text-slate-800 font-bold mb-6">
        Reset your Password ✨
      </h1>
      <form onSubmit={handleSubmit}>
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Password
        </label>
        <div className="relative">
          <input
            type={isVisible ? "text" : "password"}
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Password"
            minLength={6}
            maxLength={20}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {isVisible ? (
            <button
              className="absolute top-3 right-3"
              type="button"
              onClick={() => setIsVisible(!isVisible)}
            >
              <EyeOpen />
            </button>
          ) : (
            <button
              className="absolute top-3 right-3"
              type="button"
              onClick={() => setIsVisible(!isVisible)}
            >
              <EyeClose />
            </button>
          )}
        </div>
        {buttonLoading ? (
          <div className="mt-3">
            <Loader />
          </div>
        ) : (
          <button
            type="submit"
            className="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Update Password
          </button>
        )}
      </form>
    </div>
  );
}
