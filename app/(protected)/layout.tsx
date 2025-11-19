// import { createClient } from "@supabase/supabase-js"; // Correct import
// import { redirect } from "next/navigation";
// import LogoutButton from "../../components/logout-button"; // Logout component

// // Initialize Supabase client
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
// const supabase = createClient(supabaseUrl, supabaseKey);


// export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
//   // Fetch the user's session
//   const { data: session, error: sessionError } = await supabase.auth.getSession();

//   if (sessionError || !session || !session.user) {
//     redirect("/login"); // Redirect to login if session or session.user is invalid
//   }

//   // Now safely access the user ID
//   const userId = session.user.id; // This is safe now

//   const { data: profile, error: profileError } = await supabase
//     .from("profiles")
//     .select("*")
//     .eq("id", userId) // Use 'id' instead of 'user_id' to match the policy
//     .single();

//   if (profileError || !profile) {
//     console.error("Error loading profile:", profileError?.message);
//     redirect("/login"); // Redirect if profile fetching fails
//   }

//   const role = profile?.role ?? "client"; // Default to "client" if no role
//   const companyName = profile?.company_id ? "Company Name" : "No Company";

//   return (
//     <div className="min-h-screen flex bg-gray-50">
//       <main>{children}</main>
//     </div>
//   );
// }






// export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
//   // Fetch the user's session
//   const { data: session, error: sessionError } = await supabase.auth.getSession();

//   if (sessionError || !session) {
//     redirect("/login"); // Redirect to login if session is invalid
//   }

//   // Fetch user profile based on the session
//   const userId = await session.user.id;
//   const { data: profile, error: profileError } = await supabase
//     .from("profiles")
//     .select("*")
//     .eq("id", userId) // Use 'id' instead of 'user_id'
//     .single();

//   if (profileError || !profile) {
//     console.error("Error loading profile:", profileError?.message);
//     redirect("/login"); // Redirect if profile fetching fails
//   }

//   const role = profile?.role ?? "client"; // Default to "client" if no role
//   const companyName = profile?.company_id ? "Company Name" : "No Company";

//   return (
//     <div className="min-h-screen flex bg-gray-50">
//       <main>{children}</main>
//     </div>
//   );
// }




// import { createClient } from "@supabase/supabase-js";  // Correct import for Supabase client-side
// import { redirect } from "next/navigation"; // Correct import for redirect
// import LogoutButton from "../../components/logout-button"; // Logout component import
// import { createSupabaseServerClient } from "@lib/supabase/server";  // Adjust path accordingly

// // Initialize Supabase client
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
// const supabase = createClient(supabaseUrl, supabaseKey);

// export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
//   // Fetch the user's session
//   const { data: session, error: sessionError } = await supabase.auth.getSession();

//   if (sessionError || !session) {
//     redirect("/login"); // Redirect to login if session is invalid
//   }

//   // Fetch user profile based on the session
//   const userId = await session.user_id;
//   const { data: profile, error: profileError } = await supabase
//   .from("profiles")
//   .select("*")
//   .eq("id", userId)  // Use 'id' instead of 'user_id'
//   .single();

//   if (profileError || !profile) {
//     console.error("Error loading profile:", profileError?.message);
//     redirect("/login"); // Redirect if profile fetching fails
//   }

//   const role = profile?.role ?? "client"; // Default to "client" if no role
//   const companyName = profile?.company_id ? "Company Name" : "No Company"; // Default company message if no company

//   return (
//     <div className="min-h-screen flex bg-gray-50">
//       <main>{children}</main>
//     </div>
//   );
// }



// import { ReactNode } from "react";
// import { redirect } from "next/navigation";
// // import { createSupabaseServerClient } from "@lib/supabase/server";
// import { createSupabaseServerClient } from "../../lib/supabase/server";

// import LogoutButton from "@/components/logout-button";

