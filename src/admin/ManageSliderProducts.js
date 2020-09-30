import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getAllSliderProducts, deleteSliderProduct } from "./helper/adminapicall";

const ManageSliderProduct = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const { user, token } = isAuthenticated();

	const preload = () => {
		setLoading(true);
		getAllSliderProducts().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setProducts(data);
				setLoading(false);
			}
		});
	};

	useEffect(() => {
		preload();
	}, []);

	const deleteThisProduct = (productId) => {
		setLoading(true);
        deleteSliderProduct(user._id, productId, token)
			.then((data) => {
				if (data.error) {
					console.log(data.error);
				} else {
					preload();
					setLoading(false);
				}
			})
			.catch((err) => console.log(err));
	};

	//Loading Message
	const loadingMessage = () => {
		if (loading) {
			return (
				<div className="m-2 text-info">
					<h4 className="text-info">Loading...</h4>
				</div>
			);
		}
	};

	const showProducts = () => {
		return products.map((product, index) => {
			return (
				<div key={index}>
					<div className="row text-center text-muted">
						<div className="col-8 pl-5">
							<h4 className="text-left" style={{ textTransform: "capitalize" }}>
								{product.name}
							</h4>
						</div>
						<div className="col-2">
							<button
								onClick={() => {
									deleteThisProduct(product._id);
								}}
								className="btn btn-danger rounded"
							>
								Delete
							</button>
						</div>
					</div>
					<hr />
				</div>
			);
		});
	};

	return (
		<Base
			title="Manage Product Page"
			description="Manage products here"
			className="container bg-white rounded p-4"
		>
			<Link className="btn btn-success rounded" to={`/admin/dashboard`}>
				<span className="">Go Back</span>
			</Link>
			<div className="row">
				<div className="col-12">
					<h4 className="text-left text-warning my-3">
						Total Products: {products.length}
					</h4>
					{showProducts()}
					{loadingMessage()}
				</div>
			</div>
		</Base>
	);
};

export default ManageSliderProduct;
