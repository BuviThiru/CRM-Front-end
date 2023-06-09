import React from 'react'
import MaterialTable from "@material-table/core";
import ExportCsv from "@material-table/exporters/csv";
import ExportPdf from "@material-table/exporters/pdf";

function UserRecords({allUser,setRowUser,setShowUserModal}) {
  return (
    <div className='d-flex justify-content-center'>
           <MaterialTable
             style={{ width: '100%' }}
            onRowClick={(event, rowData) => {
              setRowUser(rowData);
              setShowUserModal(true);
              
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
                field: "_id",
                title: "ID",
              },
              {
                field: "userType",
                title: "UserType",
                lookup: {
                  Admin: "Admin",
                  Customer: "Customer",
                  Engineer: "Engineer",
                },
              },
              {
                field: "userStatus",
                title: "User Status",
                lookup: {
                  approved: "approved",
                  pending: "pending",
                  rejected: "rejected",
                },
              },
            ]}
          />
    </div>
  )
}

export default UserRecords