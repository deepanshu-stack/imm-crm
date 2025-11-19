'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const VALID_PRIORITIES = ['low', 'medium', 'high'] as const;
type Priority = (typeof VALID_PRIORITIES)[number];

export default function NewTicketPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [attachment, setAttachment] = useState<File | null>(null);
  const router = useRouter();

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('priority', priority);

    if (attachment) {
      formData.append('attachment', attachment);
    }

    try {
      console.log('Sending request to /api/createTicket');

      const response = await fetch('/api/createTicket', {
        method: 'POST',
        // ⛔️ DO NOT set Content-Type here – browser will set multipart boundary
        body: formData,
        credentials: 'same-origin', // Ensure cookies are sent for auth
      });

      console.log('Response status:', response.status);
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        console.error('API error:', result?.message ?? response.statusText);
        throw new Error(result?.message ?? 'Network response was not ok');
      }

      console.log('API response:', result);

      if (result?.success) {
        router.push('/tickets');
      } else {
        console.error('Error creating ticket:', result?.message);
      }
    } catch (error) {
      console.error('Error creating ticket:', (error as Error).message);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">New ticket</h1>
      <p className="text-sm text-gray-500">
        Create a new request / issue for the IMM team.
      </p>

      <form
        onSubmit={handleFormSubmit}
        className="space-y-4 max-w-xl bg-white border rounded p-4 shadow-sm"
      >
        <div className="space-y-1">
          <label htmlFor="title" className="text-sm font-medium">
            Title
          </label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full rounded border px-3 py-2 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="description" className="text-sm font-medium">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="w-full rounded border px-3 py-2 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="priority" className="text-sm font-medium">
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            className="w-full rounded border px-3 py-2 text-sm"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="space-y-1">
          <label htmlFor="attachment" className="text-sm font-medium">
            Attachment (optional)
          </label>
          <input
            id="attachment"
            type="file"
            className="block w-full text-sm"
            onChange={(e) =>
              setAttachment(e.target.files ? e.target.files[0] : null)
            }
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white"
          >
            Create ticket
          </button>
          <a
            href="/tickets"
            className="rounded border px-4 py-2 text-sm font-medium text-gray-700"
          >
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}

// WORKING CODE 99% ------------ --- -- - - -- -- - - - -- - -- - - 

// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// const VALID_PRIORITIES = ['low', 'medium', 'high'] as const;
// type Priority = typeof VALID_PRIORITIES[number];

// export default function NewTicketPage() {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [priority, setPriority] = useState<Priority>('medium');
//   const [attachment, setAttachment] = useState<File | null>(null);
//   const router = useRouter();

//   const handleFormSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('description', description);
//     formData.append('priority', priority);

//     if (attachment) {
//       formData.append('attachment', attachment);
//     }

//     try {
//       console.log('Sending request to /api/createTicket');

//       const response = await fetch('/api/createTicket', {
//         method: 'POST',
//         // ⛔️ DO NOT set Content-Type here – browser will set multipart boundary
//         body: formData,
//         credentials: 'same-origin', // Ensure cookies are sent for auth
//       });

//       console.log('Response status:', response.status);
//       const result = await response.json().catch(() => null);

//       if (!response.ok) {
//         console.error('API error:', result?.message ?? response.statusText);
//         throw new Error(result?.message ?? 'Network response was not ok');
//       }

//       console.log('API response:', result);

//       if (result?.success) {
//         router.push('/tickets');
//       } else {
//         console.error('Error creating ticket:', result?.message);
//       }
//     } catch (error) {
//       console.error('Error creating ticket:', (error as Error).message);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-semibold">New ticket</h1>
//       <p className="text-sm text-gray-500">
//         Create a new request / issue for the IMM team.
//       </p>

//       <form onSubmit={handleFormSubmit} className="space-y-4 max-w-xl bg-white border rounded p-4 shadow-sm">
//         <div className="space-y-1">
//           <label htmlFor="title" className="text-sm font-medium">
//             Title
//           </label>
//           <input
//             id="title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//             className="w-full rounded border px-3 py-2 text-sm"
//           />
//         </div>

//         <div className="space-y-1">
//           <label htmlFor="description" className="text-sm font-medium">
//             Description
//           </label>
//           <textarea
//             id="description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             rows={5}
//             className="w-full rounded border px-3 py-2 text-sm"
//           />
//         </div>

//         <div className="space-y-1">
//           <label htmlFor="priority" className="text-sm font-medium">
//             Priority
//           </label>
//           <select
//             id="priority"
//             value={priority}
//             onChange={(e) => setPriority(e.target.value as Priority)}
//             className="w-full rounded border px-3 py-2 text-sm"
//           >
//             <option value="low">Low</option>
//             <option value="medium">Medium</option>
//             <option value="high">High</option>
//           </select>
//         </div>

//         <div className="space-y-1">
//           <label htmlFor="attachment" className="text-sm font-medium">
//             Attachment (optional)
//           </label>
//           <input
//             id="attachment"
//             type="file"
//             className="block w-full text-sm"
//             onChange={(e) =>
//               setAttachment(e.target.files ? e.target.files[0] : null)
//             }
//           />
//         </div>

//         <div className="flex gap-2">
//           <button
//             type="submit"
//             className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white"
//           >
//             Create ticket
//           </button>
//           <a
//             href="/tickets"
//             className="rounded border px-4 py-2 text-sm font-medium text-gray-700"
//           >
//             Cancel
//           </a>
//         </div>
//       </form>
//     </div>
//   );
// }


// // app/(protected)/tickets/new/page.tsx
// import { redirect } from "next/navigation";
// import { revalidatePath } from "next/cache";
// import { createSupabaseServerClient } from "@lib/supabase/server";

// const VALID_PRIORITIES = ["low", "medium", "high"] as const;
// type Priority = (typeof VALID_PRIORITIES)[number];

// // ---------- SERVER ACTION ----------
// export async function createTicketAction(formData: FormData) {
//   "use server";

//   const supabase = await createSupabaseServerClient();

//   // 1) Auth: get current user
//   const {
//     data: { user },
//     error: userError,
//   } = await supabase.auth.getUser();

//   if (userError || !user) {
//     console.error("Auth error in createTicketAction:", userError?.message);
//     redirect("/login");
//   }

//   const userId = user.id;

//   // 2) Load profile to get company_id + confirm client exists
//   const {
//     data: profile,
//     error: profileError,
//   } = await supabase
//     .from("profiles")
//     .select("id, company_id")
//     .eq("id", userId)
//     .single();

//   if (profileError || !profile) {
//     console.error("Profile error:", profileError?.message);
//     throw new Error("No profile found for this user. Cannot create ticket.");
//   }

//   const companyId = profile.company_id;

//   // 3) Read and validate form fields
//   const title = (formData.get("title") as string | null)?.trim() ?? "";
//   const description =
//     (formData.get("description") as string | null)?.trim() ?? "";

//   let rawPriority = (formData.get("priority") as string | null)?.toLowerCase();
//   const priority: Priority = VALID_PRIORITIES.includes(
//     rawPriority as Priority,
//   )
//     ? (rawPriority as Priority)
//     : "medium";

//   if (!title) {
//     throw new Error("Title is required.");
//   }

//   // 4) Optional file upload to Storage
//   const file = formData.get("attachment") as File | null;
//   let attachmentUrl: string | null = null;

//   if (file && file.size > 0) {
//     const ext = file.name.split(".").pop() || "bin";
//     const path = `${userId}/${crypto.randomUUID()}.${ext}`;

//     // NOTE: bucket must exist: "ticket-attachments"
//     const { error: uploadError } = await supabase.storage
//       .from("ticket-attachments")
//       .upload(path, file, {
//         cacheControl: "3600",
//         upsert: false,
//       });