// // Function to fetch profile
// async function ensureProfileExists(userId: string) {
//   const supabase = createSupabaseServerClient();
// const { data: profile, error: profileError } = await supabase
//   .from("profiles")
//   .select("*")
//   .eq("user_id", user.id)
//   .single();

// if (profileError) {
//   console.error("Error loading profile:", profileError.message);
//   redirect("/login"); // Redirect if profile fetching fails
// }

// }

// export default async function ProtectedLayout({
//   children,
// }: {
//   children: ReactNode;
// }) {
//   const supabase = await createSupabaseServerClient();
//   const { data: { session } } = await supabase.auth.getSession();

//   if (!session) {
//     redirect("/login");
//   }

//   const user = session.user;
//   await ensureProfileExists(user.id); // Ensure profile exists

//   return (
//     <div className="min-h-screen flex bg-gray-50">
//       {/* Your sidebar */}
//       <aside className="w-64 bg-white border-r px-4 py-6 flex flex-col">
//         <div className="mb-6">
//           <h1 className="text-lg font-semibold">IMM CRM</h1>
//           <p className="text-xs text-gray-500">
//             I Market &amp; Manage Pvt. Ltd.
//           </p>
//         </div>

//         <nav className="flex-1 space-y-2 text-sm">
//           <Link href="/dashboard">Dashboard</Link>
//           <Link href="/tickets">Tickets</Link>
//         </nav>

//         <div className="mt-6 border-t pt-4 text-xs text-gray-500">
//           <p>{user.email}</p>
//           <div className="mt-3">
//             <LogoutButton />
//           </div>
//         </div>
//       </aside>

//       <main className="flex-1 p-6">{children}</main>
//     </div>
//   );
// }






// Working code Also ------- --  - - --  -- - - -- --------

// // app/(protected)/layout.tsx
// import { ReactNode } from "react";
// import Link from "next/link";
// import { redirect } from "next/navigation";
// import { createSupabaseServerClient } from "@/lib/supabase/server";
// import LogoutButton from "@/components/logout-button";

// type ProfileWithCompany = {
//   role: string | null;
//   companies: { name: string } | null;
// };

// export default async function ProtectedLayout({
//   children,
// }: {
//   children: ReactNode;
// }) {
//   const supabase = await createSupabaseServerClient();

//   const {
//     data: { session },
//   } = await supabase.auth.getSession();

//   if (!session) {
//     redirect("/login");
//   }

//   const user = session.user;

//   // Load profile + company name
//   const { data: profile, error: profileError } = await supabase
//     .from("profiles")
//     .select("role, companies(name)")
//     .eq("id", user.id)
//     .single<ProfileWithCompany>();

//   if (profileError) {
//     console.error("Error loading profile:", profileError.message);
//   }

//   const role = profile?.role ?? "client";
//   const companyName =
//     profile?.companies?.name ?? "I Market & Manage Pvt. Ltd.";

//   const isClient = role === "client";
//   const isStaff = role === "staff";
//   const isAdmin = role === "admin";

//   return (
//     <div className="min-h-screen flex bg-gray-50">
//       {/* Sidebar */}
//       <aside className="w-64 bg-white border-r px-4 py-6 flex flex-col">
//         <div className="mb-6">
//           <h1 className="text-lg font-semibold">IMM CRM</h1>
//           <p className="text-xs text-gray-500 truncate">{companyName}</p>
//           <p className="mt-1 text-[10px] font-semibold text-gray-500 uppercase">
//             Role: {role}
//           </p>
//         </div>

//         <nav className="flex-1 space-y-2 text-sm">
//           {/* Staff + admin see dashboard */}
//           {(isStaff || isAdmin) && (
//             <Link
//               href="/dashboard"
//               className="block px-2 py-1 rounded hover:bg-gray-100"
//             >
//               Dashboard
//             </Link>
//           )}

//           {/* Everyone sees tickets */}
//           <Link
//             href="/tickets"
//             className="block px-2 py-1 rounded hover:bg-gray-100"
//           >
//             Tickets
//           </Link>
//         </nav>

