// app/(protected)/tickets/[id]/page.tsx

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
// import { createSupabaseServerClient } from "@/lib/supabase/server";
// import { supabaseClient } from "@lib/supabase/client";

import { createSupabaseServerClient } from "@lib/supabase/server";  // Adjust path accordingly



// Shape of a ticket row we care about on this page
type Ticket = {
  id: string;
  title: string;
  description: string | null;
  status: "open" | "in_progress" | "closed";
  priority: "low" | "medium" | "high";
  client_id: string;
  attachment_url: string | null;
  created_at: string;
};

type PageProps = {
  // IMPORTANT: in Next 16 params is a Promise
  params: Promise<{ id: string }>;
};

// -------- Server action: close ticket (only owner can close) --------
export async function closeTicketAction(formData: FormData) {
  "use server";

  const ticketId = formData.get("ticketId");
  if (typeof ticketId !== "string" || !ticketId) {
    return;
  }

  const supabase = await createSupabaseServerClient();

  // Logged-in user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login");
  }

  // Let RLS do most of the work, but also filter by client_id for safety
  const { error: updateError } = await supabase
    .from("tickets")
    .update({ status: "closed" })
    .eq("id", ticketId)
    .eq("client_id", user.id);

  if (updateError) {
    console.error("Error closing ticket:", updateError.message);
    return;
  }

  // Refresh this page, the list, and the dashboard
  revalidatePath(`/tickets/${ticketId}`);
  revalidatePath("/tickets");
  revalidatePath("/dashboard");
}

// -------- Page component: ticket details --------
export default async function TicketDetailPage({ params }: PageProps) {
  // ✅ unwrap params Promise (this fixes your error)
  const { id: ticketId } = await params;

  if (!ticketId) {
    redirect("/tickets");
  }

  const supabase = await createSupabaseServerClient();

  // Load ticket
  const { data: ticket, error } = await supabase
    .from("tickets")
    .select(
      "id, title, description, status, priority, client_id, attachment_url, created_at"
    )
    .eq("id", ticketId)
    .single<Ticket>();

  if (error || !ticket) {
    console.error("Error loading ticket:", error?.message);
    redirect("/tickets");
  }

  // Current user to decide if they can close
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isOwner = !!user && user.id === ticket.client_id;
  const isClosed = ticket.status === "closed";
  const canClose = isOwner && !isClosed;

  const statusLabel =
    ticket.status === "open"
      ? "open"
      : ticket.status === "in_progress"
      ? "in progress"
      : "closed";

  const priorityLabel =
    ticket.priority === "low"
      ? "low"
      : ticket.priority === "medium"
      ? "medium"
      : "high";

  return (
    <div className="space-y-4 max-w-2xl">
      <h1 className="text-2xl font-semibold">{ticket.title}</h1>

      <div className="space-y-1 text-sm">
        <p>
          <span className="font-medium">Status:</span> {statusLabel}
        </p>
        <p>
          <span className="font-medium">Priority:</span> {priorityLabel}
        </p>
        <p className="text-xs text-gray-500">
          Created: {new Date(ticket.created_at).toLocaleString()}
        </p>
      </div>

      {ticket.description && (
        <p className="text-sm whitespace-pre-wrap">{ticket.description}</p>
      )}

      {ticket.attachment_url && (
        <p className="text-sm">
          <span className="font-medium">Attachment: </span>
          <a
            href={ticket.attachment_url}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline"
          >
            View file
          </a>
        </p>
      )}

      {canClose ? (
        <form action={closeTicketAction} className="mt-4">
          <input type="hidden" name="ticketId" value={ticket.id} />
          <button
            type="submit"
            className="rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Close ticket
          </button>
        </form>
      ) : (
        <p className="mt-4 text-xs text-gray-500">
          Only the ticket owner can close this ticket, or it is already closed.
        </p>
      )}
    </div>
  );
}







