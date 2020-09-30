import { API } from "../../backend";

//--------------CATEGORY CALLS----------------//

//Create a Category
export const createCategory = (userId, token, category) => {
  return fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

//Get a Category
export const getCategory = (categoryId) => {
  return fetch(`${API}/category/${categoryId}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

//Get all the Categories
export const getAllCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

//Update a Category
export const updateCategory = (userId, categoryId, token, categoryUpdate) => {
  return fetch(`${API}/category/${categoryId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(categoryUpdate),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

//Delete a Category
export const deleteCategory = (userId, categoryId, token) => {
  return fetch(`${API}/category/${categoryId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

//--------------Size CALLS----------------
export const createSize = (userId, token, size) => {
  return fetch(`${API}/size/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(size),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const getAllSizes = () => {
  return fetch(`${API}/sizes`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const deleteSize = (userId, sizeId, token) => {
  return fetch(`${API}/size/${sizeId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

//--------------Material CALLS----------------
export const createMaterial = (userId, token, size) => {
  return fetch(`${API}/material/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(size),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

//get all materials
export const getAllMaterials = () => {
  return fetch(`${API}/materials`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

//Delete a material
export const deleteMaterial = (userId, materialId, token) => {
  return fetch(`${API}/material/${materialId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

//------------Slider Product calls-------//

//Create a slider Product
export const createSliderProduct = (userId, token, sliderproduct) => {
  return fetch(`${API}/sliderproduct/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: sliderproduct,
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

//Get all the products
export const getAllSliderProducts = () => {
  return fetch(`${API}/sliderproducts`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

//Get a sliderProduct
export const getSliderProduct = (sliderproductId) => {
  return fetch(`${API}/sliderproduct/${sliderproductId}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

//Delete a slider Product
export const deleteSliderProduct = (userId, sliderproductId, token) => {
  return fetch(`${API}/sliderproduct/${sliderproductId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

//--------------PRODUCT CALLS----------------//

//Create a Product
export const createProduct = (userId, token, product) => {
  return fetch(`${API}/product/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

//Get all the products
export const getAllProducts = () => {
  return fetch(`${API}/products`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

//Get a Product
export const getProduct = (productId) => {
  return fetch(`${API}/product/${productId}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

//Get product by category
export const getProductByCategory = (categoryId) => {
  return fetch(`${API}/products/${categoryId}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

//Get product by size
export const getProductBySize = (sizeId) => {
  return fetch(`${API}/productsz/${sizeId}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

//Get product by material
export const getProductByMaterial = (materialId) => {
  return fetch(`${API}/productm/${materialId}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

//Update a Product
export const updateProduct = (userId, productId, token, productUpdate) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: productUpdate,
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

//Delete a Product
export const deleteProduct = (userId, productId, token) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

//---------Custom Product------

//createCustomProduct
export const createCustomProduct = (product) => {
  return fetch(`${API}/customproduct/create`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: product,
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
//Get all the Custom products
export const getAllCustomProduct = (userId, token) => {
  return fetch(`${API}/customproducts/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};
//Get a Product
export const getCustomProduct = (productId) => {
  return fetch(`${API}/customproduct/${productId}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};
export const deleteCustomProduct = (userId, productId, token) => {
  return fetch(`${API}/customproduct/${productId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};
