import React, { useState, useEffect, useCallback } from "react";
import { Button, Row, Col, Card, Spinner, Modal } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { columns as configureColumns} from "./userlist";
import axios from "@/pages/api/axios";

const Userlistcom = () => {
  const [users, setUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoadingUsers(true);
        const responseUser = await axios.get("/users");

        const usersWithImages = responseUser.data.data.map((user) => ({
          ...user,
          img: (
            <img
              src={"../../../assets/img/faces/4.jpg"}
              className="rounded-circle"
              alt=""
            />
          ),
          class: "avatar-md rounded-circle",
        }));

        setUsers(usersWithImages.filter(user=>{return user.roles.some(role=>role.name === "USER")}));
        setIsLoadingUsers(false);

      } catch (error) {
        setIsLoadingUsers(false);
        console.error("Erreur lors de la récupération des données :", error);
      }
    };
    fetchUser();
  }, []);
  const handleShowModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const columns = configureColumns(handleShowModal);

  function convertArrayOfObjectsToCSV(array) {
    if (!array || array.length === 0) {
      return "";
    }
  
    let result;
  
    const columnDelimiter = ",";
    const lineDelimiter = "\n";
    const keys = Object.keys(array[0]);
  
    result = "";
    result += keys.join(columnDelimiter);
    result += lineDelimiter;
  
    array.forEach((item) => {
      let ctr = 0;
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter;

        try {
          const value =
              typeof item[key] === "object" && item[key] !== null
                  ? item[key]?.props?.alt
                  : item[key];

          result += value;
        }catch (e) {

        }
  
        ctr++;
      });
      result += lineDelimiter;
    });
  
    return result;
  }

  function downloadCSV(array) {
    const link = document.createElement("a");
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv == null) return;

    const filename = "export.csv";

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", filename);
    link.click();
  }

  const Export = ({ onExport }) => (
    <Button onClick={() => onExport()}>
      Exporter les Innovateurs
    </Button>
  );

  const actionsMemo = React.useMemo(
    () => <Export onExport={() => downloadCSV(users)} />,
    [users]
  );

  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const contextActions = React.useMemo(() => {
    const Selectdata = () => {
      if (window.confirm(`download:\r ${selectedRows.map((r) => r.id)}?`)) {
        setToggleCleared(!toggleCleared);
        const selectdata = users.filter((e) => selectedRows.some((sr) => e.id === sr.id));
        downloadCSV(selectdata);
      }
    };

    return <Export onExport={Selectdata} icon="true" />;
  }, [users, selectedRows, toggleCleared]);

  return (
    <div>
      <Row className=" row-sm">
        <Col lg={12}>
          <Card className="custom-card">
            <Card.Body>
              {isLoadingUsers ? (
                <div className="text-center">
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : (
                <div className="table-responsive">
                  <span className="datatable">
                    <span className="uselistdata">
                      <DataTable
                        columns={columns}
                        data={users}
                        actions={actionsMemo}
                        contextActions={contextActions}
                        onSelectedRowsChange={handleRowSelected}
                        clearSelectedRows={toggleCleared}
                        defaultSortField="id"
                        defaultSortAsc={false}
                        selectableRows
                        pagination
                      />
                    </span>
                  </span>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Détails de l'Innovateur</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
              <div>
                <p>Nom: {selectedUser.name}</p>
                <p>Email: {selectedUser.email}</p>
              </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Userlistcom;
