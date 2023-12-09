import React, { useState, useEffect } from "react";
import { Button, Row, Col, Card, Spinner } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { columns } from "./curratorList";
import axios from "@/pages/api/axios";

const CurratorList = () => {
  const [users, setUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);

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
        setUsers(usersWithImages.filter(user=>{return user.roles.some(role=>role.name === "CURATOR")}));
        setIsLoadingUsers(false);
      } catch (error) {
        setIsLoadingUsers(false);
        console.error("Erreur lors de la récupération des données :", error);
      }
    };
    fetchUser();
  }, []);

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
  
        // Handle case where the value might be a React element
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
              {isLoadingUsers ? ( // Afficher le spinner si isLoadingUsers est true
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
    </div>
  );
};

export default CurratorList;
