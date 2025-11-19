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



// WORKING CODE 99.9% ------------- ---- - ---------- ---
// import { createServerClient } from "@supabase/ssr";
// import { cookies } from "next/headers";

// // This function creates the Supabase client for server-side usage
// export async function createSupabaseServerClient() {
//   const cookieStore = await cookies();

//   return createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,  // URL to Supabase project
//     process.env.SUPABASE_SERVICE_ROLE_KEY!,  // Service role key to use on server
//     {
//       cookies: {
//         getAll() {
//           return cookieStore.getAll();  // Gets all cookies from the incoming request
//         },
//         setAll(cookiesToSet) {
//           cookiesToSet.forEach(({ name, value, options }) => {
//             cookieStore.set(name, value, options);  // Sets cookies in the outgoing response
//           });
//         },
//       },
//     }
//   );
// }



// import { createServerClient } from "@supabase/ssr";
// import { cookies } from "next/headers";

// // This function creates the Supabase client for server-side usage
// export async function createSupabaseServerClient() {
//   const cookieStore = await cookies();
//   return createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,  // Safe to use in server-side code as well
//     process.env.SUPABASE_SERVICE_ROLE_KEY!,  // Automatically pulled from the environment variables
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




// WORKING CODE 100% -------------- - -- -- -- - - - -- -- - -- ------


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





// import { createServerClient, type CookieOptions } from "@supabase/ssr";
// import { cookies } from "next/headers";

// export function createSupabaseServerClient() {
//   return createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
//     {
//       cookies: {
//         get(name: string) {
//           try {
//             const store = cookies() as any;
//             const value = store.get?.(name);
//             return value?.value as string | undefined;
//           } catch {
//             // if cookies() is not available, act like no cookie
//             return undefined;
//           }
//         },
//         set(name: string, value: string, options: CookieOptions) {
//           try {
//             const store = cookies() as any;
//             // in some server contexts cookies are read-only, so guard with ?
//             store.set?.({ name, value, ...options });
//           } catch {
//             // ignore in read-only environments
//           }
//         },
//         remove(name: string, options: CookieOptions) {
//           try {
//             const store = cookies() as any;
//             store.set?.({ name, value: "", ...options });
//           } catch {
//             // ignore in read-only environments
//           }
//         },
//       },
//     }
//   );
// }






// import { createServerClient, type CookieOptions } from "@supabase/ssr";
// import { cookies } from "next/headers";

// export function createSupabaseServerClient() {
//   // Cast to any so TS stops complaining about readonly types
//   const cookieStore = cookies() as any;

//   return createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
//     {
//       cookies: {
//         get(name: string) {
//           return cookieStore.get(name)?.value as string | undefined;
//         },
//         set(name: string, value: string, options: CookieOptions) {
//           try {
//             cookieStore.set(name, value, options);
//           } catch {
//             // ignore in environments where cookies are readonly
//           }
//         },
//         remove(name: string, options: CookieOptions) {
//           try {
//             cookieStore.set(name, "", options);
//           } catch {
//             // ignore in environments where cookies are readonly
//           }
//         },
//       },
//     }
//   );
// }



