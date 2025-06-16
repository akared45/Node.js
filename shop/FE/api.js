const API_BASE_URL = 'http://localhost:3000';

async function fetchProducts() {
  const res = await fetch(`${API_BASE_URL}/products`);
  if (!res.ok) throw new Error('Error retrieving product');
  return await res.json();
}

async function deleteProduct(id) {
  const res = await fetch(`${API_BASE_URL}/products/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error deleting product');
}

async function createProduct(product) {
  const res = await fetch(`${API_BASE_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product)
  });
  if (!res.ok) throw new Error('Error adding product');
  return await res.text();
}

async function updateProduct(id, product) {
  const res = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product)
  });
  if (!res.ok) throw new Error('Error updating product');
  return await res.text();
}

export { fetchProducts, deleteProduct, createProduct, updateProduct };
