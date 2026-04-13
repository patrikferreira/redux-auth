"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { register, User } from "../features/auth/authSlice";

export default function Register() {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function validate() {
    const newErrors: typeof errors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.includes("@")) {
      newErrors.email = "Invalid email";
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm your password";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((e) => e === "");
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    setTimeout(() => {
      const newUser = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };

      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

      const userExists = existingUsers.some(
        (user: User) => user.email === newUser.email
      );

      if (userExists) {
        setErrors((prev) => ({
          ...prev,
          email: "User already exists",
        }));
        setIsLoading(false);
        return;
      }

      const updatedUsers = [...existingUsers, newUser];

      localStorage.setItem("users", JSON.stringify(updatedUsers));

      dispatch(register(newUser));

      setIsLoading(false);
      router.push("/login");
    }, 1000);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-zinc-900">
      <div className="w-xs flex flex-col gap-4 border border-zinc-700 rounded-xl p-6 bg-white dark:bg-zinc-800">
        <div className="flex flex-col">
          <h1 className="text-2xl text-white font-semibold">create account</h1>
          <p className="text-sm text-zinc-500">create your account</p>
        </div>

        <div className="flex flex-col gap-6 w-full">
          <form onSubmit={submit} className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="text-sm">
                full name
              </label>
              <input
                id="name"
                onChange={handleChange}
                type="text"
                className="border border-zinc-700 rounded-xl px-3 h-10 bg-transparent outline-none"
              />
              {errors.name && (
                <span className="text-red-500 text-xs">{errors.name}</span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-sm">
                email
              </label>
              <input
                id="email"
                type="email"
                onChange={handleChange}
                className="border border-zinc-700 rounded-xl px-3 h-10 bg-transparent outline-none"
              />
              {errors.email && (
                <span className="text-red-500 text-xs">{errors.email}</span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-sm">
                password
              </label>
              <input
                id="password"
                onChange={handleChange}
                type="password"
                className="border border-zinc-700 rounded-xl px-3 h-10 bg-transparent outline-none"
              />
              {errors.password && (
                <span className="text-red-500 text-xs">{errors.password}</span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="confirmPassword" className="text-sm">
                confirm password
              </label>
              <input
                id="confirmPassword"
                onChange={handleChange}
                type="password"
                className="border border-zinc-700 rounded-xl px-3 h-10 bg-transparent outline-none"
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-xs">
                  {errors.confirmPassword}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`mt-4 border border-zinc-700 w-full rounded-xl text-white text-sm font-semibold px-3 h-10  hover:brightness-90 transition ${
                isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {isLoading ? "creating..." : "sign up"}
            </button>
            {error && (
              <span className="text-red-500 text-sm text-center">{error}</span>
            )}
          </form>

          <hr className="border-zinc-700" />

          <div className="flex items-center justify-center gap-2">
            <p className="text-sm">have an account?</p>
            <button>
              <a
                href="/login"
                className=" text-white text-sm font-semibold hover:underline cursor-pointer"
              >
                sign in
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