//     if (uploadError) {
//       console.error("Attachment upload error:", uploadError.message);
//       // You can choose to throw or ignore; here we ignore & continue
//     } else {
//       const {
//         data: { publicUrl },
//       } = supabase.storage.from("ticket-attachments").getPublicUrl(path);
//       attachmentUrl = publicUrl;
//     }
//   }

//   // 5) Insert ticket (status 'open', client_id + company_id from profile)
//   const { error: insertError } = await supabase.from("tickets").insert({
//     title,
//     description,
//     status: "open",
//     priority, // "low" | "medium" | "high" – matches check constraint
//     client_id: profile.id,
//     company_id: companyId,
//     attachment_url: attachmentUrl,
//   });

//   if (insertError) {
//     console.error("Error creating ticket:", insertError.message);
//     throw new Error("Error creating ticket: " + insertError.message);
//   }

//   // 6) Revalidate list + dashboard and redirect
//   revalidatePath("/tickets");
//   revalidatePath("/dashboard");
//   redirect("/tickets");
// }

// // ---------- PAGE COMPONENT ----------
// export default function NewTicketPage() {
//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-2xl font-semibold">New ticket</h1>
//         <p className="text-sm text-gray-500">
//           Create a new request / issue for the IMM team.
//         </p>
//       </div>

//       <form
//         action={createTicketAction}
//         className="space-y-4 max-w-xl bg-white border rounded p-4 shadow-sm"
//       >
//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="title">
//             Title
//           </label>
//           <input
//             id="title"
//             name="title"
//             required
//             className="w-full rounded border px-3 py-2 text-sm"
//             placeholder="Short summary"
//           />
//         </div>

//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="description">
//             Description
//           </label>
//           <textarea
//             id="description"
//             name="description"
//             rows={5}
//             className="w-full rounded border px-3 py-2 text-sm"
//             placeholder="Describe the issue or request"
//           />
//         </div>

//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="priority">
//             Priority
//           </label>
//           <select
//             id="priority"
//             name="priority"
//             defaultValue="medium"
//             className="w-full rounded border px-3 py-2 text-sm"
//           >
//             <option value="low">Low</option>
//             <option value="medium">Medium</option>
//             <option value="high">High</option>
//           </select>
//         </div>

//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="attachment">
//             Attachment (optional)
//           </label>
//           <input
//             id="attachment"
//             name="attachment"
//             type="file"
//             className="block w-full text-sm"
//           />
//           <p className="text-xs text-gray-400">
//             You can upload screenshots, PDFs, etc.
//           </p>
//         </div>

//         <div className="flex gap-2">
//           <button
//             type="submit"
//             className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
//           >
//             Create ticket
//           </button>

//           <a
//             href="/tickets"
//             className="rounded border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
//           >
//             Cancel
//           </a>
//         </div>
//       </form>
//     </div>
//   );
// }





// // app/(protected)/tickets/new/page.tsx

// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// const VALID_PRIORITIES = ['low', 'medium', 'high'] as const;
// type Priority = typeof VALID_PRIORITIES[number];

// export default function NewTicketPage() {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [priority, setPriority] = useState<Priority>('medium');
//   const [attachment, setAttachment] = useState<File | null>(null);
//   const router = useRouter();

//   const handleFormSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     console.log('Form submitted');

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('description', description);
//     formData.append('priority', priority);

//     if (attachment) {
//         formData.append('attachment', attachment);
//         console.log('Attachment added');
//     }

//     try {
//         console.log('Sending request to /api/createTicket');

//         const response = await fetch('/api/createTicket', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 title,
//                 description,
//                 priority,
//                 attachment: attachment ? URL.createObjectURL(attachment) : null,
//             }),
//         });

//         // Log the response status
//         console.log('Response status:', response.status);

//         if (!response.ok) {
//             console.error('Network response was not ok:', response.statusText);
//             throw new Error('Network response was not ok');
//         }

//         const result = await response.json();

//         console.log('API response:', result);

//         if (result.success) {
//             console.log('Ticket created successfully');
//             router.push('/tickets'); // Redirect to the ticket list on success
//         } else {
//             console.error('Error creating ticket:', result.message);
//         }
//     } catch (error) {
//         console.error('Error creating ticket:', (error as Error).message);
//     }
// };


//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-semibold">New ticket</h1>
//       <p className="text-sm text-gray-500">Create a new request / issue for the IMM team.</p>

//       <form onSubmit={handleFormSubmit} className="space-y-4 max-w-xl bg-white border rounded p-4 shadow-sm">
//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="title">Title</label>
//           <input
//             id="title"
//             name="title"
//             required
//             className="w-full rounded border px-3 py-2 text-sm"
//             placeholder="Short summary"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </div>

//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="description">Description</label>
//           <textarea
//             id="description"
//             name="description"
//             rows={5}
//             className="w-full rounded border px-3 py-2 text-sm"
//             placeholder="Describe the issue or request"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </div>

//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="priority">Priority</label>
//           <select
//             id="priority"
//             name="priority"
//             value={priority}
//             onChange={(e) => setPriority(e.target.value as Priority)}
//             className="w-full rounded border px-3 py-2 text-sm"
//           >
//             <option value="low">Low</option>
//             <option value="medium">Medium</option>
//             <option value="high">High</option>
//           </select>
//         </div>

//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="attachment">Attachment (optional)</label>
//           <input
//             id="attachment"
//             name="attachment"
//             type="file"
//             className="block w-full text-sm"
//           />
//           <p className="text-xs text-gray-400">
//             You can upload screenshots, PDFs, etc.
//           </p>
//         </div>

//         <div className="flex gap-2">
//           <button
//             type="submit"
//             className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
//           >
//             Create ticket
//           </button>

//           <a
//             href="/tickets"
//             className="rounded border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
//           >
//             Cancel
//           </a>
//         </div>
//       </form>
//     </div>
//   );
// }


// // app/(protected)/tickets/new/page.tsx

// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// const VALID_PRIORITIES = ['low', 'medium', 'high'] as const;
// type Priority = typeof VALID_PRIORITIES[number];

// export default function NewTicketPage() {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [priority, setPriority] = useState<Priority>('medium');
//   const [attachment, setAttachment] = useState<File | null>(null);
//   const router = useRouter();

//   const handleFormSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     console.log('Form submitted');

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('description', description);
//     formData.append('priority', priority);

//     if (attachment) {
//         formData.append('attachment', attachment);
//         console.log('Attachment added');
//     }

//     try {
//         console.log('Sending request to /api/createTicket');

//         const response = await fetch('/api/createTicket', {
//             method: 'POST',
//             // ⛔️ DO NOT set Content-Type here – browser will set multipart boundary
//             body: formData,
//             credentials: 'same-origin', // Ensure cookies are sent for auth
//         });

//         // Log the response status
//         console.log('Response status:', response.status);

//         if (!response.ok) {
//             console.error('Network response was not ok:', response.statusText);
//             throw new Error('Network response was not ok');
//         }

//         const result = await response.json();

//         console.log('API response:', result);

//         if (result.success) {
//             console.log('Ticket created successfully');
//             router.push('/tickets'); // Redirect to the ticket list on success
//         } else {
//             console.error('Error creating ticket:', result.message);
//         }
//     } catch (error) {
//         console.error('Error creating ticket:', (error as Error).message);
//     }
// };


//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-semibold">New ticket</h1>
//       <p className="text-sm text-gray-500">Create a new request / issue for the IMM team.</p>

//       <form onSubmit={handleFormSubmit} className="space-y-4 max-w-xl bg-white border rounded p-4 shadow-sm">
//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="title">Title</label>
//           <input
//             id="title"
//             name="title"
//             required
//             className="w-full rounded border px-3 py-2 text-sm"
//             placeholder="Short summary"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </div>

//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="description">Description</label>
//           <textarea
//             id="description"
//             name="description"
//             rows={5}
//             className="w-full rounded border px-3 py-2 text-sm"
//             placeholder="Describe the issue or request"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </div>

