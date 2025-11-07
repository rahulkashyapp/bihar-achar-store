// Simple script to trigger resync
console.log('Triggering product resync...');

// Get products from localStorage
const savedProducts = localStorage.getItem('biharAcharProducts');
if (savedProducts) {
  const products = JSON.parse(savedProducts);
  console.log('Found products:', products.length);
  
  // Trigger the admin dashboard sync function
  window.dispatchEvent(new CustomEvent('forceSyncProducts', { detail: products }));
  console.log('Sync event triggered');
} else {
  console.log('No products found');
}