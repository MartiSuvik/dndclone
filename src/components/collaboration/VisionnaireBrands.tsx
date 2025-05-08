"use client"

import { useEffect, useState } from "react";
import { DynamicFrameLayout } from "../ui/dynamic-frame-layout"

// Define the type for brand data
type Brand = {
  slug: string;
  name: string;
  logo: string;
  website: string;
  description: string;
  showcaseImage?: string;
  displayOrder?: number;
}

// Define the frame type required by DynamicFrameLayout
interface Frame {
  id: number;
  image: string;
  defaultPos: { x: number; y: number };
  corner: string;
  edgeHorizontal: string;
  edgeVertical: string;
  mediaSize: number;
  borderThickness: number;
  borderSize: number;
  isHovered: boolean;
  name: string;
  website: string;
  description: string;
}

export default function VisionnaireBrands() {
  const [frames, setFrames] = useState<Frame[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBrands = async () => {
      try {
        // Load all brand data from files
        const modules = import.meta.glob("/src/data/brands/*.json");
        const imports = await Promise.all(
          Object.values(modules).map((load) => load())
        );
        
        // Transform brand data into frames format needed by DynamicFrameLayout
        const brands = imports.map((mod: any) => mod.default || mod) as Brand[];
        
        // Sort brands by displayOrder if available
        const sortedBrands = brands.sort((a, b) => {
          if (a.displayOrder !== undefined && b.displayOrder !== undefined) {
            return a.displayOrder - b.displayOrder;
          }
          if (a.displayOrder !== undefined) return -1;
          if (b.displayOrder !== undefined) return 1;
          return 0;
        });
        
        // Convert to frames format
        const brandFrames = sortedBrands.map((brand, index) => ({
          id: index + 1,
          image: brand.showcaseImage || brand.logo, // Use showcaseImage if available, else fallback to logo
          defaultPos: { x: index % 2, y: Math.floor(index / 2) }, // Arrange in grid - alternating columns, new row every 2 items
          corner: "/assets/frame-corner.png",
          edgeHorizontal: "/assets/frame-edge-horizontal.png",
          edgeVertical: "/assets/frame-edge-vertical.png",
          mediaSize: 1,
          borderThickness: 5,
          borderSize: 90,
          isHovered: false,
          name: brand.name,
          website: brand.website,
          description: brand.description,
        }));
        
        setFrames(brandFrames);
      } catch (error) {
        console.error("Error loading brands:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadBrands();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen bg-zinc-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C5A267]"></div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-zinc-900">
      <DynamicFrameLayout
        frames={frames}
        className="w-full h-full"
        showFrames={true}
        hoverSize={2}
        gapSize={4}
      />
    </div>
  );
}