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



// export type Json =
//   | string
//   | number
//   | boolean
//   | null
//   | { [key: string]: Json | undefined }
//   | Json[];

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
//           images: Json;
//           is_available: boolean;
//           is_featured: boolean;
//           is_published: boolean;
//           created_at: string;
//           updated_at: string;
//         };

//         Insert: {
//           id?: string;
//           brand: string;
//           model: string;
//           trim?: string | null;
//           year: number;
//           price_aed: number;
//           mileage?: number | null;
//           fuel_type?: string | null;
//           transmission?: string | null;
//           engine?: string | null;
//           engine_size?: string | null;
//           body_type?: string | null;
//           color?: string | null;
//           regional_specification?: string | null;
//           country?: string | null;
//           description_fa?: string | null;
//           description_en?: string | null;
//           images?: Json;
//           is_available?: boolean;
//           is_featured?: boolean;
//           is_published?: boolean;
//           created_at?: string;
//           updated_at?: string;
//         };

//         Update: {
//           id?: string;
//           brand?: string;
//           model?: string;
//           trim?: string | null;
//           year?: number;
//           price_aed?: number;
//           mileage?: number | null;
//           fuel_type?: string | null;
//           transmission?: string | null;
//           engine?: string | null;
//           engine_size?: string | null;
//           body_type?: string | null;
//           color?: string | null;
//           regional_specification?: string | null;
//           country?: string | null;
//           description_fa?: string | null;
//           description_en?: string | null;
//           images?: Json;
//           is_available?: boolean;
//           is_featured?: boolean;
//           is_published?: boolean;
//           created_at?: string;
//           updated_at?: string;
//         };

//         Relationships: [];
//       };
//     };

//     Views: {
//       [_ in never]: never;
//     };

//     Functions: {
//       [_ in never]: never;
//     };

//     Enums: {
//       [_ in never]: never;
//     };

//     CompositeTypes: {
//       [_ in never]: never;
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

      article_categories: {
        Row: {
          id: string;
          slug: string;
          name_fa: string;
          name_en: string;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name_fa: string;
          name_en: string;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name_fa?: string;
          name_en?: string;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };

      articles: {
        Row: {
          id: string;
          title: string;
          slug: string;
          language: "fa" | "en";
          excerpt: string | null;
          content: Json;
          cover_image_path: string | null;
          cover_image_alt: string | null;
          author_name: string | null;
          category_id: string | null;
          translation_group_id: string | null;
          status: "draft" | "review" | "published" | "archived";
          is_featured: boolean;
          published_at: string | null;
          seo_title: string | null;
          seo_description: string | null;
          canonical_url: string | null;
          social_image_path: string | null;
          source_urls: string[];
          created_at: string;
          updated_at: string;
          created_by: string | null;
          updated_by: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          language: "fa" | "en";
          excerpt?: string | null;
          content?: Json;
          cover_image_path?: string | null;
          cover_image_alt?: string | null;
          author_name?: string | null;
          category_id?: string | null;
          translation_group_id?: string | null;
          status?: "draft" | "review" | "published" | "archived";
          is_featured?: boolean;
          published_at?: string | null;
          seo_title?: string | null;
          seo_description?: string | null;
          canonical_url?: string | null;
          social_image_path?: string | null;
          source_urls?: string[];
          created_at?: string;
          updated_at?: string;
          created_by?: string | null;
          updated_by?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          language?: "fa" | "en";
          excerpt?: string | null;
          content?: Json;
          cover_image_path?: string | null;
          cover_image_alt?: string | null;
          author_name?: string | null;
          category_id?: string | null;
          translation_group_id?: string | null;
          status?: "draft" | "review" | "published" | "archived";
          is_featured?: boolean;
          published_at?: string | null;
          seo_title?: string | null;
          seo_description?: string | null;
          canonical_url?: string | null;
          social_image_path?: string | null;
          source_urls?: string[];
          created_at?: string;
          updated_at?: string;
          created_by?: string | null;
          updated_by?: string | null;
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
