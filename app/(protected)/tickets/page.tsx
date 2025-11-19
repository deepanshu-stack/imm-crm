// import Link from "next/link";
// // import { createSupabaseServerClient } from "@lib/supabase/server";
// // import { createSupabaseServerClient } from "../../lib/supabase/server";
// // import { createSupabaseServerClient } from "../../lib/supabase/server"; // Adjust the path similarly
// // import { supabaseClient } from "@lib/supabase/client";  // Adjust path accordingly
// // import { supabaseClient } from "@lib/supabase/client";  // Adjust path accordingly
// import { createSupabaseServerClient } from "@lib/supabase/server";  // Adjust path accordingly




// export default async function TicketsPage() {
//   const supabase = await createSupabaseServerClient();
//   const user = supabase.auth.user();

//   // Fetch user profile
//   const { data: profile, error: profileError } = await supabase
//   .from("profiles")
//   .select("*")
//   .eq("id", userId)  // Use 'id' instead of 'user_id'
//   .single();

//   if (profileError || !profile) {
//     console.error("Error loading profile:", profileError.message);
//     redirect("/login");
//   }

//   const companyId = profile.company_id;

//   // Fetch tickets for the user's company
//   const { data: tickets, error: ticketsError } = await supabase
//     .from("tickets")
//     .select("id, title, status, priority, created_at")
//     .eq("company_id", companyId)
//     .order("created_at", { ascending: false });

//   if (ticketsError) {
//     console.error("Error loading tickets:", ticketsError.message);
//   }

//   return (
//     <div>
//       <h1>Tickets</h1>
//       <Link href="/tickets/new">New Ticket</Link>

//       <table>
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Status</th>
//             <th>Priority</th>
//             <th>Created At</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tickets?.map((ticket) => (
//             <tr key={ticket.id}>
//               <td>{ticket.title}</td>
//               <td>{ticket.status}</td>
//               <td>{ticket.priority}</td>
//               <td>{ticket.created_at}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }





// // app/(protected)/tickets/page.tsx
// import Link from "next/link";
// import { redirect } from "next/navigation";
// import { createSupabaseServerClient } from "@/lib/supabase/server";

// type TicketRow = {
//   id: string;
//   title: string;
//   status: "open" | "in_progress" | "closed";
//   priority: "low" | "medium" | "high";
//   created_at: string;
// };

// type ProfileWithCompany = {
//   role: string | null;
//   company_id: string | null;
// };

// function statusLabel(status: TicketRow["status"]) {
//   if (status === "open") return "Open";
//   if (status === "in_progress") return "In progress";
//   return "Closed";
// }

// function priorityLabel(priority: TicketRow["priority"]) {
//   if (priority === "low") return "Low";
//   if (priority === "medium") return "Medium";
//   return "High";
// }

// export default async function TicketsPage() {
//   const supabase = await createSupabaseServerClient();

//   // 1) Get current session/user (layout already did this, but this is safe)
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

//   // 2) Load this user's profile to know their role + company
//   const { data: profile, error: profileError } = await supabase
//     .from("profiles")
//     .select("role, company_id")
//     .eq("id", user.id)
//     .single<ProfileWithCompany>();

//   if (profileError) {
//     console.error("Error loading profile:", profileError.message);
//   }

//   const role = profile?.role ?? "client";

//   // 3) Build a tickets query filtered by role
//   let query = supabase
//     .from("tickets")
//     .select("id, title, status, priority, created_at")
//     .order("created_at", { ascending: false });

//   if (role === "client") {
//     // ✅ client: only their own tickets
//     query = query.eq("client_id", user.id);
//   } else {
//     // ✅ staff / admin: only tickets for their company
//     if (profile?.company_id) {
//       query = query.eq("company_id", profile.company_id);
//     }
//   }

//   const { data: tickets, error } = await query;

//   if (error) {
//     console.error("Error loading tickets:", error.message);
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-semibold">Tickets</h1>
//           <p className="text-sm text-gray-500">
//             Track all requests for IMM.
//           </p>
//         </div>
//         <Link
//           href="/tickets/new"
//           className="inline-flex items-center rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
//         >
//           + New ticket
//         </Link>
//       </div>

