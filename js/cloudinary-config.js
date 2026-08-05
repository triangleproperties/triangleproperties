// Triangle Properties - Cloudinary Production Media & CDN Integration

const CLOUDINARY_CONFIG = {
  cloudName: "ltriw2oi",
  uploadPreset: localStorage.getItem('cloudinary_preset') || "ml_default",
  defaultFolder: "triangle-properties/uploads"
};

/**
 * Transforms any Cloudinary image URL to serve auto-format (f_auto) 
 * and auto-quality (q_auto) for 95+ Lighthouse performance scores.
 */
function getCloudinaryUrl(publicIdOrUrl, options = {}) {
  if (!publicIdOrUrl) return '';
  
  // If it's a full Cloudinary URL, inject transformation parameters
  if (publicIdOrUrl.includes('res.cloudinary.com')) {
    const widthParam = options.width ? `w_${options.width},` : '';
    const heightParam = options.height ? `h_${options.height},` : '';
    const cropParam = options.crop ? `c_${options.crop},` : 'c_fill,';
    
    return publicIdOrUrl.replace('/upload/', `/upload/${cropParam}${widthParam}${heightParam}f_auto,q_auto/`);
  }

  // If it's a relative public_id
  const cloudName = options.cloudName || CLOUDINARY_CONFIG.cloudName;
  const width = options.width ? `,w_${options.width}` : '';
  const height = options.height ? `,h_${options.height}` : '';
  const crop = options.crop ? `,c_${options.crop}` : ',c_fill';

  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto${crop}${width}${height}/${publicIdOrUrl}`;
}

/**
 * Open Cloudinary Upload Widget for Admin Panel image uploads
 */
function openCloudinaryWidget(callback, customOptions = {}) {
  if (typeof window.cloudinary === 'undefined') {
    alert("Cloudinary SDK loading... Please verify your internet connection.");
    return;
  }

  const currentPreset = localStorage.getItem('cloudinary_preset') || CLOUDINARY_CONFIG.uploadPreset;

  const widget = window.cloudinary.createUploadWidget(
    {
      cloudName: CLOUDINARY_CONFIG.cloudName,
      uploadPreset: currentPreset,
      sources: ['local', 'url', 'camera'],
      multiple: customOptions.multiple || false,
      folder: CLOUDINARY_CONFIG.defaultFolder,
      clientAllowedFormats: ['png', 'jpg', 'jpeg', 'webp'],
      maxFileSize: 10485760, // 10MB
      styles: {
        palette: {
          window: "#16130B",
          windowBorder: "#D4AF37",
          tabIcon: "#F2CA50",
          menuBg: "#110E07",
          textDark: "#000000",
          textLight: "#EAE1D4",
          link: "#F2CA50",
          action: "#F2CA50",
          inactiveTabIcon: "#99907C",
          error: "#FFB4AB",
          inProgress: "#2563EB",
          complete: "#10B981",
          sourceBg: "#1F1B13"
        }
      }
    },
    (error, result) => {
      if (error) {
        console.error("Cloudinary widget error:", error);
        const newPreset = prompt(
          `Cloudinary Upload Error: "${error.message || 'Unknown API key'}"\n\nPlease enter your exact Unsigned Upload Preset name from Cloudinary Dashboard (e.g. ml_default or triangle_properties):`,
          currentPreset
        );
        if (newPreset && newPreset.trim() !== '') {
          localStorage.setItem('cloudinary_preset', newPreset.trim());
          CLOUDINARY_CONFIG.uploadPreset = newPreset.trim();
          alert("Upload preset updated to '" + newPreset.trim() + "'. Please click Upload again!");
        }
      } else if (result && result.event === "success") {
        console.log("Image uploaded to Cloudinary successfully:", result.info.secure_url);
        if (typeof callback === 'function') {
          callback(result.info.secure_url, result.info);
        }
      }
    }
  );

  widget.open();
}

// Export Cloudinary helpers to global scope
if (typeof window !== 'undefined') {
  window.CLOUDINARY_CONFIG = CLOUDINARY_CONFIG;
  window.getCloudinaryUrl = getCloudinaryUrl;
  window.openCloudinaryWidget = openCloudinaryWidget;
}