//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="priority">Priority</label>
//           <select
//             id="priority"
//             name="priority"
//             value={priority}
//             onChange={(e) => setPriority(e.target.value as Priority)}
//             className="w-full rounded border px-3 py-2 text-sm"
//           >
//             <option value="low">Low</option>
//             <option value="medium">Medium</option>
//             <option value="high">High</option>
//           </select>
//         </div>

//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="attachment">Attachment (optional)</label>
//           <input
//             id="attachment"
//             name="attachment"
//             type="file"
//             className="block w-full text-sm"
//             onChange={(e) => setAttachment(e.target.files ? e.target.files[0] : null)}
//           />
//           <p className="text-xs text-gray-400">You can upload screenshots, PDFs, etc.</p>
//         </div>

//         <div className="flex gap-2">
//           <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
//             Create ticket
//           </button>

//           <a
//             href="/tickets"
//             className="rounded border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
//           >
//             Cancel
//           </a>
//         </div>
//       </form>
//     </div>
//   );
// }


// // app/(protected)/tickets/new/page.tsx

// // 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// const VALID_PRIORITIES = ['low', 'medium', 'high'] as const;
// type Priority = typeof VALID_PRIORITIES[number];

// export default function NewTicketPage() {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [priority, setPriority] = useState<Priority>('medium');
//   const [attachment, setAttachment] = useState<File | null>(null);
//   const router = useRouter();

//   const handleFormSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     console.log('Form submitted');

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('description', description);
//     formData.append('priority', priority);

//     if (attachment) {
//         formData.append('attachment', attachment);
//         console.log('Attachment added');
//     }

//     try {
//         console.log('Sending request to /api/createTicket');

//         const response = await fetch('/api/createTicket', {
//             method: 'POST',
//             // ⛔️ DO NOT set Content-Type here – browser will set multipart boundary
//             body: formData,
//             credentials: 'same-origin', // Ensure cookies are sent for auth
//         });

//         // Log the response status
//         console.log('Response status:', response.status);

//         if (!response.ok) {
//             console.error('Network response was not ok:', response.statusText);
//             throw new Error('Network response was not ok');
//         }

//         const result = await response.json();

//         console.log('API response:', result);

//         if (result.success) {
//             console.log('Ticket created successfully');
//             router.push('/tickets'); // Redirect to the ticket list on success
//         } else {
//             console.error('Error creating ticket:', result.message);
//         }
//     } catch (error) {
//         console.error('Error creating ticket:', (error as Error).message);
//     }
// };


//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-semibold">New ticket</h1>
//       <p className="text-sm text-gray-500">Create a new request / issue for the IMM team.</p>

//       <form onSubmit={handleFormSubmit} className="space-y-4 max-w-xl bg-white border rounded p-4 shadow-sm">
//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="title">Title</label>
//           <input
//             id="title"
//             name="title"
//             required
//             className="w-full rounded border px-3 py-2 text-sm"
//             placeholder="Short summary"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </div>

//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="description">Description</label>
//           <textarea
//             id="description"
//             name="description"
//             rows={5}
//             className="w-full rounded border px-3 py-2 text-sm"
//             placeholder="Describe the issue or request"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </div>

//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="priority">Priority</label>
//           <select
//             id="priority"
//             name="priority"
//             value={priority}
//             onChange={(e) => setPriority(e.target.value as Priority)}
//             className="w-full rounded border px-3 py-2 text-sm"
//           >
//             <option value="low">Low</option>
//             <option value="medium">Medium</option>
//             <option value="high">High</option>
//           </select>
//         </div>

//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="attachment">Attachment (optional)</label>
//           <input
//             id="attachment"
//             name="attachment"
//             type="file"
//             className="block w-full text-sm"
//             onChange={(e) => setAttachment(e.target.files ? e.target.files[0] : null)}
//           />
//           <p className="text-xs text-gray-400">You can upload screenshots, PDFs, etc.</p>
//         </div>

//         <div className="flex gap-2">
//           <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
//             Create ticket
//           </button>

//           <a
//             href="/tickets"
//             className="rounded border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
//           >
//             Cancel
//           </a>
//         </div>
//       </form>
//     </div>
//   );
// }


// // app/(protected)/tickets/new/page.tsx

// // 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// const VALID_PRIORITIES = ['low', 'medium', 'high'] as const;
// type Priority = typeof VALID_PRIORITIES[number];

// export default function NewTicketPage() {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [priority, setPriority] = useState<Priority>('medium');
//   const [attachment, setAttachment] = useState<File | null>(null);
//   const router = useRouter();

//   const handleFormSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     console.log('Form submitted');

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('description', description);
//     formData.append('priority', priority);

//     if (attachment) {
//         formData.append('attachment', attachment);
//         console.log('Attachment added');
//     }

//     try {
//         console.log('Sending request to /api/createTicket');

//         const response = await fetch('/api/createTicket', {
//             method: 'POST',
//             // ⛔️ DO NOT set Content-Type here – browser will set multipart boundary
//             body: formData,
//             credentials: 'same-origin', // Ensure cookies are sent for auth
//         });

//         // Log the response status
//         console.log('Response status:', response.status);

//         if (!response.ok) {
//             console.error('Network response was not ok:', response.statusText);
//             throw new Error('Network response was not ok');
//         }

//         const result = await response.json();

//         console.log('API response:', result);

//         if (result.success) {
//             console.log('Ticket created successfully');
//             router.push('/tickets'); // Redirect to the ticket list on success
//         } else {
//             console.error('Error creating ticket:', result.message);
//         }
//     } catch (error) {
//         console.error('Error creating ticket:', (error as Error).message);
//     }
// };


//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-semibold">New ticket</h1>
//       <p className="text-sm text-gray-500">Create a new request / issue for the IMM team.</p>

//       <form onSubmit={handleFormSubmit} className="space-y-4 max-w-xl bg-white border rounded p-4 shadow-sm">
//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="title">Title</label>
//           <input
//             id="title"
//             name="title"
//             required
//             className="w-full rounded border px-3 py-2 text-sm"
//             placeholder="Short summary"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </div>

//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="description">Description</label>
//           <textarea
//             id="description"
//             name="description"
//             rows={5}
//             className="w-full rounded border px-3 py-2 text-sm"
//             placeholder="Describe the issue or request"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </div>

//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="priority">Priority</label>
//           <select
//             id="priority"
//             name="priority"
//             value={priority}
//             onChange={(e) => setPriority(e.target.value as Priority)}
//             className="w-full rounded border px-3 py-2 text-sm"
//           >
//             <option value="low">Low</option>
//             <option value="medium">Medium</option>
//             <option value="high">High</option>
//           </select>
//         </div>

//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="attachment">Attachment (optional)</label>
//           <input
//             id="attachment"
//             name="attachment"
//             type="file"
//             className="block w-full text-sm"
//             onChange={(e) => setAttachment(e.target.files ? e.target.files[0] : null)}
//           />
//           <p className="text-xs text-gray-400">You can upload screenshots, PDFs, etc.</p>
//         </div>

//         <div className="flex gap-2">
//           <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
//             Create ticket
//           </button>

//           <a
//             href="/tickets"
//             className="rounded border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
//           >
//             Cancel
//           </a>
//         </div>
//       </form>
//     </div>
//   );
// }


// // app/(protected)/tickets/new/page.tsx

// // 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// const VALID_PRIORITIES = ['low', 'medium', 'high'] as const;
// type Priority = typeof VALID_PRIORITIES[number];

// export default function NewTicketPage() {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [priority, setPriority] = useState<Priority>('medium');
//   const [attachment, setAttachment] = useState<File | null>(null);
//   const router = useRouter();

//   const handleFormSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     console.log('Form submitted');

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('description', description);
//     formData.append('priority', priority);

//     if (attachment) {
//         formData.append('attachment', attachment);
//         console.log('Attachment added');
//     }