// // app/(protected)/tickets/[id]/page.tsx
// import { redirect } from "next/navigation";
// import { createSupabaseServerClient } from "@/lib/supabase/server";

// type Ticket = {
//   id: string;
//   title: string;
//   description: string | null;
//   status: "open" | "in_progress" | "closed";
//   priority: "low" | "medium" | "high";
//   client_id: string;
//   attachment_url: string | null;
// };

// type PageProps = {
//   params: { id: string };
// };

// export default async function TicketDetailPage({ params }: PageProps) {
//   const supabase = await createSupabaseServerClient();

//   const ticketId = params?.id;

//   if (!ticketId) {
//     redirect("/tickets");
//   }

//   // load ticket
//   const { data: ticket, error } = await supabase
//     .from("tickets")
//     .select(
//       "id, title, description, status, priority, client_id, attachment_url",
//     )
//     .eq("id", ticketId)
//     .single<Ticket>();

//   if (error || !ticket) {
//     console.error("Error loading ticket:", error?.message);
//     redirect("/tickets");
//   }

//   // get current user to decide whether they can close
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   const isOwner = user && ticket.client_id === user.id;
//   const isClosed = ticket.status === "closed";
//   const canClose = isOwner && !isClosed;

//   return (
//     <div className="space-y-4 max-w-2xl">
//       <h1 className="text-2xl font-semibold">{ticket.title}</h1>

//       <div className="space-y-1 text-sm">
//         <p>
//           <span className="font-medium">Status:</span> {ticket.status}
//         </p>
//         <p>
//           <span className="font-medium">Priority:</span> {ticket.priority}
//         </p>
//       </div>

//       {ticket.description && (
//         <p className="text-sm whitespace-pre-wrap">{ticket.description}</p>
//       )}

//       {ticket.attachment_url && (
//         <p className="text-sm">
//           <span className="font-medium">Attachment: </span>
//           <a
//             href={ticket.attachment_url}
//             target="_blank"
//             className="text-blue-600 underline"
//           >
//             View file
//           </a>
//         </p>
//       )}

//       {!canClose && (
//         <p className="text-xs text-gray-500">
//           Only the ticket owner can close this ticket, or it is already closed.
//         </p>
//       )}

//       {/* You can wire your closeTicketAction here with a form if you want */}
//     </div>
//   );
// }





// // app/(protected)/tickets/[id]/page.tsx
// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
// import { createSupabaseServerClient } from "@/lib/supabase/server";

// type PageProps = {
//   // in Next 16 params is a Promise
//   params: Promise<{ id: string }>;
// };

// type Ticket = {
//   id: string;
//   title: string;
//   description: string | null;
//   status: string | null;
//   priority: string | null;
//   created_at: string;
//   client_id: string | null;
//   assignee_id: string | null;
//   company_id: string | null;
//   attachment_url?: string | null;
// };

// function isUuid(v: string) {
//   return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
//     v
//   );
// }

// /** 1) Server action – client can request to close their ticket */
// export async function closeTicketAction(formData: FormData) {
//   "use server";

//   const ticketId = formData.get("ticketId");
//   if (typeof ticketId !== "string" || !isUuid(ticketId)) return;

//   const supabase = await createSupabaseServerClient();

//   const {
//     data: { session },
//     error: authError,
//   } = await supabase.auth.getSession();

//   if (authError || !session) {
//     redirect("/login");
//   }

//   // only close tickets that belong to this client
//   const { error: updateError } = await supabase
//     .from("tickets")
//     .update({ status: "Closed" })
//     .eq("id", ticketId)
//     .eq("client_id", session.user.id);

//   if (updateError) {
//     console.error("Error closing ticket:", updateError.message);
//   }

//   // refresh detail, list, and dashboard
//   revalidatePath(`/tickets/${ticketId}`);
//   revalidatePath("/tickets");
//   revalidatePath("/dashboard");
// }

// /** 2) Page component – ticket details */
// export default async function TicketDetailPage(props: PageProps) {
//   const { id: ticketId } = await props.params;

