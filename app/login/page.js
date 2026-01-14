"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiHide, BiShowAlt } from "react-icons/bi";

const LoginPage = () => {
  const { user, fetchUser } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  useEffect(() => {
    if(user?.role === "ADMIN"){
      router.replace("/admin/dashboard");
    } else if (user){
      router.replace("/");
    }
  }, [user, router])
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!formData.email || !formData.password){
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const res = await
     fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

     const data = await res.json();

     if(!res.ok){
      toast.error(data.error || "Login failed!");
      setLoading(false);
      return;
     }
     await fetchUser();
     toast.success("Login Success");  
    } catch (error) {
      toast.error(error.message);
      return;
    }finally {
      setLoading(false);
    }
  };
  if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-4 rounded-2xl bg-white/10 px-8 py-6 shadow-lg backdrop-blur">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/30 border-t-white" />
        <p className="text-white text-sm">
          Logging you in…
        </p>
      </div>
    </div>
  );
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
  <form
    onSubmit={handleSubmit}
    className="w-full max-w-sm bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-6 space-y-5"
  >
    <div className="text-center space-y-1">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        Welcome Back
      </h1>
      <p className="text-sm text-gray-500">
        Login to continue
      </p>
    </div>

    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">
        Email
      </label>
      <input
        name="email"
        type="email"
        placeholder="you@example.com"
        onChange={handleChange}
        disabled={loading}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
      />
    </div>

    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">
        Password
      </label>
      <div className="relative">
        <input
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          onChange={handleChange}
          disabled={loading}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 hover:text-black transition"
        >
          {showPassword ? <BiHide size={20}/> : <BiShowAlt size={20}/>}
        </button>
      </div>
    </div>

    <button
      type="submit"
      disabled={loading}
      className="w-full rounded-lg bg-black py-2.5 text-white font-medium hover:bg-gray-900 active:scale-[0.98] transition disabled:opacity-50"
    >
      {loading ? "Logging in..." : "Login"}
    </button>

    <p className="text-sm text-center text-gray-600">
      Don’t have an account?{" "}
      <span
        onClick={() => router.push("/signup")}
        className="text-black font-medium cursor-pointer hover:underline"
      >
        Sign up
      </span>
    </p>
    <p className="text-sm text-center text-gray-600">
      Forget Password?{" "}
      <span
        onClick={() => router.push("/forget-password")}
        className="text-black font-medium cursor-pointer hover:underline"
      >
        Click here
      </span>
    </p>
  </form>
</div>
  );
};

export default LoginPage;
