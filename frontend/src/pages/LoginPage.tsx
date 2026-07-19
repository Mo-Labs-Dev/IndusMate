function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <button
        className="rounded bg-emerald-500 px-6 py-3 text-white"
        onClick={() => (window.location.href = "/dashboard")}
      >
        Sign In
      </button>
    </div>
  );
}

export default LoginPage;