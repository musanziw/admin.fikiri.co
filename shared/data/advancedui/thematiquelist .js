import React from "react";

import Link from "next/link";
import moment from "moment";
import {Button, Col, Row} from "react-bootstrap";


const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

export const columns = (handleShowModal, handleDelete) => [
  {
    name: "Photo",
    selector: (row) => [row.Photo],
    sortable: false,
    cell: (row) => <div className={row.class}>{row.img}</div>,
  },
  {
    name: "Nom",
    selector: (row) => [row.name],
    sortable: false,
    cell: (row) => (
        <span>
        <p className="tx-14 font-weight-semibold text-dark mb-1">{truncateText(row.name, 45)}</p>
        <p className="tx-12 text-muted mb-0">ODDS : {row.odds}</p>
      </span>
    ),
  },
  {
    name: " ODD",
    selector: (row) => [row.odds],
    sortable: false,
    cell: (row) => (
        <span>
        <span className="text-center tx-14">{row.odds}</span>
      </span>
    ),
  },
  {
    name: "Date création",
    selector: (row) => [row.createdAt],
    sortable: false,
    cell: (row) => (
        <span>
        <span className="tx-13">{moment(row.createdAt).format("DD MMMM YYYY [à] HH:mm")}</span>
      </span>
    ),
  },
  {
    name: "Actions",
    selector: (row) => [row.Action],
    sortable: false,
    cell: (row) => (
        <div className="w-100">
          <Row className="my-3">
            <Col xs={6} md={6} lg={6} className="mb-2 mb-md-0">
              <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleShowModal(row)}
                  className="w-100"
              >
                Détails
              </Button>
            </Col>

            <Col className="mb-2 mb-md-0">
              <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(row)}
                  className="w-100"
              >
                Supprimer
              </Button>
            </Col>
          </Row>
        </div>
    ),
  },
]

