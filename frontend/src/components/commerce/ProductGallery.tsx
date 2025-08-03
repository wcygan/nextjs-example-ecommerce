"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  // For now, we'll use the single image multiple times for demo
  const galleryImages = images.length > 1 ? images : [images[0], images[0], images[0]];

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="aspect-[4/3] relative bg-stone-50 rounded-lg overflow-hidden group">
        <Image
          src={galleryImages[selectedImage]}
          alt={`${productName} - Image ${selectedImage + 1}`}
          fill
          className={cn(
            "object-contain p-8 transition-transform duration-300",
            isZoomed ? "scale-150" : "group-hover:scale-110"
          )}
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          priority
        />
      </div>

      {/* Thumbnail Images */}
      {galleryImages.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {galleryImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={cn(
                "aspect-[4/3] relative bg-stone-50 rounded-md overflow-hidden transition-all",
                selectedImage === index
                  ? "ring-2 ring-emerald-500 ring-offset-2"
                  : "hover:opacity-75"
              )}
            >
              <Image
                src={image}
                alt={`${productName} - Thumbnail ${index + 1}`}
                fill
                className="object-contain p-2"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}