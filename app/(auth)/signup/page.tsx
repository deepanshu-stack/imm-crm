// "use client"; // This will mark the component as a client-side component.

// import { useState, FormEvent } from "react";
// import { supabaseClient } from "@lib/supabase/client";
// import { useRouter } from "next/navigation"; // Use the router inside a client component.

// export default function SignupPage() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [fullName, setFullName] = useState("");
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   async function handleSignup(e: FormEvent) {
//     e.preventDefault();
//     setError(null);
//     setLoading(true);

//     // Sign up the user using Supabase
//     const { user, error: signupError } = await supabaseClient.auth.signUp({
//       email,
//       password,
//       options: {
//         data: { full_name: fullName },
//       },
//     });

//     setLoading(false);

//     if (signupError) {
//       setError(signupError.message);
//       return;
//     }

//     // After signup, insert user profile into the "profiles" table
//     const { error: profileError } = await supabaseClient
//       .from("profiles")
//       .upsert(
//         [
//           {
//             id: user?.id,
//             full_name: fullName,
//             role: "client", // Default role
//           },
//         ],
//         { onConflict: ["id"] }
//       );

//     if (profileError) {
//       setError(profileError.message);
//       return;
//     }

//     // Redirect to login or dashboard
//     router.push("/login");
//   }

//   return (
//    <form
//         onSubmit={handleSignup}
//         className="bg-white p-6 rounded-lg shadow w-full max-w-md space-y-4"
//       >
//         <h1 className="text-xl font-semibold text-center">Create account</h1>
//         <input
//           className="w-full border px-3 py-2 rounded"
//           placeholder="Full name"
//           value={fullName}
//           onChange={(e) => setFullName(e.target.value)}
//           required
//         />
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
//         {error && <p className="text-sm text-red-500">{error}</p>}
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-black text-white py-2 rounded"
//         >
//           {loading ? "Creating..." : "Sign up"}
//         </button>
//       </form>
//   );
// }



// "use client";

// import { useState, FormEvent } from "react";
// import { supabaseClient } from "@lib/supabase/client";  // Ensure the path is correct
// import { useRouter } from "next/navigation";

// export default function SignupPage() {
//   const router = useRouter();
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   async function handleSignup(e: FormEvent) {
//     e.preventDefault();
//     setError(null);
//     setLoading(true);

//     // Sign up the user via Supabase Auth
//     const { data, error: signUpError } = await supabaseClient.auth.signUp({
//       email,
//       password,
//       options: {
//         data: { full_name: fullName }, // Sending additional data
//       },
//     });

//     if (signUpError) {
//       setError(signUpError.message);
//       setLoading(false);
//       return;
//     }

//     // Ensure the user object is present
//     if (!data?.user) {
//       setError("User signup failed.");
//       setLoading(false);
//       return;
//     }

//     // After successful sign up, create a profile for the user
//     const { error: profileError } = await supabaseClient
//       .from("profiles")
//       .upsert({
//         id: data.user.id, // Ensure the user id from auth is used here
//         full_name: fullName, // Set additional profile fields
//         role: "client", // Set the default role (can be customized)
//         company_id: null, // Set company_id if applicable (for clients/staff)
//       });

//     if (profileError) {
//       setError("Profile creation failed: " + profileError.message);
//       setLoading(false);
//       return;
//     }

//     // Redirect to login page after successful signup and profile creation
//     setLoading(false);
//     router.push("/login");
//   }

//   return (
//     <main className="min-h-screen flex items-center justify-center">
//       <form
//         onSubmit={handleSignup}
//         className="bg-white p-6 rounded-lg shadow w-full max-w-md space-y-4"
//       >
//         <h1 className="text-xl font-semibold text-center">Create account</h1>
//         <input
//           className="w-full border px-3 py-2 rounded"
//           placeholder="Full name"
//           value={fullName}
//           onChange={(e) => setFullName(e.target.value)}
//           required
//         />
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
//         {error && <p className="text-sm text-red-500">{error}</p>}
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-black text-white py-2 rounded"
//         >
//           {loading ? "Creating..." : "Sign up"}
//         </button>
//       </form>
//     </main>
//   );
// }





// "use client";

// import { useState, FormEvent } from "react";
// import { supabaseClient } from "@lib/supabase/client";  // Ensure the path is correct
// import { useRouter } from "next/navigation";

// export default function SignupPage() {
//   const router = useRouter();
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   async function handleSignup(e: FormEvent) {
//     e.preventDefault();
//     setError(null);
//     setLoading(true);

//     // Sign up the user via Supabase Auth
//     const { data, error: signUpError } = await supabaseClient.auth.signUp({
//       email,
//       password,
//       options: {
//         data: { full_name: fullName }, // Sending additional data
//       },
//     });

//     if (signUpError) {
//       setError(signUpError.message);
//       setLoading(false);
//       return;
//     }

//     // Ensure the user object is present
//     if (!data?.user) {
//       setError("User signup failed.");
//       setLoading(false);
//       return;
//     }

//     // After successful sign up, create a profile for the user
//     const { error: profileError } = await supabaseClient
//       .from("profiles")
//       .upsert({
//         id: data.user.id, // Ensure the user id from auth is used here
//         full_name: fullName, // Set additional profile fields
//         role: "client", // Set the default role (can be customized)
//         company_id: null, // Set company_id if applicable (for clients/staff)
//       });

//     if (profileError) {
//       setError("Profile creation failed: " + profileError.message);
//       setLoading(false);
//       return;
//     }

//     // Redirect to login page after successful signup and profile creation
//     setLoading(false);
//     router.push("/login");
//   }

//   return (
//     <main className="min-h-screen flex items-center justify-center">
//       <form
//         onSubmit={handleSignup}
//         className="bg-white p-6 rounded-lg shadow w-full max-w-md space-y-4"
//       >
//         <h1 className="text-xl font-semibold text-center">Create account</h1>
//         <input
//           className="w-full border px-3 py-2 rounded"
//           placeholder="Full name"
//           value={fullName}
//           onChange={(e) => setFullName(e.target.value)}
//           required
//         />
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
//         {error && <p className="text-sm text-red-500">{error}</p>}
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-black text-white py-2 rounded"
//         >
//           {loading ? "Creating..." : "Sign up"}
//         </button>
//       </form>
//     </main>
//   );
// }


"use client";

import { useState, FormEvent } from "react";
import { supabaseClient } from "@lib/supabase/client";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSignup(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    const { data, error: signUpError } = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName }, // this will be used by the trigger
      },
    });

    setLoading(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    // If email confirmation is ON, there might be no session here – that's okay.
    // The trigger has already created the profile for this new user.
    setMessage(
      "Account created. Please check your email to confirm your address, then log in."
    );

    // optional: redirect to login after a short delay
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSignup}
        className="bg-white p-6 rounded-lg shadow w-full max-w-md space-y-4"
      >
        <h1 className="text-xl font-semibold text-center">Create account</h1>

        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

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

        {error && <p className="text-sm text-red-500">{error}</p>}
        {message && <p className="text-sm text-green-600">{message}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded"
        >
          {loading ? "Creating..." : "Sign up"}
        </button>
      </form>
    </main>
  );
}



