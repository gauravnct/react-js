import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  NavLink,
  useRouteMatch,
  Link
} from "react-router-dom";
import useForm from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {checkUserLoggedIn} from './Utils.js';
import {Helmet} from "react-helmet";

export default function Login() {	    
  
  const { register, handleSubmit, watch, errors, reset, setValue } = useForm();

  const clearFormData = () => {
    setValue("email_address", "");
    setValue("password", "");
  };

  const onSubmit = reqdata => {
    /*console.log(data);*/
    const formData = new FormData();
    formData.append("action", "login");
    formData.append("email_address", reqdata.email_address);
    formData.append("password", reqdata.password);
    axios({
      url: "http://192.168.100.7/api/register.php",
      method: "post",
      data: formData
    }).then(
      response => {
        if (response.data.status) {
          localStorage.setItem('auth_token', response.data.data.auth_token);
          clearFormData();
          toast(response.data.message, {
            type: toast.TYPE.SUCCESS
          });
          window.location.href = '/list';
        } else {
          toast(response.data.message, {
            type: toast.TYPE.ERROR
          });
        }
        /*console.log(response.data.message);
        console.log(response.status);
        console.log(response.headers);
        console.log(response.config);*/
      },
      error => {
        console.log(error);
      }
    );
  };

  if(checkUserLoggedIn()){
    return <Redirect to='/list' />
  }	

  return (
    <div className="container">
					<Helmet>
						<meta charSet="utf-8" />
						<title>Login</title>
						<meta name="keywords" content="Login" />
						<meta name="description" content="Login" />
					</Helmet>      
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
      {/* Same as */}
      <ToastContainer />
      <section>
        <div id="container_demo">
          <div id="wrapper">
            <div id="register" className="animate form">
              <form onSubmit={handleSubmit(onSubmit)}>
                <h1> Login </h1>
                <p>
                  <label
                    htmlFor="email_address"
                    className="youmail"
                    data-icon="e"
                  >
                    Email
                  </label>
                  <input
                    id="email_address"
                    name="email_address"
                    type="text"
                    placeholder="Enter your email"
                    ref={register({ required: true, pattern: /^\S+@\S+$/i })}
                  />
                  {errors.email_address &&
                    errors.email_address.type === "required" && (
                      <span className="error">Email is required</span>
                    )}
                  {errors.email_address &&
                    errors.email_address.type === "pattern" && (
                      <span className="error">Email is not valid</span>
                    )}
                </p>
                <p>
                  <label htmlFor="password" className="youpasswd" data-icon="p">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="eg. X8df!90EO"
                    ref={register({
                      required: true,
                      minLength: 6,
                      maxLength: 20
                    })}
                  />
                  {errors.password && errors.password.type === "required" && (
                    <span className="error">Password is required</span>
                  )}
                  {errors.password && errors.password.type === "minLength" && (
                    <span className="error">
                      Password is at least 6 characters
                    </span>
                  )}
                  {errors.password && errors.password.type === "maxLength" && (
                    <span className="error">
                      Password is not more than 20 characters
                    </span>
                  )}
                </p>
                <p className="signin button">
                  <input type="submit" value="Login" />
                </p>
                <p className="change_link">
                  Not a member ?<Link to="/signup">Go and sign up </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