//         <div className="mt-6 border-t pt-4 text-xs text-gray-500">
//           <p className="truncate">{user.email}</p>
//           <div className="mt-3">
//             <LogoutButton />
//           </div>
//         </div>
//       </aside>

//       {/* Main content */}
//       <main className="flex-1 p-6">{children}</main>
//     </div>
//   );
// }





// import { ReactNode } from "react";
// import Link from "next/link";
// import { redirect } from "next/navigation";
// import { createSupabaseServerClient } from "@lib/supabase/server";
// import LogoutButton from "../../components/logout-button";

// type LayoutProps = {
//   children: ReactNode;
// };

// // Profile type to handle profile + company
// type ProfileWithCompany = {
//   full_name: string | null;
//   role: string | null;
//   company_id: string | null;
//   companies?: {
//     name: string | null;
//   } | null;
// };

// export default async function ProtectedLayout({ children }: LayoutProps) {
//   const supabase = await createSupabaseServerClient();

//   // Fetch the user session
//   const {
//     data: { session },
//     error: sessionError,
//   } = await supabase.auth.getSession();

//   if (sessionError || !session) {
//     console.error("Error getting session:", sessionError?.message);
//     redirect("/login"); // Redirect to login if session is invalid
//   }

//   const user = session.user;

//   // Fetch user profile data
//   const { data: profile, error: profileError } = await supabase
//     .from("profiles")
//     .select("full_name, role, company_id, companies(name)")
//     .eq("id", user.id)
//     .single<ProfileWithCompany>();

//   if (profileError) {
//     console.error("Error loading profile:", profileError.message);
//   }

//   // Set role and company name
//   const role = profile?.role ?? "client"; // Default to client role
//   const companyName =
//     profile?.companies?.name ?? "I Market & Manage Pvt. Ltd.";

//   const isClient = role === "client";
//   const isStaff = role === "staff";
//   const isAdmin = role === "admin";

//   // Prepare the navigation items
//   const navItems: { href: string; label: string }[] = [];
//   if (!isClient) {
//     navItems.push({ href: "/dashboard", label: "Dashboard" });
//   }
//   navItems.push({ href: "/tickets", label: "Tickets" });

//   return (
//     <div className="min-h-screen flex bg-gray-50">
//       <aside className="w-64 bg-white border-r px-4 py-6 flex flex-col">
//         <div className="mb-6">
//           <h1 className="text-lg font-semibold">IMM CRM</h1>
//           <p className="text-xs text-gray-500 truncate">{companyName}</p>
//           <p className="mt-1 text-[11px] uppercase text-gray-400">
//             Role: <span className="font-semibold">{role}</span>
//           </p>
//         </div>

//         <nav className="flex-1 space-y-2 text-sm">
//           {navItems.map((item) => (
//             <Link
//               key={item.href}
//               href={item.href}
//               className="block px-2 py-1 rounded hover:bg-gray-100"
//             >
//               {item.label}
//             </Link>
//           ))}
//         </nav>

//         <div className="mt-6 border-t pt-4 text-xs text-gray-500">
//           <p className="truncate">{user.email}</p>
//           {profile?.full_name && (
//             <p className="truncate text-gray-400">{profile.full_name}</p>
//           )}
//           <div className="mt-3">
//             <LogoutButton />
//           </div>
//         </div>
//       </aside>

//       <main className="flex-1 p-6">{children}</main>
//     </div>
//   );
// }







// WORKING CODE 95% ----------------------- - ------ --- - --  -- -- --

// // app/(protected)/layout.tsx
// "use client"; // Indicating that this component is client-side

// import { ReactNode, useEffect } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation"; // useRouter for client-side navigation
// import { supabaseClient } from "@lib/supabase/client";
// import LogoutButton from "../../components/logout-button";

// type LayoutProps = {
//   children: ReactNode;
// };

