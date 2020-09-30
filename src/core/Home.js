import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "../core/Base";
import logo from "../assets/logo.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Carousel from "react-bootstrap/Carousel";
import { getSliderProducts } from "./helper/coreapicalls";
import { getProductsHomepage } from "./helper/coreapicalls";
import {
  getAllCategories,
  getProductByCategory,
} from "../admin/helper/adminapicall";
import ImageHelper from "./helper/ImageHelper";
import { API } from "../backend";
import { Link } from "react-router-dom";

const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [sliderProducts, setSliderProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [error, setError] = useState(false);

  const loadAllSliderProducts = () => {
    return getSliderProducts()
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setSliderProducts(data);
        }
      })
      .catch((err) => console.log(err));
  };

  const loadAllProducts = () => {
    return getProductsHomepage()
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setProducts(data);
        }
      })
      .catch((err) => console.log(err));
  };

  const loadAllCategories = () => {
    return getAllCategories()
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setCategories(data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadAllSliderProducts();
    loadAllProducts();
    loadAllCategories();
  }, []);

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
  };

  const productDisplay = () => {
    return (
      <div className="container-fluid d-flex flex-wrap content-center justify-content-md-start">
        {products.map((product, index) => {
          return (
            <div key={index}>
              <div
                className="card text-secondary m-1"
                style={{ width: "20rem" }}
              >
                <Link to="/ourproducts">
                  <ImageHelper product={product} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const categoryDisplay = () => {
    return (
      <div className="container-fluid d-flex flex-wrap justify-content-center justify-content-md-start">
        {categories.map((category, index) => {
          return (
            <div key={index}>
              <button
                onClick={() => {
                  filtercategory(category._id);
                }}
                className="btn btn-dark rounded m-1"
              >
                {category.name}
              </button>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Base title="" description="">
      <div className="d-flex justify-content-center m-5">
        <img src={logo} className="d-inline-block w-25 mx-auto"></img>
      </div>

      {/* {sliderProducts ? (
        <Slider {...settings}>
          {sliderProducts.map((sliderproduct, index) => {
            return (
              <div key={index}>
                <img
                  width="100%"
                  src={`${API}/sliderproduct/photo/${sliderproduct._id}`}
                />
              </div>
            );
          })}
        </Slider>
      ) : (
        <div>
          <h4>No Slider Product In Db</h4>
        </div>
      )} */}

      {sliderProducts ? (
        <Carousel>
          {sliderProducts.map((sliderproduct, index) => {
            return (
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={`${API}/sliderproduct/photo/${sliderproduct._id}`}
                  alt={`${index} slide`}
                />
              </Carousel.Item>
            );
          })}
        </Carousel>
      ) : (
        <div>
          <h4>No Slider Product In Db</h4>
        </div>
      )}

      <div className="container">
        <h3 className="text-dark text-center m-4">About Us</h3>
        <p className="alert-secondary rounded p-4 m-4">
          Belonging to the township of Roorkee, from the state of Uttarakhand,
          TheJaaliShop.in is a subsidiary of Agarwal Group of companies involved
          in the manufacturing and trading of various well known brands,{" "}
          <b>‘dream doors’</b> in Grill making, Wooden Door frames{" "}
          <b>‘Prakriti’</b>, and our Registered Trademark Brand of Membrane
          Doors, <b>‘Crystal Doors’</b>.<br></br>
          <br></br>
          We present to you the latest addition to our team, thejaalishop.in to
          provide to you the beauty of modern technology for your homes, offices
          or commercial buildings. In our collection you will find MDF/WPC
          grills and exclusive wooden furniture nowhere available and delivered
          to your home at the click of a button.
          <br></br>
          <br></br>
          We firmly support the Government of India’s Make in India model and
          all our raw materials are indigenously made.<br></br> <br></br>
          <p className="text-center">
            Presenting to you, <i>Made with Love, in India</i>
            <br></br>
            <i>TheJaaliShop.in</i>
          </p>
        </p>
        <h3 className="text-dark text-center m-4" style={{ color: "black" }}>
          Glimpse Of Our Products
        </h3>
        {categoryDisplay()}
        {productDisplay()}
      </div>
    </Base>
  );
};

export default Home;