//   if (!ticketId || !isUuid(ticketId)) {
//     redirect("/tickets");
//   }

//   const supabase = await createSupabaseServerClient();

//   // ensure user is logged in
//   const {
//     data: { session },
//     error: authError,
//   } = await supabase.auth.getSession();

//   if (authError || !session) {
//     redirect("/login");
//   }

//   // load this ticket
//   const { data: ticket, error } = await supabase
//     .from("tickets")
//     .select("*")
//     .eq("id", ticketId)
//     .single<Ticket>();

//   if (error || !ticket) {
//     console.error("Error loading ticket:", error?.message);
//     redirect("/tickets");
//   }

//   const isOwner = ticket.client_id === session.user.id;
//   const isClosed = ticket.status?.toLowerCase() === "closed";
//   const canClose = isOwner && !isClosed;

//   return (
//     <div className="p-8 max-w-2xl">
//       <h1 className="text-3xl font-bold mb-4">{ticket.title}</h1>

//       <p className="mb-2">
//         <span className="font-semibold">Status:</span>{" "}
//         {ticket.status ?? "open"}
//       </p>
//       <p className="mb-2">
//         <span className="font-semibold">Priority:</span>{" "}
//         {ticket.priority ?? "medium"}
//       </p>

//       <p className="mt-4 mb-6 whitespace-pre-wrap">
//         {ticket.description ?? "No description"}
//       </p>

//       {ticket.attachment_url ? (
//         <p className="mb-6">
//           <span className="font-semibold">Attachment:</span>{" "}
//           <a
//             href={ticket.attachment_url}
//             className="text-blue-600 underline"
//             target="_blank"
//           >
//             Download file
//           </a>
//         </p>
//       ) : null}

//       {canClose ? (
//         <form action={closeTicketAction}>
//           <input type="hidden" name="ticketId" value={ticket.id} />
//           <button
//             type="submit"
//             className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
//           >
//             Close ticket
//           </button>
//         </form>
//       ) : (
//         <p className="text-sm text-gray-600">
//           Only the ticket owner can close this ticket, or it is already closed.
//         </p>
//       )}
//     </div>
//   );
// }





// // WORKING CODE. -------- - - -- -  -  --------- - - -- - - - - ---


// // app/(protected)/tickets/[id]/page.tsx
// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
// import { createSupabaseServerClient } from "@/lib/supabase/server";

// type PageProps = {
//   // 👇 params is now a Promise
//   params: Promise<{ id: string }>;
// };

// type Ticket = {
//   id: string;
//   title: string;
//   description: string | null;
//   status: string | null;
//   priority: string | null;
//   created_at: string;
//   client_id: string | null;
//   assignee_id: string | null;
//   company_id: string | null;
// };

// function isUuid(v: string) {
//   return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
//     v
//   );
// }

// /** Server action: close ticket (only owner can close) */
// export async function closeTicketAction(formData: FormData) {
//   "use server";

//   const ticketId = formData.get("ticketId");
//   if (typeof ticketId !== "string" || !isUuid(ticketId)) return;

//   const supabase = await createSupabaseServerClient();

//   const {
//     data: { session },
//     error: authError,
//   } = await supabase.auth.getSession();

//   if (authError || !session) {
//     redirect("/login");
//   }

//   const { error: updateError } = await supabase
//     .from("tickets")
//     .update({ status: "Closed" })
//     .eq("id", ticketId)
//     .eq("client_id", session.user.id);

//   if (updateError) {
//     console.error("Error closing ticket:", updateError.message);
//   }

//   revalidatePath(`/tickets/${ticketId}`);
//   revalidatePath("/tickets");
//   revalidatePath("/dashboard");
// }

// /** Page – ticket details */
// export default async function TicketDetailPage(props: PageProps) {
//   // 👇 UNWRAP params
//   const { id: ticketId } = await props.params;