// // Profile type to handle profile + company
// type ProfileWithCompany = {
//   full_name: string | null;
//   role: string | null;
//   company_id: string | null;
//   companies?: {
//     name: string | null;
//   } | null;
// };

// export default function ProtectedLayout({ children }: LayoutProps) {
//   const router = useRouter(); // Initialize the router for client-side redirects

//   useEffect(() => {
//     const getSession = async () => {
//       const { data: { session }, error: sessionError } = await supabaseClient.auth.getSession();

//       // If session is invalid or there's an error, redirect to login
//       if (sessionError || !session) {
//         console.error("Error getting session:", sessionError?.message);
//         router.push("/login"); // Redirect to login if session is invalid
//       }
//     };

//     getSession(); // Call to get the session and check if it's valid
//   }, [router]); // Adding router as dependency to trigger effect when it changes

//   return (
//     <div className="min-h-screen flex bg-gray-50">
//       <aside className="w-64 bg-white border-r px-4 py-6 flex flex-col">
//         <div className="mb-6">
//           <h1 className="text-lg font-semibold">IMM CRM</h1>
//           <p className="text-xs text-gray-500 truncate">Company Name</p>
//           <p className="mt-1 text-[11px] uppercase text-gray-400">
//             Role: <span className="font-semibold">client</span> {/* Change dynamically based on session */}
//           </p>
//         </div>

//         <nav className="flex-1 space-y-2 text-sm">
//           {/* Add dynamic navigation items based on user role */}
//           <Link href="/dashboard" className="block px-2 py-1 rounded hover:bg-gray-100">
//             Dashboard
//           </Link>
//           <Link href="/tickets" className="block px-2 py-1 rounded hover:bg-gray-100">
//             Tickets
//           </Link>
//         </nav>

//         <div className="mt-6 border-t pt-4 text-xs text-gray-500">
//           {/* Display user email */}
//           <p className="truncate">User Email</p> {/* Should display user's email */}
//           <div className="mt-3">
//             <LogoutButton />
//           </div>
//         </div>
//       </aside>

//       <main className="flex-1 p-6">{children}</main>
//     </div>
//   );
// }



// import { ReactNode } from "react";
// import Link from "next/link";
// import { redirect } from "next/navigation";
// import { createSupabaseServerClient } from "@lib/supabase/server";
// import LogoutButton from "../../components/logout-button";

// type LayoutProps = {
//   children: ReactNode;
// };

// // Profile type to handle profile + company
// type ProfileWithCompany = {
//   full_name: string | null;
//   role: string | null;
//   company_id: string | null;
//   companies?: {
//     name: string | null;
//   } | null;
// };

// export default async function ProtectedLayout({ children }: LayoutProps) {
//   const supabase = await createSupabaseServerClient();

//   // Fetch the user session
//   const {
//     data: { session },
//     error: sessionError,
//   } = await supabase.auth.getSession();

//   if (sessionError || !session) {
//     console.error("Error getting session:", sessionError?.message);
//     redirect("/login"); // Redirect to login if session is invalid
//   }

//   const user = session.user;

//   // Fetch user profile data
//   const { data: profile, error: profileError } = await supabase
//     .from("profiles")
//     .select("full_name, role, company_id, companies(name)")
//     .eq("id", user.id)
//     .single<ProfileWithCompany>();

//   if (profileError) {
//     console.error("Error loading profile:", profileError.message);
//   }

//   // Set role and company name
//   const role = profile?.role ?? "client"; // Default to client role
//   const companyName =
//     profile?.companies?.name ?? "I Market & Manage Pvt. Ltd.";

//   const isClient = role === "client";
//   const isStaff = role === "staff";
//   const isAdmin = role === "admin";

//   // Prepare the navigation items
//   const navItems: { href: string; label: string }[] = [];
//   // Only show dashboard for staff and admin
//   if (isStaff || isAdmin) {
//     navItems.push({ href: "/dashboard", label: "Dashboard" });
//   }
//   navItems.push({ href: "/tickets", label: "Tickets" });

