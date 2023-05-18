import React, { useEffect, useState } from 'react'
import "./admin.css"
import MaterialTable from '@material-table/core'
import ExportCsv from '@material-table/exporters/csv';
import ExportPdf from '@material-table/exporters/pdf';
import axios from 'axios';
import BASE_URL from '../../utils/urls';

function AdminPage() {
  const [allUser,setAllUser]= useState([])
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user")
  axios.defaults.headers.common['x-access-token'] = token;
  useEffect(()=>{
     getAllusers()
    
  },[])
const getAllusers = async() =>{
  let response = await axios.get(BASE_URL+"/getallusers") 
  setAllUser( response.data.Users)

}

  return (
    <div>
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
        sorting: true,
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
  )
}

export default AdminPage