//   if (!ticketId || !isUuid(ticketId)) {
//     redirect("/tickets");
//   }

//   const supabase = await createSupabaseServerClient();

//   const {
//     data: { session },
//     error: authError,
//   } = await supabase.auth.getSession();

//   if (authError || !session) {
//     redirect("/login");
//   }

//   const { data: ticket, error } = await supabase
//     .from("tickets")
//     .select("*")
//     .eq("id", ticketId)
//     .single<Ticket>();

//   if (error || !ticket) {
//     console.error("Error loading ticket:", error?.message);
//     redirect("/tickets");
//   }

//   const isOwner = ticket.client_id === session.user.id;
//   const isClosed = ticket.status?.toLowerCase() === "closed";
//   const canClose = isOwner && !isClosed;

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-semibold mb-4">{ticket.title}</h1>

//       <p className="mb-2">
//         <span className="font-semibold">Status:</span>{" "}
//         {ticket.status ?? "Open"}
//       </p>
//       <p className="mb-2">
//         <span className="font-semibold">Priority:</span>{" "}
//         {ticket.priority ?? "Medium"}
//       </p>

//       <p className="mb-4 whitespace-pre-wrap">
//         {ticket.description ?? "No description"}
//       </p>

//       {canClose ? (
//         <form action={closeTicketAction}>
//           <input type="hidden" name="ticketId" value={ticket.id} />
//           <button
//             type="submit"
//             className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
//           >
//             Close ticket
//           </button>
//         </form>
//       ) : (
//         <p className="text-sm text-gray-500">
//           Only the ticket owner can close this ticket, or it is already closed.
//         </p>
//       )}
//     </div>
//   );
// }



















// SECOND WORKING CODE


// // app/(protected)/tickets/[id]/page.tsx
// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
// import { createSupabaseServerClient } from "@/lib/supabase/server";

// type PageProps = {
//   params: { id: string };
// };

// type Ticket = {
//   id: string;
//   title: string;
//   description: string | null;
//   status: string | null;
//   priority: string | null;
//   created_at: string;
//   client_id: string | null;
//   assignee_id: string | null;
// };

// // Small helper so we never query Postgres with "undefined" as uuid
// function isUuid(v: string) {
//   return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
//     v
//   );
// }

// /**
//  * Server action – close ticket (only owner can close their own ticket)
//  */
// export async function closeTicketAction(formData: FormData) {
//   "use server";

//   const ticketId = formData.get("ticketId");
//   if (typeof ticketId !== "string" || !isUuid(ticketId)) {
//     // bad id – just ignore
//     return;
//   }

//   const supabase = await createSupabaseServerClient();

//   // Logged-in user
//   const {
//     data: { session },
//     error: authError,
//   } = await supabase.auth.getSession();

//   if (authError || !session) {
//     redirect("/login");
//   }

//   // Only allow the owner (client_id) to close their own ticket.
//   // RLS on "tickets" will still enforce this on the DB side.
//   const { error: updateError } = await supabase
//     .from("tickets")
//     .update({ status: "Closed" })
//     .eq("id", ticketId)
//     .eq("client_id", session.user.id);

//   if (updateError) {
//     console.error("Error closing ticket:", updateError.message);
//   }

//   // Refresh this page, the tickets list and the dashboard
//   revalidatePath(`/tickets/${ticketId}`);
//   revalidatePath("/tickets");
//   revalidatePath("/dashboard");
// }

// /**
//  * Page component – ticket details
//  */
// export default async function TicketDetailPage({ params }: PageProps) {
//   const ticketId = params?.id;

//   // Guard against /tickets/undefined etc.
//   if (!ticketId || !isUuid(ticketId)) {
//     redirect("/tickets");
//   }

//   const supabase = await createSupabaseServerClient();

//   // Make sure user is logged in
//   const {
//     data: { session },
//     error: authError,
//   } = await supabase.auth.getSession();

//   if (authError || !session) {
//     redirect("/login");
//   }

