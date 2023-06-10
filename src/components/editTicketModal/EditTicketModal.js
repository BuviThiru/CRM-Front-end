import React from 'react'
import Modal from "react-bootstrap/Modal";
import { ModalHeader, ModalTitle } from "react-bootstrap";
import { Button } from "react-bootstrap"

function EditTicketModal({showEditTicketModal,closeEditTicketModal,rowTicket,changeTicketDetails,updateTicket}) {

  return (
    <Modal show={showEditTicketModal} onHide={closeEditTicketModal}>
    <ModalHeader closeButton>
      <ModalTitle>Edit Ticket details</ModalTitle>
    </ModalHeader>
    <Modal.Body>
      <form>
        <h5 className="card-subtitle text-primary lead">
          Ticket Id: {rowTicket._id}
        </h5>
        <hr />
        <div className="input-group mb-3">
          <label className="label input-group-text label-md">Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={rowTicket.title}
            onChange={changeTicketDetails}                      
         
          />
        </div>
        <div className="input-group mb-3">
          <label className="label input-group-text label-md">Description</label>
          < textarea
            type="description"
            className="form-control"
            name="description"
            value={rowTicket.description}
            onChange={changeTicketDetails}
          />
        </div>
        <div className="input-group mb-3">
          <label className="label input-group-text label-md">Client</label>
          <input
            type="client"
            className="form-control"
            name="clientName"
            value={rowTicket.clientName}
            onChange={changeTicketDetails}
          />
        </div>
        <div className="input-group mb-3">
          <label className="label input-group-text label-md">
            Ticket Priority
          </label>
          <select
            className="form-select"
            name="ticketPriority"
            value={rowTicket.ticketPriority}
            onChange={changeTicketDetails}
            
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
            value={rowTicket.status}
            onChange={changeTicketDetails}
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
          Created By
          </label>
          <input
            className="form-select"
            name="createBy"
            value={rowTicket.createdBy}
            onChange={changeTicketDetails} disabled
          />           
        </div>
        <div className="input-group mb-3">
          <label className="label input-group-text label-md">
          Assignee
          </label>
          <input
            className="form-select"
            name="assignee"
            value={rowTicket.assignee}
            onChange={changeTicketDetails} disabled
          />           
        </div>
        
        
        <div className="input-group mb-3">
          <label className="label input-group-text label-md">
          Assigned To
          </label>
          <input
            className="form-select"
            name="assignedTo"
            value={rowTicket.assignedTo}
            onChange={changeTicketDetails}
          />           
        </div>
        
      </form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={closeEditTicketModal}>
        Close
      </Button>
      <Button variant="primary" onClick={updateTicket}>
        Save
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default EditTicketModal