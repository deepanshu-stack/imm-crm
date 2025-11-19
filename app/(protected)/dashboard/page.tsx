// import { redirect } from "next/navigation";
// import { createSupabaseServerClient } from "@/lib/supabase/server";

// export default async function DashboardPage() {
//   const supabase = await createSupabaseServerClient();

//   // 1) Get current session
//   const {
//     data: { session },
//   } = await supabase.auth.getSession();

//   if (!session) {
//     redirect("/login");
//   }

//   const user = session.user;

//   // 2) Load profile to get role
//   const { data: profile, error: profileError } = await supabase
//     .from("profiles")
//     .select("role")
//     .eq("id", user.id)
//     .single();

//   if (profileError) {
//     console.error("Error loading profile in dashboard:", profileError.message);
//   }

//   const role = profile?.role ?? "client";

//   // 3) If this is a client, send them to the tickets page instead
//   if (role === "client") {
//     redirect("/tickets");
//   }

//   // 4) Normal dashboard content for staff/admin
//   return (
//     <div>
//       <h1 className="text-2xl font-semibold mb-2">Dashboard</h1>
//       <p className="text-sm text-gray-600">
//         This dashboard is visible only to staff / admin users.
//       </p>
//       {/* TODO: stats, charts, etc. */}
//     </div>
//   );
// }










// import { redirect } from "next/navigation";
// // import { createSupabaseServerClient } from "@/lib/supabase/server";
// // import { supabaseClient } from "@lib/supabase/client";  // Adjust path accordingly

// import { createSupabaseServerClient } from "@lib/supabase/server";  // Adjust path accordingly



// type Role = "client" | "staff" | "admin";

// export default async function DashboardPage() {
//   const supabase = await createSupabaseServerClient();

//   // 1) Session
//   const {
//     data: { session },
//     error: sessionError,
//   } = await supabase.auth.getSession();

//   if (sessionError || !session) {
//     redirect("/login");
//   }

//   const user = session.user;

//   // 2) Profile (role + company)
//   const { data: profile, error: profileError } = await supabase
//   .from("profiles")
//   .select("*")
//   .eq("id", userId)  // Use 'id' instead of 'user_id'
//   .single();

//   if (profileError || !profile) {
//     console.error("Error loading profile on dashboard:", profileError?.message);
//     redirect("/tickets");
//   }

//   const role = (profile.role as Role) ?? "client";
//   const companyId = profile.company_id as string | null;
//   const fullName = profile.full_name ?? user.email;

//   // Clients should never see dashboard
//   if (role === "client") {
//     redirect("/tickets");
//   }

//   // 3) Ticket counts
//   const baseSelect = { head: true, count: "exact" as const };

//   // Helper to apply visibility rules:
//   // - staff: tickets in their company
//   // - admin: all tickets (RLS must allow this)
//   const applyVisibility = (query: any) => {
//     if (role === "staff") {
//       if (companyId) {
//         return query.eq("company_id", companyId);
//       }
//       // no company -> see nothing
//       return query.eq("id", "00000000-0000-0000-0000-000000000000");
//     }

//     // admin → no extra filter (RLS will decide)
//     return query;
//   };

//   const [openRes, progressRes, closedRes] = await Promise.all([
//     applyVisibility(
//       supabase.from("tickets").select("*", baseSelect).eq("status", "open")
//     ),
//     applyVisibility(
//       supabase
//         .from("tickets")
//         .select("*", baseSelect)
//         .eq("status", "in_progress")
//     ),
//     applyVisibility(
//       supabase.from("tickets").select("*", baseSelect).eq("status", "closed")
//     ),
//   ]);

//   const openCount = openRes.count ?? 0;
//   const inProgressCount = progressRes.count ?? 0;
//   const closedCount = closedRes.count ?? 0;

//   // 4) UI – matches your screenshot style
//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div>
//         <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
//         <p className="mt-1 text-sm text-gray-500">
//           Welcome, <span className="font-medium">{fullName}</span> 👋
//         </p>
//       </div>

//       {/* Cards row */}
//       <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
//         {/* Open tickets */}
//         <div className="rounded border bg-white px-6 py-4 shadow-sm">
//           <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
//             Open tickets
//           </p>
//           <p className="mt-3 text-4xl font-semibold text-blue-600">
//             {openCount}
//           </p>
//         </div>

//         {/* In progress */}
//         <div className="rounded border bg-white px-6 py-4 shadow-sm">
//           <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
//             In progress
//           </p>
//           <p className="mt-3 text-4xl font-semibold text-blue-600">
//             {inProgressCount}
//           </p>
//         </div>

//         {/* Closed */}
//         <div className="rounded border bg-white px-6 py-4 shadow-sm">
//           <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
//             Closed tickets
//           </p>
//           <p className="mt-3 text-4xl font-semibold text-blue-600">
//             {closedCount}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }





// working code 100% ------- - -- ------------------ -- -- - --

import { createSupabaseServerClient } from "@lib/supabase/server";

export default async function DashboardPage() {
 const supabase = await createSupabaseServerClient();

const {
  data: { user },
} = await supabase.auth.getUser();


  // Simple counts for now (0 if no tickets yet)
  const [{ count: openCount }, { count: inProgressCount }, { count: closedCount }] =
    await Promise.all([
      supabase
        .from("tickets")
        .select("*", { count: "exact", head: true })
        .eq("status", "open"),
      supabase
        .from("tickets")
        .select("*", { count: "exact", head: true })
        .eq("status", "in_progress"),
      supabase
        .from("tickets")
        .select("*", { count: "exact", head: true })
        .eq("status", "closed"),
    ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Welcome, {user?.email ?? "user"} 👋
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-xs text-gray-500">Open tickets</p>
          <p className="mt-2 text-3xl font-bold">{openCount ?? 0}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-xs text-gray-500">In progress</p>
          <p className="mt-2 text-3xl font-bold">{inProgressCount ?? 0}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-xs text-gray-500">Closed tickets</p>
          <p className="mt-2 text-3xl font-bold">{closedCount ?? 0}</p>
        </div>
      </div>
    </div>
  );
}
