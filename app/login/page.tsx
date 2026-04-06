"use client";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  function submit() {
    router.push("/");
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
                type="email"
                className="border border-zinc-700 rounded-xl px-3 h-10 bg-transparent outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-sm">
                password
              </label>
              <input
                id="password"
                type="password"
                className="border border-zinc-700 rounded-xl px-3 h-10 bg-transparent outline-none"
              />
            </div>

            <button className="mt-4 border border-zinc-700 w-full rounded-xl text-white text-sm font-semibold px-3 h-10 cursor-pointer hover:brightness-90 transition">
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
