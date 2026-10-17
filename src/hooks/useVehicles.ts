// import { useQuery } from "@tanstack/react-query";
// import { supabase } from "@/lib/supabase/client";
// import type { Vehicle, VehicleFilters } from "@/types/vehicle";

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// function applyFilters(filters: VehicleFilters): any {
//   let q = supabase.from("vehicles").select("*").eq("is_published", true);

//   if (filters.search) {
//     q = q.or(`brand.ilike.%${filters.search}%,model.ilike.%${filters.search}%`);
//   }
//   if (filters.brand) q = q.eq("brand", filters.brand);
//   if (filters.bodyType) q = q.eq("body_type", filters.bodyType);
//   if (filters.fuelType) q = q.eq("fuel_type", filters.fuelType);
//   if (filters.transmission) q = q.eq("transmission", filters.transmission);
//   if (typeof filters.minPrice === "number") q = q.gte("price_aed", filters.minPrice);
//   if (typeof filters.maxPrice === "number") q = q.lte("price_aed", filters.maxPrice);
//   if (filters.featuredOnly) q = q.eq("is_featured", true);

//   switch (filters.sortBy) {
//     case "price_asc":
//       q = q.order("price_aed", { ascending: true });
//       break;
//     case "price_desc":
//       q = q.order("price_aed", { ascending: false });
//       break;
//     case "year_desc":
//       q = q.order("year", { ascending: false });
//       break;
//     default:
//       q = q.order("created_at", { ascending: false });
//   }

//   return q;
// }

// export function usePublishedVehicles(filters: VehicleFilters) {
//   return useQuery({
//     queryKey: ["vehicles", "published", filters],
//     queryFn: async () => {
//       const { data, error } = await applyFilters(filters);
//       if (error) throw error;
//       return (data ?? []) as unknown as Vehicle[];
//     },
//   });
// }

// export function useFeaturedVehicles(limit = 6) {
//   return useQuery({
//     queryKey: ["vehicles", "featured", limit],
//     queryFn: async () => {
//       const { data, error } = await supabase
//         .from("vehicles")
//         .select("*")
//         .eq("is_published", true)
//         .eq("is_featured", true)
//         .order("created_at", { ascending: false })
//         .limit(limit);
//       if (error) throw error;
//       return (data ?? []) as unknown as Vehicle[];
//     },
//   });
// }

// export function useVehicle(id: string | undefined) {
//   return useQuery({
//     queryKey: ["vehicle", id],
//     enabled: !!id,
//     queryFn: async () => {
//       const { data, error } = await supabase
//         .from("vehicles")
//         .select("*")
//         .eq("id", id)
//         .eq("is_published", true)
//         .maybeSingle();
//       if (error) throw error;
//       return data as unknown as Vehicle | null;
//     },
//   });
// }

// // --- Admin (authenticated) queries ---

// export function useAdminVehicles() {
//   return useQuery({
//     queryKey: ["admin", "vehicles"],
//     queryFn: async () => {
//       const { data, error } = await supabase
//         .from("vehicles")
//         .select("*")
//         .order("created_at", { ascending: false });
//       if (error) throw error;
//       return (data ?? []) as unknown as Vehicle[];
//     },
//   });
// }

// export function useAdminVehicle(id: string | undefined) {
//   return useQuery({
//     queryKey: ["admin", "vehicle", id],
//     enabled: !!id,
//     queryFn: async () => {
//       const { data, error } = await supabase.from("vehicles").select("*").eq("id", id).maybeSingle();
//       if (error) throw error;
//       return data as unknown as Vehicle | null;
//     },
//   });
// }

// export function useDashboardStats() {
//   return useQuery({
//     queryKey: ["admin", "dashboard-stats"],
//     queryFn: async () => {
//       const { data, error } = await supabase
//         .from("vehicles")
//         .select("is_published, is_featured, is_available");
//       if (error) throw error;
//       const rows = (data ?? []) as unknown as {
//         is_published: boolean;
//         is_featured: boolean;
//         is_available: boolean;
//       }[];
//       return {
//         total: rows.length,
//         published: rows.filter((r) => r.is_published).length,
//         unpublished: rows.filter((r) => !r.is_published).length,
//         featured: rows.filter((r) => r.is_featured).length,
//         available: rows.filter((r) => r.is_available).length,
//       };
//     },
//   });
// }



// import { useQuery } from "@tanstack/react-query";
// import { supabase } from "@/lib/supabase/client";
// import type { Vehicle, VehicleFilters } from "@/types/vehicle";

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// function applyFilters(filters: VehicleFilters): any {
//   let q = supabase
//     .from("vehicles")
//     .select("*")
//     .eq("is_published", true);

