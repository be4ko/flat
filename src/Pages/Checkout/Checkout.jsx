import React, { useContext } from "react";
import "./Checkout.module.css";
import { useFormik } from "formik";
import { CartContext } from "../../Context/CartContext";

export default function Checkout() {

const {payment} =  useContext(CartContext);

  async function checkoutPayment(values) {
     const {data} = await payment(values);
      console.log(data?.session.url);
      if (data.status === 'success') {        
        window.location.href= data?.session?.url
      }
      else 
      {
        alert('Payment Failed')
      }
  }

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: ""

    },
    onSubmit: checkoutPayment,

  });

  return <>
    <div className="container bg-main-light p-4 ">
      <h2>Check Out :</h2>

      <form className="w-50 m-3" onSubmit={formik.handleSubmit}>
        <div class="mb-3 w-100">
          <label for="" class="form-label">
            Details :
          </label>
          <input
            type="text"
            name="details"
            id="details"
            class="form-control"
            value={formik.values.details}
            onChange={formik.handleChange}
          />
        </div>
        <div class="mb-3 w-100">
          <label for="" class="form-label">
            Phone :
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            class="form-control"
            value={formik.values.phone}
            onChange={formik.handleChange}
          />
        </div>
        <div class="mb-3 w-100">
          <label for="" class="form-label">
            City :
          </label>
          <input
            type="text"
            name="city"
            id="city"
            class="form-control"
            value={formik.values.city}
            onChange={formik.handleChange}
          />
        </div>
          <button style={{marginLeft:'9rem'}} className='w-50 h-10 btn bg-main' type="submit">Pay</button>

      </form>
    </div>


  </>;
}
