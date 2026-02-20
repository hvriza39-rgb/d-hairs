"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
    const router = useRouter();
    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const result = await signIn("credentials", {
            username: form.username,
            password: form.password,
            redirect: false,
        });

        setLoading(false);

        if (result?.error) {
            setError("Invalid username or password.");
        } else {
            router.push("/admin");
            router.refresh();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                {/* Card */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-pink-600 to-pink-500 px-8 py-8 text-center">
                        <div className="flex justify-center mb-3">
                            <Image
                                src="/hairstore-logo.png"
                                alt="D-Hairs"
                                width={140}
                                height={50}
                                className="object-contain brightness-0 invert"
                                priority
                            />
                        </div>
                        <p className="text-pink-100 text-sm mt-1">Admin Panel — Sign in to continue</p>
                    </div>

                    {/* Form */}
                    <div className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Username
                                </label>
                                <input
                                    id="username"
                                    type="text"
                                    required
                                    autoComplete="username"
                                    value={form.username}
                                    onChange={(e) => setForm((p) => ({ ...p, username: e.target.value }))}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm transition"
                                    placeholder="Enter your username"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    value={form.password}
                                    onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm transition"
                                    placeholder="Enter your password"
                                />
                            </div>

                            {error && (
                                <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-3 px-6 rounded-xl font-semibold text-white transition-all duration-200 ${loading
                                        ? "bg-pink-400 cursor-not-allowed"
                                        : "bg-pink-600 hover:bg-pink-700 hover:shadow-lg hover:shadow-pink-600/20 active:scale-[0.99]"
                                    }`}
                            >
                                {loading ? "Signing in..." : "Sign In"}
                            </button>
                        </form>
                    </div>
                </div>

                <p className="text-center text-xs text-gray-400 mt-6">
                    Only authorized personnel may access this area.
                </p>
            </div>
        </div>
    );
}