// WORKING CODE 100%. ---------- - -- -- - -------

// "use client";

// import { useState, FormEvent } from "react";
// // import { supabaseClient } from "@/lib/supabase/client";
// import { supabaseClient } from "@lib/supabase/client";  // Adjust path accordingly

// import { useRouter } from "next/navigation";

// export default function SignupPage() {
//   const router = useRouter();
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   async function handleSignup(e: FormEvent) {
//     e.preventDefault();
//     setError(null);
//     setLoading(true);

//     const { error } = await supabaseClient.auth.signUp({
//       email,
//       password,
//       options: {
//         data: { full_name: fullName },
//       },
//     });

//     setLoading(false);

//     if (error) {
//       setError(error.message);
//       return;
//     }

//     // After signup, go to login
//     router.push("/login");
//   }

//   return (
//     <main className="min-h-screen flex items-center justify-center">
//       <form
//         onSubmit={handleSignup}
//         className="bg-white p-6 rounded-lg shadow w-full max-w-md space-y-4"
//       >
//         <h1 className="text-xl font-semibold text-center">Create account</h1>
//         <input
//           className="w-full border px-3 py-2 rounded"
//           placeholder="Full name"
//           value={fullName}
//           onChange={(e) => setFullName(e.target.value)}
//           required
//         />
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
//         {error && <p className="text-sm text-red-500">{error}</p>}
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-black text-white py-2 rounded"
//         >
//           {loading ? "Creating..." : "Sign up"}
//         </button>
//       </form>
//     </main>
//   );
// }
