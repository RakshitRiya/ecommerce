import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { deleteSize, getAllSizes } from "./helper/adminapicall";

const ManageSizes = () => {
	const [sizes, setSizes] = useState([]);
	const [loading, setLoading] = useState(false);
	const { user, token } = isAuthenticated();

	const preload = () => {
		setLoading(true);
		getAllSizes().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setSizes(data);
				setLoading(false);
			}
		});
	};

	useEffect(() => {
		preload();
	}, []);

	const deleteThisSize = (sizeId) => {
		setLoading(true);
		deleteSize(user._id, sizeId, token)
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

	return (
		<Base
			title="Manage Size"
			description="Manage your product size here"
			className="container bg-white rounded p-4"
		>
			<Link className="btn btn-success rounded" to={`/admin/dashboard`}>
				<span className="">Cancel</span>
			</Link>
			<div className="row">
				<div className="col-12">
					<h4 className="text-left text-warning my-3">
						Total Materials: {sizes.length}
					</h4>
					{sizes.map((material, index) => {
						return (
							<div key={index}>
								<div className="row text-center text-muted">
									<div className="col-8 pl-5">
										<h4
											className="text-left"
											style={{ textTransform: "capitalize" }}
										>
											{material.name}
										</h4>
									</div>
									<div className="col-2">
										<button
											onClick={() => {
												deleteThisSize(material._id);
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
					})}
					{loadingMessage()}
				</div>
			</div>
		</Base>
	);
};

export default ManageSizes;
