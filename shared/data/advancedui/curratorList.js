import React from "react";

import {Button, Col, Row} from "react-bootstrap";

const truncateText = (text, maxLength) => {
    if (text?.length > maxLength) {
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
        selector: (row) => [row.Name],
        sortable: false,
        cell: (row) => (
            <span>
            <p className="tx-14 font-weight-semibold text-dark mb-1">{row.name}</p>
            <p className="tx-12 text-muted mb-0">{row.email}</p>
        </span>
        ),
    },
    {
        name: " Num Tel",
        selector: (row) => [row.phoneNumber],
        sortable: false,
        cell: (row) => (
            <span>
            <span className="text-muted tx-13">{row.phoneNumber}</span>
        </span>
        ),
    },
    {
        name: "Role",
        selector: (row) => [row.roles[0].name],
        sortable: false,
        cell: (row) => (
            <span>
              <span className="tx-13">{truncateText(row.roles[0].name, 45)}</span>
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
                    <Col xs={12} md={6} lg={6} className="mb-2 mb-md-0">
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleShowModal(row)}
                            className="w-100"
                        >
                            Détails
                        </Button>
                    </Col>

                    <Col xs={12} md={6} lg={6} className="mb-2 mb-md-0">
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