//       <div className="bg-white rounded shadow-sm border">
//         <table className="min-w-full text-sm">
//           <thead className="border-b bg-gray-50 text-left text-xs font-semibold text-gray-500">
//             <tr>
//               <th className="px-4 py-2">Title</th>
//               <th className="px-4 py-2">Status</th>
//               <th className="px-4 py-2">Priority</th>
//               <th className="px-4 py-2">Created</th>
//             </tr>
//           </thead>
//           <tbody>
//             {!tickets || tickets.length === 0 ? (
//               <tr>
//                 <td
//                   colSpan={4}
//                   className="px-4 py-6 text-center text-gray-400"
//                 >
//                   No tickets yet. Click &quot;New ticket&quot; to create the
//                   first one.
//                 </td>
//               </tr>
//             ) : (
//               tickets.map((t: TicketRow) => (
//                 <tr
//                   key={t.id}
//                   className="border-t hover:bg-gray-50 cursor-pointer"
//                 >
//                   <td className="px-4 py-2">
//                     <Link
//                       href={`/tickets/${t.id}`}
//                       className="text-blue-600 hover:underline"
//                     >
//                       {t.title}
//                     </Link>
//                   </td>
//                   <td className="px-4 py-2">
//                     {statusLabel(t.status)}
//                   </td>
//                   <td className="px-4 py-2">
//                     {priorityLabel(t.priority)}
//                   </td>
//                   <td className="px-4 py-2 text-xs text-gray-500">
//                     {new Date(t.created_at).toLocaleString()}
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


// import { createSupabaseServerClient } from "@lib/supabase/server";
// import Link from "next/link";

// export default async function TicketsPage() {
//   const supabase = await createSupabaseServerClient();

//   // Fetch current user
//   const { data: { user }, error: userError } = await supabase.auth.getUser();

//   if (userError || !user) {
//     console.error("Error fetching user:", userError?.message);
//     return <p>Loading...</p>;
//   }

//   // Fetch tickets based on user role
//   const { data: tickets, error } = await supabase
//     .from("tickets")
//     .select("id, title, status, priority, created_at")
//     .eq("client_id", user.id) // Clients should only see their own tickets
//     .order("created_at", { ascending: false });

//   if (error) {
//     console.error("Error loading tickets:", error.message);
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-semibold">Tickets</h1>
//         <Link href="/tickets/new" className="inline-flex items-center rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">+ New ticket</Link>
//       </div>

//       <div className="bg-white rounded shadow-sm border">
//         <table className="min-w-full text-sm">
//           <thead className="border-b bg-gray-50 text-left text-xs font-semibold text-gray-500">
//             <tr>
//               <th className="px-4 py-2">Title</th>
//               <th className="px-4 py-2">Status</th>
//               <th className="px-4 py-2">Priority</th>
//               <th className="px-4 py-2">Created</th>
//             </tr>
//           </thead>
//           <tbody>
//             {!tickets || tickets.length === 0 ? (
//               <tr>
//                 <td colSpan={4} className="px-4 py-6 text-center text-gray-400">No tickets yet. Click &quot;New ticket&quot; to create the first one.</td>
//               </tr>
//             ) : (
//               tickets.map((ticket) => (
//                 <tr key={ticket.id} className="border-t hover:bg-gray-50 cursor-pointer">
//                   <td className="px-4 py-2">
//                     <Link href={`/tickets/${ticket.id}`} className="text-blue-600 hover:underline">{ticket.title}</Link>
//                   </td>
//                   <td className="px-4 py-2">{ticket.status}</td>
//                   <td className="px-4 py-2">{ticket.priority}</td>
//                   <td className="px-4 py-2 text-xs text-gray-500">{new Date(ticket.created_at).toLocaleString()}</td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }




// import { createSupabaseServerClient } from "@lib/supabase/server"; // Server-side Supabase client import
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";

