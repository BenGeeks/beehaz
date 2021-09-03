import React from 'react';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import styles from './main.module.css';
import Home from '../modules/Home/Home';
import AboutUS from '../modules/AboutUs/aboutUs';
import View from '../modules/view/view';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import Plan from '../modules/Plan/Plan';
import Register from '../modules/Register/Register';
import Login from '../modules/Login/Login';
import { pageNotFound } from '../common/components';
import { useSelector } from 'react-redux';
import Verify from '../modules/Verify/verify';
import OauthLogin from '../modules/OauthLogin/OauthLogin';
import Terms from '../modules/Footer/Components/Terms';
import Privacy from '../modules/Footer/Components/Privacy';
import CookiePolicy from '../modules/Footer/Components/CookiePolicy';
import CookieConsent from '../components/CookieConsent/CookieConsent';
import Pricing from '../modules/Home/Pricing/Pricing';
import Features from '../modules/Home/Features/Features';
import ContactUs from '../modules/Home/ContactUs/ContactUs';
import ConfirmMail from '../modules/view/Components/UserSetting/UserMailConfirm/userMailConfirm';
import Offline from '../modules/Offline/Offline';

const PrivateRoute = ({ component: Component, ...rest }) => {
  let user = useSelector(({ user }) => user && user.user);
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route {...rest} render={(props) => (user ? <Component {...props} /> : <Redirect to="/login" />)} />
  );
};

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  let user = useSelector(({ user }) => user && user.user);
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route {...rest} render={(props) => (user && restricted ? <Redirect to="/view" /> : <Component {...props} />)} />
  );
};

const Routes = () => {
  return (
    <Router>
      <div className="app-container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path={'/terms'} component={Terms} />
          <Route exact path={'/privacy-policy'} component={Privacy} />
          <Route exact path={'/cookie-policy'} component={CookiePolicy} />
          <Route exact path={'/contact_us'} component={ContactUs} />
          <Route exact path={'/offline'} component={Offline} />
          <PublicRoute restricted={false} exact path="/aboutUs" component={AboutUS} />
          <Route exact path="/plan" component={Plan} />
          <PublicRoute restricted={true} exact path="/register" component={Register} />
          <PrivateRoute restricted={true} exact path="/view" component={View} />
          <PrivateRoute restricted={true} path="/view" component={View} />
          <PublicRoute restricted={true} exact path="/verify/:token" component={Verify} />
          <PublicRoute restricted={true} exact path={'/confirm/:token'} component={ConfirmMail} />
          <PublicRoute restricted={true} exact path="/login" component={Login} />
          <PublicRoute restricted={false} exact path="/login_callback" component={OauthLogin} />
          <PublicRoute restricted={false} exact path="/pricing" component={Pricing} />
          <PublicRoute restricted={false} exact path="/features" component={Features} />
          <PublicRoute restricted={false} exact path="/pageNotFound" component={pageNotFound} />
          <PublicRoute restricted={false} path component={pageNotFound} />
        </Switch>
        <CookieConsent cookieName={'beehazState'} />
      </div>
    </Router>
  );
};
export default Routes;
