// Path: Your Create/Edit page of the Netlify Admin Dashboard

// Add this simple instruction text to help users manually create the right field values

// Room dropdown options:
// - Kitchen
// - Furniture 
// - Light (for Lighting)
// - Bath
// - Outdoor
// - Office
// - Closet

// Style dropdown options (only for Kitchen and Furniture):
// - For Kitchen: Modern, Traditional, Art_Deco
// - For Furniture: Living, Dining, Bedroom
// - For other rooms: leave empty

/*
When uploading an image from Cloudinary, follow these steps:

1. Upload or select image from Cloudinary
   Example URL: https://res.cloudinary.com/designcenter/image/upload/v1744036625/Product_2/Furniture/Bedroom/Bedroom_11.avif

2. Extract fields from the URL parts (Product_2/Furniture/Bedroom/Bedroom_11):
   - ID: Use the full path (Product_2/Furniture/Bedroom/Bedroom_11)
   - Slug: Use the filename with hyphens (bedroom-11)
   - Title: Use the filename with spaces (Bedroom 11) 
   - Room: Select from dropdown based on part 2 of the path (Furniture)
   - Style: Select from dropdown if applicable (for Kitchen or Furniture only)
*/