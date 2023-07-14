import React from 'react'
import MaterialTable from "@material-table/core";
import ExportCsv from "@material-table/exporters/csv";
import ExportPdf from "@material-table/exporters/pdf";

function TicketRecords({tickets,setRowTicket,setShowEditTicketModal}) {

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
                  label: "Export PDF",
                  //// You can do whatever you wish in this function. We provide the
                  //// raw table columns and table data for you to modify, if needed.
                  // exportFunc: (cols, datas) => console.log({ cols, datas })
                  exportFunc: (cols, datas) =>
                    ExportPdf(cols, datas, "userDataPdf"),
                },
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
            columns={[
           
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
                field: "ticketPriority",
                title: "Priority",
                width: "2%",
                lookup: {
                    1: "1",
                    2: "2",
                    3: "3",
                    4: "4"
                  },
              },
              {
                field: "_id",
                title:"ID"
              }
            ]}
          />
    </div>
  )
}

export default TicketRecords