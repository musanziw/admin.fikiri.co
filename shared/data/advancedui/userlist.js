import React from "react";
import Link from "next/link";
import {Button} from "react-bootstrap";

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

export const columns = [
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
    name: "Adresse",
    selector: (row) => [row.address],
    sortable: false,
    cell: (row) => (
      <span>
        <span className="tx-13">{truncateText(row.address, 45)}</span>
      </span>
    ),
  },
  {
    name: "Actions",
    selector: (row) => [row.Action],
    sortable: false,
    cell: (row) => (
      <div>
        {/*<Link href={`/apps/users/${row.id}`}>*/}
        {/*  <Button variant="outline-primary" size="sm">*/}
        {/*    Voir Détails*/}
        {/*  </Button>*/}
        {/*</Link>*/}
      </div>
    ),
  },
];
