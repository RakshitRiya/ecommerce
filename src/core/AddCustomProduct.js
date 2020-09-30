import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Base from "./Base";
import custom from "../assets/custom.gif";

import {
  getAllCategories,
  createCustomProduct,
} from "../admin/helper/adminapicall";

import { isAuthenticated } from "../auth/helper";
const AddCustomProduct = (history) => {
  //Initial States for the Signup component
  const initialValues = {
    name: "",
    email: "",
    mobno: "",
    categories: [],
    category: "",
    size: "",
    material: "",
    photo: "",
    loading: "",
    error: "",
    formData: "",
    didRedirect: "",
  };

  //States for Signup component
  const [values, setValues] = useState(initialValues);

  //Destructuring the states of the Signup component
  const {
    name,
    email,
    mobno,
    categories,
    size,
    material,
    loading,
    error,
    formData,
    didRedirect,
  } = values;

  //Method to preload the category list after rendering of the Create Product Page
  const preload = () => {
    getAllCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  //useEffect renders runs the preLoad method after the rendering of all of the Create Product Page components
  useEffect(() => {
    preload();
  }, []);

  //Redirect with a delay of 2 seconds after successful product creation.
  const performRedirect = () => {
    if (didRedirect) {
      setTimeout(() => {
        history.history.push("/");
      }, 2000);
    }
  };

  //Sets data in the states according to the input fields
  const handleChange = (inputValue) => (event) => {
    const value =
      inputValue === "photo" ? event.target.files[0] : event.target.value;
    formData.set(inputValue, value);
    setValues({ ...values, error: false, [inputValue]: value });
  };

  const formSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    createCustomProduct(formData)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          setValues({
            ...initialValues,
            loading: false,
            didRedirect: true,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  //Success Message
  const successMessage = () => {
    return (
      <div
        className="alert alert-success m-2 text-success"
        style={{ display: didRedirect ? "" : "none" }}
      >
        <h4>{`Form Submitted. We will contact you soon. :) `}</h4>
      </div>
    );
  };

  //Loading Message
  const loadingMessage = () => {
    if (loading) {
      return (
        <div className="alert alert-info m-2 text-info">
          <h4 className="text-info">Loading...</h4>
        </div>
      );
    }
  };

  const redirectingMessage = () => {
    if (didRedirect) {
      return (
        <div className="m-2 text-info">
          <h4 className="text-info">Redirecting to Home Page...</h4>
        </div>
      );
    }
  };

  //Signup error message popup
  const errorMessage = () => {
    if (error) {
      return (
        <div className="alert alert-danger m-2 text-danger">
          <h4>Custom Product Creation Failed!</h4>
          <p>{error}</p>
        </div>
      );
    }
  };

  const addProductForm = () => {
    return (
      <div className="row">
        <div className="col-sm-6">
          <form>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text">Name</label>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="your name"
                autoFocus
                required
                onChange={handleChange("name")}
                value={name}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text">Email</label>
              </div>
              <input
                type="email"
                className="form-control"
                placeholder="your email"
                required
                onChange={handleChange("email")}
                value={email}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text">Mobile No</label>
              </div>
              <input
                type="telephone"
                className="form-control"
                placeholder="your mobile no."
                required
                onChange={handleChange("mobno")}
                value={mobno}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text">Size</label>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="product size length and width"
                required
                onChange={handleChange("size")}
                value={size}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text">Material</label>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="product's material"
                required
                onChange={handleChange("material")}
                value={material}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text">Category</label>
              </div>
              <select
                className="form-control"
                placeholder="Category"
                style={{ textTransform: "capitalize" }}
                required
                onChange={handleChange("category")}
              >
                <option>Select</option>
                {categories &&
                  categories.map((category, index) => {
                    return (
                      <option
                        key={index}
                        value={category._id}
                        style={{ textTransform: "capitalize" }}
                      >
                        {category.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text">Refernce Picture</label>
              </div>
              <input
                className="btn btn-outline-secondary"
                type="file"
                name="photo"
                accept="image"
                onChange={handleChange("photo")}
              />
            </div>
            <div className="row">
              <div className="col-sm-3">
                <button
                  className="btn btn-success rounded mt-3"
                  onClick={formSubmit}
                >
                  Submit
                </button>
              </div>
              <div className="col-sm-3">
                <Link
                  to="/"
                  className="btn btn-md btn-outline-success rounded mt-3"
                >
                  Cancel
                </Link>
              </div>
            </div>
          </form>
        </div>
        <div className="col-sm-6 text-center">
          <img src={custom} style={{ height: "50%" }}></img>
        </div>
      </div>
    );
  };

  return (
    <Base
      title="Create Your Custom Product"
      description="Submit your customize product"
    >
      <div>
        {addProductForm()}
        {loadingMessage()}
        {successMessage()}
        {errorMessage()}
        {redirectingMessage()}
        {performRedirect()}
      </div>
    </Base>
  );
};

export default AddCustomProduct;
