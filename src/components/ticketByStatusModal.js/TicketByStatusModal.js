import React from 'react'
import Modal from "react-bootstrap/Modal";
import { ModalHeader, ModalTitle } from "react-bootstrap";
import { Button } from "react-bootstrap";
import MaterialTable from "@material-table/core";
import ExportCsv from "@material-table/exporters/csv";
import ExportPdf from "@material-table/exporters/pdf";

function TicketByStatusModal({showTicketModal,closeTicketModal,ticketsByStatus}) {
  return (
    <Modal
    show={showTicketModal}
    onHide={closeTicketModal}
    className="custom-modal"
    >
    <ModalHeader closeButton>
      <ModalTitle>Tickets And Its Details</ModalTitle>
    </ModalHeader>
    <Modal.Body>
      <MaterialTable
        title={"Tickets"}
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
        data={ticketsByStatus}
        columns={[
          {
            field: "createdBy",
            title: "Created By",
          },
          {
            field: "title",
            title: "Title",
          },
          {
            field: "ticketPriority",
            title: "Priority",
          },
          {
            field: "description",
            title: "Description",
          },
          {
            field: "assignedTo",
            title: "Assigned To",
          },
        ]}
      />
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={closeTicketModal}>
        Close
      </Button>
    </Modal.Footer>
    </Modal>
  )
}

export default TicketByStatusModal