//   return (
//     <div className="min-h-screen flex bg-gray-50">
//       <aside className="w-64 bg-white border-r px-4 py-6 flex flex-col">
//         <div className="mb-6">
//           <h1 className="text-lg font-semibold">IMM CRM</h1>
//           <p className="text-xs text-gray-500 truncate">{companyName}</p>
//           <p className="mt-1 text-[11px] uppercase text-gray-400">
//             Role: <span className="font-semibold">{role}</span>
//           </p>
//         </div>

//         <nav className="flex-1 space-y-2 text-sm">
//           {navItems.map((item) => (
//             <Link
//               key={item.href}
//               href={item.href}
//               className="block px-2 py-1 rounded hover:bg-gray-100"
//             >
//               {item.label}
//             </Link>
//           ))}
//         </nav>

//         <div className="mt-6 border-t pt-4 text-xs text-gray-500">
//           <p className="truncate">{user.email}</p>
//           {profile?.full_name && (
//             <p className="truncate text-gray-400">{profile.full_name}</p>
//           )}
//           <div className="mt-3">
//             <LogoutButton />
//           </div>
//         </div>
//       </aside>

//       <main className="flex-1 p-6">{children}</main>
//     </div>
//   );
// }





// import { ReactNode } from "react";
// import Link from "next/link";
// import { redirect } from "next/navigation";
// import { createSupabaseServerClient } from "@lib/supabase/server";
// import LogoutButton from "../../components/logout-button";

// // Profile type to handle profile + company
// type ProfileWithCompany = {
//   full_name: string | null;
//   role: string | null;
//   company_id: string | null;
//   companies?: {
//     name: string | null;
//   } | null;
// };

// type LayoutProps = {
//   children: ReactNode;
// };

// export default async function ProtectedLayout({ children }: LayoutProps) {
//   const supabase = await createSupabaseServerClient();

//   // Fetch the user session using getSession
//   const {
//     data: { session },
//     error: sessionError,
//   } = await supabase.auth.getSession();

//   // Handle session errors and redirect to login if no session
//   if (sessionError || !session) {
//     console.error("Error getting session:", sessionError?.message);
//     return redirect("/login"); // Redirect to login if session is invalid
//   }

//   const user = session.user;

//   // Fetch user profile data (after confirming session exists)
//   const { data: profile, error: profileError } = await supabase
//     .from("profiles")
//     .select("full_name, role, company_id, companies(name)")
//     .eq("id", user.id)
//     .single<ProfileWithCompany>();

//   // Handle profile errors
//   if (profileError) {
//     console.error("Error loading profile:", profileError.message);
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p>Error loading profile, please try again later.</p>
//       </div>
//     );
//   }

//   // Set role and company name
//   const role = profile?.role ?? "client"; // Default to client role
//   const companyName =
//     profile?.companies?.name ?? "I Market & Manage Pvt. Ltd.";

//   const isClient = role === "client";
//   const isStaff = role === "staff";
//   const isAdmin = role === "admin";

//   // Prepare the navigation items (only show dashboard for staff/admin)
//   const navItems: { href: string; label: string }[] = [];
//   if (isStaff || isAdmin) {
//     navItems.push({ href: "/dashboard", label: "Dashboard" });
//   }
//   navItems.push({ href: "/tickets", label: "Tickets" });

//   return (
//     <div className="min-h-screen flex bg-gray-50">
//       <aside className="w-64 bg-white border-r px-4 py-6 flex flex-col">
//         <div className="mb-6">
//           <h1 className="text-lg font-semibold">IMM CRM</h1>
//           <p className="text-xs text-gray-500 truncate">{companyName}</p>
//           <p className="mt-1 text-[11px] uppercase text-gray-400">
//             Role: <span className="font-semibold">{role}</span>
//           </p>
//         </div>

