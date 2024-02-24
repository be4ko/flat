import React, { useState } from 'react'
import './Register.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {ThreeDots} from 'react-loader-spinner'

export default function Register() {
  let navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const [error, setError] = useState(null);
  async function submitRegisterForm(values) {
    setLoader(true);
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .catch((err) => {
        setLoader(false); setError(err.response.data.message)
      });

    if (data.message === "success") {
      setLoader(false);
      navigate('/login');
    }
  }

  // valitation using formik 
  // function validate(values){
  //   let errors = {};
  //   //Name Validation
  //   if (!values.name) {
  //     errors.name = 'Required';
  //   } else if (values.name.length < 3) {
  //     errors.name = 'Name Must be a least 3 characters or More';
  //   }

  //   //Email Validation
  //   if (!values.email ) {
  //     errors.email = 'Required';
  //   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
  //     errors.email = 'Invalid email address';
  //   }

  //   //phone Validation
  //   if (!values.phone) {
  //     errors.phone = 'Required';
  //   } else if (!/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s./0-9]*$/g.test(values.phone)) {
  //     errors.phone = 'Invalid phone address';
  //   }

  //   //Password Validation
  //   if (!values.password) {
  //     errors.password = 'Required';
  //   } else if (values.password.length < 8) {
  //     errors.password = 'Must be 8 characters or more';
  //   }

  //   if (!values.rePassword)
  //   {
  //     errors.rePassword = 'Required';
  //   }
  //   else if (values.password !== values.rePassword)
  //   {
  //     errors.rePassword = "passwards not match"
  //   }

  //   return errors;
  // } // 

  // Validation using Yup
  let validationSchema = Yup.object({
    name: Yup.string().required().min(3),
    email: Yup.string().required().email(),
    phone: Yup.string().required().matches(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s./0-9]*$/),
    password: Yup.string().required().min(5).matches(/^[A-z][a-z0-9]{3,}$/, "Password is invalid"),
    rePassword: Yup.string().required().oneOf([Yup.ref('password'),], 'Passwords must match')
  })
  // validation using useFormik
  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      rePassword: '',
    },
    validationSchema,
    onSubmit: submitRegisterForm,
  });
  console.log(formik.isValid);

  return (
    <div className='w-100 p-5 ms-9 marginn'>
      {error && <div className="alert alert-danger w-50">{error}</div>}

      <h1>Register Now</h1>
      <form onSubmit={formik.handleSubmit} >
        <div className="mb-2">
          <label htmlFor="" className="form-label">Name</label>
          <input
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="name"
            id="name"
            className="form-control w-50"
          />
          {/* <div className={formik.errors.name ? 'alert alert-danger w-50 m-1' : ''}>{formik.errors.name}</div> */}
          {formik.errors.name && formik.touched.name && (
            <div className="alert alert-danger heightt w-50 m-1">{formik.errors.name}</div>
          )}
        </div>
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
          <label htmlFor="" className="form-label">Phone</label>
          <input
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="tell"
            name="phone"
            id="phone"
            className="form-control w-50"
          />
          {formik.errors.phone && formik.touched.phone && (
            <div className="alert alert-danger heightt w-50 m-1">{formik.errors.phone}</div>
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
        <div className="mb-2">
          <label htmlFor="" className="form-label">re-Password</label>
          <input
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
            name="rePassword"
            id="rePassword"
            className="form-control w-50"
          />
          {formik.errors.rePassword && formik.touched.rePassword && (
            <div className="alert heightt alert-danger w-50 m-1">{formik.errors.rePassword}</div>
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
