// import { useEffect, useState, type FormEvent } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { Star, Trash2, Upload, Loader2 } from "lucide-react";
// import { useLanguage } from "@/i18n/LanguageContext";
// import { useAdminVehicle } from "@/hooks/useVehicles";
// import { supabase } from "@/lib/supabase/client";
// import { vehicleFormSchema } from "@/schemas/vehicleSchema";
// import type { VehicleImage } from "@/types/vehicle";

// const VEHICLE_BUCKET = "vehicle-images";

// const emptyForm = {
//   brand: "",
//   model: "",
//   trim: "",
//   year: new Date().getFullYear(),
//   price_aed: 0,
//   mileage: "",
//   fuel_type: "",
//   transmission: "",
//   engine: "",
//   engine_size: "",
//   body_type: "",
//   color: "",
//   regional_specification: "",
//   country: "",
//   description_fa: "",
//   description_en: "",
//   is_available: true,
//   is_featured: false,
//   is_published: false,
// };

// type FormState = typeof emptyForm;

// export function VehicleForm() {
//   const { id } = useParams<{ id: string }>();
//   const isEdit = !!id;
//   const { t } = useLanguage();
//   const navigate = useNavigate();
//   const { data: existing, isLoading: loadingExisting } = useAdminVehicle(id);

//   const [form, setForm] = useState<FormState>(emptyForm);
//   const [images, setImages] = useState<VehicleImage[]>([]);
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [submitting, setSubmitting] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [banner, setBanner] = useState<{ type: "success" | "error"; message: string } | null>(null);

//   useEffect(() => {
//     if (existing) {
//       setForm({
//         brand: existing.brand,
//         model: existing.model,
//         trim: existing.trim ?? "",
//         year: existing.year,
//         price_aed: existing.price_aed,
//         mileage: existing.mileage?.toString() ?? "",
//         fuel_type: existing.fuel_type ?? "",
//         transmission: existing.transmission ?? "",
//         engine: existing.engine ?? "",
//         engine_size: existing.engine_size ?? "",
//         body_type: existing.body_type ?? "",
//         color: existing.color ?? "",
//         regional_specification: existing.regional_specification ?? "",
//         country: existing.country ?? "",
//         description_fa: existing.description_fa ?? "",
//         description_en: existing.description_en ?? "",
//         is_available: existing.is_available,
//         is_featured: existing.is_featured,
//         is_published: existing.is_published,
//       });
//       setImages(existing.images ?? []);
//     }
//   }, [existing]);

//   const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
//     setForm((prev) => ({ ...prev, [key]: value }));

//   const handleImageUpload = async (files: FileList | null) => {
//     if (!files || files.length === 0) return;
//     setUploading(true);
//     const uploaded: VehicleImage[] = [];

//     for (const file of Array.from(files)) {
//       if (!file.type.startsWith("image/")) continue;
//       if (file.size > 8 * 1024 * 1024) continue; // 8MB cap

//       const ext = file.name.split(".").pop();
//       const path = `${crypto.randomUUID()}.${ext}`;
//       const { error } = await supabase.storage.from(VEHICLE_BUCKET).upload(path, file, {
//         cacheControl: "3600",
//         upsert: false,
//       });
//       if (error) continue;

//       const { data: publicUrl } = supabase.storage.from(VEHICLE_BUCKET).getPublicUrl(path);
//       uploaded.push({
//         url: publicUrl.publicUrl,
//         path,
//         isPrimary: false,
//         sortOrder: images.length + uploaded.length,
//       });
//     }

//     setImages((prev) => {
//       const next = [...prev, ...uploaded];
//       if (!next.some((img) => img.isPrimary) && next.length > 0) next[0].isPrimary = true;
//       return next;
//     });
//     setUploading(false);
//   };

//   const removeImage = async (path: string) => {
//     await supabase.storage.from(VEHICLE_BUCKET).remove([path]);
//     setImages((prev) => {
//       const next = prev.filter((img) => img.path !== path);
//       if (next.length > 0 && !next.some((img) => img.isPrimary)) next[0].isPrimary = true;
//       return next;
//     });
//   };

