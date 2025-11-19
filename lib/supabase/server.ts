// import { createClient } from "@supabase/supabase-js"; // Correct import
// import { cookies } from "next/headers";

// // Server-side Supabase client
// export function createSupabaseServerClient() {
//   const cookieStore = cookies();
//   return createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
//     {
//       cookies: {
//         getAll() {
//           return cookieStore.getAll();
//         },
//         setAll(cookiesToSet) {
//           cookiesToSet.forEach(({ name, value, options }) => {
//             cookieStore.set(name, value, options);
//           });
//         },
//       },
//     }
//   );
// }






// import { createServerClient } from "@supabase/ssr";
// import { cookies } from "next/headers";

// export async function createSupabaseServerClient() {
//   const cookieStore = await cookies();

//   return createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
//     {
//       cookies: {
//         getAll() {
//           return cookieStore.getAll();
//         },
//         setAll(cookiesToSet) {
//           try {
//             cookiesToSet.forEach(({ name, value, options }) => {
//               cookieStore.set(name, value, options);
//             });
//           } catch {
//             // Handle any error due to server-side rendering restrictions
//           }
//         },
//       },
//     }
//   );
// }



// // import { createServerClient } from "@supabase/ssr";
// import { createServerClient } from "@supabase/ssr";
// import { cookies } from "next/headers";

// // Make sure these are set in your environment
// const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

// export async function createSupabaseServerClient() {
//   const cookieStore = await cookies();

//   return createServerClient(SUPABASE_URL, SUPABASE_KEY, {
//     cookies: {
//       getAll() {
//         return cookieStore.getAll();
//       },
//       setAll(cookiesToSet) {
//         try {
//           cookiesToSet.forEach(({ name, value, options }) => {
//             cookieStore.set(name, value, options);
//           });
//         } catch {
//           // Handle any error (could be due to server-side rendering restrictions)
//         }
//       },
//     },
//   });
// }


// import { createServerClient } from "@supabase/ssr";
// import { cookies } from "next/headers";

// export async function createSupabaseServerClient() {
//   // 👇 NEW: cookies() is async in Next 16, so we await it
//   const cookieStore = await cookies();

//   return createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
//     {
//       cookies: {
//         // Supabase SSR now expects getAll/setAll
//         getAll() {
//           return cookieStore.getAll();
//         },
//         setAll(cookiesToSet) {
//           try {
//             cookiesToSet.forEach(({ name, value, options }) => {
//               // Next 16 cookies API: set(name, value, options)
//               cookieStore.set(name, value, options);
//             });
//           } catch {
//             // Called from a Server Component where cookies are read-only.
//             // Safe to ignore because middleware will handle refreshing tokens.
//           }
//         },
//       },
//     }
//   );
// }


// import { createServerClient } from "@supabase/ssr";
// import { cookies } from "next/headers";

// // Function to create a Supabase client on the server-side
// export async function createSupabaseServerClient() {
//   // Get cookies for SSR
//   const cookieStore = await cookies();

//   // Initialize Supabase client using the correct environment variables
//   return createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,   // Public URL, accessible by client
//     process.env.SUPABASE_SERVICE_ROLE_KEY!,  // Service Role Key, should be used server-side
//     {
//       cookies: {
//         // Supabase SSR now expects getAll/setAll for cookies
//         getAll() {
//           return cookieStore.getAll();
//         },
//         setAll(cookiesToSet) {
//           try {
//             cookiesToSet.forEach(({ name, value, options }) => {
//               // Next 16 cookies API: set(name, value, options)
//               cookieStore.set(name, value, options);
//             });
//           } catch {
//             // Handle edge cases where cookies can't be set
//             // This error might happen in environments where cookies are read-only
//           }
//         },
//       },
//     }
//   );
// }


// // lib/supabase/server.ts
// import { createServerClient } from '@supabase/ssr';
// import { cookies } from 'next/headers';

// export async function createSupabaseServerClient() {
//   const cookieStore = await cookies();
//   return createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.SUPABASE_SERVICE_ROLE_KEY!,
//     {
//       cookies: {
//         getAll() {
//           return cookieStore.getAll();
//         },
//         setAll(cookiesToSet) {
//           cookiesToSet.forEach(({ name, value, options }) => {
//             cookieStore.set(name, value, options);
//           });
//         }
//       }
//     }
//   );
// }



import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, // Use anon key for user session
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        }
      }
    }
  );
}



