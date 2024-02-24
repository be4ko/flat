import React, { useState, useContext } from 'react'
import './Login.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
 import { useNavigate } from 'react-router-dom'
import {ThreeDots} from 'react-loader-spinner'
import { UserContext } from '../../Context/UserContext'

export default function Login() {

  let {setUserToken} =  useContext(UserContext);

  let navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const [error, setError] = useState(null);

  async function submitLoginForm(values) {
    setLoader(true);
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .catch((err) => {
        setLoader(false); setError(err.response.data.message)
      });

    if (data.message === "success") {
      // login

      localStorage.setItem("userToken", data.token);
      setUserToken(data.token);
      setLoader(false);
      setError(null);
      navigate('/');
      console.log(data);
    }
    else {
        setLoader(false);
        setError(data.message);
        alert(data.message)
    }
  }
  let validationSchema = Yup.object({
    email: Yup.string().required().email(),
    password: Yup.string().required().min(5).matches(/^[A-z][a-z0-9]{3,}$/, "Password is invalid"),
  })
  let formik = useFormik({
    initialValues: {
      email: '',
      rePassword: '',
    },
    validationSchema,
    onSubmit: submitLoginForm,
  });

  return (
    <div className='w-100 p-5 ms-9 marginn'>

      {error && <div className="alert alert-danger w-50">{error}</div>}

      <h1>Login Now</h1>
      <form onSubmit={formik.handleSubmit} >
        <div className="mb-2">
          <label htmlFor="" className="form-label">Email</label>
          <input
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="email"
            name="email"
            id="email"
            className="form-control w-50"
          />
          {/* <div className={formik.errors.email ? 'alert alert-danger w-50 m-1' : ''}>{formik.errors.email}</div> */}
          {formik.errors.email && formik.touched.email && (
            <div className="alert alert-danger heightt w-50 m-1">{formik.errors.email}</div>
          )}

        </div>
        <div className="mb-2">
          <label htmlFor="" className="form-label">password</label>
          <input
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
            name="password"
            id="password"
            className="form-control w-50"
          />
          {formik.errors.password && formik.touched.password && (
            <div className="heightt alert alert-danger w-50 m-1">{formik.errors.password}</div>
          )}

        </div>
        <button type="submit" disabled={!formik.isValid} className='bgGray border mt-4 padding-left text-black w-25'>
          {loader ? (<ThreeDots
            visible={true}
            height="50"
            width="50"
            color="#fff"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />)
            : ( 'Submit' ) }
        </button>
      </form>
    </div>
  )
}