//   const setPrimary = (path: string) => {
//     setImages((prev) => prev.map((img) => ({ ...img, isPrimary: img.path === path })));
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     setBanner(null);

//     const parsed = vehicleFormSchema.safeParse({
//       ...form,
//       year: Number(form.year),
//       price_aed: Number(form.price_aed),
//       mileage: form.mileage === "" ? null : Number(form.mileage),
//     });

//     if (!parsed.success) {
//       const fieldErrors: Record<string, string> = {};
//       for (const issue of parsed.error.issues) {
//         fieldErrors[String(issue.path[0])] = t.admin.requiredField;
//       }
//       setErrors(fieldErrors);
//       return;
//     }
//     setErrors({});
//     setSubmitting(true);

//     const payload = {
//       ...parsed.data,
//       trim: parsed.data.trim || null,
//       fuel_type: parsed.data.fuel_type || null,
//       transmission: parsed.data.transmission || null,
//       engine: parsed.data.engine || null,
//       engine_size: parsed.data.engine_size || null,
//       body_type: parsed.data.body_type || null,
//       color: parsed.data.color || null,
//       regional_specification: parsed.data.regional_specification || null,
//       country: parsed.data.country || null,
//       description_fa: parsed.data.description_fa || null,
//       description_en: parsed.data.description_en || null,
//       images,
//     };

//     const result = isEdit
//       ? await supabase.from("vehicles").update(payload).eq("id", id)
//       : await supabase.from("vehicles").insert(payload);

//     setSubmitting(false);

//     if (result.error) {
//       setBanner({ type: "error", message: t.admin.saveError });
//       return;
//     }

//     setBanner({ type: "success", message: t.admin.saveSuccess });
//     setTimeout(() => navigate("/admin/vehicles"), 600);
//   };

//   if (isEdit && loadingExisting) {
//     return <div className="text-swift-muted">{t.common.loading}</div>;
//   }

//   const inputClass =
//     "w-full rounded-md border border-swift-border bg-swift-black px-3 py-2.5 text-sm text-swift-warm focus:border-swift-gold focus:outline-none";
//   const labelClass = "mb-1.5 block text-sm font-medium text-swift-warm/80";

//   return (
//     <div className="mx-auto max-w-4xl">
//       <h1 className="mb-6 text-2xl font-bold text-swift-warm">{t.admin.formTitle}</h1>

//       {banner && (
//         <div
//           role="status"
//           className={`mb-4 rounded-md px-4 py-3 text-sm ${
//             banner.type === "success" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
//           }`}
//         >
//           {banner.message}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-8">
//         <section className="surface-card p-6">
//           <h2 className="section-label mb-4">{t.admin.images}</h2>
//           <div className="flex flex-wrap gap-3">
//             {images.map((img) => (
//               <div key={img.path} className="group relative h-24 w-32 overflow-hidden rounded-md border border-swift-border">
//                 <img src={img.url} alt="" className="h-full w-full object-cover" />
//                 <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
//                   <button
//                     type="button"
//                     onClick={() => setPrimary(img.path)}
//                     className={`flex items-center gap-1 rounded px-2 py-1 text-[10px] ${
//                       img.isPrimary ? "bg-swift-gold text-swift-black" : "bg-white/10 text-white"
//                     }`}
//                   >
//                     <Star size={10} fill={img.isPrimary ? "currentColor" : "none"} />
//                     {t.admin.setPrimary}
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => removeImage(img.path)}
//                     className="flex items-center gap-1 rounded bg-red-500/80 px-2 py-1 text-[10px] text-white"
//                   >
//                     <Trash2 size={10} />
//                     {t.admin.removeImage}
//                   </button>
//                 </div>
//                 {img.isPrimary && (
//                   <span className="absolute start-1 top-1 rounded bg-swift-gold px-1.5 py-0.5 text-[10px] font-bold text-swift-black">
//                     ★
//                   </span>
//                 )}
//               </div>
//             ))}

