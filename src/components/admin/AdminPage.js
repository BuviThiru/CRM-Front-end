import React, { useEffect, useState } from 'react'
import "./admin.css"
import MaterialTable from '@material-table/core'
import ExportCsv from '@material-table/exporters/csv';
import ExportPdf from '@material-table/exporters/pdf';
import axios from 'axios';
import BASE_URL from '../../utils/urls';
import TicketCard from '../ticketCards/TicketCards';

function AdminPage() {
  const [allUser,setAllUser]= useState([])
  const [tickets, setTickets] = useState(100)
  const token = localStorage.getItem("token");
  const [cardData,setCardData]= useState([])
  const user = localStorage.getItem("user")
  const ticketStatus = ["open", "inProgress", "resolved", "cancelled", "onHold"];
    const ticketCardColor = ["success" , "primary", "info", "warning", "light"];

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
  // console.log(response.data.Tickets)
  setTickets(response.data.Tickets)
}
const getTicketsByStatus =async()=>{
  let res = [];
  for(let i=0;i<ticketStatus.length;i++){
    const response = await axios.get(BASE_URL+`/tickets/getticketsByStatus/${ticketStatus[i]}`)
  res.push(response.data.Tickets)
  }
  // console.log(res)
return res

}
const cardDetails = async()=> {
  let result = await getTicketsByStatus();
  // console.log(tickets?.length)
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

</div>
</div>
  )
}

export default AdminPage