//   if (filters.search) {
//     q = q.or(
//       `brand.ilike.%${filters.search}%,model.ilike.%${filters.search}%`
//     );
//   }

//   if (filters.brand) {
//     q = q.eq("brand", filters.brand);
//   }

//   if (filters.bodyType) {
//     q = q.eq("body_type", filters.bodyType);
//   }

//   if (filters.fuelType) {
//     q = q.eq("fuel_type", filters.fuelType);
//   }

//   if (filters.transmission) {
//     q = q.eq("transmission", filters.transmission);
//   }

//   if (typeof filters.minPrice === "number") {
//     q = q.gte("price_aed", filters.minPrice);
//   }

//   if (typeof filters.maxPrice === "number") {
//     q = q.lte("price_aed", filters.maxPrice);
//   }

//   if (filters.featuredOnly) {
//     q = q.eq("is_featured", true);
//   }

//   switch (filters.sortBy) {
//     case "price_asc":
//       q = q.order("price_aed", { ascending: true });
//       break;

//     case "price_desc":
//       q = q.order("price_aed", { ascending: false });
//       break;

//     case "year_desc":
//       q = q.order("year", { ascending: false });
//       break;

//     default:
//       q = q.order("created_at", { ascending: false });
//   }

//   return q;
// }

// export function usePublishedVehicles(filters: VehicleFilters) {
//   return useQuery({
//     queryKey: ["vehicles", "published", filters],

//     queryFn: async () => {
//       const { data, error } = await applyFilters(filters);

//       if (error) {
//         throw error;
//       }

//       return (data ?? []) as unknown as Vehicle[];
//     },
//   });
// }

// export function useFeaturedVehicles(limit = 6) {
//   return useQuery({
//     queryKey: ["vehicles", "featured", limit],

//     queryFn: async () => {
//       const { data, error } = await supabase
//         .from("vehicles")
//         .select("*")
//         .eq("is_published", true)
//         .eq("is_featured", true)
//         .order("created_at", { ascending: false })
//         .limit(limit);

//       if (error) {
//         throw error;
//       }

//       return (data ?? []) as unknown as Vehicle[];
//     },
//   });
// }

// export function useVehicle(id: string | undefined) {
//   return useQuery({
//     queryKey: ["vehicle", id],

//     enabled: Boolean(id),

//     queryFn: async () => {
//       if (!id) {
//         throw new Error("Vehicle ID is required");
//       }

//       const { data, error } = await supabase
//         .from("vehicles")
//         .select("*")
//         .eq("id", id)
//         .eq("is_published", true)
//         .maybeSingle();

//       if (error) {
//         throw error;
//       }

//       return data as unknown as Vehicle | null;
//     },
//   });
// }

// // --- Admin (authenticated) queries ---

// export function useAdminVehicles() {
//   return useQuery({
//     queryKey: ["admin", "vehicles"],

//     queryFn: async () => {
//       const { data, error } = await supabase
//         .from("vehicles")
//         .select("*")
//         .order("created_at", { ascending: false });

//       if (error) {
//         throw error;
//       }

//       return (data ?? []) as unknown as Vehicle[];
//     },
//   });
// }

// export function useAdminVehicle(id: string | undefined) {
//   return useQuery({
//     queryKey: ["admin", "vehicle", id],

//     enabled: Boolean(id),

//     queryFn: async () => {
//       if (!id) {
//         throw new Error("Vehicle ID is required");
//       }

//       const { data, error } = await supabase
//         .from("vehicles")
//         .select("*")
//         .eq("id", id)
//         .maybeSingle();

//       if (error) {
//         throw error;
//       }

//       return data as unknown as Vehicle | null;
//     },
//   });
// }

// export function useDashboardStats() {
//   return useQuery({
//     queryKey: ["admin", "dashboard-stats"],

//     queryFn: async () => {
//       const { data, error } = await supabase
//         .from("vehicles")
//         .select("is_published, is_featured, is_available");

//       if (error) {
//         throw error;
//       }

//       const rows = (data ?? []) as unknown as {
//         is_published: boolean;
//         is_featured: boolean;
//         is_available: boolean;
//       }[];

//       return {
//         total: rows.length,
//         published: rows.filter((r) => r.is_published).length,
//         unpublished: rows.filter((r) => !r.is_published).length,
//         featured: rows.filter((r) => r.is_featured).length,
//         available: rows.filter((r) => r.is_available).length,
//       };
//     },
//   });
// }



























import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import type { Vehicle, VehicleFilters } from "@/types/vehicle";