//             <label className="flex h-24 w-32 cursor-pointer flex-col items-center justify-center gap-1 rounded-md border border-dashed border-swift-border text-swift-muted hover:border-swift-gold hover:text-swift-gold">
//               {uploading ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
//               <span className="text-[10px]">{t.admin.uploadImages}</span>
//               <input
//                 type="file"
//                 accept="image/*"
//                 multiple
//                 className="hidden"
//                 onChange={(e) => handleImageUpload(e.target.files)}
//                 disabled={uploading}
//               />
//             </label>
//           </div>
//         </section>

//         <section className="surface-card grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">
//           <div>
//             <label className={labelClass}>{t.vehicles.brand} *</label>
//             <input className={inputClass} value={form.brand} onChange={(e) => update("brand", e.target.value)} />
//             {errors.brand && <p className="mt-1 text-xs text-red-400">{errors.brand}</p>}
//           </div>
//           <div>
//             <label className={labelClass}>Model *</label>
//             <input className={inputClass} value={form.model} onChange={(e) => update("model", e.target.value)} />
//             {errors.model && <p className="mt-1 text-xs text-red-400">{errors.model}</p>}
//           </div>
//           <div>
//             <label className={labelClass}>Trim</label>
//             <input className={inputClass} value={form.trim} onChange={(e) => update("trim", e.target.value)} />
//           </div>
//           <div>
//             <label className={labelClass}>{t.vehicle.year} *</label>
//             <input
//               type="number"
//               className={inputClass}
//               value={form.year}
//               onChange={(e) => update("year", Number(e.target.value) as never)}
//             />
//             {errors.year && <p className="mt-1 text-xs text-red-400">{errors.year}</p>}
//           </div>
//           <div>
//             <label className={labelClass}>Price (AED) *</label>
//             <input
//               type="number"
//               min={0}
//               className={inputClass}
//               value={form.price_aed}
//               onChange={(e) => update("price_aed", Number(e.target.value) as never)}
//             />
//             {errors.price_aed && <p className="mt-1 text-xs text-red-400">{errors.price_aed}</p>}
//           </div>
//           <div>
//             <label className={labelClass}>{t.vehicle.mileage}</label>
//             <input
//               type="number"
//               min={0}
//               className={inputClass}
//               value={form.mileage}
//               onChange={(e) => update("mileage", e.target.value)}
//             />
//           </div>
//           <div>
//             <label className={labelClass}>{t.vehicle.fuel}</label>
//             <input className={inputClass} value={form.fuel_type} onChange={(e) => update("fuel_type", e.target.value)} />
//           </div>
//           <div>
//             <label className={labelClass}>{t.vehicle.transmission}</label>
//             <input
//               className={inputClass}
//               value={form.transmission}
//               onChange={(e) => update("transmission", e.target.value)}
//             />
//           </div>
//           <div>
//             <label className={labelClass}>{t.vehicle.engine}</label>
//             <input className={inputClass} value={form.engine} onChange={(e) => update("engine", e.target.value)} />
//           </div>
//           <div>
//             <label className={labelClass}>{t.vehicle.engineSize}</label>
//             <input
//               className={inputClass}
//               value={form.engine_size}
//               onChange={(e) => update("engine_size", e.target.value)}
//             />
//           </div>
//           <div>
//             <label className={labelClass}>{t.vehicle.bodyType}</label>
//             <input className={inputClass} value={form.body_type} onChange={(e) => update("body_type", e.target.value)} />
//           </div>
//           <div>
//             <label className={labelClass}>{t.vehicle.color}</label>
//             <input className={inputClass} value={form.color} onChange={(e) => update("color", e.target.value)} />
//           </div>
//           <div>
//             <label className={labelClass}>{t.vehicle.spec}</label>
//             <input
//               className={inputClass}
//               value={form.regional_specification}
//               onChange={(e) => update("regional_specification", e.target.value)}
//             />
//           </div>
//           <div>
//             <label className={labelClass}>{t.vehicle.country}</label>
//             <input className={inputClass} value={form.country} onChange={(e) => update("country", e.target.value)} />
//           </div>
//         </section>

