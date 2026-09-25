import { useState } from "react";
import { ChevronLeft, ChevronRight, Cog } from "lucide-react";
import type { VehicleImage } from "@/types/vehicle";

export function VehicleGallery({ images, alt }: { images: VehicleImage[]; alt: string }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="flex aspect-[4/3] w-full items-center justify-center rounded-lg border border-swift-border bg-swift-surface text-swift-muted">
        <Cog size={48} strokeWidth={1} />
      </div>
    );
  }

  const active = images[activeIndex];

  const go = (dir: 1 | -1) => {
    setActiveIndex((prev) => (prev + dir + images.length) % images.length);
  };

  return (
    <div>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-swift-border bg-swift-surface">
        <img src={active.url} alt={alt} className="h-full w-full object-cover" />
        {images.length > 1 && (
          <>
            <button
              onClick={() => go(-1)}
              aria-label="Previous image"
              className="absolute start-3 top-1/2 -translate-y-1/2 rounded-full bg-swift-black/70 p-2 text-swift-warm hover:bg-swift-black"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next image"
              className="absolute end-3 top-1/2 -translate-y-1/2 rounded-full bg-swift-black/70 p-2 text-swift-warm hover:bg-swift-black"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((img, idx) => (
            <button
              key={img.path}
              onClick={() => setActiveIndex(idx)}
              aria-label={`View image ${idx + 1}`}
              className={`h-16 w-20 shrink-0 overflow-hidden rounded-md border-2 transition-colors ${
                idx === activeIndex ? "border-swift-gold" : "border-swift-border opacity-70"
              }`}
            >
              <img src={img.url} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
