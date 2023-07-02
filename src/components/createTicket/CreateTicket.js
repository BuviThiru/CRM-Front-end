import React, { useState } from 'react'
import './createTicket.css'
import Modal from "react-bootstrap/Modal";
import { ModalHeader, ModalTitle, Spinner } from "react-bootstrap";
import { Button } from "react-bootstrap"
import BASE_URL from '../../utils/urls';
import axios from 'axios';
import Swal from 'sweetalert2';

function CreateTicketModal({showCreateTicketModal,closeCreateTicketModal,changeTicketDetails}) {
  const [newTicket, setNewTicket] = useState ({});
  const [isloading,setIsloading] = useState(false)

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTicket((prevTicket) => {   
        return { ...prevTicket, [name]: value };      
    });
  };

  async function createTicket(){
    try{
      setIsloading(true)
      const response = await axios.post(BASE_URL + '/tickets/createticket',{...newTicket})
    
    if(response.status === 200){
      Swal.fire({
        title: "Result",
        text: `${response?.data?.success}`,
        icon: "success",
      })
    }else{
      console.log(response.data.error)
      
    }
    }catch(err){
      const error = err.response.data.error;
      Swal.fire({
        title: "Result",
        text: `${error}`,
        icon: "error",
      })
    }finally {
      setIsloading(false);
      closeCreateTicketModal()
    }
  }
  return (
    <Modal size="lg" show={showCreateTicketModal} onHide={closeCreateTicketModal}>
    <ModalHeader >
      <ModalTitle>Create New Ticket</ModalTitle>
    </ModalHeader>
    <Modal.Body>
      <form>
     
        <div className="input-group mb-3">
          <label className="label input-group-text label-md">Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={newTicket.title || ''}
            onChange={handleInputChange}                      
         
          />
        </div>
        <div className="input-group mb-3">
          <label className="label input-group-text label-md">Description</label>
          <textarea
            type="description"
            className="form-control"
            name="description"
            value={newTicket.description || ''}
            onChange={handleInputChange}
        
          />
        </div>
        <div className="input-group mb-3">
          <label className="label input-group-text label-md">Client</label>
          <input
            type="client"
            className="form-control"
            name="clientName"
            value={newTicket.client}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group mb-3">
          <label className="label input-group-text label-md">
            Ticket Priority
          </label>
          <select
            className="form-select"
            name="ticketPriority"
            value={newTicket.ticketPriority || ""}
            onChange={handleInputChange}            
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        <div className="input-group mb-3">
          <label className="label input-group-text label-md">
            Status
          </label>
          <select
            className="form-select"
            name="status"
            value= {newTicket.status || ''}
            onChange={handleInputChange}
          >
            <option value="open">open</option>
            <option value="inProgress">inProgress</option>
            <option value="resolved">resolved</option>
            <option value="cancelled">cancelled</option>
            <option value="onHold">onHold</option>
          </select>
        </div>                
        
        <div className="input-group mb-3">
          <label className="label input-group-text label-md">
          Assigned To
          </label>
          <input
            className="form-select"
            name="assignedTo"
            value={newTicket.assignedTo || ''}
            onChange={handleInputChange}
          />           
        </div>
        
      </form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={closeCreateTicketModal} >
        Close
      </Button>
      <Button variant="primary" onClick={()=> {createTicket()}} disabled={isloading}>
      {isloading? (
             <>
             <Spinner animation="border" size="sm" className="mr-2" />{" "}
             Please wait...
           </>
        ):"Save"}
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default CreateTicketModal