//         <nav className="flex-1 space-y-2 text-sm">
//           {navItems.map((item) => (
//             <Link
//               key={item.href}
//               href={item.href}
//               className="block px-2 py-1 rounded hover:bg-gray-100"
//             >
//               {item.label}
//             </Link>
//           ))}
//         </nav>

//         <div className="mt-6 border-t pt-4 text-xs text-gray-500">
//           <p className="truncate">{user.email}</p>
//           {profile?.full_name && (
//             <p className="truncate text-gray-400">{profile.full_name}</p>
//           )}
//           <div className="mt-3">
//             <LogoutButton />
//           </div>
//         </div>
//       </aside>

//       <main className="flex-1 p-6">{children}</main>
//     </div>
//   );
// }


// import { ReactNode } from "react";
// import { redirect } from "next/navigation";
// import { createSupabaseServerClient } from "@lib/supabase/server";
// import LogoutButton from "../../components/logout-button";

// type LayoutProps = {
//   children: ReactNode;
// };

// export default async function ProtectedLayout({ children }: LayoutProps) {
//   const supabase = await createSupabaseServerClient();

//   const { data: { session }, error: sessionError } = await supabase.auth.getSession();

//   if (sessionError || !session) {
//     redirect("/login");
//   }

//   const user = session.user;

//   const { data: profile, error: profileError } = await supabase
//     .from("profiles")
//     .select("full_name, role")
//     .eq("id", user.id)
//     .single();

//   if (profileError || !profile) {
//     redirect("/login");
//   }

//   const role = profile.role;

//   // Role-Based Routing
//   if (role === "client") {
//     return (
//       <div className="min-h-screen flex bg-gray-50">
//         <main className="flex-1 p-6">{children}</main>
//       </div>
//     );
//   }

//   // Admin/Staff - Normal Layout
//   return (
//     <div className="min-h-screen flex bg-gray-50">
//       <aside className="w-64 bg-white border-r px-4 py-6 flex flex-col">
//         {/* Sidebar */}
//         <div className="mb-6">
//           <h1 className="text-lg font-semibold">IMM CRM</h1>
//           <p className="text-xs text-gray-500 truncate">{profile.full_name}</p>
//         </div>
//         {/* Navigation */}
//         <nav className="flex-1 space-y-2 text-sm">
//           <a href="/dashboard" className="block px-2 py-1 rounded hover:bg-gray-100">Dashboard</a>
//           <a href="/tickets" className="block px-2 py-1 rounded hover:bg-gray-100">Tickets</a>
//         </nav>
//         {/* Logout */}
//         <div className="mt-6 border-t pt-4 text-xs text-gray-500">
//           <LogoutButton />
//         </div>
//       </aside>

//       <main className="flex-1 p-6">{children}</main>
//     </div>
//   );
// }


// import { ReactNode } from "react";
// import { redirect } from "next/navigation";
// import { createSupabaseServerClient } from "@lib/supabase/server";
// import LogoutButton from "../../components/logout-button";

// type LayoutProps = {
//   children: ReactNode;
// };

// export default async function ProtectedLayout({ children }: LayoutProps) {
//   const supabase = await createSupabaseServerClient();

//   // Fetch the session data
//   const { data: { session }, error: sessionError } = await supabase.auth.getSession();

//   if (sessionError || !session) {
//     // Redirect to login if no session found
//     return redirect("/login");
//   }

//   const user = session.user;

//   // Fetch the profile of the current user
//   const { data: profile, error: profileError } = await supabase
//     .from("profiles")
//     .select("full_name, role")
//     .eq("id", user.id)
//     .single();

//   if (profileError || !profile) {
//     // Redirect to login if profile is not found
//     return redirect("/login");
//   }

//   const role = profile.role;

//   // Role-based Layout Rendering
//   if (role === "client") {
//     // Client-specific layout (no sidebar)
//     return (
//       <div className="min-h-screen flex bg-gray-50">
//         <main className="flex-1 p-6">{children}</main>
//       </div>
//     );
//   }