// export default async function TicketsPage() {
//   const [user, setUser] = useState(null);
//   const [tickets, setTickets] = useState([]);
//   const [userError, setUserError] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchUserAndTickets = async () => {
//       const supabase = await createSupabaseServerClient();

//       // Fetch user session
//       const { data: { user }, error: userError } = await supabase.auth.getUser();
//       if (userError || !user) {
//         console.error("Error fetching user:", userError?.message);
//         setUserError("No user found, please log in.");
//         router.push("/login"); // Redirect to login if no session
//       } else {
//         setUser(user);
//         // Fetch tickets for the logged-in user
//         const { data: tickets, error } = await supabase
//           .from("tickets")
//           .select("id, title, status, priority, created_at")
//           .eq("client_id", user.id)
//           .order("created_at", { ascending: false });

//         if (error) {
//           console.error("Error loading tickets:", error.message);
//         } else {
//           setTickets(tickets);
//         }
//         setLoading(false);
//       }
//     };

//     fetchUserAndTickets();
//   }, [router]);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-semibold">Tickets</h1>
//         <Link href="/tickets/new" className="inline-flex items-center rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">+ New ticket</Link>
//       </div>

//       <div className="bg-white rounded shadow-sm border">
//         <table className="min-w-full text-sm">
//           <thead className="border-b bg-gray-50 text-left text-xs font-semibold text-gray-500">
//             <tr>
//               <th className="px-4 py-2">Title</th>
//               <th className="px-4 py-2">Status</th>
//               <th className="px-4 py-2">Priority</th>
//               <th className="px-4 py-2">Created</th>
//             </tr>
//           </thead>
//           <tbody>
//             {!tickets || tickets.length === 0 ? (
//               <tr>
//                 <td colSpan={4} className="px-4 py-6 text-center text-gray-400">No tickets yet. Click &quot;New ticket&quot; to create the first one.</td>
//               </tr>
//             ) : (
//               tickets.map((ticket) => (
//                 <tr key={ticket.id} className="border-t hover:bg-gray-50 cursor-pointer">
//                   <td className="px-4 py-2">
//                     <Link href={`/tickets/${ticket.id}`} className="text-blue-600 hover:underline">{ticket.title}</Link>
//                   </td>
//                   <td className="px-4 py-2">{ticket.status}</td>
//                   <td className="px-4 py-2">{ticket.priority}</td>
//                   <td className="px-4 py-2 text-xs text-gray-500">{new Date(ticket.created_at).toLocaleString()}</td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }




// "use client";

// import { useRouter } from "next/router";
// import { supabaseClient } from "@lib/supabase/client"; // Ensure the path is correct
// import { useState, useEffect } from "react";

// export default function TicketsPage() {
//   const router = useRouter();
//   const [tickets, setTickets] = useState<any[]>([]);
//   const [user, setUser] = useState<any>(null);
//   const [userError, setUserError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserAndTickets = async () => {
//       try {
//         // Fetch user session
//         const { data, error: userError } = await supabaseClient.auth.getUser();
        
//         if (userError || !data.user) {
//           console.error("Error fetching user:", userError?.message || "No user found");
//           setUserError("Auth session missing!");
//           setLoading(false);
//           router.push("/login"); // Redirect to login if no session
//           return;
//         }

//         setUser(data.user);

//         // Fetch tickets for the logged-in user
//         const { data: ticketsData, error } = await supabaseClient
//           .from("tickets")
//           .select("id, title, status, priority, created_at")
//           .eq("client_id", data.user.id)
//           .order("created_at", { ascending: false });

//         if (error) {
//           console.error("Error loading tickets:", error.message);
//           setTickets([]);  // Set tickets as empty on error
//         } else {
//           setTickets(ticketsData);  // Set tickets if fetched successfully
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setUserError("An error occurred while fetching the data.");
//       } finally {
//         setLoading(false);  // Stop loading once the fetch is complete
//       }
//     };

//     fetchUserAndTickets();
//   }, [router]);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (userError || !user) {
//     return <p>{userError}</p>;  // Display error message if user session is missing
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-semibold">Tickets</h1>
//         <Link href="/tickets/new" className="inline-flex items-center rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">+ New ticket</Link>
//       </div>

