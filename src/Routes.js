import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Home from "./core/Home";
import "./core/Menu";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import UserDashboard from "./user/UserDashBoard";
import AdminRoute from "./auth/helper/AdminRoutes";
import AdminDashboard from "./user/AdminDashBoard";
import AddCategory from "./admin/AddCategory";
import AddSliderProduct from "./admin/AddSliderProduct";
import AddSize from "./admin/AddSize";
import AddMaterial from "./admin/AddMaterial";
import ManageCategories from "./admin/ManageCategories";
import ManageSliderProduct from "./admin/ManageSliderProducts";
import ManageMaterials from "./admin/ManageMaterials";
import ManageSizes from "./admin/ManageSizes";
import AddProduct from "./admin/AddProduct";
import ManageProduct from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import UpdateCategory from "./admin/UpdateCategory";
import Cart from "./core/Cart";
import OurProducts from "./core/OurProducts";
import ManageOrders from "./admin/ManageOrders";
import PasswordReset from "./user/PasswordReset";
import AddCustomProduct from "./core/AddCustomProduct";
import ManageCustomProduct from "./admin/ManageCustomProduct";
import ViewCustomProduct from "./admin/ViewCustomProduct";
import TNC from "./core/TermsandConditions";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/ourproducts" component={OurProducts} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/termsandconditions" component={TNC} />

        <Route
          exact
          path="/create/customproduct"
          component={AddCustomProduct}
        />

        <AdminRoute
          exact
          path="/admin/customproducts"
          component={ManageCustomProduct}
        />

        <AdminRoute
          exact
          path="/admin/customproduct/view/:customProductId"
          component={ViewCustomProduct}
        />
        <PrivateRoute exact path="/user/dashboard" component={UserDashboard} />
        <PrivateRoute
          exact
          path="/user/password-reset"
          component={PasswordReset}
        />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute
          exact
          path="/admin/create/category"
          component={AddCategory}
        />
        <AdminRoute
          exact
          path="/admin/create/material"
          component={AddMaterial}
        />
        <AdminRoute exact path="/admin/create/size" component={AddSize} />
        <AdminRoute
          exact
          path="/admin/create/sliderproduct"
          component={AddSliderProduct}
        />
        <AdminRoute
          exact
          path="/admin/sliderproducts"
          component={ManageSliderProduct}
        />
        <AdminRoute
          exact
          path="/admin/categories"
          component={ManageCategories}
        />
        <AdminRoute exact path="/admin/materials" component={ManageMaterials} />
        <AdminRoute exact path="/admin/sizes" component={ManageSizes} />
        <AdminRoute
          exact
          path="/category/:categoryId/:userId"
          component={UpdateCategory}
        />
        <AdminRoute exact path="/admin/create/product" component={AddProduct} />
        <AdminRoute exact path="/admin/products" component={ManageProduct} />
        <AdminRoute
          exact
          path="/admin/product/update/:productId"
          component={UpdateProduct}
        />
        <AdminRoute exact path="/admin/orders" component={ManageOrders} />
      </Switch>
    </Router>
  );
};

export default Routes;
