import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import img1 from '../../images/Add notes-bro.png'
import './regster.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

export default function Regster () {

  let navigate = useNavigate()
  const [errorHandle,setErrorHandle]=useState('')
  const [isLoading,setIsLoading]=useState(false)


  async function handleRegster(values){
   try {
    setIsLoading(true)
    let {data} = await axios.post('https://note-sigma-black.vercel.app/api/v1/users/signUp', values)
    console.log(data)

    if(data.msg === 'done'){
      setIsLoading(false)
      navigate('/login')
    }

   } catch (error) {
    setIsLoading(false)
    console.log(error)
    setErrorHandle(error.response.data.msg)
   }
  }
  


  let validationSchema = Yup.object({
    name:Yup.string().min(3, 'Min Lenght grater than 3').max(20, 'Max Lenght less than 20').required('Name is Requied'),
    email:Yup.string().required('Email is Requied').matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Enter Vaild Email'),
    password:Yup.string().required('Password is Requied').matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i, 'Minimum eight characters, at least one letter, one number and one special character'),
    phone:Yup.string().required('phone is Requied').matches(/^01[0125][0-9]{8}$/, 'Enter Vaild Egyption Number'),
    age:Yup.number().required('Age is Requied').min(10,'Min Age bigger than 10').max(80)
  })



  let formik = useFormik({
    initialValues: {
    "name":"",
    "email":"",
    "password":"",
    "age":"",
    "phone":""
    },
    validationSchema,
    onSubmit: handleRegster
  })



  return (
    <>
    
  <section className="signup  d-flex justify-content-center align-items-center my-5">
  <div className="container">
    <div className="signup-content row">
      <div className="signup-form col-md-6 p-5 boxShadow">
        <h2 className="form-title fw-bold">Sign up</h2>
        {errorHandle? <p className=' alert alert-danger'>{errorHandle}</p>:null}

        <form onSubmit={formik.handleSubmit} onBlur={formik.handleBlur}  className="register-form mt-4">
          <div className="form-group d-flex  align-items-center mb-4">
            <label htmlFor="name">
            <i className="fa-solid fa-user"></i>
            </label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur}  type="text" name="name" id="name" placeholder="Your Name" />
          </div>
          {formik.errors.name && formik.touched.name? <p className=' alert alert-danger text-dark text-start'> {formik.errors.name}</p>:null}
      
          <div className="form-group d-flex align-items-center mb-4">
            <label htmlFor="email">
                <i className="fa-solid fa-envelope"></i>
            </label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur}  type="email" name="email" id="email" placeholder="Your Email" />
          </div>
          {formik.errors.email && formik.touched.email? <p className=' alert alert-danger text-dark text-start'> {formik.errors.email}</p>:null}

          <div className="form-group d-flex align-items-center mb-4">
            <label htmlFor="password">
            <i className="fa-solid fa-lock"></i>
            </label>
            <input onChange={formik.handleChange}  onBlur={formik.handleBlur}  type="password" name="password" id="password" placeholder="Password" />
          </div>
          {formik.errors.password && formik.touched.password? <p className=' alert alert-danger text-dark text-start'> {formik.errors.password}</p>:null}


          <div className="form-group d-flex align-items-center mb-4">
            <label htmlFor="phone">
            <i className="fa-solid fa-phone"></i>
            </label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur}  type="text" name="phone" id="phone" placeholder="Phone" />
          </div>
          {formik.errors.phone && formik.touched.phone? <p className=' alert alert-danger text-dark text-start'> {formik.errors.phone}</p>:null}


          <div className="form-group d-flex align-items-center mb-4">
            <label htmlFor="age">
            <i className="fa-solid fa-globe"></i>
            </label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="number" name="age" id="age" placeholder="Age" />
          </div>
          {formik.errors.age && formik.touched.age? <p className=' alert alert-danger text-dark text-start'> {formik.errors.age}</p>:null}


          <button type='submit' className='btn btn-danger'>
          {isLoading? <i class="fa-solid fa-spinner fa-spin-pulse"></i>:'Register'}
          </button>
          <p className='mt-5 me-3'>Have an Account ?<Link to='/login' className='text-primary mx-3'>Sign In</Link></p> 
        </form>
      </div>
      <div className="signup-image col-md-6 d-flex justify-content-center align-items-center px-5">
        <figure>
        <img className='w-100' src={img1} alt="singUp" />
        </figure>
      </div>
    </div>
  </div>
</section>
    
    
    </>
  )
}