//     try {
//         console.log('Sending request to /api/createTicket');

//         const response = await fetch('/api/createTicket', {
//             method: 'POST',
//             // ⛔️ DO NOT set Content-Type here – browser will set multipart boundary
//             body: formData,
//             credentials: 'same-origin', // Ensure cookies are sent for auth
//         });

//         // Log the response status
//         console.log('Response status:', response.status);

//         if (!response.ok) {
//             console.error('Network response was not ok:', response.statusText);
//             throw new Error('Network response was not ok');
//         }

//         const result = await response.json();

//         console.log('API response:', result);

//         if (result.success) {
//             console.log('Ticket created successfully');
//             router.push('/tickets'); // Redirect to the ticket list on success
//         } else {
//             console.error('Error creating ticket:', result.message);
//         }
//     } catch (error) {
//         console.error('Error creating ticket:', (error as Error).message);
//     }
// };


//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-semibold">New ticket</h1>
//       <p className="text-sm text-gray-500">Create a new request / issue for the IMM team.</p>

//       <form onSubmit={handleFormSubmit} className="space-y-4 max-w-xl bg-white border rounded p-4 shadow-sm">
//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="title">Title</label>
//           <input
//             id="title"
//             name="title"
//             required
//             className="w-full rounded border px-3 py-2 text-sm"
//             placeholder="Short summary"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </div>

//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="description">Description</label>
//           <textarea
//             id="description"
//             name="description"
//             rows={5}
//             className="w-full rounded border px-3 py-2 text-sm"
//             placeholder="Describe the issue or request"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </div>

//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="priority">Priority</label>
//           <select
//             id="priority"
//             name="priority"
//             value={priority}
//             onChange={(e) => setPriority(e.target.value as Priority)}
//             className="w-full rounded border px-3 py-2 text-sm"
//           >
//             <option value="low">Low</option>
//             <option value="medium">Medium</option>
//             <option value="high">High</option>
//           </select>
//         </div>

//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="attachment">Attachment (optional)</label>
//           <input
//             id="attachment"
//             name="attachment"
//             type="file"
//             className="block w-full text-sm"
//             onChange={(e) => setAttachment(e.target.files ? e.target.files[0] : null)}
//           />
//           <p className="text-xs text-gray-400">You can upload screenshots, PDFs, etc.</p>
//         </div>

//         <div className="flex gap-2">
//           <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
//             Create ticket
//           </button>

//           <a
//             href="/tickets"
//             className="rounded border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
//           >
//             Cancel
//           </a>
//         </div>
//       </form>
//     </div>
//   );
// }


// // app/(protected)/tickets/new/page.tsx

// // 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// const VALID_PRIORITIES = ['low', 'medium', 'high'] as const;
// type Priority = typeof VALID_PRIORITIES[number];

// export default function NewTicketPage() {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [priority, setPriority] = useState<Priority>('medium');
//   const [attachment, setAttachment] = useState<File | null>(null);
//   const router = useRouter();

//   const handleFormSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     console.log('Form submitted');

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('description', description);
//     formData.append('priority', priority);

//     if (attachment) {
//         formData.append('attachment', attachment);
//         console.log('Attachment added');
//     }

//     try {
//         console.log('Sending request to /api/createTicket');

//         const response = await fetch('/api/createTicket', {
//             method: 'POST',
//             // ⛔️ DO NOT set Content-Type here – browser will set multipart boundary
//             body: formData,
//             credentials: 'same-origin', // Ensure cookies are sent for auth
//         });

//         // Log the response status
//         console.log('Response status:', response.status);

//         if (!response.ok) {
//             console.error('Network response was not ok:', response.statusText);
//             throw new Error('Network response was not ok');
//         }

//         const result = await response.json();

//         console.log('API response:', result);

//         if (result.success) {
//             console.log('Ticket created successfully');
//             router.push('/tickets'); // Redirect to the ticket list on success
//         } else {
//             console.error('Error creating ticket:', result.message);
//         }
//     } catch (error) {
//         console.error('Error creating ticket:', (error as Error).message);
//     }
// };


//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-semibold">New ticket</h1>
//       <p className="text-sm text-gray-500">Create a new request / issue for the IMM team.</p>

//       <form onSubmit={handleFormSubmit} className="space-y-4 max-w-xl bg-white border rounded p-4 shadow-sm">
//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="title">Title</label>
//           <input
//             id="title"
//             name="title"
//             required
//             className="w-full rounded border px-3 py-2 text-sm"
//             placeholder="Short summary"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </div>

//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="description">Description</label>
//           <textarea
//             id="description"
//             name="description"
//             rows={5}
//             className="w-full rounded border px-3 py-2 text-sm"
//             placeholder="Describe the issue or request"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </div>

//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="priority">Priority</label>
//           <select
//             id="priority"
//             name="priority"
//             value={priority}
//             onChange={(e) => setPriority(e.target.value as Priority)}
//             className="w-full rounded border px-3 py-2 text-sm"
//           >
//             <option value="low">Low</option>
//             <option value="medium">Medium</option>
//             <option value="high">High</option>
//           </select>
//         </div>

//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="attachment">Attachment (optional)</label>
//           <input
//             id="attachment"
//             name="attachment"
//             type="file"
//             className="block w-full text-sm"
//             onChange={(e) => setAttachment(e.target.files ? e.target.files[0] : null)}
//           />
//           <p className="text-xs text-gray-400">You can upload screenshots, PDFs, etc.</p>
//         </div>

//         <div className="flex gap-2">
//           <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
//             Create ticket
//           </button>

//           <a
//             href="/tickets"
//             className="rounded border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
//           >
//             Cancel
//           </a>
//         </div>
//       </form>
//     </div>
//   );
// }


// // app/(protected)/tickets/new/page.tsx

// // 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// const VALID_PRIORITIES = ['low', 'medium', 'high'] as const;
// type Priority = typeof VALID_PRIORITIES[number];

// export default function NewTicketPage() {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [priority, setPriority] = useState<Priority>('medium');
//   const [attachment, setAttachment] = useState<File | null>(null);
//   const router = useRouter();

//   const handleFormSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     console.log('Form submitted');

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('description', description);
//     formData.append('priority', priority);

//     if (attachment) {
//         formData.append('attachment', attachment);
//         console.log('Attachment added');
//     }

//     try {
//         console.log('Sending request to /api/createTicket');

//         const response = await fetch('/api/createTicket', {
//             method: 'POST',
//             // ⛔️ DO NOT set Content-Type here – browser will set multipart boundary
//             body: formData,
//             credentials: 'same-origin', // Ensure cookies are sent for auth
//         });

//         // Log the response status
//         console.log('Response status:', response.status);

//         if (!response.ok) {
//             console.error('Network response was not ok:', response.statusText);
//             throw new Error('Network response was not ok');
//         }

//         const result = await response.json();

//         console.log('API response:', result);

//         if (result.success) {
//             console.log('Ticket created successfully');
//             router.push('/tickets'); // Redirect to the ticket list on success
//         } else {
//             console.error('Error creating ticket:', result.message);
//         }
//     } catch (error) {
//         console.error('Error creating ticket:', (error as Error).message);
//     }
// };


//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-semibold">New ticket</h1>
//       <p className="text-sm text-gray-500">Create a new request / issue for the IMM team.</p>

//       <form onSubmit={handleFormSubmit} className="space-y-4 max-w-xl bg-white border rounded p-4 shadow-sm">
//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="title">Title</label>
//           <input
//             id="title"
//             name="title"
//             required
//             className="w-full rounded border px-3 py-2 text-sm"
//             placeholder="Short summary"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </div>

//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="description">Description</label>
//           <textarea
//             id="description"
//             name="description"
//             rows={5}
//             className="w-full rounded border px-3 py-2 text-sm"
//             placeholder="Describe the issue or request"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </div>

