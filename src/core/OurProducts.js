import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "../core/Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";
import { getAllCategories, getProductByCategory, getProductBySize,getProductByMaterial,getAllSizes,getAllMaterials } from "../admin/helper/adminapicall";
import { createCart, getQuantityFromCart } from "./helper/cartHelper";
import queryString from "query-string";
import { Link } from "react-router-dom";

const OurProducts = () => {
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	/* const [sizes, setSizes] = useState([]);
	const [materials, setMaterials] = useState([]); */
	const [error, setError] = useState(false);
	const [reload, setReload] = useState(false);
	const [query, setQuery] = useState({
		sortBy: "name",
		ascDesc: "asc",
		limit: "8",
	});

	//destructuring
	const { sortBy, ascDesc, limit } = query;

	const loadAllProducts = () => {
		return getProducts()
			.then((data) => {
				if (data.error) {
					setError(data.error);
				} else {
					setProducts(data);
				}
			})
			.catch((err) => console.log(err));
	};

	/* const loadAllSizes = () => {
		return getAllSizes()
		 .then((data) => {
			 if(data.error) {
				 setError(data.error);
			 }
			 else {
				setSizes(data);
			 }
		 })
		 .catch((err) => console.log(err));
	}

	const loadAllMaterials = () => {
		return getAllMaterials()
		 .then((data) => {
			 if(data.error) {
				 setError(data.error);
			 }
			 else {
				setMaterials(data);
			 }
		 })
		 .catch((err) => console.log(err));
	}
 */
	const loadAllCategories = () => {
		return getAllCategories()
		 .then((data) => {
			 if(data.error) {
				 setError(data.error);
			 }
			 else {
				setCategories(data);
			 }
		 })
		 .catch((err) => console.log(err));
	}

	useEffect(() => {
		loadAllProducts();
		loadAllCategories();
		/* loadAllSizes();
		loadAllMaterials(); */
	}, []);

	//Handle Change
	const handleChanege = (fieldName) => (e) => {
		setQuery({ ...query, [fieldName]: e.target.value });
	};
	
	const filtercategory = (categoryId) => {
		return getProductByCategory(categoryId)
		.then((data) => {
			if (data.error) {
				setError(data.error);
			} else {
				setProducts(data);
			}
		})
		.catch((err) => console.log(err));
	}


	/* const filtersize = (sizeId) => {
		return getProductBySize(sizeId)
		.then((data) => {
			if (data.error) {
				setError(data.error);
			} else {
				setProducts(data);
			}
		})
		.catch((err) => console.log(err));
	}

	const filtermaterial = (materialId) => {
		return getProductByMaterial(materialId)
		.then((data) => {
			if (data.error) {
				setError(data.error);
			} else {
				setProducts(data);
			}
		})
		.catch((err) => console.log(err));
	}
 */

	//Filter
	const filter = () => {
		const queryStringified = queryString.stringify(query);
		return getProducts(queryStringified)
			.then((data) => {
				if (data.error) {
					setError(data.error);
				} else {
					setProducts(data);
				}
			})
			.catch((err) => console.log(err));
	};

	const filterSection = () => {
		return (
			<div
				className="p-3 mt-2 mx-auto align-items-center justify-content-between bg-light text-dark rounded"
				style={{ width: "18rem", height: "20rem" }}
			>
				<div>
					<label className="mr-sm-2" htmlFor="inlineFormCustomSelect">
						Sort By
					</label>
					<select
						className="custom-select mr-sm-2"
						id="inlineFormCustomSelect"
						value={sortBy}
						onChange={handleChanege("sortBy")}
					>
						<option value="name">Name</option>
						<option value="price">Price</option>
					</select>
				</div>
				<div className="">
					<label className="mr-sm-2" htmlFor="inlineFormCustomSelect">
						Order
					</label>
					<select
						className="custom-select mr-sm-2"
						id="inlineFormCustomSelect"
						value={ascDesc}
						onChange={handleChanege("ascDesc")}
					>
						<option value="asc">Ascending</option>
						<option value="desc">Descending</option>
					</select>
				</div>
				<div className="">
					<label className="mr-sm-2" htmlFor="inlineFormCustomSelect">
						Limit
					</label>
					<select
						className="custom-select mr-sm-2"
						id="inlineFormCustomSelect"
						value={limit}
						onChange={handleChanege("limit")}
					>
						<option value="3">3</option>
						<option value="5">5</option>
						<option value="8">8</option>
						<option value="12">12</option>
						<option value="16">16</option>
						<option value="20">20</option>
					</select>
					<button
						className="btn btn-block btn-dark my-2 rounded"
						onClick={filter}
					>
						Filter
					</button>
					
					

				</div>
			</div>
		);
	};

	const productDisplay = () => {
		return (
			<div className="container-fluid d-flex flex-wrap justify-content-center justify-content-md-start">
				{products.map((product, index) => {
					return (
						<div key={index}>
							<Card
								product={product}
								products={products}
								setReload={setReload}
								reload={reload}
							/>
						</div>
					);
				})}
			</div>
		);
	};


	const categoryDisplay = () => {
		return (
			<div className="container-fluid d-flex flex-wrap justify-content-center justify-content-md-start">
				<h5 className="text-left mt-2" >Filter By Category: </h5>
				{categories.map((category, index) => {
					return (
						<div key={index}>
							<button onClick={() => {
								filtercategory(category._id);
							}}  className="btn btn-dark rounded m-1">{category.name}</button>
						</div>
					);
				})}
			</div>
		)
	}
	
	/* const sizeDisplay = () => {
		return (
			<div className="container-fluid d-flex flex-wrap justify-content-center justify-content-md-start">
				<h5 className="text-left mt-2" >Filter By Size: </h5>
				{sizes.map((size, index) => {
					return (
						<div key={index}>
							<button onClick={() => {
								filtersize(size._id);
							}}  className="btn btn-dark rounded m-1">{size.name}</button>
						</div>
					);
				})}
			</div>
		)
	}

	const materialDisplay = () => {
		return (
			<div className="container-fluid d-flex flex-wrap justify-content-center justify-content-md-start">
				<h5 className="text-left mt-2" >Filter By Material: </h5>				
				{materials.map((material, index) => {
					return (
						<div key={index}>
							<button onClick={() => {
								filtermaterial(material._id);
							}}  className="btn btn-dark rounded m-1">{material.name}</button>
						</div>
					);
				})}
			</div>
		)
	}
 */



	return (
		<Base title="What are you looking for today?" description=""><br></br>
			{createCart()}
			<button  onClick={()=>{
					loadAllProducts();
				}}  className="btn btn-dark rounded m-1">See All Products</button>

			<div className="row">
				{categoryDisplay()}
			</div>
			{/* <div className="row">
				{sizeDisplay()}
			</div>
			<div className="row">
				{materialDisplay()}
			</div> */}
			<div className="container-fluid d-flex p-3 flex-column flex-md-row justify-content-md-center">
				{filterSection()}
				{productDisplay()}
			</div>
			{getQuantityFromCart(products)}

		</Base>
	);
};

export default OurProducts;
