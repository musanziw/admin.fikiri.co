import React from "react";

import Link from "next/link";
import moment from "moment";


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
    selector: (row) => [row.name],
    sortable: false,
    cell: (row) => (
      <span>
        <p className="tx-14 font-weight-semibold text-dark mb-1">{row.name}</p>
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
    name: "Action",
    selector: (row) => [row.Action],
    sortable: false,
    cell: (row) => (
      <div>
        <Link
          className="btn btn-primary me-1 ms-3"
          href={`/components/apps/solution`}
          as="/components/apps/solution"
        >
          Detail sur le curateur
        </Link>

        <Link
          className="btn btn-danger me-1 ms-2"
          href={`/components/apps/solution`}
          as="/components/apps/solution"
        >
          Desactiver
        </Link>
      </div>
    ),
  },
];