//         <section className="surface-card space-y-4 p-6">
//           <div>
//             <label className={labelClass}>{t.vehicle.descriptionFa}</label>
//             <textarea
//               dir="rtl"
//               rows={4}
//               className={inputClass}
//               value={form.description_fa}
//               onChange={(e) => update("description_fa", e.target.value)}
//             />
//           </div>
//           <div>
//             <label className={labelClass}>{t.vehicle.descriptionEn}</label>
//             <textarea
//               dir="ltr"
//               rows={4}
//               className={inputClass}
//               value={form.description_en}
//               onChange={(e) => update("description_en", e.target.value)}
//             />
//           </div>
//         </section>

//         <section className="surface-card flex flex-wrap gap-6 p-6">
//           {(
//             [
//               ["is_available", t.admin.markAvailable],
//               ["is_featured", t.admin.feature],
//               ["is_published", t.admin.publish],
//             ] as const
//           ).map(([key, label]) => (
//             <label key={key} className="flex items-center gap-2 text-sm text-swift-warm/90">
//               <input
//                 type="checkbox"
//                 checked={form[key]}
//                 onChange={(e) => update(key, e.target.checked as never)}
//                 className="h-4 w-4 rounded border-swift-border accent-swift-gold"
//               />
//               {label}
//             </label>
//           ))}
//         </section>

//         <div className="flex justify-end gap-3">
//           <button
//             type="button"
//             onClick={() => navigate("/admin/vehicles")}
//             className="btn-outline"
//             disabled={submitting}
//           >
//             {t.common.cancel}
//           </button>
//           <button type="submit" className="btn-gold" disabled={submitting}>
//             {submitting ? t.admin.loggingIn : t.common.save}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }



import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Star, Trash2, Upload, Loader2 } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAdminVehicle } from "@/hooks/useVehicles";
import { supabase } from "@/lib/supabase/client";
import { vehicleFormSchema } from "@/schemas/vehicleSchema";
import type { VehicleImage } from "@/types/vehicle";
import type { Json } from "@/types/database";

const VEHICLE_BUCKET = "vehicle-images";

const emptyForm = {
  brand: "",
  model: "",
  trim: "",
  year: new Date().getFullYear(),
  price_aed: 0,
  mileage: "",
  fuel_type: "",
  transmission: "",
  engine: "",
  engine_size: "",
  body_type: "",
  color: "",
  regional_specification: "",
  country: "",
  description_fa: "",
  description_en: "",
  is_available: true,
  is_featured: false,
  is_published: false,
};

type FormState = typeof emptyForm;

