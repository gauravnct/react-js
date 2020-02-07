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

export default function Signup() {
  
  const { register, handleSubmit, watch, errors, reset, setValue } = useForm();

  const clearFormData = () => {
    setValue("first_name", "");
    setValue("last_name", "");
    setValue("email_address", "");
    setValue("password", "");
    setValue("confirm_password", "");
  };

  const onSubmit = reqdata => {
    /*console.log(data);*/
    const formData = new FormData();
    formData.append("action", "register");
    formData.append("first_name", reqdata.first_name);
    formData.append("last_name", reqdata.last_name);
    formData.append("email_address", reqdata.email_address);
    formData.append("password", reqdata.password);
    formData.append("confirm_password", reqdata.confirm_password);
    axios({
      url: "http://192.168.100.7/api/register.php",
      method: "post",
      data: formData
    }).then(
      response => {
        if (response.data.status) {
          clearFormData();
          toast(response.data.message, {
            type: toast.TYPE.SUCCESS
          });
          window.location.href = '/login';
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
						<title>Signup</title>
						<meta name="keywords" content="Signup" />
						<meta name="description" content="Signup" />
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
                <h1> Sign up </h1>
                <p>
                  <label htmlFor="first_name" className="uname" data-icon="u">
                    First Name
                  </label>
                  <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    placeholder="Enter your first name"
                    ref={register({
                      required: true,
                      pattern: /^[A-Za-z]+$/i,
                      minLength: 2,
                      maxLength: 20
                    })}
                  />
                  {errors.first_name &&
                    errors.first_name.type === "required" && (
                      <span className="error">First name is required</span>
                    )}
                  {errors.first_name &&
                    errors.first_name.type === "pattern" && (
                      <span className="error">
                        First name contains only alphabetic characters
                      </span>
                    )}
                  {errors.first_name &&
                    errors.first_name.type === "minLength" && (
                      <span className="error">
                        First name is at least 2 characters
                      </span>
                    )}
                  {errors.first_name &&
                    errors.first_name.type === "maxLength" && (
                      <span className="error">
                        First name is not more than 20 characters
                      </span>
                    )}
                </p>
                <p>
                  <label htmlFor="last_name" className="uname" data-icon="u">
                    Last Name
                  </label>
                  <input
                    id="last_name"
                    name="last_name"
                    type="text"
                    placeholder="Enter your last name"
                    ref={register({
                      required: true,
                      pattern: /^[A-Za-z]+$/i,
                      minLength: 2,
                      maxLength: 20
                    })}
                  />
                  {errors.last_name && errors.last_name.type === "required" && (
                    <span className="error">Last name is required</span>
                  )}
                  {errors.last_name && errors.last_name.type === "pattern" && (
                    <span className="error">
                      Last name contains only alphabetic characters
                    </span>
                  )}
                  {errors.last_name &&
                    errors.last_name.type === "minLength" && (
                      <span className="error">
                        Last name is at least 2 characters
                      </span>
                    )}
                  {errors.last_name &&
                    errors.last_name.type === "maxLength" && (
                      <span className="error">
                        Last name is not more than 20 characters
                      </span>
                    )}
                </p>
                <p>
                  <label
                    htmlFor="email_address"
                    className="youmail"
                    data-icon="e"
                  >
                    {" "}
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
                    Your password{" "}
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
                <p>
                  <label
                    htmlFor="confirm_password"
                    className="youpasswd"
                    data-icon="p"
                  >
                    Confirm Password{" "}
                  </label>
                  <input
                    id="confirm_password"
                    name="confirm_password"
                    type="password"
                    placeholder="eg. X8df!90EO"
                    ref={register({
                      required: true,
                      validate: value => value === watch("password")
                    })}
                  />
                  {errors.confirm_password &&
                    errors.confirm_password.type === "required" && (
                      <span className="error">
                        Confirm Password is required
                      </span>
                    )}
                  {errors.confirm_password &&
                    errors.confirm_password.type === "validate" && (
                      <span className="error">
                        Password and Confirm Password must be same.
                      </span>
                    )}
                </p>
                <p className="signin button">
                  <input type="submit" value="Sign up" />
                </p>
                <p className="change_link">
                  Already a member ?<Link to="/login">Go and login </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
