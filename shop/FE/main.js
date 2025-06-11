import { fetchProducts, deleteProduct, createProduct, updateProduct } from './api.js';

const tableBody = document.querySelector('#productTable tbody');
const form = document.getElementById('addProductForm');

let products = [];
let editingId = null;

function renderTable() {
  tableBody.innerHTML = '';
  products.forEach(p => {
    const tr = document.createElement('tr');
    if (editingId === p.Id) {
      tr.innerHTML = `
        <td>${p.Id}</td>
        <td><input type="text" id="editTitle" value="${p.Title}"></td>
        <td><input type="number" id="editPrice" value="${p.Price}"></td>
        <td><input type="date" id="editIDate" value="${p.IDate.split('T')[0]}"></td>
        <td><input type="number" id="editQuantity" value="${p.Quantity}"></td>
        <td>
          <button id="saveBtn">Save</button>
          <button id="cancelBtn">Cancel</button>
        </td>
      `;
    } else {
      tr.innerHTML = `
        <td>${p.Id}</td>
        <td>${p.Title}</td>
        <td>${Number(p.Price).toLocaleString('vi-VN')}₫</td>
        <td>${new Date(p.IDate).toLocaleDateString('vi-VN')}</td>
        <td>${p.Quantity}</td>
        <td>
          <button class="editBtn" data-id="${p.Id}">Edit</button> 
          <button class="deleteBtn" data-id="${p.Id}">Delete</button>
        </td>
      `;
    }
    tableBody.appendChild(tr);
  });

  if (editingId !== null) {
    document.getElementById('saveBtn').addEventListener('click', saveEdit);
    document.getElementById('cancelBtn').addEventListener('click', () => {
      editingId = null;
      renderTable();
    });
  }

  document.querySelectorAll('.deleteBtn').forEach(btn => {
    btn.onclick = async () => {
      if (confirm('Are you sure you want to delete this product?')) {
        try {
          await deleteProduct(btn.dataset.id);
          products = products.filter(p => p.Id != btn.dataset.id);
          renderTable();
        } catch (err) {
          alert(err.message);
        }
      }
    };
  });

  document.querySelectorAll('.editBtn').forEach(btn => {
    btn.onclick = () => {
      editingId = Number(btn.dataset.id);
      renderTable();
    };
  });
}

async function saveEdit() {
  const title = document.getElementById('editTitle').value.trim();
  const price = parseFloat(document.getElementById('editPrice').value);
  const idate = document.getElementById('editIDate').value;
  const quantity = parseInt(document.getElementById('editQuantity').value);

  if (!title || isNaN(price) || !idate || isNaN(quantity)) {
    alert('Please fill in complete and valid information!');
    return;
  }

  try {
    await updateProduct(editingId, { Title: title, Price: price, IDate: idate, Quantity: quantity });
    products = products.map(p => p.Id === editingId ? { Id: editingId, Title: title, Price: price, IDate: idate, Quantity: quantity } : p);
    editingId = null;
    renderTable();
  } catch (err) {
    alert(err.message);
  }
}

form.onsubmit = async e => {
  e.preventDefault();
  const formData = new FormData(form);
  const newProduct = {
    Title: formData.get('Title').trim(),
    Price: parseFloat(formData.get('Price')),
    IDate: formData.get('IDate'),
    Quantity: parseInt(formData.get('Quantity'))
  };

  if (!newProduct.Title || isNaN(newProduct.Price) || !newProduct.IDate || isNaN(newProduct.Quantity)) {
    alert('Please fill in complete and valid information!');
    return;
  }

  try {
    await createProduct(newProduct);
    products.push(newProduct);
    products = await fetchProducts();
    renderTable();
    form.reset();
  } catch (err) {
    alert(err.message);
  }
};

async function init() {
  products = await fetchProducts();
  renderTable();
}

init();
