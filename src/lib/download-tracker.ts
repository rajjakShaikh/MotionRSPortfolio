"use client";

// Simple download tracking utility
// In a real application, you might want to use analytics or a backend service

// Local storage key for download count
const DOWNLOAD_COUNT_KEY = "resume_download_count";

/**
 * Increment the download count and return the new count
 */
export function trackDownload(): number {
  // Only run on client side
  if (typeof window === "undefined") return 0;
  
  try {
    // Get current count from local storage
    const currentCount = parseInt(localStorage.getItem(DOWNLOAD_COUNT_KEY) || "0", 10);
    
    // Increment count
    const newCount = currentCount + 1;
    
    // Save back to local storage
    localStorage.setItem(DOWNLOAD_COUNT_KEY, newCount.toString());
    
    // Return new count
    return newCount;
  } catch (error) {
    // In case of any errors (e.g., localStorage not available)
    console.error("Error tracking download:", error);
    return 0;
  }
}

/**
 * Get the current download count
 */
export function getDownloadCount(): number {
  // Only run on client side
  if (typeof window === "undefined") return 0;
  
  try {
    return parseInt(localStorage.getItem(DOWNLOAD_COUNT_KEY) || "0", 10);
  } catch (error) {
    console.error("Error getting download count:", error);
    return 0;
  }
}
