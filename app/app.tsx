"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { logout } from "./features/auth/authSlice";

export default function App() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-zinc-50 font-sans dark:bg-zinc-900">
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl">Welcome, {user?.name || "User"}!</h1>
        <button
          onClick={handleLogout}
          className="text-white text-sm font-semibold hover:underline cursor-pointer"
        >
          logout
        </button>
      </div>
    </div>
  );
}
