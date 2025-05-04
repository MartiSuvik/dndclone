// Auto-fill fields based on Cloudinary image URLs
// This script can handle multiple URL formats including:
// - Product_X/Room/Style/Filename.avif
// - Product_X/Room/Filename.avif
// - simple-name_randomchars.avif

(function() {
  // Wait for DOM to be fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    console.log('Auto-fill helper script loaded - Universal version');
    
    // More aggressive polling for image changes
    function startPollingForImageChanges() {
      console.log('Starting to poll for image changes');
      let pollingCount = 0;
      const maxPolls = 20; // Poll for 10 seconds (20 * 500ms)
      
      const intervalId = setInterval(() => {
        pollingCount++;
        
        // Find all Cloudinary image URLs in the form
        const imageElements = findCloudinaryImages();
        
        if (imageElements.length > 0) {
          imageElements.forEach(el => {
            const imageUrl = el.value || el.src || '';
            if (imageUrl && imageUrl.includes('cloudinary.com/designcenter/image/upload')) {
              console.log('Found Cloudinary image URL:', imageUrl);
              extractAndFillFields(imageUrl);
              clearInterval(intervalId);
            }
          });
        }
        
        // Give up after maxPolls attempts
        if (pollingCount >= maxPolls) {
          console.log('Giving up polling for image changes after', maxPolls, 'attempts');
          clearInterval(intervalId);
        }
      }, 500);
    }
    
    // Find any elements containing Cloudinary URLs
    function findCloudinaryImages() {
      // Look for inputs with Cloudinary URLs
      const inputs = Array.from(document.querySelectorAll('input[type="text"], input[type="hidden"]'))
        .filter(input => {
          const val = input.value || '';
          return val.includes('cloudinary.com/designcenter/image/upload');
        });
      
      // Look for image elements with Cloudinary URLs
      const images = Array.from(document.querySelectorAll('img'))
        .filter(img => {
          const src = img.src || '';
          return src.includes('cloudinary.com/designcenter/image/upload');
        });
      
      // Look for div elements with Cloudinary URL in the background
      const divs = Array.from(document.querySelectorAll('div'))
        .filter(div => {
          const style = div.getAttribute('style') || '';
          return style.includes('cloudinary.com/designcenter/image/upload');
        });
      
      return [...inputs, ...images, ...divs];
    }
    
    // Setup MutationObserver to detect DOM changes that might indicate image selection
    const observer = new MutationObserver(function(mutations) {
      // Only run this if we're on the product-galleries collection page
      if (window.location.href.includes('/collections/product-galleries/')) {
        for (const mutation of mutations) {
          // Check if an image was added
          if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            for (const node of mutation.addedNodes) {
              if (node.nodeType === Node.ELEMENT_NODE) {
                // If a img tag was added
                if (node.tagName === 'IMG') {
                  const src = node.src || '';
                  if (src.includes('cloudinary.com/designcenter/image/upload')) {
                    console.log('Image element detected with Cloudinary URL:', src);
                    extractAndFillFields(src);
                  }
                }
                
                // If something containing an img tag was added
                const images = node.querySelectorAll('img');
                for (const img of images) {
                  const src = img.src || '';
                  if (src.includes('cloudinary.com/designcenter/image/upload')) {
                    console.log('Image element detected with Cloudinary URL:', src);
                    extractAndFillFields(src);
                  }
                }
                
                // If a hidden input was updated
                const inputs = node.querySelectorAll('input');
                for (const input of inputs) {
                  const value = input.value || '';
                  if (value.includes('cloudinary.com/designcenter/image/upload')) {
                    console.log('Input element detected with Cloudinary URL:', value);
                    extractAndFillFields(value);
                  }
                }
              }
            }
          }
          // Check for attribute changes (like when an input's value changes)
          else if (mutation.type === 'attributes' && mutation.attributeName === 'value') {
            const value = mutation.target.value || '';
            if (value.includes('cloudinary.com/designcenter/image/upload')) {
              console.log('Input value changed to Cloudinary URL:', value);
              extractAndFillFields(value);
            }
          }
        }
      }
    });
    
    // Start observing the document body for all changes
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['value', 'src', 'style'] 
    });
    
    // Add click listeners for both image buttons and the Cloudinary widget
    document.addEventListener('click', function(e) {
      // Check if we're in product galleries
      if (!window.location.href.includes('/collections/product-galleries/')) {
        return;
      }
      
      // Check for clicks on various elements that might open the media library
      const isMediaButton = e.target.classList.contains('nc-mediaLibrary-button') || 
                           e.target.closest('.nc-mediaLibrary-button') ||
                           e.target.classList.contains('CMS_Image_button');
                           
      if (isMediaButton) {
        console.log('Media button clicked, will poll for image changes');
        // Start polling for image changes
        setTimeout(startPollingForImageChanges, 1000);
      }
    });
    
    // Extract data from image URL and fill form fields - UNIVERSAL VERSION
    function extractAndFillFields(imageUrl) {
      try {
        console.log('Analyzing URL for extraction:', imageUrl);
        
        // Universal extraction - get everything after the last slash before the file extension
        // This handles both complex paths and simple publicId formats
        const universalMatch = imageUrl.match(/\/([^\/]+)\.[a-zA-Z0-9]+$/);
        
        if (!universalMatch || !universalMatch[1]) {
          console.log('Could not extract filename from URL:', imageUrl);
          return;
        }
        
        // Get the filename (public ID) which might be simple or complex
        const publicId = universalMatch[1]; // e.g., "kitchen_fqdpty" or "Bedroom_11"
        console.log('Extracted public ID:', publicId);
        
        // Now try to extract the full path if it exists (for structured paths)
        const pathMatch = imageUrl.match(/\/upload\/(?:v\d+\/)?(.+)\.[a-zA-Z0-9]+$/);
        const fullPath = pathMatch && pathMatch[1] ? pathMatch[1] : publicId;
        console.log('Full path/id:', fullPath);
        
        // Default values - will be used for simple formats like "kitchen_fqdpty.avif"
        let extractedData = {
          id: fullPath,
          slug: publicId.toLowerCase(),
          title: publicId,
          room: "",
          style: ""
        };
        
        // Try to parse structured paths like Product_2/Bath/Bath_1
        if (fullPath.includes('/')) {
          const pathParts = fullPath.split('/');
          
          if (pathParts.length >= 2) {
            // Extract basic components
            const folder = pathParts[0]; // e.g., "Product_2"
            const room = pathParts[1];   // e.g., "Bath" or "Furniture"
            
            // Check if we have a style or just filename
            let style = '';
            let filename = '';
            
            if (pathParts.length >= 3) {
              // Format: Product_X/Room/Style/Filename or Product_X/Room/Filename
              if (pathParts.length > 3) {
                // There's definitely a style component if we have 4+ parts
                style = pathParts[2];  // e.g., "Bedroom"
                filename = pathParts[pathParts.length-1]; // e.g., "Bedroom_11"
              } else if (room === "Kitchen" || room === "Furniture") {
                // For Kitchen or Furniture, the 3rd part is a style
                style = pathParts[2];  // e.g., "Modern" or "Bedroom"
                filename = pathParts[pathParts.length-1]; // e.g., "Kitchen_15"
              } else {
                // For other rooms, the 3rd part is the filename
                filename = pathParts[2]; // e.g., "Light_1"
              }
            } else {
              // Format: Product_X/Room
              filename = room; // Use room as filename if no other parts
            }
            
            // For structured paths, create a nicer slug and title
            extractedData = {
              id: fullPath,
              slug: filename.toLowerCase().replace(/_/g, '-'),
              title: filename.replace(/_/g, ' '),
              room: room === "Lighting" ? "Light" : room,
              style: (room === "Kitchen" || room === "Furniture") ? style : ""
            };
          }
        }
        
        console.log('Extracted data from URL:', extractedData);
        
        // Find and update fields in the form
        updateFormFields(extractedData);
      } catch (error) {
        console.error('Error extracting data from URL:', error);
      }
    }
    
    // Update form fields with extracted data
    function updateFormFields(data) {
      // Run multiple times with increasing delays to ensure fields are populated
      [100, 500, 1000, 2000, 3000].forEach(delay => {
        setTimeout(() => attemptFieldUpdate(data), delay);
      });
    }
    
    // Attempt to update all fields with extracted data
    function attemptFieldUpdate(data) {
      // Find all form fields by their label
      try {
        // Debug: Log DOM structure to help identify form elements
        console.log('DOM structure at time of update attempt:');
        console.log('Total widget-wrapper elements:', document.querySelectorAll('.widget-wrapper').length);
        
        // Get all labels for debugging
        const allLabels = Array.from(document.querySelectorAll('label')).map(l => l.textContent.trim());
        console.log('All found labels:', allLabels);
        
        const fields = document.querySelectorAll('.widget-wrapper');
        let updated = false;
        
        console.log('Looking through', fields.length, 'potential field containers');
        
        fields.forEach((field, index) => {
          const label = field.querySelector('label');
          if (!label) {
            console.log(`Field ${index}: No label found`);
            return;
          }
          
          const labelText = label.textContent.trim();
          console.log(`Field ${index}: Found label "${labelText}"`);
          
          const input = field.querySelector('input, select, textarea');
          if (!input) {
            console.log(`Field ${index}: No input found for label "${labelText}"`);
            return;
          }
          
          console.log(`Field ${index}: Found ${input.tagName} element for "${labelText}". Current value: "${input.value}"`);
          
          // Skip if field already has a value and isn't an image field
          if (input.value && !input.value.includes('cloudinary.com')) {
            console.log(`Field ${index}: Skipping "${labelText}" because it already has a value`);
            return;
          }
          
          // Match field label to data properties
          if (labelText === 'ID') {
            console.log(`Attempting to set ID field to "${data.id}"`);
            setFieldValue(input, data.id);
            updated = true;
            console.log(`After update, ID field value is: "${input.value}"`);
          }
          else if (labelText === 'Slug') {
            console.log(`Attempting to set Slug field to "${data.slug}"`);
            setFieldValue(input, data.slug);
            updated = true;
            console.log(`After update, Slug field value is: "${input.value}"`);
          }
          else if (labelText === 'Title') {
            console.log(`Attempting to set Title field to "${data.title}"`);
            setFieldValue(input, data.title);
            updated = true;
            console.log(`After update, Title field value is: "${input.value}"`);
          }
          else if (labelText === 'Room' && input.tagName === 'SELECT') {
            // Only set room if it's one of the valid options
            if (data.room && isValidOption(input, data.room)) {
              console.log(`Attempting to set Room dropdown to "${data.room}"`);
              console.log('Available options:', Array.from(input.options).map(o => o.value));
              setSelectValue(input, data.room);
              updated = true;
              console.log(`After update, Room field selected value is: "${input.value}"`);
            } else {
              console.log(`Not setting Room because "${data.room}" is not a valid option`);
            }
          }
          else if (labelText === 'Style' && input.tagName === 'SELECT') {
            // Only set style if it's one of the valid options
            if (data.style && isValidOption(input, data.style)) {
              console.log(`Attempting to set Style dropdown to "${data.style}"`);
              console.log('Available options:', Array.from(input.options).map(o => o.value));
              setSelectValue(input, data.style);
              updated = true;
              console.log(`After update, Style field selected value is: "${input.value}"`);
            } else {
              console.log(`Not setting Style because "${data.style}" is not a valid option`);
            }
          }
        });
        
        // Try a more direct approach if the above didn't work
        if (!updated) {
          console.log('No fields updated using label approach, trying direct ID matching');
          
          // Try to find fields directly by looking for specific patterns in the ID attribute
          const allInputs = document.querySelectorAll('input, select, textarea');
          console.log('Total input elements found:', allInputs.length);
          
          allInputs.forEach(input => {
            const id = input.id || '';
            console.log('Found input element with id:', id);
            
            if (id.includes('id') && !input.value) {
              console.log(`Setting input with id ${id} to "${data.id}"`);
              setFieldValue(input, data.id);
              updated = true;
            }
            else if (id.includes('slug') && !input.value) {
              console.log(`Setting input with id ${id} to "${data.slug}"`);
              setFieldValue(input, data.slug);
              updated = true;
            }
            else if (id.includes('title') && !input.value) {
              console.log(`Setting input with id ${id} to "${data.title}"`);
              setFieldValue(input, data.title);
              updated = true;
            }
            else if (id.includes('room') && input.tagName === 'SELECT') {
              // Only set room if it's one of the valid options
              if (data.room && isValidOption(input, data.room)) {
                console.log(`Setting select with id ${id} to "${data.room}"`);
                setSelectValue(input, data.room);
                updated = true;
              }
            }
            else if (id.includes('style') && input.tagName === 'SELECT') {
              // Only set style if it's one of the valid options
              if (data.style && isValidOption(input, data.style)) {
                console.log(`Setting select with id ${id} to "${data.style}"`);
                setSelectValue(input, data.style);
                updated = true;
              }
            }
          });
        }
        
        // Try one more approach - using direct DOM element queries
        if (!updated) {
          console.log('Trying final approach with simpler selectors');
          
          const idInputs = document.querySelectorAll('input[id*="id"]');
          const slugInputs = document.querySelectorAll('input[id*="slug"]');
          const titleInputs = document.querySelectorAll('input[id*="title"]');
          
          idInputs.forEach(input => {
            if (!input.value) {
              setFieldValue(input, data.id);
              updated = true;
            }
          });
          
          slugInputs.forEach(input => {
            if (!input.value) {
              setFieldValue(input, data.slug);
              updated = true;
            }
          });
          
          titleInputs.forEach(input => {
            if (!input.value) {
              setFieldValue(input, data.title);
              updated = true;
            }
          });
        }
        
        if (updated) {
          console.log('Form fields updated with extracted data');
          
          // Show a success notification
          const notification = document.createElement('div');
          notification.style.position = 'fixed';
          notification.style.top = '20px';
          notification.style.right = '20px';
          notification.style.background = '#4CAF50';
          notification.style.color = 'white';
          notification.style.padding = '10px 20px';
          notification.style.borderRadius = '4px';
          notification.style.zIndex = '9999';
          notification.textContent = 'Fields auto-filled from image URL!';
          document.body.appendChild(notification);
          
          // Remove notification after 3 seconds
          setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transition = 'opacity 0.5s';
            setTimeout(() => notification.remove(), 500);
          }, 3000);
        } else {
          console.log('Failed to update any form fields');
        }
      } catch (error) {
        console.error('Error updating fields:', error);
      }
    }
    
    // Helper function to check if a value is a valid option in a select dropdown
    function isValidOption(select, value) {
      for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].value === value) {
          return true;
        }
      }
      return false;
    }
    
    // Helper to set a text input value
    function setFieldValue(field, value) {
      if (!field || field.value === value) return;
      
      field.value = value;
      
      // Create both input and change events to ensure React catches the changes
      const inputEvent = new Event('input', { bubbles: true });
      const changeEvent = new Event('change', { bubbles: true });
      
      field.dispatchEvent(inputEvent);
      field.dispatchEvent(changeEvent);
      
      // Trigger a React synthetic event simulation
      try {
        const reactProps = field._reactProps;
        if (reactProps && reactProps.onChange) {
          reactProps.onChange({ target: field });
        }
      } catch (e) {
        // Ignore errors with accessing React props
      }
    }
    
    // Helper to set a select dropdown value
    function setSelectValue(select, value) {
      if (!select) return;
      
      for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].value === value) {
          select.selectedIndex = i;
          
          // Create a change event to ensure React catches the change
          const changeEvent = new Event('change', { bubbles: true });
          select.dispatchEvent(changeEvent);
          
          // Trigger a React synthetic event simulation
          try {
            const reactProps = select._reactProps;
            if (reactProps && reactProps.onChange) {
              reactProps.onChange({ target: select });
            }
          } catch (e) {
            // Ignore errors with accessing React props
          }
          
          break;
        }
      }
    }
    
    // Run an initial check in case we loaded the page with an image already selected
    setTimeout(() => {
      if (window.location.href.includes('/collections/product-galleries/')) {
        console.log('Running initial check for Cloudinary images');
        const imageElements = findCloudinaryImages();
        
        if (imageElements.length > 0) {
          console.log('Found', imageElements.length, 'Cloudinary images on page load');
          imageElements.forEach(el => {
            const imageUrl = el.value || el.src || '';
            if (imageUrl && imageUrl.includes('cloudinary.com/designcenter/image/upload')) {
              extractAndFillFields(imageUrl);
            }
          });
        }
      }
    }, 1000);
  });
})();