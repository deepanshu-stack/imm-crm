"use client";

import { useState, FormEvent } from "react";
// import { supabaseClient } from "@/lib/supabase/client";
import { supabaseClient } from "@lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/reset-password",
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setMessage("If that email exists, we've sent a reset link.");
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow w-full max-w-md space-y-4"
      >
        <h1 className="text-xl font-semibold text-center">Reset password</h1>
        <p className="text-xs text-gray-500 text-center">
          Enter your email and we&apos;ll send you a reset link.
        </p>

        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {error && <p className="text-sm text-red-500">{error}</p>}
        {message && <p className="text-sm text-green-600">{message}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded"
        >
          {loading ? "Sending..." : "Send reset link"}
        </button>
      </form>
    </main>
  );
}
