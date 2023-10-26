import React, { useState } from 'react'
import img2 from '../../images/Notebook-cuate.png'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'



export default function Login() {

  let navigate= useNavigate()
  const [errorHandling,setErrorHandling]= useState('')
  const [isLoading,setIsLoading]= useState(false)

async function handleLogin(values){
try {
  setIsLoading(true)
  let {data}= await axios.post('https://note-sigma-black.vercel.app/api/v1/users/signIn', values)
  console.log(data)
  if(data.msg === 'done'){
    setIsLoading(false)
    localStorage.setItem('token',`3b8ny__${data.token}`)
    navigate('/notes')
  }
} catch (error) {
  setIsLoading(false)
  console.log(error)
  setErrorHandling(error.response.data.msg)
}
}

let validationSchema = Yup.object({
  email:Yup.string().required('Email is Requied').matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Enter Vaild Email'),
  password:Yup.string().required('Password is Requied').matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i, 'Minimum eight characters, at least one letter, one number and one special character'),
})


  let formik = useFormik({
    initialValues:{
    "email":"",
    "password":""
    },
    validationSchema,
    onSubmit:handleLogin
  })


  return (
    <>


<section className="sign-in d-flex justify-content-center align-items-center vh-100">
  <div className="container">
    <div className="signin-content row">
      <div className="signin-image col-md-6 pe-5">
        <figure>
          <img className='w-100' src={img2} alt="singin" />
          </figure>
      </div>
      <div className="signin-form col-md-6 boxShadow p-5">
        <h2 className="form-title fw-bold ">Sign in</h2>
        {errorHandling ? <p className='alert alert-danger'>{errorHandling}</p>:null}
        <form onSubmit={formik.handleSubmit} onBlur={formik.handleBlur}  className="register-form mt-4">
          <div className="form-group d-flex align-items-center mb-4">
            <label htmlFor="email">
                <i className="fa-solid fa-envelope"></i>
            </label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" name="email" id="email" placeholder="Your Email" />
          </div>
          {formik.errors.email && formik.touched.email ? <p className=' alert alert-danger text-dark text-start'> {formik.errors.email}</p>:null}

          <div className="form-group d-flex align-items-center mb-4">
            <label htmlFor="password">
            <i className="fa-solid fa-lock"></i>
            </label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name="password" id="password" placeholder="Password" />
          </div>
          {formik.errors.password && formik.touched.password ? <p className=' alert alert-danger text-dark text-start'> {formik.errors.password}</p>:null}


          <button type='submit' className='btn btn-danger'>
          {isLoading? <i class="fa-solid fa-spinner fa-spin-pulse"></i>:'Login'}
          </button>
        </form>
          <p className='mt-3 me-3 text-center'>Don't Have an Account ?<Link to='/' className='text-primary  mx-3'>Sign Up</Link></p> 
      </div>
    </div>
  </div>
</section>

    </>
  )
}