//       <div className="bg-white rounded shadow-sm border">
//         <table className="min-w-full text-sm">
//           <thead className="border-b bg-gray-50 text-left text-xs font-semibold text-gray-500">
//             <tr>
//               <th className="px-4 py-2">Title</th>
//               <th className="px-4 py-2">Status</th>
//               <th className="px-4 py-2">Priority</th>
//               <th className="px-4 py-2">Created</th>
//             </tr>
//           </thead>
//           <tbody>
//             {!tickets || tickets.length === 0 ? (
//               <tr>
//                 <td colSpan={4} className="px-4 py-6 text-center text-gray-400">No tickets yet. Click &quot;New ticket&quot; to create the first one.</td>
//               </tr>
//             ) : (
//               tickets.map((ticket) => (
//                 <tr key={ticket.id} className="border-t hover:bg-gray-50 cursor-pointer">
//                   <td className="px-4 py-2">
//                     <Link href={`/tickets/${ticket.id}`} className="text-blue-600 hover:underline">{ticket.title}</Link>
//                   </td>
//                   <td className="px-4 py-2">{ticket.status}</td>
//                   <td className="px-4 py-2">{ticket.priority}</td>
//                   <td className="px-4 py-2 text-xs text-gray-500">{new Date(ticket.created_at).toLocaleString()}</td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


// "use client";  // Marking this as a client-side component

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { supabaseClient } from "@lib/supabase/client";
// import Link from "next/link"; // Correct import for Link

// export default function TicketsPage() {
//   const [tickets, setTickets] = useState<any[]>([]); // Storing tickets
//   const [userError, setUserError] = useState<string | null>(null); // Storing user error
//   const [loading, setLoading] = useState<boolean>(true); // Track loading state
//   const router = useRouter(); // Router for navigation

//   useEffect(() => {
//     // Async function to fetch user and tickets
//     async function fetchTicketsAndUser() {
//       const { data: user, error: userError } = await supabaseClient.auth.getUser();

//       if (userError || !user) {
//         setUserError("No user found, please log in.");
//         router.push("/login"); // Redirect if no user is found
//         return;
//       }

//       // Fetching tickets based on the logged-in user
//       const { data: tickets, error } = await supabaseClient
//         .from("tickets")
//         .select("id, title, status, priority, created_at")
//         .eq("client_id", user.id) // Ensure you're fetching tickets for the logged-in user
//         .order("created_at", { ascending: false });

//       if (error) {
//         console.error("Error loading tickets:", error.message); // Error handling for ticket fetching
//       } else {
//         setTickets(tickets); // Set tickets data
//       }

//       setLoading(false); // Set loading to false after fetching data
//     }

//     fetchTicketsAndUser();
//   }, [router]); // Run effect on component mount and router change

//   if (loading) {
//     return <p>Loading...</p>; // Show loading message until data is fetched
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-semibold">Tickets</h1>
//         <Link href="/tickets/new" className="inline-flex items-center rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
//           + New ticket
//         </Link>
//       </div>

//       <div className="bg-white rounded shadow-sm border">
//         <table className="min-w-full text-sm">
//           <thead className="border-b bg-gray-50 text-left text-xs font-semibold text-gray-500">
//             <tr>
//               <th className="px-4 py-2">Title</th>
//               <th className="px-4 py-2">Status</th>
//               <th className="px-4 py-2">Priority</th>
//               <th className="px-4 py-2">Created</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tickets.length === 0 ? (
//               <tr>
//                 <td colSpan={4} className="px-4 py-6 text-center text-gray-400">
//                   No tickets yet. Click "New ticket" to create the first one.
//                 </td>
//               </tr>
//             ) : (
//               tickets.map((ticket) => (
//                 <tr key={ticket.id} className="border-t hover:bg-gray-50 cursor-pointer">
//                   <td className="px-4 py-2">
//                     <Link href={`/tickets/${ticket.id}`} className="text-blue-600 hover:underline">
//                       {ticket.title}
//                     </Link>
//                   </td>
//                   <td className="px-4 py-2">{ticket.status}</td>
//                   <td className="px-4 py-2">{ticket.priority}</td>
//                   <td className="px-4 py-2 text-xs text-gray-500">{new Date(ticket.created_at).toLocaleString()}</td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabaseClient } from "@lib/supabase/client";

