export default function App() {
  return (
    <div className="flex items-center justify-center h-screen bg-zinc-50 font-sans dark:bg-zinc-900">
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl">Welcome, User!</h1>
        <button>
          <a
            href="/login"
            className=" text-white text-sm font-semibold hover:underline cursor-pointer"
          >
            logout
          </a>
        </button>
      </div>
    </div>
  );
}
