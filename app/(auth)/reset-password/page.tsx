"use client";

import { useState, FormEvent } from "react";
// import { supabaseClient } from "@/lib/supabase/client";
import { supabaseClient } from "@lib/supabase/client";  // Adjust path accordingly

import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    const { error } = await supabaseClient.auth.updateUser({
      password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    setMessage("Password updated. Redirecting to login...");
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow w-full max-w-md space-y-4"
      >
        <h1 className="text-xl font-semibold text-center">
          Choose a new password
        </h1>

        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="New password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Confirm password"
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />

        {error && <p className="text-sm text-red-500">{error}</p>}
        {message && <p className="text-sm text-green-600">{message}</p>}

        <button className="w-full bg-black text-white py-2 rounded">
          Save new password
        </button>
      </form>
    </main>
  );
}