//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="priority">Priority</label>
//           <select
//             id="priority"
//             name="priority"
//             value={priority}
//             onChange={(e) => setPriority(e.target.value as Priority)}
//             className="w-full rounded border px-3 py-2 text-sm"
//           >
//             <option value="low">Low</option>
//             <option value="medium">Medium</option>
//             <option value="high">High</option>
//           </select>
//         </div>

//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="attachment">Attachment (optional)</label>
//           <input
//             id="attachment"
//             name="attachment"
//             type="file"
//             className="block w-full text-sm"
//             onChange={(e) => setAttachment(e.target.files ? e.target.files[0] : null)}
//           />
//           <p className="text-xs text-gray-400">You can upload screenshots, PDFs, etc.</p>
//         </div>

//         <div className="flex gap-2">
//           <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
//             Create ticket
//           </button>

//           <a
//             href="/tickets"
//             className="rounded border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
//           >
//             Cancel
//           </a>
//         </div>
//       </form>
//     </div>
//   );
// }


// // app/(protected)/tickets/new/page.tsx

// // 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// const VALID_PRIORITIES = ['low', 'medium', 'high'] as const;
// type Priority = typeof VALID_PRIORITIES[number];

// export default function NewTicketPage() {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [priority, setPriority] = useState<Priority>('medium');
//   const [attachment, setAttachment] = useState<File | null>(null);
//   const router = useRouter();

//   const handleFormSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     console.log('Form submitted');

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('description', description);
//     formData.append('priority', priority);

//     if (attachment) {
//         formData.append('attachment', attachment);
//         console.log('Attachment added');
//     }

//     try {
//         console.log('Sending request to /api/createTicket');

//         const response = await fetch('/api/createTicket', {
//             method: 'POST',
//             // ⛔️ DO NOT set Content-Type here – browser will set multipart boundary
//             body: formData,
//             credentials: 'same-origin', // Ensure cookies are sent for auth
//         });

//         // Log the response status
//         console.log('Response status:', response.status);

//         if (!response.ok) {
//             console.error('Network response was not ok:', response.statusText);
//             throw new Error('Network response was not ok');
//         }

//         const result = await response.json();

//         console.log('API response:', result);

//         if (result.success) {
//             console.log('Ticket created successfully');
//             router.push('/tickets'); // Redirect to the ticket list on success
//         } else {
//             console.error('Error creating ticket:', result.message);
//         }
//     } catch (error) {
//         console.error('Error creating ticket:', (error as Error).message);
//     }
// };


//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-semibold">New ticket</h1>
//       <p className="text-sm text-gray-500">Create a new request / issue for the IMM team.</p>

//       <form onSubmit={handleFormSubmit} className="space-y-4 max-w-xl bg-white border rounded p-4 shadow-sm">
//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="title">Title</label>
//           <input
//             id="title"
//             name="title"
//             required
//             className="w-full rounded border px-3 py-2 text-sm"
//             placeholder="Short summary"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </div>

//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="description">Description</label>
//           <textarea
//             id="description"
//             name="description"
//             rows={5}
//             className="w-full rounded border px-3 py-2 text-sm"
//             placeholder="Describe the issue or request"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </div>

//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="priority">Priority</label>
//           <select
//             id="priority"
//             name="priority"
//             value={priority}
//             onChange={(e) => setPriority(e.target.value as Priority)}
//             className="w-full rounded border px-3 py-2 text-sm"
//           >
//             <option value="low">Low</option>
//             <option value="medium">Medium</option>
//             <option value="high">High</option>
//           </select>
//         </div>

//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="attachment">Attachment (optional)</label>
//           <input
//             id="attachment"
//             name="attachment"
//             type="file"
//             className="block w-full text-sm"
//             onChange={(e) => setAttachment(e.target.files ? e.target.files[0] : null)}
//           />
//           <p className="text-xs text-gray-400">You can upload screenshots, PDFs, etc.</p>
//         </div>

//         <div className="flex gap-2">
//           <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
//             Create ticket
//           </button>

//           <a
//             href="/tickets"
//             className="rounded border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
//           >
//             Cancel
//           </a>
//         </div>
//       </form>
//     </div>
//   );
// }


// // app/(protected)/tickets/new/page.tsx

// // 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// const VALID_PRIORITIES = ['low', 'medium', 'high'] as const;
// type Priority = typeof VALID_PRIORITIES[number];

// export default function NewTicketPage() {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [priority, setPriority] = useState<Priority>('medium');
//   const [attachment, setAttachment] = useState<File | null>(null);
//   const router = useRouter();

//   const handleFormSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     console.log('Form submitted');

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('description', description);
//     formData.append('priority', priority);

//     if (attachment) {
//         formData.append('attachment', attachment);
//         console.log('Attachment added');
//     }

//     try {
//         console.log('Sending request to /api/createTicket');

//         const response = await fetch('/api/createTicket', {
//             method: 'POST',
//             // ⛔️ DO NOT set Content-Type here – browser will set multipart boundary
//             body: formData,
//             credentials: 'same-origin', // Ensure cookies are sent for auth
//         });

//         // Log the response status
//         console.log('Response status:', response.status);

//         if (!response.ok) {
//             console.error('Network response was not ok:', response.statusText);
//             throw new Error('Network response was not ok');
//         }

//         const result = await response.json();

//         console.log('API response:', result);

//         if (result.success) {
//             console.log('Ticket created successfully');
//             router.push('/tickets'); // Redirect to the ticket list on success
//         } else {
//             console.error('Error creating ticket:', result.message);
//         }
//     } catch (error) {
//         console.error('Error creating ticket:', (error as Error).message);
//     }
// };


//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-semibold">New ticket</h1>
//       <p className="text-sm text-gray-500">Create a new request / issue for the IMM team.</p>

//       <form onSubmit={handleFormSubmit} className="space-y-4 max-w-xl bg-white border rounded p-4 shadow-sm">
//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="title">Title</label>
//           <input
//             id="title"
//             name="title"
//             required
//             className="w-full rounded border px-3 py-2 text-sm"
//             placeholder="Short summary"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </div>

//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="description">Description</label>
//           <textarea
//             id="description"
//             name="description"
//             rows={5}
//             className="w-full rounded border px-3 py-2 text-sm"
//             placeholder="Describe the issue or request"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </div>

//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="priority">Priority</label>
//           <select
//             id="priority"
//             name="priority"
//             value={priority}
//             onChange={(e) => setPriority(e.target.value as Priority)}
//             className="w-full rounded border px-3 py-2 text-sm"
//           >
//             <option value="low">Low</option>
//             <option value="medium">Medium</option>
//             <option value="high">High</option>
//           </select>
//         </div>

//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="attachment">Attachment (optional)</label>
//           <input
//             id="attachment"
//             name="attachment"
//             type="file"
//             className="block w-full text-sm"
//             onChange={(e) => setAttachment(e.target.files ? e.target.files[0] : null)}
//           />
//           <p className="text-xs text-gray-400">You can upload screenshots, PDFs, etc.</p>
//         </div>

//         <div className="flex gap-2">
//           <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
//             Create ticket
//           </button>

//           <a
//             href="/tickets"
//             className="rounded border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
//           >
//             Cancel
//           </a>
//         </div>
//       </form>
//     </div>
//   );
// }


// // app/(protected)/tickets/new/page.tsx

// // 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// const VALID_PRIORITIES = ['low', 'medium', 'high'] as const;
// type Priority = typeof VALID_PRIORITIES[number];

// export default function NewTicketPage() {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [priority, setPriority] = useState<Priority>('medium');
//   const [attachment, setAttachment] = useState<File | null>(null);
//   const router = useRouter();

//   const handleFormSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     console.log('Form submitted');

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('description', description);
//     formData.append('priority', priority);

//     if (attachment) {
//         formData.append('attachment', attachment);
//         console.log('Attachment added');
//     }

//     try {
//         console.log('Sending request to /api/createTicket');

