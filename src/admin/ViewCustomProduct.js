import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import { getCustomProduct } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";
import { API } from "../backend";
const ViewCustomProduct = ({ match, history }) => {
  //Getting Token and User data from the client's browser localStorage
  const { token, user } = isAuthenticated();

  //Initial States for the Signup component
  const initialValues = {
    name: "",
    email: "",
    mobno: "",
    category: "",
    size: "",
    material: "",
    photo: "",
  };

  //States for Signup component
  const [values, setValues] = useState(initialValues);

  //Destructuring the states of the Signup component
  const { name, email, mobno, category, size, material } = values;

  //Method to preload the category list after rendering of the Create Product Page
  const preload = (productId) => {
    getCustomProduct(productId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: data.name,
          email: data.email,
          mobno: data.mobno,
          category: data.category.name,
          size: data.size,
          material: data.material,
        });
      }
    });
  };

  //useEffect renders runs the preLoad method after the rendering of all of the Create Product Page components
  useEffect(() => {
    preload(match.params.customProductId);
    console.log("ERRRRR" + match.params.customProductId);
  }, []);

  const addProductForm = () => {
    return (
      <div classname="alert alert-dark">
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <label className="input-group-text">Name: {name}</label>
          </div>
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <label className="input-group-text">Email: {email}</label>
          </div>
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <label className="input-group-text">Mobile No: {mobno}</label>
          </div>
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <label className="input-group-text">Size: {size}</label>
          </div>
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <label className="input-group-text">Material: {material}</label>
          </div>
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <label className="input-group-text">Category: {category}</label>
          </div>
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <label className="input-group-text">Photo: </label>
          </div>
        </div>
        <img
          width="50%"
          height="40%"
          src={`${API}/customproduct/photo/${match.params.customProductId}`}
        />
        <div className="row">
          <div className="col-sm-3">
            <Link
              to="/admin/customproducts"
              className="btn btn-md btn-outline-success rounded mt-3"
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base
      title="View Custom Product Page"
      description="View Custom Product Information"
      className="container bg-white rounded p-4"
    >
      <div className="row rounded">
        <div className="col-md-8 my-3">{addProductForm()}</div>
      </div>
    </Base>
  );
};

export default ViewCustomProduct;
