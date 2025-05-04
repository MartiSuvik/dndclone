/**
 * This file dynamically imports all JSON files in the product-galleries directory
 * and exports them as a combined array for use in the ImageGallery component.
 * This ensures compatibility with Netlify CMS.
 */

// Define the type for our gallery item based on the JSON structure
interface GalleryItem {
  slug: string;
  id: string;
  image: string;
  room: string;
  style: string;
  title: string;
}

// Use dynamic imports to load all JSON files in this directory
const galleryFiles = import.meta.glob<GalleryItem>('./*.json', { eager: true });

// Convert the imported files to an array format that the gallery component can use
const galleryData: GalleryItem[] = Object.values(galleryFiles).map(module => {
  // Get the actual data
  return module;
});

export default galleryData;