//         const response = await fetch('/api/createTicket', {
//             method: 'POST',
//             // ⛔️ DO NOT set Content-Type here – browser will set multipart boundary
//             body: formData,
//             credentials: 'same-origin', // Ensure cookies are sent for auth
//         });

//         // Log the response status
//         console.log('Response status:', response.status);

//         if (!response.ok) {
//             console.error('Network response was not ok:', response.statusText);
//             throw new Error('Network response was not ok');
//         }

//         const result = await response.json();

//         console.log('API response:', result);

//         if (result.success) {
//             console.log('Ticket created successfully');
//             router.push('/tickets'); // Redirect to the ticket list on success
//         } else {
//             console.error('Error creating ticket:', result.message);
//         }
//     } catch (error) {
//         console.error('Error creating ticket:', (error as Error).message);
//     }
// };


//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-semibold">New ticket</h1>
//       <p className="text-sm text-gray-500">Create a new request / issue for the IMM team.</p>

//       <form onSubmit={handleFormSubmit} className="space-y-4 max-w-xl bg-white border rounded p-4 shadow-sm">
//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="title">Title</label>
//           <input
//             id="title"
//             name="title"
//             required
//             className="w-full rounded border px-3 py-2 text-sm"
//             placeholder="Short summary"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </div>

//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="description">Description</label>
//           <textarea
//             id="description"
//             name="description"
//             rows={5}
//             className="w-full rounded border px-3 py-2 text-sm"
//             placeholder="Describe the issue or request"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </div>

//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="priority">Priority</label>
//           <select
//             id="priority"
//             name="priority"
//             value={priority}
//             onChange={(e) => setPriority(e.target.value as Priority)}
//             className="w-full rounded border px-3 py-2 text-sm"
//           >
//             <option value="low">Low</option>
//             <option value="medium">Medium</option>
//             <option value="high">High</option>
//           </select>
//         </div>

//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="attachment">Attachment (optional)</label>
//           <input
//             id="attachment"
//             name="attachment"
//             type="file"
//             className="block w-full text-sm"
//             onChange={(e) => setAttachment(e.target.files ? e.target.files[0] : null)}
//           />
//           <p className="text-xs text-gray-400">You can upload screenshots, PDFs, etc.</p>
//         </div>

//         <div className="flex gap-2">
//           <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
//             Create ticket
//           </button>

//           <a
//             href="/tickets"
//             className="rounded border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
//           >
//             Cancel
//           </a>
//         </div>
//       </form>
//     </div>
//   );
// }


// // app/(protected)/tickets/new/page.tsx

// // 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// const VALID_PRIORITIES = ['low', 'medium', 'high'] as const;
// type Priority = typeof VALID_PRIORITIES[number];

// export default function NewTicketPage() {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [priority, setPriority] = useState<Priority>('medium');
//   const [attachment, setAttachment] = useState<File | null>(null);
//   const router = useRouter();

//   const handleFormSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     console.log('Form submitted');

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('description', description);
//     formData.append('priority', priority);

//     if (attachment) {
//         formData.append('attachment', attachment);
//         console.log('Attachment added');
//     }

//     try {
//         console.log('Sending request to /api/createTicket');

//         const response = await fetch('/api/createTicket', {
//             method: 'POST',
//             // ⛔️ DO NOT set Content-Type here – browser will set multipart boundary
//             body: formData,
//             credentials: 'same-origin', // Ensure cookies are sent for auth
//         });

//         // Log the response status
//         console.log('Response status:', response.status);

//         if (!response.ok) {
//             console.error('Network response was not ok:', response.statusText);
//             throw new Error('Network response was not ok');
//         }

//         const result = await response.json();

//         console.log('API response:', result);

//         if (result.success) {
//             console.log('Ticket created successfully');
//             router.push('/tickets'); // Redirect to the ticket list on success
//         } else {
//             console.error('Error creating ticket:', result.message);
//         }
//     } catch (error) {
//         console.error('Error creating ticket:', (error as Error).message);
//     }
// };


//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-semibold">New ticket</h1>
//       <p className="text-sm text-gray-500">Create a new request / issue for the IMM team.</p>

//       <form onSubmit={handleFormSubmit} className="space-y-4 max-w-xl bg-white border rounded p-4 shadow-sm">
//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="title">Title</label>
//           <input
//             id="title"
//             name="title"
//             required
//             className="w-full rounded border px-3 py-2 text-sm"
//             placeholder="Short summary"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </div>

//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="description">Description</label>
//           <textarea
//             id="description"
//             name="description"
//             rows={5}
//             className="w-full rounded border px-3 py-2 text-sm"
//             placeholder="Describe the issue or request"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </div>

//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="priority">Priority</label>
//           <select
//             id="priority"
//             name="priority"
//             value={priority}
//             onChange={(e) => setPriority(e.target.value as Priority)}
//             className="w-full rounded border px-3 py-2 text-sm"
//           >
//             <option value="low">Low</option>
//             <option value="medium">Medium</option>
//             <option value="high">High</option>
//           </select>
//         </div>

//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="attachment">Attachment (optional)</label>
//           <input
//             id="attachment"
//             name="attachment"
//             type="file"
//             className="block w-full text-sm"
//             onChange={(e) => setAttachment(e.target.files ? e.target.files[0] : null)}
//           />
//           <p className="text-xs text-gray-400">You can upload screenshots, PDFs, etc.</p>
//         </div>

//         <div className="flex gap-2">
//           <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
//             Create ticket
//           </button>

//           <a
//             href="/tickets"
//             className="rounded border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
//           >
//             Cancel
//           </a>
//         </div>
//       </form>
//     </div>
//   );
// }


// // app/(protected)/tickets/new/page.tsx

// // 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// const VALID_PRIORITIES = ['low', 'medium', 'high'] as const;
// type Priority = typeof VALID_PRIORITIES[number];

// export default function NewTicketPage() {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [priority, setPriority] = useState<Priority>('medium');
//   const [attachment, setAttachment] = useState<File | null>(null);
//   const router = useRouter();

//   const handleFormSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     console.log('Form submitted');

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('description', description);
//     formData.append('priority', priority);

//     if (attachment) {
//         formData.append('attachment', attachment);
//         console.log('Attachment added');
//     }

//     try {
//         console.log('Sending request to /api/createTicket');

//         const response = await fetch('/api/createTicket', {
//             method: 'POST',
//             // ⛔️ DO NOT set Content-Type here – browser will set multipart boundary
//             body: formData,
//             credentials: 'same-origin', // Ensure cookies are sent for auth
//         });

//         // Log the response status
//         console.log('Response status:', response.status);

//         if (!response.ok) {
//             console.error('Network response was not ok:', response.statusText);
//             throw new Error('Network response was not ok');
//         }

//         const result = await response.json();

//         console.log('API response:', result);

//         if (result.success) {
//             console.log('Ticket created successfully');
//             router.push('/tickets'); // Redirect to the ticket list on success
//         } else {
//             console.error('Error creating ticket:', result.message);
//         }
//     } catch (error) {
//         console.error('Error creating ticket:', (error as Error).message);
//     }
// };


//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-semibold">New ticket</h1>
//       <p className="text-sm text-gray-500">Create a new request / issue for the IMM team.</p>

//       <form onSubmit={handleFormSubmit} className="space-y-4 max-w-xl bg-white border rounded p-4 shadow-sm">
//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="title">Title</label>
//           <input
//             id="title"
//             name="title"
//             required
//             className="w-full rounded border px-3 py-2 text-sm"
//             placeholder="Short summary"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </div>

//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="description">Description</label>
//           <textarea
//             id="description"
//             name="description"
//             rows={5}
//             className="w-full rounded border px-3 py-2 text-sm"
//             placeholder="Describe the issue or request"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </div>

