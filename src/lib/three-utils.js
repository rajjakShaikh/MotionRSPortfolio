/**
 * Utility functions for Three.js error handling
 */

// Original console.error function
const originalConsoleError = console.error;

/**
 * Filter out specific Three.js errors without affecting functionality
 * This doesn't change any behavior, just prevents error messages from showing
 */
export function setupThreeJsErrorHandling() {
  // Override console.error to filter out specific Three.js errors
  console.error = function(...args) {
    // Check if this is the specific THREE.BufferGeometry.computeBoundingSphere NaN error
    const errorMessage = args.length > 0 ? args[0] : '';
    
    if (typeof errorMessage === 'string' && 
        errorMessage.includes('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN')) {
      // Silently ignore this specific error
      return;
    }
    
    // Pass all other errors to the original console.error
    originalConsoleError.apply(console, args);
  };
}

/**
 * Restore the original console.error function
 */
export function restoreConsoleError() {
  console.error = originalConsoleError;
}