function applyFilters(filters: VehicleFilters) {
  let query = supabase
    .from("vehicles")
    .select("*")
    .eq("is_published", true);

  if (filters.search?.trim()) {
    const search = filters.search.trim();

    query = query.or(
      `brand.ilike.%${search}%,model.ilike.%${search}%`
    );
  }

  if (filters.brand) {
    query = query.eq("brand", filters.brand);
  }

  if (filters.bodyType) {
    query = query.eq("body_type", filters.bodyType);
  }

  if (filters.fuelType) {
    query = query.eq("fuel_type", filters.fuelType);
  }

  if (filters.transmission) {
    query = query.eq("transmission", filters.transmission);
  }

  if (typeof filters.minPrice === "number") {
    query = query.gte("price_aed", filters.minPrice);
  }

  if (typeof filters.maxPrice === "number") {
    query = query.lte("price_aed", filters.maxPrice);
  }

  if (filters.featuredOnly) {
    query = query.eq("is_featured", true);
  }

  switch (filters.sortBy) {
    case "price_asc":
      query = query.order("price_aed", { ascending: true });
      break;

    case "price_desc":
      query = query.order("price_aed", { ascending: false });
      break;

    case "year_desc":
      query = query.order("year", { ascending: false });
      break;

    default:
      query = query.order("created_at", { ascending: false });
  }

  return query;
}

/**
 * Fetch published vehicles with optional filters.
 */
export function usePublishedVehicles(filters: VehicleFilters) {
  return useQuery({
    queryKey: ["vehicles", "published", filters],

    queryFn: async (): Promise<Vehicle[]> => {
      const { data, error } = await applyFilters(filters);

      if (error) {
        throw error;
      }

      return (data ?? []) as unknown as Vehicle[];
    },
  });
}

/**
 * Fetch featured vehicles for the homepage.
 */
export function useFeaturedVehicles(limit = 6) {
  return useQuery({
    queryKey: ["vehicles", "featured", limit],

    queryFn: async (): Promise<Vehicle[]> => {
      const { data, error } = await supabase
        .from("vehicles")
        .select("*")
        .eq("is_published", true)
        .eq("is_featured", true)
        .order("created_at", { ascending: false })
        .limit(limit);

      if (error) {
        throw error;
      }

      return (data ?? []) as unknown as Vehicle[];
    },
  });
}

/**
 * Fetch one published vehicle by ID.
 */
export function useVehicle(id: string | undefined) {
  return useQuery({
    queryKey: ["vehicle", id],

    enabled: Boolean(id),

    queryFn: async (): Promise<Vehicle | null> => {
      if (!id) {
        throw new Error("Vehicle ID is required");
      }

      const { data, error } = await supabase
        .from("vehicles")
        .select("*")
        .eq("id", id)
        .eq("is_published", true)
        .maybeSingle();

      if (error) {
        throw error;
      }

      return data as unknown as Vehicle | null;
    },
  });
}

// Admin queries

/**
 * Fetch all vehicles for the admin panel.
 */
export function useAdminVehicles() {
  return useQuery({
    queryKey: ["admin", "vehicles"],

    queryFn: async (): Promise<Vehicle[]> => {
      const { data, error } = await supabase
        .from("vehicles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      return (data ?? []) as unknown as Vehicle[];
    },
  });
}

/**
 * Fetch one vehicle for the admin panel.
 */
export function useAdminVehicle(id: string | undefined) {
  return useQuery({
    queryKey: ["admin", "vehicle", id],

    enabled: Boolean(id),

    queryFn: async (): Promise<Vehicle | null> => {
      if (!id) {
        throw new Error("Vehicle ID is required");
      }

      const { data, error } = await supabase
        .from("vehicles")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) {
        throw error;
      }

      return data as unknown as Vehicle | null;
    },
  });
}

/**
 * Fetch vehicle statistics for the admin dashboard.
 */
export function useDashboardStats() {
  return useQuery({
    queryKey: ["admin", "dashboard-stats"],

    queryFn: async () => {
      const { data, error } = await supabase
        .from("vehicles")
        .select("is_published, is_featured, is_available");

      if (error) {
        throw error;
      }

      const rows = (data ?? []) as unknown as {
        is_published: boolean;
        is_featured: boolean;
        is_available: boolean;
      }[];

      return {
        total: rows.length,
        published: rows.filter((row) => row.is_published).length,
        unpublished: rows.filter((row) => !row.is_published).length,
        featured: rows.filter((row) => row.is_featured).length,
        available: rows.filter((row) => row.is_available).length,
      };
    },
  });
}