//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="priority">Priority</label>
//           <select
//             id="priority"
//             name="priority"
//             value={priority}
//             onChange={(e) => setPriority(e.target.value as Priority)}
//             className="w-full rounded border px-3 py-2 text-sm"
//           >
//             <option value="low">Low</option>
//             <option value="medium">Medium</option>
//             <option value="high">High</option>
//           </select>
//         </div>

//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="attachment">
//             Attachment (optional)
//           </label>
//           <input
//             id="attachment"
//             name="attachment"
//             type="file"
//             className="block w-full text-sm"
//             onChange={(e) => setAttachment(e.target.files ? e.target.files[0] : null)}
//           />
//           <p className="text-xs text-gray-400">You can upload screenshots, PDFs, etc.</p>
//         </div>

//         <div className="flex gap-2">
//           <button
//             type="submit"
//             className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white"
//           >
//             Create ticket
//           </button>
//           <a
//             href="/tickets"
//             className="rounded border px-4 py-2 text-sm font-medium text-gray-700"
//           >
//             Cancel
//           </a>
//         </div>
//       </form>
//     </div>
//   );
// }

// WORKING CODE 99% ------------ --- -- - - -- -- - - - -- - -- - - 

// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// const VALID_PRIORITIES = ['low', 'medium', 'high'] as const;
// type Priority = typeof VALID_PRIORITIES[number];

// export default function NewTicketPage() {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [priority, setPriority] = useState<Priority>('medium');
//   const [attachment, setAttachment] = useState<File | null>(null);
//   const router = useRouter();

//   const handleFormSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('description', description);
//     formData.append('priority', priority);

//     if (attachment) {
//       formData.append('attachment', attachment);
//     }

//     try {
//       console.log('Sending request to /api/createTicket');

//       const response = await fetch('/api/createTicket', {
//         method: 'POST',
//         // ⛔️ DO NOT set Content-Type here – browser will set multipart boundary
//         body: formData,
//         credentials: 'same-origin', // Ensure cookies are sent for auth
//       });

//       console.log('Response status:', response.status);
//       const result = await response.json().catch(() => null);

//       if (!response.ok) {
//         console.error('API error:', result?.message ?? response.statusText);
//         throw new Error(result?.message ?? 'Network response was not ok');
//       }

//       console.log('API response:', result);

//       if (result?.success) {
//         router.push('/tickets');
//       } else {
//         console.error('Error creating ticket:', result?.message);
//       }
//     } catch (error) {
//       console.error('Error creating ticket:', (error as Error).message);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-semibold">New ticket</h1>
//       <p className="text-sm text-gray-500">
//         Create a new request / issue for the IMM team.
//       </p>

//       <form onSubmit={handleFormSubmit} className="space-y-4 max-w-xl bg-white border rounded p-4 shadow-sm">
//         <div className="space-y-1">
//           <label htmlFor="title" className="text-sm font-medium">
//             Title
//           </label>
//           <input
//             id="title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//             className="w-full rounded border px-3 py-2 text-sm"
//           />
//         </div>

//         <div className="space-y-1">
//           <label htmlFor="description" className="text-sm font-medium">
//             Description
//           </label>
//           <textarea
//             id="description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             rows={5}
//             className="w-full rounded border px-3 py-2 text-sm"
//           />
//         </div>

//         <div className="space-y-1">
//           <label htmlFor="priority" className="text-sm font-medium">
//             Priority
//           </label>
//           <select
//             id="priority"
//             value={priority}
//             onChange={(e) => setPriority(e.target.value as Priority)}
//             className="w-full rounded border px-3 py-2 text-sm"
//           >
//             <option value="low">Low</option>
//             <option value="medium">Medium</option>
//             <option value="high">High</option>
//           </select>
//         </div>

//         <div className="space-y-1">
//           <label htmlFor="attachment" className="text-sm font-medium">
//             Attachment (optional)
//           </label>
//           <input
//             id="attachment"
//             type="file"
//             className="block w-full text-sm"
//             onChange={(e) =>
//               setAttachment(e.target.files ? e.target.files[0] : null)
//             }
//           />
//         </div>

//         <div className="flex gap-2">
//           <button
//             type="submit"
//             className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white"
//           >
//             Create ticket
//           </button>
//           <a
//             href="/tickets"
//             className="rounded border px-4 py-2 text-sm font-medium text-gray-700"
//           >
//             Cancel
//           </a>
//         </div>
//       </form>
//     </div>
//   );
// }


// // app/(protected)/tickets/new/page.tsx
// import { redirect } from "next/navigation";
// import { revalidatePath } from "next/cache";
// import { createSupabaseServerClient } from "@lib/supabase/server";

// const VALID_PRIORITIES = ["low", "medium", "high"] as const;
// type Priority = (typeof VALID_PRIORITIES)[number];

// // ---------- SERVER ACTION ----------
// export async function createTicketAction(formData: FormData) {
//   "use server";

//   const supabase = await createSupabaseServerClient();

//   // 1) Auth: get current user
//   const {
//     data: { user },
//     error: userError,
//   } = await supabase.auth.getUser();

//   if (userError || !user) {
//     console.error("Auth error in createTicketAction:", userError?.message);
//     redirect("/login");
//   }

//   const userId = user.id;

//   // 2) Load profile to get company_id + confirm client exists
//   const {
//     data: profile,
//     error: profileError,
//   } = await supabase
//     .from("profiles")
//     .select("id, company_id")
//     .eq("id", userId)
//     .single();

//   if (profileError || !profile) {
//     console.error("Profile error:", profileError?.message);
//     throw new Error("No profile found for this user. Cannot create ticket.");
//   }

//   const companyId = profile.company_id;

//   // 3) Read and validate form fields
//   const title = (formData.get("title") as string | null)?.trim() ?? "";
//   const description =
//     (formData.get("description") as string | null)?.trim() ?? "";

//   let rawPriority = (formData.get("priority") as string | null)?.toLowerCase();
//   const priority: Priority = VALID_PRIORITIES.includes(
//     rawPriority as Priority,
//   )
//     ? (rawPriority as Priority)
//     : "medium";

//   if (!title) {
//     throw new Error("Title is required.");
//   }

//   // 4) Optional file upload to Storage
//   const file = formData.get("attachment") as File | null;
//   let attachmentUrl: string | null = null;

//   if (file && file.size > 0) {
//     const ext = file.name.split(".").pop() || "bin";
//     const path = `${userId}/${crypto.randomUUID()}.${ext}`;

//     // NOTE: bucket must exist: "ticket-attachments"
//     const { error: uploadError } = await supabase.storage
//       .from("ticket-attachments")
//       .upload(path, file, {
//         cacheControl: "3600",
//         upsert: false,
//       });

//     if (uploadError) {
//       console.error("Attachment upload error:", uploadError.message);
//       // You can choose to throw or ignore; here we ignore & continue
//     } else {
//       const {
//         data: { publicUrl },
//       } = supabase.storage.from("ticket-attachments").getPublicUrl(path);
//       attachmentUrl = publicUrl;
//     }
//   }

//   // 5) Insert ticket (status 'open', client_id + company_id from profile)
//   const { error: insertError } = await supabase.from("tickets").insert({
//     title,
//     description,
//     status: "open",
//     priority, // "low" | "medium" | "high" – matches check constraint
//     client_id: profile.id,
//     company_id: companyId,
//     attachment_url: attachmentUrl,
//   });

//   if (insertError) {
//     console.error("Error creating ticket:", insertError.message);
//     throw new Error("Error creating ticket: " + insertError.message);
//   }

//   // 6) Revalidate list + dashboard and redirect
//   revalidatePath("/tickets");
//   revalidatePath("/dashboard");
//   redirect("/tickets");
// }

// // ---------- PAGE COMPONENT ----------
// export default function NewTicketPage() {
//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-2xl font-semibold">New ticket</h1>
//         <p className="text-sm text-gray-500">
//           Create a new request / issue for the IMM team.
//         </p>
//       </div>