//   // Admin/Staff layout (with sidebar)
//   return (
//     <div className="min-h-screen flex bg-gray-50">
//       <aside className="w-64 bg-white border-r px-4 py-6 flex flex-col">
//         {/* Sidebar */}
//         <div className="mb-6">
//           <h1 className="text-lg font-semibold">IMM CRM</h1>
//           <p className="text-xs text-gray-500 truncate">{profile.full_name}</p>
//         </div>
//         {/* Navigation */}
//         <nav className="flex-1 space-y-2 text-sm">
//           <a href="/dashboard" className="block px-2 py-1 rounded hover:bg-gray-100">Dashboard</a>
//           <a href="/tickets" className="block px-2 py-1 rounded hover:bg-gray-100">Tickets</a>
//         </nav>
//         {/* Logout */}
//         <div className="mt-6 border-t pt-4 text-xs text-gray-500">
//           <LogoutButton />
//         </div>
//       </aside>

//       <main className="flex-1 p-6">{children}</main>
//     </div>
//   );
// }




"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseClient } from "@lib/supabase/client";
import LogoutButton from "../../components/logout-button";

type LayoutProps = {
  children: ReactNode;
};

type Profile = {
  full_name: string | null;
  role: "client" | "staff" | "admin" | null;
};

export default function ProtectedLayout({ children }: LayoutProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    async function loadUserAndProfile() {
      // 1) Check auth on the client
      const {
        data: { user },
        error: userError,
      } = await supabaseClient.auth.getUser();

      if (userError || !user) {
        // Not logged in → send to login
        router.replace("/login");
        return;
      }

      // 2) Load profile for this user
      const { data, error: profileError } = await supabaseClient
        .from("profiles")
        .select("full_name, role")
        .eq("id", user.id)
        .single();

      if (profileError || !data) {
        console.error("Error loading profile:", profileError?.message);
        router.replace("/login");
        return;
      }

      setProfile({
        full_name: data.full_name,
        role: (data.role as Profile["role"]) ?? null,
      });
      setLoading(false);
    }

    loadUserAndProfile();
  }, [router]);

  if (loading || !profile) {
    return <p className="p-4">Checking session…</p>;
  }

  // Simple layout for clients
  if (profile.role === "client") {
    return (
      <main className="min-h-screen flex bg-gray-50 p-6">
        {children}
      </main>
    );
  }

  // Sidebar layout for staff/admin
  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-64 bg-white border-r px-4 py-6 flex flex-col">
        <div className="mb-6">
          <h1 className="text-lg font-semibold">IMM CRM</h1>
          <p className="text-xs text-gray-500 truncate">
            {profile.full_name}
          </p>
        </div>

        <nav className="flex-1 space-y-2 text-sm">
          <a href="/dashboard" className="block px-2 py-1 rounded hover:bg-gray-100">
            Dashboard
          </a>
          <a href="/tickets" className="block px-2 py-1 rounded hover:bg-gray-100">
            Tickets
          </a>
        </nav>

        <div className="mt-6 border-t pt-4 text-xs text-gray-500">
          <LogoutButton />
        </div>
      </aside>

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}





// WORKING CODE 100% -------------- -- -  - - - - --

// // app/(protected)/layout.tsx
// import { ReactNode } from "react";
// import Link from "next/link";
// import { redirect } from "next/navigation";
// import { createSupabaseServerClient } from "@lib/supabase/server";
// import LogoutButton from "../../components/logout-button";

// type LayoutProps = {
//   children: ReactNode;
// };

// // add a small helper type for the profile + joined company
// type ProfileWithCompany = {
//   full_name: string | null;
//   role: string | null;
//   company_id: string | null;
//   companies?: {
//     name: string | null;
//   } | null;
// };

// export default async function ProtectedLayout({ children }: LayoutProps) {
//   const supabase = await createSupabaseServerClient();

//   const {
//     data: { session },
//     error: sessionError,
//   } = await supabase.auth.getSession();

