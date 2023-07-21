import React from 'react'
import MaterialTable from "@material-table/core";
import ExportCsv from "@material-table/exporters/csv";


function TicketRecords({tickets,setRowTicket,setShowEditTicketModal}) {
const userType = localStorage.getItem("userType")
const columns = [
           
  {
    field: "title",
    title: "Title",
   
  },
  {
    field: "description",
    title: "Description",
  },
  {
    field: "createdBy",
    title: "Created By",
 
    
  },
  {
    field: "clientName",
    title: "Client",
    width: "10%",
    
  },
  {
    field: "assignedTo",
    title: "Assigned To"
    
  },
  {
    field: "status",
    title: "Status",
    width: "10%",
    lookup: {
        open: "open",
        inProgress: "inProgress",
        resolved: "resolved",
        cancelled :"cancelled",
        onHold:"onHold"

      },
    
  },
  
  {
    field: "_id",
    title:"ID"
  }
]
if (userType !== "Customer") {
  columns.push({
    field: "ticketPriority",
    title: "Priority",
    width: "2%",
    lookup: {
        1: "1",
        2: "2",
        3: "3",
        4: "4"
      },
  })
}
  return (
    <div>
           <MaterialTable
            onRowClick={(event, rowData) => {            
              setRowTicket(rowData);
              setShowEditTicketModal(true);
            }}
            title={"Ticket Records"}
            options={{
              // Allow user to hide/show
              // columns from Columns Button
              columnsButton: true,
              filtering: true,

              exportMenu: [
                                {
                  label: "Export CSV",
                  exportFunc: (cols, datas) =>
                    ExportCsv(cols, datas, "userDataCsv"),
                },
              ],
              headerStyle: {
                backgroundColor: "#20646e",
                color: "#FFF",
              },
              rowStyle: {
                backgroundColor: "#d4d4d4",
              },
                        }}
            data={tickets}
            columns={columns}
          />
    </div>
  )
}

export default TicketRecords