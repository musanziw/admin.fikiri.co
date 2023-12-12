import React, { useEffect, useState } from "react";

import Seo from "@/shared/layout-components/seo/seo";

import moment from "moment";

import { useRouter } from "next/router";

import axios from "@/pages/api/axios"

import { Breadcrumb, Col, Row, Card } from "react-bootstrap";

import * as Dashboarddata from "../../../shared/data/dashboards/dashboards1";


moment.locale("fr");

const Dashboard = () => {

  let navigate = useRouter();
  const [users, setUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);

  const [solutions, setSolution] = useState([]);
  const [isLoadingSolution, setIsLoadingSolution] = useState(false);


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


      fetchUsers();
      fetchSolutions();

    } else {
      navigate.push("/");
    }
  }, [navigate]);

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
                        </div>
                      </Col>
                      <Col
                        xl={3}
                        lg={5}
                        md={6}
                        sm={12}
                        className="d-flex align-items-center justify-content-center upgrade-chart-circle"
                      >
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
                        </div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="circle-icon bg-primary-transparent text-center align-self-center overflow-hidden">
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
                            {"Solutions Explorées"}
                          </h6>
                        </div>
                        <div className="pb-0 mt-0">
                          <div className="d-flex">
                            <h4 className="tx-20 font-weight-semibold mb-2">
                              0
                            </h4>
                          </div>
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
            </Row>
          </Col>
          <Col xxl={7} xl={12} lg={12} md={12} sm={12}>
            <Card className=" custom-card overflow-hidden">
              <Card.Header className=" border-bottom-0">
                <div>
                  <h3 className="card-title mb-2 ">Solutions</h3>
                  <span className="d-block tx-12 mb-0 text-muted"></span>
                </div>
              </Card.Header>
              <Card.Body>  
                <Dashboarddata.Statistics1 />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    </>
  );
};

Dashboard.layout = "Contentlayout";

export default Dashboard;