//       <form
//         action={createTicketAction}
//         className="space-y-4 max-w-xl bg-white border rounded p-4 shadow-sm"
//       >
//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="title">
//             Title
//           </label>
//           <input
//             id="title"
//             name="title"
//             required
//             className="w-full rounded border px-3 py-2 text-sm"
//             placeholder="Short summary"
//           />
//         </div>

//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="description">
//             Description
//           </label>
//           <textarea
//             id="description"
//             name="description"
//             rows={5}
//             className="w-full rounded border px-3 py-2 text-sm"
//             placeholder="Describe the issue or request"
//           />
//         </div>

//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="priority">
//             Priority
//           </label>
//           <select
//             id="priority"
//             name="priority"
//             defaultValue="medium"
//             className="w-full rounded border px-3 py-2 text-sm"
//           >
//             <option value="low">Low</option>
//             <option value="medium">Medium</option>
//             <option value="high">High</option>
//           </select>
//         </div>

//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="attachment">
//             Attachment (optional)
//           </label>
//           <input
//             id="attachment"
//             name="attachment"
//             type="file"
//             className="block w-full text-sm"
//           />
//           <p className="text-xs text-gray-400">
//             You can upload screenshots, PDFs, etc.
//           </p>
//         </div>

//         <div className="flex gap-2">
//           <button
//             type="submit"
//             className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
//           >
//             Create ticket
//           </button>

//           <a
//             href="/tickets"
//             className="rounded border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
//           >
//             Cancel
//           </a>
//         </div>
//       </form>
//     </div>
//   );
// }





// // app/(protected)/tickets/new/page.tsx

// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// const VALID_PRIORITIES = ['low', 'medium', 'high'] as const;
// type Priority = typeof VALID_PRIORITIES[number];

// export default function NewTicketPage() {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [priority, setPriority] = useState<Priority>('medium');
//   const [attachment, setAttachment] = useState<File | null>(null);
//   const router = useRouter();

//   const handleFormSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     console.log('Form submitted');

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('description', description);
//     formData.append('priority', priority);

//     if (attachment) {
//         formData.append('attachment', attachment);
//         console.log('Attachment added');
//     }

//     try {
//         console.log('Sending request to /api/createTicket');

//         const response = await fetch('/api/createTicket', {
//             method: 'POST',
//             // ⛔️ DO NOT set Content-Type here – browser will set multipart boundary
//             body: formData,
//             credentials: 'same-origin', // Ensure cookies are sent for auth
//         });

//         // Log the response status
//         console.log('Response status:', response.status);

//         if (!response.ok) {
//             console.error('Network response was not ok:', response.statusText);
//             throw new Error('Network response was not ok');
//         }

//         const result = await response.json();

//         console.log('API response:', result);

//         if (result.success) {
//             console.log('Ticket created successfully');
//             router.push('/tickets'); // Redirect to the ticket list on success
//         } else {
//             console.error('Error creating ticket:', result.message);
//         }
//     } catch (error) {
//         console.error('Error creating ticket:', (error as Error).message);
//     }
// };


//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-semibold">New ticket</h1>
//       <p className="text-sm text-gray-500">Create a new request / issue for the IMM team.</p>

//       <form onSubmit={handleFormSubmit} className="space-y-4 max-w-xl bg-white border rounded p-4 shadow-sm">
//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="title">Title</label>
//           <input
//             id="title"
//             name="title"
//             required
//             className="w-full rounded border px-3 py-2 text-sm"
//             placeholder="Short summary"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </div>

//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="description">Description</label>
//           <textarea
//             id="description"
//             name="description"
//             rows={5}
//             className="w-full rounded border px-3 py-2 text-sm"
//             placeholder="Describe the issue or request"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </div>

//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="priority">Priority</label>
//           <select
//             id="priority"
//             name="priority"
//             value={priority}
//             onChange={(e) => setPriority(e.target.value as Priority)}
//             className="w-full rounded border px-3 py-2 text-sm"
//           >
//             <option value="low">Low</option>
//             <option value="medium">Medium</option>
//             <option value="high">High</option>
//           </select>
//         </div>

//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="attachment">Attachment (optional)</label>
//           <input
//             id="attachment"
//             name="attachment"
//             type="file"
//             className="block w-full text-sm"
//             onChange={(e) => setAttachment(e.target.files ? e.target.files[0] : null)}
//           />
//           <p className="text-xs text-gray-400">You can upload screenshots, PDFs, etc.</p>
//         </div>

//         <div className="flex gap-2">
//           <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
//             Create ticket
//           </button>

//           <a
//             href="/tickets"
//             className="rounded border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
//           >
//             Cancel
//           </a>
//         </div>
//       </form>
//     </div>
//   );
// }


// // app/(protected)/tickets/new/page.tsx

// // 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// const VALID_PRIORITIES = ['low', 'medium', 'high'] as const;
// type Priority = typeof VALID_PRIORITIES[number];

// export default function NewTicketPage() {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [priority, setPriority] = useState<Priority>('medium');
//   const [attachment, setAttachment] = useState<File | null>(null);
//   const router = useRouter();

//   const handleFormSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     console.log('Form submitted');

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('description', description);
//     formData.append('priority', priority);

//     if (attachment) {
//         formData.append('attachment', attachment);
//         console.log('Attachment added');
//     }

//     try {
//         console.log('Sending request to /api/createTicket');

//         const response = await fetch('/api/createTicket', {
//             method: 'POST',
//             // ⛔️ DO NOT set Content-Type here – browser will set multipart boundary
//             body: formData,
//             credentials: 'same-origin', // Ensure cookies are sent for auth
//         });

//         // Log the response status
//         console.log('Response status:', response.status);

//         if (!response.ok) {
//             console.error('Network response was not ok:', response.statusText);
//             throw new Error('Network response was not ok');
//         }

//         const result = await response.json();

//         console.log('API response:', result);

//         if (result.success) {
//             console.log('Ticket created successfully');
//             router.push('/tickets'); // Redirect to the ticket list on success
//         } else {
//             console.error('Error creating ticket:', result.message);
//         }
//     } catch (error) {
//         console.error('Error creating ticket:', (error as Error).message);
//     }
// };


//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-semibold">New ticket</h1>
//       <p className="text-sm text-gray-500">Create a new request / issue for the IMM team.</p>

//       <form onSubmit={handleFormSubmit} className="space-y-4 max-w-xl bg-white border rounded p-4 shadow-sm">
//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="title">Title</label>
//           <input
//             id="title"
//             name="title"
//             required
//             className="w-full rounded border px-3 py-2 text-sm"
//             placeholder="Short summary"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </div>

//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="description">Description</label>
//           <textarea
//             id="description"
//             name="description"
//             rows={5}
//             className="w-full rounded border px-3 py-2 text-sm"
//             placeholder="Describe the issue or request"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </div>

//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="priority">Priority</label>
//           <select
//             id="priority"
//             name="priority"
//             value={priority}
//             onChange={(e) => setPriority(e.target.value as Priority)}
//             className="w-full rounded border px-3 py-2 text-sm"
//           >
//             <option value="low">Low</option>
//             <option value="medium">Medium</option>
//             <option value="high">High</option>
//           </select>
//         </div>

//         <div className="space-y-1">
//           <label className="text-sm font-medium" htmlFor="attachment">Attachment (optional)</label>
//           <input
//             id="attachment"
//             name="attachment"
//             type="file"
//             className="block w-full text-sm"
//             onChange={(e) => setAttachment(e.target.files ? e.target.files[0] : null)}
//           />
//           <p className="text-xs text-gray-400">You can upload screenshots, PDFs, etc.</p>
//         </div>

//         <div className="flex gap-2">
//           <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
//             Create ticket
//           </button>

//           <a
//             href="/tickets"
//             className="rounded border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
//           >
//             Cancel
//           </a>
//         </div>
//       </form>
//     </div>
//   );
// }