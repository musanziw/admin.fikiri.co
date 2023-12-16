import React from "react";
import moment from "moment";
import { Row, Col, Button } from "react-bootstrap";

import Link from "next/link";

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

export const columns = (handleDelete)=>[
  {
    name: "Image",
    selector: (row) => [row.img],
    sortable: false,
    cell: (row) => <div className={row.class}>{row.img}</div>,
  },
  {
    name: " Titre",
    selector: (row) => [row.name],
    sortable: false,
    cell: (row) => (
      <span>
        <span className="tx-13">{truncateText(row.name, 45)}</span>
      </span>
    ),
  },
  {
    name: "Thématique",
    selector: (row) => [row.thematic.name],
    sortable: false,
    cell: (row) => (
      <span>
        <p className="tx-14 font-weight-semibold text-dark mb-1">
          {truncateText(row.thematic.name, 30)}
        </p>
        <p className="tx-12 text-muted mb-0">{`ODDS : ${row.thematic.odds}`}</p>
      </span>
    ),
  },
  {
    name: "Target",
    selector: (row) => [row.targetedProblem],
    sortable: false,
    cell: (row) => (
      <span>
        <span className=" tx-13">
          {truncateText(row.targetedProblem, 30)}
        </span>
      </span>
    ),
  },
  // {
  //   name: "Date de soumission",
  //   selector: (row) => [row.createdAt],
  //   sortable: false,
  //   cell: (row) => (
  //     <span>
  //       <span className="tx-13">
  //         {moment(row.createdAt).format("DD MMMM YYYY [à] HH:mm")}
  //       </span>
  //     </span>
  //   ),
  // },
  {
    name: "Actions",
    selector: (row) => [row.Action],
    sortable: false,
    cell: (row) => (
      <div className="w-100">
        <Row>
            <Col>
                <Link
                className="btn btn-primary me-1 btn-sm w-100"
                href={`/components/apps/solution?id=${row.id}&innovateurId=${row.userId}&thematiqueId=${row.thematicId}`}
                as="/components/apps/solution"
                >
                Details
                </Link>
            </Col>
            <Col>
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
];