export function VehicleForm() {
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;
  const { t } = useLanguage();
  const navigate = useNavigate();

  const {
    data: existing,
    isLoading: loadingExisting,
  } = useAdminVehicle(id);

  const [form, setForm] = useState<FormState>(emptyForm);
  const [images, setImages] = useState<VehicleImage[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [banner, setBanner] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    if (existing) {
      setForm({
        brand: existing.brand,
        model: existing.model,
        trim: existing.trim ?? "",
        year: existing.year,
        price_aed: existing.price_aed,
        mileage: existing.mileage?.toString() ?? "",
        fuel_type: existing.fuel_type ?? "",
        transmission: existing.transmission ?? "",
        engine: existing.engine ?? "",
        engine_size: existing.engine_size ?? "",
        body_type: existing.body_type ?? "",
        color: existing.color ?? "",
        regional_specification:
          existing.regional_specification ?? "",
        country: existing.country ?? "",
        description_fa: existing.description_fa ?? "",
        description_en: existing.description_en ?? "",
        is_available: existing.is_available,
        is_featured: existing.is_featured,
        is_published: existing.is_published,
      });

      setImages(existing.images ?? []);
    }
  }, [existing]);

  const update = <K extends keyof FormState>(
    key: K,
    value: FormState[K]
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleImageUpload = async (
    files: FileList | null
  ) => {
    if (!files || files.length === 0) return;

    setUploading(true);

    const uploaded: VehicleImage[] = [];

    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) continue;

      if (file.size > 8 * 1024 * 1024) continue;

      const ext = file.name.split(".").pop();

      const path = `${crypto.randomUUID()}.${ext}`;

      const { error } = await supabase.storage
        .from(VEHICLE_BUCKET)
        .upload(path, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) continue;

      const { data: publicUrl } = supabase.storage
        .from(VEHICLE_BUCKET)
        .getPublicUrl(path);

      uploaded.push({
        url: publicUrl.publicUrl,
        path,
        isPrimary: false,
        sortOrder: images.length + uploaded.length,
      });
    }

    setImages((prev) => {
      const next = [...prev, ...uploaded];

      if (
        !next.some((img) => img.isPrimary) &&
        next.length > 0
      ) {
        next[0].isPrimary = true;
      }

      return next;
    });

    setUploading(false);
  };

  const removeImage = async (path: string) => {
    await supabase.storage
      .from(VEHICLE_BUCKET)
      .remove([path]);

    setImages((prev) => {
      const next = prev.filter(
        (img) => img.path !== path
      );

      if (
        next.length > 0 &&
        !next.some((img) => img.isPrimary)
      ) {
        next[0].isPrimary = true;
      }

      return next;
    });
  };

  const setPrimary = (path: string) => {
    setImages((prev) =>
      prev.map((img) => ({
        ...img,
        isPrimary: img.path === path,
      }))
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setBanner(null);

    const parsed = vehicleFormSchema.safeParse({
      ...form,
      year: Number(form.year),
      price_aed: Number(form.price_aed),
      mileage:
        form.mileage === ""
          ? null
          : Number(form.mileage),
    });

    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};

      for (const issue of parsed.error.issues) {
        fieldErrors[String(issue.path[0])] =
          t.admin.requiredField;
      }

      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);

    // Convert VehicleImage[] into JSON-compatible data
    const jsonImages: Json = images.map((image) => ({
      url: image.url,
      path: image.path,
      isPrimary: image.isPrimary,
      sortOrder: image.sortOrder,
    }));

    const payload = {
      ...parsed.data,
      trim: parsed.data.trim || null,
      fuel_type: parsed.data.fuel_type || null,
      transmission: parsed.data.transmission || null,
      engine: parsed.data.engine || null,
      engine_size: parsed.data.engine_size || null,
      body_type: parsed.data.body_type || null,
      color: parsed.data.color || null,
      regional_specification:
        parsed.data.regional_specification || null,
      country: parsed.data.country || null,
      description_fa:
        parsed.data.description_fa || null,
      description_en:
        parsed.data.description_en || null,
      images: jsonImages,
    };

    const result = isEdit
      ? await supabase
          .from("vehicles")
          .update(payload)
          .eq("id", id)
      : await supabase
          .from("vehicles")
          .insert(payload);

    setSubmitting(false);

    if (result.error) {
      setBanner({
        type: "error",
        message: t.admin.saveError,
      });

      return;
    }

    setBanner({
      type: "success",
      message: t.admin.saveSuccess,
    });

    setTimeout(
      () => navigate("/admin/vehicles"),
      600
    );
  };

  if (isEdit && loadingExisting) {
    return (
      <div className="text-swift-muted">
        {t.common.loading}
      </div>
    );
  }

  const inputClass =
    "w-full rounded-md border border-swift-border bg-swift-black px-3 py-2.5 text-sm text-swift-warm focus:border-swift-gold focus:outline-none";

  const labelClass =
    "mb-1.5 block text-sm font-medium text-swift-warm/80";

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-6 text-2xl font-bold text-swift-warm">
        {t.admin.formTitle}
      </h1>

      {banner && (
        <div
          role="status"
          className={`mb-4 rounded-md px-4 py-3 text-sm ${
            banner.type === "success"
              ? "bg-green-500/10 text-green-400"
              : "bg-red-500/10 text-red-400"
          }`}
        >
          {banner.message}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >
        <section className="surface-card p-6">
          <h2 className="section-label mb-4">
            {t.admin.images}
          </h2>

          <div className="flex flex-wrap gap-3">
            {images.map((img) => (
              <div
                key={img.path}
                className="group relative h-24 w-32 overflow-hidden rounded-md border border-swift-border"
              >
                <img
                  src={img.url}
                  alt=""
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    type="button"
                    onClick={() =>
                      setPrimary(img.path)
                    }
                    className={`flex items-center gap-1 rounded px-2 py-1 text-[10px] ${
                      img.isPrimary
                        ? "bg-swift-gold text-swift-black"
                        : "bg-white/10 text-white"
                    }`}
                  >
                    <Star
                      size={10}
                      fill={
                        img.isPrimary
                          ? "currentColor"
                          : "none"
                      }
                    />

                    {t.admin.setPrimary}
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      removeImage(img.path)
                    }
                    className="flex items-center gap-1 rounded bg-red-500/80 px-2 py-1 text-[10px] text-white"
                  >
                    <Trash2 size={10} />

                    {t.admin.removeImage}
                  </button>
                </div>

                {img.isPrimary && (
                  <span className="absolute start-1 top-1 rounded bg-swift-gold px-1.5 py-0.5 text-[10px] font-bold text-swift-black">
                    ★
                  </span>
                )}
              </div>
            ))}

            <label className="flex h-24 w-32 cursor-pointer flex-col items-center justify-center gap-1 rounded-md border border-dashed border-swift-border text-swift-muted hover:border-swift-gold hover:text-swift-gold">
              {uploading ? (
                <Loader2
                  size={18}
                  className="animate-spin"
                />
              ) : (
                <Upload size={18} />
              )}

              <span className="text-[10px]">
                {t.admin.uploadImages}
              </span>

              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) =>
                  handleImageUpload(e.target.files)
                }
                disabled={uploading}
              />
            </label>
          </div>
        </section>

        <section className="surface-card grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">
          <div>
            <label className={labelClass}>
              {t.vehicles.brand} *
            </label>

            <input
              className={inputClass}
              value={form.brand}
              onChange={(e) =>
                update("brand", e.target.value)
              }
            />

            {errors.brand && (
              <p className="mt-1 text-xs text-red-400">
                {errors.brand}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass}>
              Model *
            </label>

            <input
              className={inputClass}
              value={form.model}
              onChange={(e) =>
                update("model", e.target.value)
              }
            />

            {errors.model && (
              <p className="mt-1 text-xs text-red-400">
                {errors.model}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass}>
              Trim
            </label>

            <input
              className={inputClass}
              value={form.trim}
              onChange={(e) =>
                update("trim", e.target.value)
              }
            />
          </div>

          <div>
            <label className={labelClass}>
              {t.vehicle.year} *
            </label>

            <input
              type="number"
              className={inputClass}
              value={form.year}
              onChange={(e) =>
                update(
                  "year",
                  Number(e.target.value)
                )
              }
            />

            {errors.year && (
              <p className="mt-1 text-xs text-red-400">
                {errors.year}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass}>
              Price (AED) *
            </label>

            <input
              type="number"
              min={0}
              className={inputClass}
              value={form.price_aed}
              onChange={(e) =>
                update(
                  "price_aed",
                  Number(e.target.value)
                )
              }
            />

            {errors.price_aed && (
              <p className="mt-1 text-xs text-red-400">
                {errors.price_aed}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass}>
              {t.vehicle.mileage}
            </label>

            <input
              type="number"
              min={0}
              className={inputClass}
              value={form.mileage}
              onChange={(e) =>
                update("mileage", e.target.value)
              }
            />
          </div>

          <div>
            <label className={labelClass}>
              {t.vehicle.fuel}
            </label>

            <input
              className={inputClass}
              value={form.fuel_type}
              onChange={(e) =>
                update(
                  "fuel_type",
                  e.target.value
                )
              }
            />
          </div>

          <div>
            <label className={labelClass}>
              {t.vehicle.transmission}
            </label>

            <input
              className={inputClass}
              value={form.transmission}
              onChange={(e) =>
                update(
                  "transmission",
                  e.target.value
                )
              }
            />
          </div>

          <div>
            <label className={labelClass}>
              {t.vehicle.engine}
            </label>

            <input
              className={inputClass}
              value={form.engine}
              onChange={(e) =>
                update(
                  "engine",
                  e.target.value
                )
              }
            />
          </div>

          <div>
            <label className={labelClass}>
              {t.vehicle.engineSize}
            </label>

            <input
              className={inputClass}
              value={form.engine_size}
              onChange={(e) =>
                update(
                  "engine_size",
                  e.target.value
                )
              }
            />
          </div>

          <div>
            <label className={labelClass}>
              {t.vehicle.bodyType}
            </label>

            <input
              className={inputClass}
              value={form.body_type}
              onChange={(e) =>
                update(
                  "body_type",
                  e.target.value
                )
              }
            />
          </div>

          <div>
            <label className={labelClass}>
              {t.vehicle.color}
            </label>

            <input
              className={inputClass}
              value={form.color}
              onChange={(e) =>
                update(
                  "color",
                  e.target.value
                )
              }
            />
          </div>

          <div>
            <label className={labelClass}>
              {t.vehicle.spec}
            </label>

            <input
              className={inputClass}
              value={form.regional_specification}
              onChange={(e) =>
                update(
                  "regional_specification",
                  e.target.value
                )
              }
            />
          </div>

          <div>
            <label className={labelClass}>
              {t.vehicle.country}
            </label>

            <input
              className={inputClass}
              value={form.country}
              onChange={(e) =>
                update(
                  "country",
                  e.target.value
                )
              }
            />
          </div>
        </section>

        <section className="surface-card space-y-4 p-6">
          <div>
            <label className={labelClass}>
              {t.vehicle.descriptionFa}
            </label>

            <textarea
              dir="rtl"
              rows={4}
              className={inputClass}
              value={form.description_fa}
              onChange={(e) =>
                update(
                  "description_fa",
                  e.target.value
                )
              }
            />
          </div>

          <div>
            <label className={labelClass}>
              {t.vehicle.descriptionEn}
            </label>

            <textarea
              dir="ltr"
              rows={4}
              className={inputClass}
              value={form.description_en}
              onChange={(e) =>
                update(
                  "description_en",
                  e.target.value
                )
              }
            />
          </div>
        </section>

        <section className="surface-card flex flex-wrap gap-6 p-6">
          {(
            [
              [
                "is_available",
                t.admin.markAvailable,
              ],
              [
                "is_featured",
                t.admin.feature,
              ],
              [
                "is_published",
                t.admin.publish,
              ],
            ] as const
          ).map(([key, label]) => (
            <label
              key={key}
              className="flex items-center gap-2 text-sm text-swift-warm/90"
            >
              <input
                type="checkbox"
                checked={form[key]}
                onChange={(e) =>
                  update(
                    key,
                    e.target.checked
                  )
                }
                className="h-4 w-4 rounded border-swift-border accent-swift-gold"
              />

              {label}
            </label>
          ))}
        </section>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() =>
              navigate("/admin/vehicles")
            }
            className="btn-outline"
            disabled={submitting}
          >
            {t.common.cancel}
          </button>

          <button
            type="submit"
            className="btn-gold"
            disabled={submitting}
          >
            {submitting
              ? t.common.loading
              : t.common.save}
          </button>
        </div>
      </form>
    </div>
  );
}