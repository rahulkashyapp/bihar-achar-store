// Debug script to check localStorage products
console.log('=== Checking localStorage products ===');
const savedProducts = localStorage.getItem('biharAcharProducts');
if (savedProducts) {
  const products = JSON.parse(savedProducts);
  console.log(`Found ${products.length} products in localStorage:`);
  products.forEach((product, index) => {
    console.log(`\n${index + 1}. ${product.name} (${product.id})`);
    console.log(`   Images: ${product.images ? product.images.length : 0} items`);
    if (product.images && product.images.length > 0) {
      product.images.forEach((img, i) => {
        console.log(`     ${i + 1}. ${img.substring(0, 50)}${img.length > 50 ? '...' : ''}`);
      });
    }
    console.log(`   Image: ${product.image || 'none'}`);
    console.log(`   ImageUrl: ${product.imageUrl || 'none'}`);
  });
} else {
  console.log('No products found in localStorage');
}