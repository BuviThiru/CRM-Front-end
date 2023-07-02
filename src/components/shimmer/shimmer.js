import React from "react";
import "./shimmer.css"; 
import MaterialTable from "@material-table/core";


const Shimmer = () => {
  return (
    <div className="d-flex flex-column">
      <div className="shimmer-boxes">
        <div className="shimmer-box box1"></div>
        <div className="shimmer-box box2"></div>
        <div className="shimmer-box box3"></div>
        <div className="shimmer-box box4"></div>
        <div className="shimmer-box box5"></div>
      </div>
<hr/>
      <div className="table-shimmercontainer">
      <div>
           <MaterialTable         
            title={"Ticket Records"}
            options={{
              // Allow user to hide/show
              // columns from Columns Button
           
                  
              headerStyle: {
                backgroundColor: "#20646e",
                color: "#FFF",
              },
              rowStyle: {
                backgroundColor: "#d4d4d4",
              },
                        }}
            data={[]}
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
                width: "10%",
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
      </div>
    </div>
  );
};

export default Shimmer;
