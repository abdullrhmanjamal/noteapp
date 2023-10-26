import React, { useState } from 'react'
import './Note.css'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';


export default function Note({noteDetalis, getUserNotes}) {
  // console.log(noteDetalis)
  let {title, content,_id} = noteDetalis
  const token = localStorage.getItem('token')
  // const [errorHandling,setErrorHandling]= useState('')
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 

  async function deleteNote(_id){
    try {
      let {data}= await axios.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${_id}`,{
    headers:{token}
  })
  console.log(data)
  getUserNotes()
  if(data.msg === 'done'){
    toast.success(data.msg)
  }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.msg)
    }
  

  }

  async function updateNote(values){
    let {data}= await axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${_id}`,values,{
      headers:{token}
    })
    // console.log(data)
    handleClose()
    getUserNotes()

  }

  let formik = useFormik({
    initialValues:{
    "title": "",
    "content": ""
    },
    onSubmit:updateNote
  })
  return (
    <>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form  >
            <input onChange={formik.handleChange} defaultValue={title} className='form-control mb-4' type="text" name='title' id='title' placeholder='Title' />
            <input onChange={formik.handleChange} defaultValue={content} className='form-control' type="text" name='content' id='content' placeholder='Content' />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={formik.handleSubmit}>
            Update Note
          </Button>
        </Modal.Footer>
      </Modal>



    <div className="col-md-4 col-sm-6 content-card">
      <div className="card-big-shadow">
        <div className="card card-just-text" data-background="color" data-color="yellow" data-radius="none">
          <div className="content">
            <h4 className="title text-black">{title}</h4>
            <p className="description">{content}</p>
            <div className='d-flex justify-content-evenly'>
              <i onClick={handleShow}  className="fa-solid fa-pen-to-square text-primary cursor-pointer"></i>
              <i onClick={ (()=>{deleteNote(_id)})}  className="fa-solid fa-trash text-danger cursor-pointer"></i>
            </div>
          </div>
        </div> 
      </div>
    </div>

    
    
    
    </>
  )
}
