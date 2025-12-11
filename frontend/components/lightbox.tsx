"use client";

import React, { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface GalleryImage {
  ID: string;
  url: string;
  title?: string;
}

interface LightboxProps {
  images: GalleryImage[];
  initialIndex: number;
  onClose: () => void;
}

export default function Lightbox({ images, initialIndex, onClose }: LightboxProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    startIndex: initialIndex,
    duration: 20,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") scrollPrev();
      if (e.key === "ArrowRight") scrollNext();
    },
    [onClose, scrollPrev, scrollNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    // Lock body scroll
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [handleKeyDown]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm"
        onClick={onClose}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/10"
          aria-label="Close lightbox"
        >
          <X className="w-8 h-8" />
        </button>

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                scrollPrev();
              }}
              className="absolute left-4 z-50 p-3 text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/10 hidden sm:block"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                scrollNext();
              }}
              className="absolute right-4 z-50 p-3 text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/10 hidden sm:block"
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </>
        )}

        {/* Carousel */}
        <div
          className="w-full h-full flex items-center justify-center overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full h-full" ref={emblaRef}>
            <div className="flex h-full touch-pan-y">
              {images.map((image) => (
                <div
                  key={image.ID}
                  className="flex-[0_0_100%] min-w-0 relative h-full flex items-center justify-center p-4 sm:p-12"
                >
                  <div className="relative w-full h-full max-h-[85vh] max-w-7xl">
                    <Image
                      src={image.url}
                      alt={image.title || "Gallery image"}
                      fill
                      className="object-contain"
                      sizes="100vw"
                      priority
                    />
                    {/* 
                    {image.title && (
                      <div className="absolute bottom-4 left-0 right-0 text-center text-white/90 bg-black/50 p-2 rounded backdrop-blur-md mx-auto max-w-md">
                        {image.title}
                      </div>
                    )} 
                    */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
