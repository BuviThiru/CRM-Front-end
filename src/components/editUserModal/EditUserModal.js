import React from 'react'
import Modal from "react-bootstrap/Modal";
import { ModalHeader, ModalTitle } from "react-bootstrap";
import { Button } from "react-bootstrap"

function EditUserModal({showUserModal,closeUserModal,rowUser,changeUserDetails,updateUser}) {
  return (
    <Modal show={showUserModal} onHide={closeUserModal}>
    <ModalHeader closeButton>
      <ModalTitle>Edit user details</ModalTitle>
    </ModalHeader>
    <Modal.Body>
      <form>
        <h5 className="card-subtitle text-primary lead">
          User Id: {rowUser._id}
        </h5>
        <hr />
        <div className="input-group mb-3">
          <label className="label input-group-text label-md">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={rowUser.name}
            onChange={changeUserDetails}
          />
        </div>
        <div className="input-group mb-3">
          <label className="label input-group-text label-md">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={rowUser.email}
            onChange={changeUserDetails}
          />
        </div>
        <div className="input-group mb-3">
          <label className="label input-group-text label-md">
            User Type
          </label>
          <select
            className="form-select"
            name="userType"
            value={rowUser.userType}
            onChange={changeUserDetails}
          >
            <option value="Customer">Customer</option>
            <option value="Engineer">Engineer</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <div className="input-group mb-3">
          <label className="label input-group-text label-md">
            User Status
          </label>
          <select
            className="form-select"
            name="userStatus"
            value={rowUser.userStatus}
            onChange={changeUserDetails}
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <div className="input-group mb-3">
          <label className="label input-group-text label-md">
            Tickets Created
          </label>
          <input
            type="text"
            className="form-control"
            name="ticketsCreated"
            value={rowUser.ticketsCreated}
            disabled
          />
        </div>
        <div className="input-group mb-3">
          <label className="label input-group-text label-md">
            Tickets Assigned
          </label>
          <input
            type="text"
            className="form-control"
            name="ticketsAssigned"
            value={rowUser.ticketsAssigned}
            disabled
          />
        </div>
      </form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={closeUserModal}>
        Close
      </Button>
      <Button variant="primary" onClick={updateUser}>
        Save
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default EditUserModal