//   // Load this ticket
//   const { data: ticket, error } = await supabase
//     .from("tickets")
//     .select("*")
//     .eq("id", ticketId)
//     .single<Ticket>();

//   if (error || !ticket) {
//     console.error("Error loading ticket:", error?.message);
//     redirect("/tickets");
//   }

//   const isOwner = ticket.client_id === session.user.id;
//   const isClosed = ticket.status?.toLowerCase() === "closed";
//   const canClose = isOwner && !isClosed;

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-semibold mb-4">{ticket.title}</h1>

//       <p className="mb-2">
//         <span className="font-semibold">Status:</span>{" "}
//         {ticket.status ?? "Open"}
//       </p>
//       <p className="mb-2">
//         <span className="font-semibold">Priority:</span>{" "}
//         {ticket.priority ?? "Medium"}
//       </p>
//       <p className="mb-4 whitespace-pre-wrap">
//         {ticket.description ?? "No description"}
//       </p>

//       {canClose && (
//         <form action={closeTicketAction}>
//           <input type="hidden" name="ticketId" value={ticket.id} />
//           <button
//             type="submit"
//             className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
//           >
//             Close ticket
//           </button>
//         </form>
//       )}

//       {!canClose && (
//         <p className="text-sm text-gray-500">
//           Only the ticket owner can close this ticket, and it is already closed.
//         </p>
//       )}
//     </div>
//   );
// }




// OLD WORKING CODE ---------------------

// // app/(protected)/tickets/[id]/page.tsx

// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
// import { createSupabaseServerClient } from "@/lib/supabase/server";
// import type { Database } from "@/lib/supabase/types";

// type Ticket = Database["public"]["Tables"]["tickets"]["Row"];

// type PageProps = {
//   params: { id: string };
// };

// // 1) Server action – client can request to close their ticket.
// // RLS on "tickets" will make sure only allowed users can actually
// // update the row on the database side.
// export async function closeTicketAction(formData: FormData) {
//   "use server";

//   const ticketId = formData.get("ticketId");
//   if (typeof ticketId !== "string" || !ticketId) return;

//   const supabase = await createSupabaseServerClient();

//   const { error: updateError } = await supabase
//     .from("tickets")
//     .update({ status: "Closed" })
//     .eq("id", ticketId);

//   if (updateError) {
//     console.error("Error closing ticket:", updateError.message);
//     return;
//   }

//   // Refresh this page, the list page, and the dashboard
//   revalidatePath(`/tickets/${ticketId}`);
//   revalidatePath("/tickets");
//   revalidatePath("/dashboard");
// }

// // 2) Page component – ticket details
// export default async function TicketDetailPage({ params }: PageProps) {
//   const supabase = await createSupabaseServerClient();

//   // Just load the ticket. Auth / visibility is enforced by RLS.
//   const { data: ticket, error } = await supabase
//     .from("tickets")
//     .select("*")
//     .eq("id", params.id)
//     .single<Ticket>();

//   if (error || !ticket) {
//     // Ticket not found OR RLS blocked it -> go back to list
//     console.error("Error loading ticket:", error?.message);
//     redirect("/tickets");
//   }

//   const isClosed = ticket.status?.toLowerCase() === "closed";

//   // ---- your existing JSX goes here ----
//   return (
//     <div className="p-6">
//       <h1 className="text-xl font-semibold mb-4">{ticket.title}</h1>
//       <p className="mb-2">Status: {ticket.status}</p>
//       <p className="mb-4">Priority: {ticket.priority}</p>
//       <p className="mb-6 whitespace-pre-line">{ticket.description}</p>

//       {!isClosed && (
//         <form action={closeTicketAction}>
//           <input type="hidden" name="ticketId" value={ticket.id} />
//           <button
//             type="submit"
//             className="rounded bg-blue-600 px-4 py-2 text-white"
//           >
//             Close ticket
//           </button>
//         </form>
//       )}
//     </div>
//   );
// }




