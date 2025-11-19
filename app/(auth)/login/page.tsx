// "use client";

// import { useState, FormEvent } from "react";
// import { supabaseClient } from "@lib/supabase/client";
// import { useRouter } from "next/navigation";

// export default function LoginPage() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState<string | null>(null);

//   async function handleLogin(e: FormEvent) {
//     e.preventDefault();
//     setError(null);

//     const { data, error } = await supabaseClient.auth.signInWithPassword({
//       email,
//       password,
//     });

//     if (error) {
//       setError(error.message);
//       return;
//     }

//     // Check the user's role
//     const { data: profile, error: profileError } = await supabaseClient
//       .from("profiles")
//       .select("role")
//       .eq("id", data.user.id)
//       .single();

//     if (profileError || !profile) {
//       setError("Profile not found.");
//       return;
//     }

//     if (profile.role === "client") {
//       router.push("/tickets");
//     } else {
//       router.push("/dashboard");
//     }
//   }

//   return (
//     <main className="min-h-screen flex items-center justify-center">
//       <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow w-full max-w-md space-y-4">
//         <h1 className="text-xl font-semibold text-center">Login</h1>
//         <input
//           className="w-full border px-3 py-2 rounded"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           type="email"
//           required
//         />
//         <input
//           className="w-full border px-3 py-2 rounded"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           type="password"
//           required
//         />
//         <p className="text-right text-xs text-gray-500">
//           <a href="/forgot-password" className="hover:underline">Forgot your password?</a>
//         </p>
//         {error && <p className="text-sm text-red-500">{error}</p>}
//         <button className="w-full bg-black text-white py-2 rounded">
//           Login
//         </button>
//       </form>
//     </main>
//   );
// }



"use client";

import { useState, FormEvent } from "react";
import { supabaseClient } from "@lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Invalid login credentials.");
      return;
    }

    // Check if the user has a profile
    const { data: profile, error: profileError } = await supabaseClient
      .from("profiles")
      .select("role, full_name")
      .eq("id", data.user.id)
      .single();

    if (profileError || !profile) {
      setError("Profile not found.");
      return;
    }

    // Profile exists, proceed with redirection
    if (profile.role === "client") {
      router.push("/tickets");  // Redirect to the tickets page for clients
    } else {
      router.push("/dashboard");  // Redirect to the dashboard for admin/staff
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow w-full max-w-md space-y-4">
        <h1 className="text-xl font-semibold text-center">Login</h1>
        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
        />
        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
        />
        <p className="text-right text-xs text-gray-500">
          <a href="/forgot-password" className="hover:underline">Forgot your password?</a>
        </p>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button className="w-full bg-black text-white py-2 rounded">
          Login
        </button>
      </form>
    </main>
  );
}



// WORKING CODE 100% ---- - ------------------------------- -- - -

// "use client";

// import { useState, FormEvent } from "react";
// // import { supabaseClient } from "@/lib/supabase/client";
// import { supabaseClient } from "@lib/supabase/client";  // Adjust path accordingly

// import { useRouter } from "next/navigation";

// export default function LoginPage() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState<string | null>(null);

//   async function handleLogin(e: FormEvent) {
//     e.preventDefault();
//     setError(null);

//     const { error } = await supabaseClient.auth.signInWithPassword({
//       email,
//       password,
//     });

//     if (error) {
//       setError(error.message);
//       return;
//     }

//     router.push("/dashboard");
//   }

//   return (
//     <main className="min-h-screen flex items-center justify-center">
//       <form
//         onSubmit={handleLogin}
//         className="bg-white p-6 rounded-lg shadow w-full max-w-md space-y-4"
//       >
//         <h1 className="text-xl font-semibold text-center">Login</h1>
//         <input
//           className="w-full border px-3 py-2 rounded"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           type="email"
//           required
//         />
//         <input
//           className="w-full border px-3 py-2 rounded"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           type="password"
//           required
//         />
//         <p className="text-right text-xs text-gray-500">
//           <a href="/forgot-password" className="hover:underline">
//             Forgot your password?
//           </a>
//         </p>
//         {error && <p className="text-sm text-red-500">{error}</p>}
//         <button className="w-full bg-black text-white py-2 rounded">
//           Login
//         </button>
//       </form>
//     </main>
//   );
// }
