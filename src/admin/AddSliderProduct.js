import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import { createSliderProduct } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";
const AddSliderProduct = (history) => {
  //Getting Token and User data from the client's browser localStorage
  const { token, user } = isAuthenticated();

  //Initial States for the Signup component
  const initialValues = {
    name: "",
    photo: "",
    loading: "",
    error: "",
    createdSliderProduct: "",
    formData: "",
    didRedirect: "",
  };

  //States for Signup component
  const [values, setValues] = useState(initialValues);

  //Destructuring the states of the Signup component
  const {
    name,
    loading,
    error,
    createdProduct,
    formData,
    didRedirect,
  } = values;

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
  }, []);

  //Redirect with a delay of 2 seconds after successful product creation.
  const performRedirect = () => {
    if (didRedirect) {
      setTimeout(() => {
        history.history.push("/admin/dashboard");
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
    createSliderProduct(user._id, token, formData)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          setValues({
            ...initialValues,
            loading: false,
            createdProduct: data.name,
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
        style={{ display: createdProduct ? "" : "none" }}
      >
        <h4>{`${createdProduct}: Product Added successfully`}</h4>
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
          <h4 className="text-info">Redirecting to Admin Dashboard...</h4>
        </div>
      );
    }
  };

  //Signup error message popup
  const errorMessage = () => {
    if (error) {
      return (
        <div className="alert alert-danger m-2 text-danger">
          <h4>Product Creation Failed!</h4>
          <p>{error}</p>
        </div>
      );
    }
  };

  const addSliderProductForm = () => {
    return (
      <form>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <label className="input-group-text">Name</label>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            autoFocus
            required
            onChange={handleChange("name")}
            value={name}
          />
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <label className="input-group-text">Photo</label>
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
              Create Product
            </button>
          </div>
          <div className="col-sm-3">
            <Link
              to="/admin/dashboard"
              className="btn btn-md btn-outline-success rounded mt-3"
            >
              Cancel
            </Link>
          </div>
        </div>
      </form>
    );
  };

  return (
    <Base
      title="Create Product Page"
      description="Add a new product into your collection"
      className="container rounded p-4"
    >
      <div className="row rounded">
        <div className="col-md-10 my-3">
          {addSliderProductForm()}
          {loadingMessage()}
          {successMessage()}
          {errorMessage()}
          {redirectingMessage()}
          {performRedirect()}
        </div>
      </div>
    </Base>
  );
};

export default AddSliderProduct;