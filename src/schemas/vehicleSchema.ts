import { z } from "zod";

export const vehicleFormSchema = z.object({
  brand: z.string().min(1, "required"),
  model: z.string().min(1, "required"),
  trim: z.string().optional().nullable(),
  year: z
    .number({ invalid_type_error: "required" })
    .int()
    .min(1970, "invalid")
    .max(new Date().getFullYear() + 1, "invalid"),
  price_aed: z.number({ invalid_type_error: "required" }).nonnegative("invalid"),
  mileage: z.number().nonnegative("invalid").optional().nullable(),
  fuel_type: z.string().optional().nullable(),
  transmission: z.string().optional().nullable(),
  engine: z.string().optional().nullable(),
  engine_size: z.string().optional().nullable(),
  body_type: z.string().optional().nullable(),
  color: z.string().optional().nullable(),
  regional_specification: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  description_fa: z.string().optional().nullable(),
  description_en: z.string().optional().nullable(),
  is_available: z.boolean().default(true),
  is_featured: z.boolean().default(false),
  is_published: z.boolean().default(false),
});

export type VehicleFormValues = z.infer<typeof vehicleFormSchema>;