type Ticket = {
  id: string;
  title: string;
  status: string | null;
  priority: string | null;
  created_at: string;
};

export default function TicketsPage() {
  const router = useRouter();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [userError, setUserError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTicketsAndUser() {
      // 1) Get current user
      const {
        data: { user },
        error: uError,
      } = await supabaseClient.auth.getUser();

      if (uError || !user) {
        console.error("Error fetching user:", uError?.message);
        setUserError("No user found, please log in.");
        router.replace("/login");
        return;
      }

      // 2) Fetch tickets for this user
      const { data, error } = await supabaseClient
        .from("tickets")
        .select("id, title, status, priority, created_at")
        .eq("client_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading tickets:", error.message);
      } else {
        setTickets(data ?? []);
      }

      setLoading(false);
    }

    fetchTicketsAndUser();
  }, [router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Tickets</h1>
        <Link
          href="/tickets/new"
          className="inline-flex items-center rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          + New ticket
        </Link>
      </div>

      <div className="bg-white rounded shadow-sm border">
        <table className="min-w-full text-sm">
          <thead className="border-b bg-gray-50 text-left text-xs font-semibold text-gray-500">
            <tr>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Priority</th>
              <th className="px-4 py-2">Created</th>
            </tr>
          </thead>
          <tbody>
            {tickets.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-6 text-center text-gray-400"
                >
                  No tickets yet. Click &quot;New ticket&quot; to create the
                  first one.
                </td>
              </tr>
            ) : (
              tickets.map((ticket) => (
                <tr
                  key={ticket.id}
                  className="border-t hover:bg-gray-50 cursor-pointer"
                >
                  <td className="px-4 py-2">
                    <Link
                      href={`/tickets/${ticket.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {ticket.title}
                    </Link>
                  </td>
                  <td className="px-4 py-2">{ticket.status}</td>
                  <td className="px-4 py-2">{ticket.priority}</td>
                  <td className="px-4 py-2 text-xs text-gray-500">
                    {new Date(ticket.created_at).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {userError && (
        <p className="text-sm text-red-500 mt-2">
          {userError}
        </p>
      )}
    </div>
  );
}




// WORKING CODE 99% ----------------------- - - -- - --  --------- -- - - 


// // app/(protected)/tickets/page.tsx
// import Link from "next/link";
// import { createSupabaseServerClient } from "@lib/supabase/server";

// type TicketRow = {
//   id: string;
//   title: string;
//   status: "open" | "in_progress" | "closed";
//   priority: "low" | "medium" | "high";
//   created_at: string;
// };

// function statusLabel(status: TicketRow["status"]) {
//   if (status === "open") return "Open";
//   if (status === "in_progress") return "In progress";
//   return "Closed";
// }

// function priorityLabel(priority: TicketRow["priority"]) {
//   if (priority === "low") return "Low";
//   if (priority === "medium") return "Medium";
//   return "High";
// }

// export default async function TicketsPage() {
//   const supabase = await createSupabaseServerClient();

//   const { data: tickets, error } = await supabase
//     .from("tickets")
//     .select("id, title, status, priority, created_at")
//     .order("created_at", { ascending: false });

//   if (error) {
//     console.error("Error loading tickets:", error.message);
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-semibold">Tickets</h1>
//           <p className="text-sm text-gray-500">Track all requests for IMM.</p>
//         </div>
//         <Link
//           href="/tickets/new"
//           className="inline-flex items-center rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
//         >
//           + New ticket
//         </Link>
//       </div>

//       <div className="bg-white rounded shadow-sm border">
//         <table className="min-w-full text-sm">
//           <thead className="border-b bg-gray-50 text-left text-xs font-semibold text-gray-500">
//             <tr>
//               <th className="px-4 py-2">Title</th>
//               <th className="px-4 py-2">Status</th>
//               <th className="px-4 py-2">Priority</th>
//               <th className="px-4 py-2">Created</th>
//             </tr>
//           </thead>
//           <tbody>
//             {!tickets || tickets.length === 0 ? (
//               <tr>
//                 <td
//                   colSpan={4}
//                   className="px-4 py-6 text-center text-gray-400"
//                 >
//                   No tickets yet. Click &quot;New ticket&quot; to create the
//                   first one.
//                 </td>
//               </tr>
//             ) : (
//               tickets.map((t: TicketRow) => (
//                 <tr
//                   key={t.id}
//                   className="border-t hover:bg-gray-50 cursor-pointer"
//                 >
//                   <td className="px-4 py-2">
//                     <Link
//                       href={`/tickets/${t.id}`}
//                       className="text-blue-600 hover:underline"
//                     >
//                       {t.title}
//                     </Link>
//                   </td>
//                   <td className="px-4 py-2">{statusLabel(t.status)}</td>
//                   <td className="px-4 py-2">{priorityLabel(t.priority)}</td>
//                   <td className="px-4 py-2 text-xs text-gray-500">
//                     {new Date(t.created_at).toLocaleString()}
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }





// import Link from "next/link";
// import { createSupabaseServerClient } from "@/lib/supabase/server";

// type TicketRow = {
//   id: string;
//   title: string;
//   status: "open" | "in_progress" | "closed";
//   priority: "low" | "medium" | "high";
//   created_at: string;
// };

// function statusLabel(status: TicketRow["status"]) {
//   if (status === "open") return "Open";
//   if (status === "in_progress") return "In progress";
//   return "Closed";
// }

// function priorityLabel(priority: TicketRow["priority"]) {
//   if (priority === "low") return "Low";
//   if (priority === "medium") return "Medium";
//   return "High";
// }

// export default async function TicketsPage() {
//   const supabase = await createSupabaseServerClient();

//   // You can later restrict by company or role
//   const { data: tickets, error } = await supabase
//     .from("tickets")
//     .select("id, title, status, priority, created_at")
//     .order("created_at", { ascending: false });

//   if (error) {
//     console.error("Error loading tickets:", error.message);
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-semibold">Tickets</h1>
//           <p className="text-sm text-gray-500">
//             Track all requests for IMM.
//           </p>
//         </div>
//         <Link
//           href="/tickets/new"
//           className="inline-flex items-center rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
//         >
//           + New ticket
//         </Link>
//       </div>

//       <div className="bg-white rounded shadow-sm border">
//         <table className="min-w-full text-sm">
//           <thead className="border-b bg-gray-50 text-left text-xs font-semibold text-gray-500">
//             <tr>
//               <th className="px-4 py-2">Title</th>
//               <th className="px-4 py-2">Status</th>
//               <th className="px-4 py-2">Priority</th>
//               <th className="px-4 py-2">Created</th>
//             </tr>
//           </thead>
//           <tbody>
//             {!tickets || tickets.length === 0 ? (
//               <tr>
//                 <td
//                   colSpan={4}
//                   className="px-4 py-6 text-center text-gray-400"
//                 >
//                   No tickets yet. Click &quot;New ticket&quot; to create the
//                   first one.
//                 </td>
//               </tr>
//             ) : (
//               tickets.map((t: TicketRow) => (
//                 <tr
//                   key={t.id}
//                   className="border-t hover:bg-gray-50 cursor-pointer"
//                 >
//                   <td className="px-4 py-2">
//                     <Link
//                       href={`/tickets/${t.id}`}
//                       className="text-blue-600 hover:underline"
//                     >
//                       {t.title}
//                     </Link>
//                   </td>
//                   <td className="px-4 py-2">
//                     {statusLabel(t.status)}
//                   </td>
//                   <td className="px-4 py-2">
//                     {priorityLabel(t.priority)}
//                   </td>
//                   <td className="px-4 py-2 text-xs text-gray-500">
//                     {new Date(t.created_at).toLocaleString()}
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
