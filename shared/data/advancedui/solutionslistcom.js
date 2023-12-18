import React, { useEffect, useState } from "react";
import { Button, Row, Col, Card, Spinner, Modal } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { columns as configureColumns, truncateText } from "./solutionslist";
import axios from "@/pages/api/axios";

const Solutionslistcom = () => {

  const [solutions, setSolutions] = useState([]);
  const [isLoadingSolution, setIsLoadingSolution] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [solutionToDelete, setSolutionToDelete] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);

  const [isAdmin, setIsAdmin] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);

  useEffect(() => {

    if(JSON.parse(localStorage.getItem("ACCESS_ACCOUNT")).roles[0].name === "ADMIN"){
      setIsAdmin(true);
    }
    const fetchSolution = async () => {
      try {
        setIsLoadingSolution(true);
        const responseSolution = await axios.get("/solutions");
        const solutionWithImages = responseSolution.data.data.map((solution) => ({
          ...solution,
          img: (
              <img
                  src={"../../../assets/img/faces/4.jpg"}
                  className="rounded-circle"
                  alt=""
              />
          ),
          class: "avatar-md rounded-circle",
        }));
        setSolutions(solutionWithImages);
        setIsLoadingSolution(false);
      } catch (error) {
        setIsLoadingSolution(false);
        console.error("Erreur lors de la récupération des données :", error);
      }
    };
    fetchSolution();
  }, []);

  const handleDelete = (solution) => {
    if (isAdmin) {
      setSolutionToDelete(solution);
      setShowDeleteModal(true);
    } else {
      setShowAlertModal(true);
    }
  }

  const handleDeleteSolution = async () => {

    try {
      await axios.delete(`/solutions/${solutionToDelete.id}`);
      setShowDeleteModal(false);
      setSolutions((prevSolutions) =>
          prevSolutions.filter((solution) => solution.id !== solutionToDelete.id)
      );
    } catch (error) {
      console.error("Erreur lors de la suppression de la solution :", error);
    }

  };


  const handleCloseAlertModal = () => {
    setShowAlertModal(false);
  };

  const columns = configureColumns(handleDelete);

  const handleRowSelected = (state) => {
    setSelectedRows(state.selectedRows);
  };

  const handleDownload = () => {
    if (
        window.confirm(
            `download:\r ${selectedRows.map((r) => r.id)}?`
        )
    ) {
      setToggleCleared(!toggleCleared);
      const selectdata = solutions.filter((e) =>
          selectedRows.some((sr) => e.id === sr.id)
      );
      downloadCSV(selectdata);
    }
  };

  const contextActions = (
      <Button size="sm" onClick={handleDownload}>
        Exporter les solutions
      </Button>
  );

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
        } catch (e) {}
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

  return (
      <div>
        <Row className="row-sm">
          <Col lg={12}>
            <Card className="custom-card">
              <Card.Body>
                {isLoadingSolution ? (
                    <div className="text-center">
                      <Spinner animation="border" variant="primary" />
                    </div>
                ) : (
                    <div className="table-responsive ">
                  <span className="datatable">
                    <span className="uselistdata">
                      <DataTable
                          columns={columns}
                          data={solutions}
                          actions={contextActions}
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
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
          <Modal.Body>
            <div className="tx-center">
              <i className="icon icon ion-ios-close-circle-outline tx-100 tx-danger lh-1 mg-t-20 d-inline-block"></i>{" "}
              <h4 className="tx-danger mg-b-20">
                {"Êtes - vous sûr de vouloir supprimer la solution "} <span className="badge bg-danger">{ truncateText(solutionToDelete?.name, 20) } ?</span>
              </h4>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
                size={"sm"}
                variant="primary"
                onClick={() => setShowDeleteModal(false)}
            >
              Annuler
            </Button>
            <Button
                size={"sm"}
                variant="danger"
                onClick={handleDeleteSolution}
            >
              Supprimer
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showAlertModal} onHide={handleCloseAlertModal}>
          <Modal.Body>
            <div className="tx-center">
              <i className="icon icon ion-ios-close-circle-outline tx-100 tx-danger lh-1 mg-t-20 d-inline-block"></i>{" "}
              <h4 className="tx-danger mg-b-20">
                {"Vous n'avez pas les droits nécessaires pour effectuer cette action."}
              </h4>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button size={"sm"} variant="primary" onClick={handleCloseAlertModal}>
              {"OK"}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
  );
};
export default Solutionslistcom;
