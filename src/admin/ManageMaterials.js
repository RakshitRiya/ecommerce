import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getAllMaterials, deleteMaterial } from "./helper/adminapicall";

const ManageMaterial = () => {
	const [materials, setMaterials] = useState([]);
	const [loading, setLoading] = useState(false);
	const { user, token } = isAuthenticated();

	const preload = () => {
		setLoading(true);
		getAllMaterials().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setMaterials(data);
				setLoading(false);
			}
		});
	};

	useEffect(() => {
		preload();
	}, []);

	const deleteThisMaterial = (materialId) => {
		setLoading(true);
		deleteMaterial(user._id, materialId, token)
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
			title="Manage Materials"
			description="Manage your product materials here"
			className="container bg-white rounded p-4"
		>
			<Link className="btn btn-success rounded" to={`/admin/dashboard`}>
				<span className="">Cancel</span>
			</Link>
			<div className="row">
				<div className="col-12">
					<h4 className="text-left text-warning my-3">
						Total Materials: {materials.length}
					</h4>
					{materials.map((material, index) => {
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
												deleteThisMaterial(material._id);
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

export default ManageMaterial;
