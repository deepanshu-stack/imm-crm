// import { createClient } from "@supabase/supabase-js";
// // import { supabaseClient } from "@lib/supabase/client";  // Adjust path accordingly


// // Initialize the Supabase client for client-side operations
// export const supabaseClient = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );




// lib/supabase/client.ts
// import { createClient } from "@supabase/supabase-js"; // Use createClient instead of createBrowserClient

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

// export const supabaseClient = createClient(supabaseUrl, supabaseKey);

// import { createClient } from '@supabase/supabase-js';

// export const supabaseClient = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );





// import { createClient } from "@supabase/supabase-js";

// // Ensure that these environment variables are correctly set in .env.local
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!; // The URL to your Supabase instance
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!; // The public anon key for your Supabase project

// // Creating the Supabase client to be used throughout the app
// export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// working code also

// import { createClient } from "@supabase/supabase-js";

// // These variables will automatically pull the values from the .env.local file
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// // This creates the Supabase client for client-side usage
// export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);


// // WORKING CODE 99% -------------------------- -- --  -- -- 
// // lib/supabase/client.ts
// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// // Create a Supabase client with the URL and the anonymous key
// export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);



// lib/supabase/client.ts
// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// export const getSession = async () => {
//   const session = supabaseClient.auth.session();
//   return session;
// }




import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Create a Supabase client with the URL and the anonymous key
export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// Function to get session (for client-side)
export const getSession = async () => {
  const { data: { session }, error } = await supabaseClient.auth.getSession();
  
  if (error) {
    throw new Error(error.message);
  }

  return session;
}





// WORKING CODE -------------------------- ----- -- -- -----------


// import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// // Client for use in React client components
// export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);