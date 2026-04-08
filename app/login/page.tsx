"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  function validate() {
    const newErrors: typeof errors = {
      email: "",
      password: "",
    };

    if (!formData.email.includes("@")) {
      newErrors.email = "Invalid email";
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((e) => e === "");
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    router.push("/");
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-zinc-900">
      <div className="w-xs flex flex-col gap-4 border border-zinc-700 rounded-xl p-6 bg-white dark:bg-zinc-800">
        <div className="flex flex-col">
          <h1 className="text-2xl text-white font-semibold">welcome</h1>
          <p className="text-sm text-zinc-500">sign in to your account</p>
        </div>

        <div className="flex flex-col gap-6 w-full">
          <form onSubmit={submit} className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-sm">
                email
              </label>
              <input
                id="email"
                onChange={handleChange}
                type="email"
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

            <button
              type="submit"
              className="mt-4 border border-zinc-700 w-full rounded-xl text-white text-sm font-semibold px-3 h-10 cursor-pointer hover:brightness-90 transition"
            >
              sign in
            </button>
          </form>

          <hr className="border-zinc-700" />

          <div className="flex items-center justify-center gap-2">
            <p className="text-sm">no account?</p>
            <button>
              <a
                href="/register"
                className=" text-white text-sm font-semibold hover:underline cursor-pointer"
              >
                sign up
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