//   if (sessionError) {
//     console.error("Error getting session:", sessionError.message);
//   }

//   if (!session) {
//     redirect("/login");
//   }

//   const user = session.user;

//   // 👇 tell TS what the returned data looks like
//   const { data: profile, error: profileError } = await supabase
//     .from("profiles")
//     .select("full_name, role, company_id, companies(name)")
//     .eq("id", user.id)
//     .single<ProfileWithCompany>();

//   if (profileError) {
//     console.error("Error loading profile:", profileError.message);
//   }

//   const role = profile?.role ?? "client"; // fallback
//   const companyName =
//     profile?.companies?.name ?? "I Market & Manage Pvt. Ltd.";

//   const isClient = role === "client";
//   const isStaff = role === "staff";
//   const isAdmin = role === "admin";

//   const navItems: { href: string; label: string }[] = [];
//   if (!isClient) {
//     navItems.push({ href: "/dashboard", label: "Dashboard" });
//   }
//   navItems.push({ href: "/tickets", label: "Tickets" });

//   return (
//     <div className="min-h-screen flex bg-gray-50">
//       <aside className="w-64 bg-white border-r px-4 py-6 flex flex-col">
//         <div className="mb-6">
//           <h1 className="text-lg font-semibold">IMM CRM</h1>
//           <p className="text-xs text-gray-500 truncate">{companyName}</p>
//           <p className="mt-1 text-[11px] uppercase text-gray-400">
//             Role: <span className="font-semibold">{role}</span>
//           </p>
//         </div>

//         <nav className="flex-1 space-y-2 text-sm">
//           {navItems.map((item) => (
//             <Link
//               key={item.href}
//               href={item.href}
//               className="block px-2 py-1 rounded hover:bg-gray-100"
//             >
//               {item.label}
//             </Link>
//           ))}
//         </nav>

//         <div className="mt-6 border-t pt-4 text-xs text-gray-500">
//           <p className="truncate">{user.email}</p>
//           {profile?.full_name && (
//             <p className="truncate text-gray-400">{profile.full_name}</p>
//           )}
//           <div className="mt-3">
//             <LogoutButton />
//           </div>
//         </div>
//       </aside>

//       <main className="flex-1 p-6">{children}</main>
//     </div>
//   );
// }




// import { ReactNode } from "react";
// import Link from "next/link";
// import { redirect } from "next/navigation";
// import { createSupabaseServerClient } from "@/lib/supabase/server";
// import LogoutButton from "@/components/logout-button";


// export default async function ProtectedLayout({
//   children,
// }: {
//   children: ReactNode;
// }) {
//   const supabase = await createSupabaseServerClient();

// const {
//   data: { session },
// } = await supabase.auth.getSession();


//   // If not logged in, send to login page
//   if (!session) {
//     redirect("/login");
//   }

//   const user = session.user;

//   return (
//     <div className="min-h-screen flex bg-gray-50">
//       {/* Sidebar */}
//       <aside className="w-64 bg-white border-r px-4 py-6 flex flex-col">
//         <div className="mb-6">
//           <h1 className="text-lg font-semibold">IMM CRM</h1>
//           <p className="text-xs text-gray-500">
//             I Market &amp; Manage Pvt. Ltd.
//           </p>
//         </div>

//         <nav className="flex-1 space-y-2 text-sm">
//           <Link href="/dashboard" className="block px-2 py-1 rounded hover:bg-gray-100">
//             Dashboard
//           </Link>
//           <Link href="/tickets" className="block px-2 py-1 rounded hover:bg-gray-100">
//             Tickets
//           </Link>
//         </nav>

//         <div className="mt-6 border-t pt-4 text-xs text-gray-500">
//           <p className="truncate">{user.email}</p>
//           <div className="mt-3">
//             <LogoutButton />
//           </div>
//         </div>
//       </aside>

//       {/* Main content */}
//       <main className="flex-1 p-6">{children}</main>
//     </div>
//   );
// }
