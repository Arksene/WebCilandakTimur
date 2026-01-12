import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LogIn, Lock, User, Loader2, ShieldCheck } from "lucide-react";

const LoginPage = () => {
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const Base_URL = import.meta.env.VITE_API_URL;
    try {
      const response = await axios.post(`${Base_URL}/api/auth/login`, formData);
      const { token } = response.data;
      localStorage.setItem("token", token);
      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.message || "Username atau Password salah.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 font-sans relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-100/50 rounded-full blur-3xl" />

      <div className="w-full max-w-[440px] relative">
        <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 relative z-10">
          <div className="text-center mb-10">
            <div className="bg-slate-900 text-white p-4 rounded-3xl w-fit mx-auto mb-6 shadow-xl shadow-slate-200">
              <ShieldCheck size={32} strokeWidth={2.5} />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
              Selamat Datang
            </h1>
            <p className="text-slate-500 font-medium text-sm">
              Silakan masuk ke panel administrasi kelurahan
            </p>
          </div>

          {error && (
            <div className="bg-rose-50 text-rose-600 p-4 rounded-2xl text-xs font-bold mb-6 border border-rose-100 flex items-center gap-3 animate-shake">
              <div className="w-1.5 h-1.5 bg-rose-600 rounded-full animate-pulse" />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">
                Username
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <User size={20} />
                </div>
                <input
                  type="text"
                  name="identifier"
                  required
                  autoComplete="off"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:bg-white outline-none transition-all font-semibold text-slate-700 placeholder:text-slate-400 placeholder:font-medium"
                  placeholder="ID Pengguna"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">
                Kata Sandi
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <Lock size={20} />
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:bg-white outline-none transition-all font-semibold text-slate-700 placeholder:text-slate-400"
                  placeholder="••••••••"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-slate-900 text-white py-4 rounded-2xl hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 flex justify-center items-center gap-3 font-black uppercase tracking-widest text-xs active:scale-95 disabled:opacity-70 disabled:active:scale-100 disabled:cursor-not-allowed group"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    Masuk Sekarang
                    <LogIn
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-50 text-center">
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
              Sistem Informasi Kelurahan © 2024
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake { animation: shake 0.2s ease-in-out 0s 2; }
      `}</style>
    </div>
  );
};

export default LoginPage;
