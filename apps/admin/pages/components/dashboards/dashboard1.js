import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Seo from "@/shared/layout-components/seo/seo";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

import moment from "moment";

import { useRouter } from "next/router";

import axios from "@/pages/api/axios";

import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";

import { Breadcrumb, Col, Row, Card, Button, Form } from "react-bootstrap";
import Link from "next/link";
import Select from "react-select";

import * as Dashboarddata from "../../../shared/data/dashboards/dashboards1";
import {
  SOLUTIONS_COLUMNS,
  SOLUTIONS,
  GlobalFilter,
} from "../../../shared/data/dashboards/dashboards1";

moment.locale("fr");

const Dashboard = () => {
  const tableInstance = useTable(
    {
      columns: SOLUTIONS_COLUMNS,
      data: SOLUTIONS,
      initialState: { pageSize: 10 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  let navigate = useRouter();
  const [users, setUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);

  const [solutions, setSolution] = useState([]);
  const [isLoadingSolution, setIsLoadingSolution] = useState(false);

  const [thematique, setThematique] = useState([]);
  const [isLoadingThematique, setIsLoadingThematique] = useState(false);

  const FormSize = [
    { value: "5", label: "Show 5" },
    { value: "10", label: "Show 10" },
    { value: "15", label: "Show 15" },
  ];

  const {
    getTableProps, // table props from react-table
    headerGroups, // headerGroups, if your table has groupings
    getTableBodyProps, // table body props from react-table
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
    state,
    setGlobalFilter,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
  } = tableInstance;

  const { globalFilter, pageIndex, pageSize } = state;

  useEffect(() => {
    const status = JSON.parse(localStorage.getItem("STATUS_ACCOUNT"));
    if (status.authenticate) {
      const fetchUsers = async () => {
        try {
          setIsLoadingUsers(true);
          const usersResponse = await axios.get("/users");
          setUsers(usersResponse?.data?.data);
          setIsLoadingUsers(false);
        } catch (error) {
          console.log(error);
          setIsLoadingUsers(false);
        }
      };

      const fetchSolutions = async () => {
        try {
          setIsLoadingSolution(true);
          const solutionResponse = await axios.get("/solutions");
          setSolution(solutionResponse.data.data);
          setIsLoadingSolution(false);
        } catch (error) {
          console.log(error);
          setIsLoadingSolution(false);
        }
      };

      const fetchThematique = async () => {
        try {
          setIsLoadingThematique(true);
          const thematiqueResponse = await axios.get("/thematics");
          setThematique(thematiqueResponse.data.data);
          setIsLoadingThematique(false);
        } catch (error) {
          console.log(error);
          setIsLoadingThematique(false);
        }
      };

      fetchUsers();
      fetchSolutions();
      fetchThematique();
    } else {
      navigate.push("/");
    }
  }, []);

  return (
    <>
      <Seo title={"Tableau de bord"} />
      <React.Fragment>
        <div className="breadcrumb-header justify-content-between">
          <div className="left-content">
            <span className="main-content-title mg-b-0 mg-b-lg-1">
              TABLEAU DE BORD
            </span>
          </div>
          <div className="justify-content-center mt-2">
            <Breadcrumb>
              <Breadcrumb.Item className=" tx-15" href="#!">
                Tableau de bord
              </Breadcrumb.Item>
              <Breadcrumb.Item active aria-current="page">
                Accueil
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        {/* <!-- /breadcrumb --> */}

        {/* <!-- row --> */}
        <Row>
          <Col xxl={5} xl={12} lg={12} md={12} sm={12}>
            <Row>
              <Col xl={12} lg={12} md={12} xs={12}>
                <Card>
                  <Card.Body>
                    <Row>
                      <Col xl={9} lg={7} md={6} sm={12}>
                        <div className="text-justified align-items-center">
                          <h3 className="text-dark font-weight-semibold mb-2 mt-0">
                            Bienvenu sur le tableau de bord
                            <span className="text-primary">{" Fikiri"}</span>
                          </h3>
                          <p className="text-dark tx-14 mb-3 lh-3">
                            Gérez la plateforme en toute simplicité
                          </p>
                          {/* <Button variant="" className="btn btn-primary shadow">
                          Upgrade Now
                        </Button> */}
                        </div>
                      </Col>
                      <Col
                        xl={3}
                        lg={5}
                        md={6}
                        sm={12}
                        className="d-flex align-items-center justify-content-center upgrade-chart-circle"
                      >
                        {/* <div className="chart-circle float-md-end mt-4 mt-md-0">
                        <ReactApexChart
                          options={Dashboarddata.Radialbar.options}
                          series={Dashboarddata.Radialbar.series}
                          type="radialBar"
                          height={180}
                        />
                        <div className="chart-circle-value circle-style">
                          <div className="tx-18 font-weight-semibold">85%</div>
                        </div>
                      </div> */}
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
              <Col xl={6} lg={12} md={12} xs={12}>
                <Card className=" sales-card">
                  <Row>
                    <div className="col-8">
                      <div className="ps-4 pt-4 pe-3 pb-4">
                        <div className="">
                          <h6 className="mb-2 tx-12 ">{"Utilisateurs"}</h6>
                        </div>
                        <div className="pb-0 mt-0">
                          <div className="d-flex">
                            <h4 className="tx-20 font-weight-semibold mb-2">
                              {isLoadingUsers === false
                                ? `${users.length}`
                                : "0"}
                            </h4>
                          </div>
                          {/* <p className="mb-0 tx-12 text-muted">
                          Last week
                          <i className="fa fa-caret-up mx-2 text-success"></i>
                          <span className="text-success font-weight-semibold">
                            +427
                          </span>
                        </p> */}
                        </div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="circle-icon bg-primary-transparent text-center align-self-center overflow-hidden">
                        {/* <i className="fe fe-shopping-bag tx-16 text-primary"></i> */}
                        <i className="bi bi-people-fill tx-16 text-primary"></i>
                      </div>
                    </div>
                  </Row>
                </Card>
              </Col>
              <Col xl={6} lg={12} md={12} xs={12}>
                <Card className="sales-card">
                  <Row>
                    <div className="col-8">
                      <div className="ps-4 pt-4 pe-3 pb-4">
                        <div className="">
                          <h6 className="mb-2 tx-12">{"Solutions soumises"}</h6>
                        </div>
                        <div className="pb-0 mt-0">
                          {" "}
                          <i class="bi bi-ban-fill text-secondary"></i>
                          <div className="d-flex">
                            <h4 className="tx-20 font-weight-semibold mb-2">
                              {isLoadingSolution === false
                                ? `${solutions.length}`
                                : "0"}
                            </h4>
                          </div>
                          {/* <p className="mb-0 tx-12 text-muted">
                          Last week
                          <i className="fa fa-caret-down mx-2 text-danger"></i>
                          <span className="font-weight-semibold text-danger">
                            -453
                          </span>
                        </p> */}
                        </div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="circle-icon bg-info-transparent text-center align-self-center overflow-hidden">
                        <i class="bi bi-card-heading tx-16 text-info"></i>
                      </div>
                    </div>
                  </Row>
                </Card>
              </Col>
              <Col xl={6} lg={12} md={12} xs={12}>
                <Card className=" sales-card">
                  <Row>
                    <div className="col-8">
                      <div className="ps-4 pt-4 pe-3 pb-4">
                        <div className="">
                          <h6 className="mb-2 tx-12">
                            {"Solutions non validées"}
                          </h6>
                        </div>
                        <div className="pb-0 mt-0">
                          <div className="d-flex">
                            <h4 className="tx-20 font-weight-semibold mb-2">
                              0
                            </h4>
                          </div>
                          {/* <p className="mb-0 tx-12 text-muted">
                          Last week
                          <i className="fa fa-caret-up mx-2 text-success"></i>
                          <span className=" text-success font-weight-semibold">
                            +788
                          </span>
                        </p> */}
                        </div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="circle-icon bg-secondary-transparent text-center align-self-center overflow-hidden">
                        <i class="bi bi-calendar-x text-secondary"></i>
                      </div>
                    </div>
                  </Row>
                </Card>
              </Col>
              <Col xl={6} lg={12} md={12} xs={12}>
                <Card className="sales-card">
                  <Row>
                    <div className="col-8">
                      <div className="ps-4 pt-4 pe-3 pb-4">
                        <div className="">
                          <h6 className="mb-2 tx-12">
                            {"Solutions Cartographiées"}
                          </h6>
                        </div>
                        <div className="pb-0 mt-0">
                          <div className="d-flex">
                            <h4 className="tx-22 font-weight-semibold mb-2">
                              0
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="circle-icon bg-warning-transparent text-center align-self-center overflow-hidden">
                        <i className="fe fe-credit-card tx-16 text-warning"></i>
                      </div>
                    </div>
                  </Row>
                </Card>
              </Col>
              <Col xl={12} lg={12} md={12} xs={12}>
                <Card>
                  <Card.Header className="pb-1">
                    <h3 className="card-title mb-2">Solutions récentes</h3>
                  </Card.Header>
                  <Card.Body className=" p-0">
                    {isLoadingSolution === false &&
                      solutions.slice(-5).map((solution) => (
                        <div
                          className="d-flex align-items-center item  border-bottom my-2"
                          key={solution.id}
                        >
                          <div className="d-flex">
                            <img
                              src={"../../../assets/img/svgicons/report.svg"}
                              alt="img"
                              className="ht-30 wd-30 me-2 ms-3"
                            />
                            <div className="">
                              <h6 className="">
                                {solution.name.length > 50
                                  ? `${solution.name.slice(0, "50")}...`
                                  : solution.name}
                              </h6>
                              <span className="text-muted tx-12">
                                {moment(solution.createdAt).format(
                                  "DD MMMM YYYY [à] HH:mm"
                                )}
                              </span>
                            </div>
                          </div>
                          <div className="ms-auto my-auto">
                            <div className="d-flex">
                              <span className="me-3 mt-1 font-weight-semibold tx-16">
                                {solution.targetedProblem.length > 15
                                  ? `${solution.targetedProblem.slice(
                                      0,
                                      "15"
                                    )}...`
                                  : solution.targetedProblem}
                              </span>
                              <span className="text-success fs-13 my-auto">
                                <i className="fe fe-trending-up text-success mx-2 my-auto"></i>
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col xxl={7} xl={12} lg={12} md={12} sm={12}>
            <Card className=" custom-card overflow-hidden">
              <Card.Header className=" border-bottom-0">
                <div>
                  <h3 className="card-title mb-2 ">Projets</h3>
                  <span className="d-block tx-12 mb-0 text-muted"></span>
                </div>
              </Card.Header>
              <Card.Body>
                {/* <div id="statistics1"> */}
                <Dashboarddata.Statistics1 />

                {/* </div> */}
              </Card.Body>
            </Card>
            <Row>
              <Col sm={12} lg={12} xl={6}>
                <Card className="card overflow-hidden">
                  <Card.Header className=" pb-1">
                    <h3 className="card-title mb-2">Utilisateurs récents</h3>
                  </Card.Header>
                  <Card.Body className="p-0 customers mt-1">
                    <div className="list-group list-lg-group list-group-flush">
                      {isLoadingUsers === false &&
                        users.slice(-4).map((user) => (
                          <Link href="" className="border-0" key={user.id}>
                            <div className="list-group-item list-group-item-action border-0">
                              <div className="media mt-0">
                                <img
                                  className="avatar-lg rounded-circle me-3 my-auto shadow"
                                  src={"../../../assets/img/faces/2.jpg"}
                                  alt=""
                                />
                                <div className="media-body">
                                  <div className="d-flex align-items-center">
                                    <div className="mt-0">
                                      <h5 className="mb-1 tx-13 font-weight-sembold text-dark">
                                        {user.name}
                                      </h5>
                                      <p className="mb-0 tx-12 text-muted">
                                        mail: {user.email}
                                      </p>
                                    </div>
                                    {/* <span className="ms-auto wd-45p tx-14">
                                      <span className="float-end badge badge-success-transparent">
                                        <span className="op-7 text-success font-weight-semibold">
                                          paid
                                        </span>
                                      </span>
                                    </span> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={12} lg={12} xl={6}>
                <Card className="card overflow-hidden">
                  <Card.Header className=" pb-1">
                    <h3 className="card-title mb-2">{"Thématiques"}</h3>
                  </Card.Header>
                  <Card.Body className="p-0 customers mt-1">
                    <div className="list-group list-lg-group list-group-flush">
                      {isLoadingThematique === false &&
                        thematique.map((thematiqueOcc) => (
                          <Link
                            href=""
                            className="border-0"
                            key={thematiqueOcc.id}
                          >
                            <div className="list-group-item list-group-item-action border-0">
                              <div className="media mt-0">
                                <img
                                  className="avatar-lg rounded-circle me-3 my-auto shadow"
                                  src={"../../../assets/img/faces/2.jpg"}
                                  alt=""
                                />
                                <div className="media-body">
                                  <div className="d-flex align-items-center">
                                    <div className="mt-0">
                                      <h5 className="mb-1 tx-13 font-weight-sembold text-dark">
                                        {thematiqueOcc.name}
                                      </h5>
                                      <p className="mb-0 tx-12 text-muted">
                                        ID: {thematiqueOcc.id}
                                      </p>
                                    </div>
                                    {/* <span className="ms-auto wd-45p tx-14">
                                      <span className="float-end badge badge-success-transparent">
                                        <span className="op-7 text-success font-weight-semibold">
                                          paid
                                        </span>
                                      </span>
                                    </span> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
          {/* <!-- </div> --> */}
        </Row>
        {/* <!-- row closed --> */}
      </React.Fragment>
    </>
  );
};

Dashboard.layout = "Contentlayout";

export default Dashboard;
