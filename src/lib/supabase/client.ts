// import { createClient } from "@supabase/supabase-js";
// import type { Database } from "@/types/database";

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// if (!supabaseUrl || !supabasePublishableKey) {
//   // eslint-disable-next-line no-console
//   console.error(
//     "Missing Supabase environment variables. Copy .env.example to .env and fill in VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY."
//   );
// }

// // IMPORTANT: only the browser-safe publishable/anon key is ever used here.
// // Never import or reference a Supabase service_role key in frontend code.
// export const supabase = createClient<Database>(supabaseUrl, supabasePublishableKey, {
//   auth: {
//     persistSession: true,
//     autoRefreshToken: true,
//   },
// });



import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabasePublishableKey) {
  // eslint-disable-next-line no-console
  console.error(
    "Missing Supabase environment variables. Copy .env.example to .env and fill in VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY."
  );
}

export const supabase = createClient<Database>(
  supabaseUrl,
  supabasePublishableKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);