// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { supabaseClient } from "@lib/supabase/client";

// export default function LogoutButton() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);

//   async function handleLogout() {
//     setLoading(true);
//     await supabaseClient.auth.signOut(); // Sign out the user
//     setLoading(false);
//     router.push("/login"); // Redirect to login page
//   }

//   return (
//     <button onClick={handleLogout} disabled={loading}>
//       {loading ? "Logging out..." : "Logout"}
//     </button>
//   );
// }

"use client";

import { useRouter } from "next/navigation";  // Correct import
import { supabaseClient } from "@lib/supabase/client";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    // Sign out the user from Supabase
    const { error } = await supabaseClient.auth.signOut();
    
    if (error) {
      console.error("Error logging out:", error.message);
      setLoading(false);
      return;
    }

    // After sign-out, navigate to login page
    setLoading(false);
    router.push("/login");
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="w-full text-left text-red-600 text-sm hover:underline disabled:opacity-60"
    >
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
}



// WORKING CODE 100%  - -- --- -- -- ---------------


// "use client";

// import { useRouter } from "next/navigation";
// import { supabaseClient } from "@lib/supabase/client";
// import { useState } from "react";

// export default function LogoutButton() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);

//   async function handleLogout() {
//     setLoading(true);
//     await supabaseClient.auth.signOut();
//     setLoading(false);
//     router.push("/login");
//   }

//   return (
//     <button
//       onClick={handleLogout}
//       disabled={loading}
//       className="w-full text-left text-red-600 text-sm hover:underline disabled:opacity-60"
//     >
//       {loading ? "Logging out..." : "Logout"}
//     </button>
//   );
// }



// "use client";

// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { supabaseClient } from "@/lib/supabase/client";

// export default function LogoutButton() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);

//   async function handleLogout() {
//     setLoading(true);
//     await supabaseClient.auth.signOut();
//     setLoading(false);
//     router.push("/login");
//   }

//   return (
//     <button
//       onClick={handleLogout}
//       disabled={loading}
//       className="w-full text-left text-red-600 text-sm hover:underline disabled:opacity-60"
//     >
//       {loading ? "Logging out..." : "Logout"}
//     </button>
//   );
// }
