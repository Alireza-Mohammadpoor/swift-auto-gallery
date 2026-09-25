export interface VehicleImage {
  url: string;
  path: string;
  isPrimary: boolean;
  sortOrder: number;
}

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  trim: string | null;
  year: number;
  price_aed: number;
  mileage: number | null;
  fuel_type: string | null;
  transmission: string | null;
  engine: string | null;
  engine_size: string | null;
  body_type: string | null;
  color: string | null;
  regional_specification: string | null;
  country: string | null;
  description_fa: string | null;
  description_en: string | null;
  images: VehicleImage[];
  is_available: boolean;
  is_featured: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export type VehicleInput = Omit<Vehicle, "id" | "created_at" | "updated_at">;

export interface VehicleFilters {
  search?: string;
  brand?: string;
  bodyType?: string;
  fuelType?: string;
  transmission?: string;
  minPrice?: number;
  maxPrice?: number;
  featuredOnly?: boolean;
  sortBy?: "newest" | "price_asc" | "price_desc" | "year_desc";
}

export interface DashboardStats {
  total: number;
  published: number;
  unpublished: number;
  featured: number;
  available: number;
}
