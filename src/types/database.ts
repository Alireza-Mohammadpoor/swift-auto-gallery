// // Minimal typed shape of the Supabase schema used by the app.
// // Keep this in sync with supabase/migrations/001_initial_schema.sql
// export interface Database {
//   public: {
//     Tables: {
//       vehicles: {
//         Row: {
//           id: string;
//           brand: string;
//           model: string;
//           trim: string | null;
//           year: number;
//           price_aed: number;
//           mileage: number | null;
//           fuel_type: string | null;
//           transmission: string | null;
//           engine: string | null;
//           engine_size: string | null;
//           body_type: string | null;
//           color: string | null;
//           regional_specification: string | null;
//           country: string | null;
//           description_fa: string | null;
//           description_en: string | null;
//           images: unknown;
//           is_available: boolean;
//           is_featured: boolean;
//           is_published: boolean;
//           created_at: string;
//           updated_at: string;
//         };
//         Insert: Partial<Database["public"]["Tables"]["vehicles"]["Row"]> & {
//           brand: string;
//           model: string;
//           year: number;
//           price_aed: number;
//         };
//         Update: Partial<Database["public"]["Tables"]["vehicles"]["Row"]>;
//       };
//     };
//   };
// }



export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      vehicles: {
        Row: {
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
          images: Json;
          is_available: boolean;
          is_featured: boolean;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };

        Insert: {
          id?: string;
          brand: string;
          model: string;
          trim?: string | null;
          year: number;
          price_aed: number;
          mileage?: number | null;
          fuel_type?: string | null;
          transmission?: string | null;
          engine?: string | null;
          engine_size?: string | null;
          body_type?: string | null;
          color?: string | null;
          regional_specification?: string | null;
          country?: string | null;
          description_fa?: string | null;
          description_en?: string | null;
          images?: Json;
          is_available?: boolean;
          is_featured?: boolean;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };

        Update: {
          id?: string;
          brand?: string;
          model?: string;
          trim?: string | null;
          year?: number;
          price_aed?: number;
          mileage?: number | null;
          fuel_type?: string | null;
          transmission?: string | null;
          engine?: string | null;
          engine_size?: string | null;
          body_type?: string | null;
          color?: string | null;
          regional_specification?: string | null;
          country?: string | null;
          description_fa?: string | null;
          description_en?: string | null;
          images?: Json;
          is_available?: boolean;
          is_featured?: boolean;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };

        Relationships: [];
      };
    };

    Views: {
      [_ in never]: never;
    };

    Functions: {
      [_ in never]: never;
    };

    Enums: {
      [_ in never]: never;
    };

    CompositeTypes: {
      [_ in never]: never;
    };
  };
}