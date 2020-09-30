import { API } from "../../backend";

export const getProducts = (query) => {
	return fetch(`${API}/products${query ? "?" + query : ""}`, { method: "GET" })
		.then((response) => response.json())
		.catch((err) => console.log(err));
};

export const getProductsHomepage = (query) => {
	return fetch(`${API}/home/products${query ? "?" + query : ""}`, { method: "GET" })
		.then((response) => response.json())
		.catch((err) => console.log(err));
};

export const getSliderProducts = () => {
	return fetch(`${API}/sliderproducts`, {method : "GET"})
	.then((response) => response.json())
	.catch((err) => console.log(err));
}

export const getSliderProduct = (sliderproduct) => {
	return fetch(`${API}/sliderproduct/${sliderproduct._id}`, {method : "GET"})
	.then((response) => response.json())
	.catch((err) => console.log(err));
}

export const getSliderProductPhoto = (sliderproduct) => {
	return fetch(`${API}/sliderproduct/photo/${sliderproduct._id}`, {method : "GET"})
	.then((response) => response.json())
	.catch((err) => console.log(err));
}
