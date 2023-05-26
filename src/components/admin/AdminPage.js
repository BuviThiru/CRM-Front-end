import React, { useEffect, useState } from 'react'
import "./admin.css"
import MaterialTable from '@material-table/core'
import ExportCsv from '@material-table/exporters/csv';
import ExportPdf from '@material-table/exporters/pdf';
import axios from 'axios';
import BASE_URL from '../../utils/urls';
import TicketCard from '../ticketCards/TicketCards';
import Modal from "react-bootstrap/Modal";
import {ModalHeader, ModalTitle} from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function AdminPage() {
  const [allUser,setAllUser]= useState([])
  const [tickets, setTickets] = useState(100)
  const token = localStorage.getItem("token");
  const [cardData,setCardData]= useState([])
 
  const [rowUser, setRowUser] = useState("")
  const ticketStatus = ["open", "inProgress", "resolved", "cancelled", "onHold"];
    const ticketCardColor = ["success" , "primary", "info", "warning", "light"];
    const [showUserModal,setShowUserModal] = useState(false)

  axios.defaults.headers.common['x-access-token'] = token;
  useEffect(()=>{
     getAllusers() ; 
   
    
  },[])
  useEffect(()=>{
    cardDetails()
  },[tickets])
 useEffect(()=>{
  getTicketsByStatus()
 })
  useEffect(()=>{
    getAllTickets();
    
  },[])
const getAllusers = async() =>{

  let response = await axios.get(BASE_URL+"/getallusers") 
  
  setAllUser( response.data.Users)

}

const getAllTickets = async()=>{
  let response = await axios.get(BASE_URL+"/tickets/gettickets") 
 
  setTickets(response.data.Tickets)
}
const getTicketsByStatus =async()=>{
  let res = [];
  for(let i=0;i<ticketStatus.length;i++){
    const response = await axios.get(BASE_URL+`/tickets/getticketsByStatus/${ticketStatus[i]}`)
  res.push(response.data.Tickets)
  }

return res

}
const cardDetails = async()=> {
  let result = await getTicketsByStatus();

  let cardData = []
  for(let i=0;i<ticketStatus.length;i++){
    const data = {
         cardTitle : ticketStatus[i],
         cardColor  : ticketCardColor[i],
         numberOfTickets: result[i].length,
         percentage : (result[i].length*100)/tickets.length

,    }
    cardData.push(data)
  } 
  setCardData(cardData)
}
function closeUserModal(){
  setShowUserModal(false)
}

const changeUserDetails = (event) =>{
  const {name, value} = event.target;
  rowUser[name]=value;
  setRowUser(rowUser);
  setShowUserModal(event.target.value);
}

const updateUser = async()=>{
  let updatedUser = {
    id : rowUser._id,
    name : rowUser.name,
    email:rowUser.email,
    userType : rowUser.userType,
    userStatus : rowUser.userStatus
  }
   axios.patch(BASE_URL+'/user/updateUser',updatedUser)
   getAllusers() ;
   setShowUserModal(false)

}
  return (
    <div>
      {/* <h1>Welcome {user}</h1> */}
    <div>
      <div className='d-flex justify-content-between'>
        {cardData.map((card,index)=>{
          return <div key={index} className='m-3'> <TicketCard {...card}/> </div>
        })}
      </div>
<hr style={{margin: 2+"rem"}}/>
{
    /*user data table*/
    <MaterialTable 
    onRowClick = {(event,rowData)=>{
          setRowUser(rowData);
          setShowUserModal(true)
    }}
    title={"User Records"}
    options={{
        // Allow user to hide/show
        // columns from Columns Button
        columnsButton: true,
        filtering: true,
      
        exportMenu: [
            {
              label: "Export PDF",
              //// You can do whatever you wish in this function. We provide the
              //// raw table columns and table data for you to modify, if needed.
              // exportFunc: (cols, datas) => console.log({ cols, datas })
              exportFunc: (cols, datas) => ExportPdf(cols, datas, "userDataPdf"),
            },
            {
              label: "Export CSV",
              exportFunc: (cols, datas) => ExportCsv(cols, datas, "userDataCsv"),
            },
          ],
          headerStyle: {
            backgroundColor: '#20646e',
            color: '#FFF'
          },
          rowStyle: {
            backgroundColor: "#d4d4d4",
          },
      }}
    data={allUser}
    columns={[
        {
            field: "name",
            title: "Name",
        },
        {
            field: "email",
            title: "Email",
        },
        {
            field: "userType",
            title: "UserType",
            lookup:{
                "Admin":"Admin",
                "Customer":"Customer",
                "Engineer":"Engineer"
            }
        },
        {
            field: "userStatus",
            title: "User Status",
            lookup:{
                "approved":"approved",
                "pending": "pending",
                "rejected":"rejected"
            }
        },
      ]}
    />
}
<Modal show={showUserModal} onHide={closeUserModal}>
                        <ModalHeader closeButton>
                            <ModalTitle>Edit user details</ModalTitle>
                        </ModalHeader>
                        <Modal.Body>
                            <form >
                                <h5 className='card-subtitle text-primary lead'>User Id: {rowUser._id}</h5>
                                <hr />
                                <div className='input-group mb-3'>
                                    <label className='label input-group-text label-md'>Name</label>
                                    <input type='text' className='form-control' name='name' value={rowUser.name} onChange={changeUserDetails}/>
                                </div>
                                <div className='input-group mb-3'>
                                    <label className='label input-group-text label-md'>Email</label>
                                    <input type='email' className='form-control' name='email' value={rowUser.email} onChange={changeUserDetails}/>
                                </div>
                                <div className='input-group mb-3'>
                                    <label className='label input-group-text label-md'>User Type</label>
                                    <select className='form-select' name="userType" value = {rowUser.userType} onChange={changeUserDetails}>
                                        <option value = "Customer">Customer</option>
                                        <option value = "Engineer">Engineer</option>
                                        <option value = "Admin">Admin</option>
                                </select>
                                </div>
                                <div className='input-group mb-3'>
                                    <label className='label input-group-text label-md'>User Status</label>
                                    <select className='form-select' name="userStatus" value = {rowUser.userStatus} onChange={changeUserDetails}>
                                        <option value = "pending">Pending</option>
                                        <option value = "approved">Approved</option>                                      
                                        <option value = "rejected">Rejected</option>
                                </select>
                                </div>
                                <div className='input-group mb-3'>
                                    <label className='label input-group-text label-md'>Tickets Created</label>
                                    <input type='text' className='form-control' name='ticketsCreated' value={rowUser.ticketsCreated} disabled/>
                                </div>
                                <div className='input-group mb-3'>
                                    <label className='label input-group-text label-md'>Tickets Assigned</label>
                                    <input type='text' className='form-control' name='ticketsAssigned' value={rowUser.ticketsAssigned} disabled/>
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={closeUserModal}>
                                Close
                            </Button>
                            <Button variant="primary" onClick= {updateUser}>
                                Save
                            </Button>
                        </Modal.Footer>
                    </Modal>

</div>
</div>
  )
}

export default AdminPage