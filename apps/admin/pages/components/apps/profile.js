import React, { useCallback, useEffect, useState } from "react";

import {
  Card,
  Col,
  Dropdown,
  Breadcrumb,
  Nav,
  Row,
  Tab,
  FormGroup,
  Form,
} from "react-bootstrap";

import Link from "next/link";
import ImageViewer from "react-simple-image-viewer";
import { images } from "../../../shared/data/pages/profile";
import Seo from "@/shared/layout-components/seo/seo";
import axios from "@/pages/api/axios";
import { useRouter } from "next/router";

const Profile = () => {
  
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [account, setAccount] = useState();
  const [profile, setProfile] = useState();

  let navigate = useRouter();
  const parametreEmail = navigate.query.email;

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    const status = JSON.parse(localStorage.getItem("STATUS_ACCOUNT"));

    if (status.authenticate) {
      setDomLoaded(true);

      const fecthProfile = async () => {
        try {
          const profileResponse = await axios.get(
            `/auth/profile/${parametreEmail}`
          );
          setProfile(profileResponse.data.data);
        } catch (error) {
          console.log(error);
        }
      };
      fecthProfile();
    } else {
      navigate.push("/");
    }
  }, []);


  return (
    <div>
      <Seo title={"Profile"} />

      {/* <!-- breadcrumb --> */}
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1">PROFILE</span>
        </div>
        <div className="justify-content-center mt-2">
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item tx-15" href="#!">
              Pages
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item "
              active
              aria-current="page"
            >
              Profile
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      {/* <!-- /breadcrumb --> */}

      <Row>
        <Col lg={12} md={12}>
          <Card className="custom-card customs-cards">
            <Card.Body className=" d-md-flex bg-white">
              <div className="">
                <span className="profile-image pos-relative">
                  <img
                    className="br-5"
                    alt=""
                    src={"../../../assets/img/faces/profile.jpg"}
                  />
                  <span className="bg-success text-white wd-1 ht-1 rounded-pill profile-online"></span>
                </span>
              </div>
              <div className="my-md-auto mt-4 prof-details">
                <h4 className="font-weight-semibold ms-md-4 ms-0 mb-1 pb-0">
                  {profile ? profile.name : ""}
                </h4>
                <p className="tx-13 text-muted ms-md-4 ms-0 mb-2 pb-2 ">
                  {/* <span className="me-3">
                  <i className="far fa-address-card me-2"></i>Ui/Ux Developer
                </span>
                <span className="me-3">
                  <i className="fa fa-taxi me-2"></i>West fransisco,Alabama
                </span>
                <span>
                  <i className="far fa-flag me-2"></i>New Jersey
                </span> */}
                </p>
                <p className="text-muted ms-md-4 ms-0 mb-2">
                  <span>
                    <i className="fa fa-phone me-2"></i>
                  </span>
                  <span className="font-weight-semibold me-2">Phone:</span>
                  <span>{profile ? profile.phoneNumber : ""}</span>
                </p>
                <p className="text-muted ms-md-4 ms-0 mb-2">
                  <span>
                    <i className="fa fa-envelope me-2"></i>
                  </span>
                  <span className="font-weight-semibold me-2">Email:</span>
                  <span>{profile ? profile.email : ""}</span>
                </p>
              </div>
            </Card.Body>
          </Card>
          {/* <SSRProvider> */}
          <span className=" py-0 ">
            <div className="profile-tab tab-menu-heading border-bottom-0 ">
              <Tab.Container id="left-tabs-example" defaultActiveKey="About">
                <Nav
                  variant="pills"
                  className="nav profile-tabs main-nav-line tabs-menu profile-nav-line bg-white mb-4 border-0 br-5 mb-0	"
                >
                  <Nav.Item className="me-1">
                    <Nav.Link className=" mb-2 mt-2" eventKey="About">
                      Mes informations
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="me-1">
                    <Nav.Link className="mb-2 mt-2" eventKey="EditProfile">
                      Editer Mon profile
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
                <Row className=" row-sm ">
                  <Col lg={12} md={12}>
                    <div className="custom-card main-content-body-profile">
                      <Tab.Content>
                        <Tab.Pane eventKey="About">
                          <div
                            className="main-content-body tab-pane  active"
                            id="about"
                          >
                            <Card>
                              <Card.Body className="border-0 p-0 rounded-10">
                                <div className="p-4">
                                  <h4 className="tx-14 text-uppercase mb-3">
                                    Nom
                                  </h4>
                                  <p className="m-b-5 tx-15">
                                    {profile ? profile.name : ""}
                                  </p>
                                  <div className="m-t-30">
                                    <div className=" p-t-10">
                                      <h5 className="text-primary m-b-5 tx-14">
                                        Adresse e-mail
                                      </h5>
                                      <p className="">
                                        {profile ? profile.email : ""}
                                      </p>
                                    </div>

                                    <div className="">
                                      <h5 className="text-primary m-b-5 tx-14">
                                        Numéro téléphone
                                      </h5>
                                      <p className="">
                                        {profile ? profile.phoneNumber : ""}
                                      </p>
                                    </div>

                                    <div className="">
                                      <h5 className="text-primary m-b-5 tx-14">
                                        Adresse physique
                                      </h5>
                                      <p className="">
                                        {profile ? profile.address : ""}
                                      </p>
                                    </div>

                                    <div className="">
                                      <h5 className="text-primary m-b-5 tx-14">
                                        Role
                                      </h5>
                                      <p className="">
                                        {profile ? profile.roles[0].name : ""}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </Card.Body>
                            </Card>
                          </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="EditProfile">
                          <div
                            className="main-content-body tab-pane border-top-0"
                            id="edit"
                          >
                            <Card>
                              <Card.Body className=" border-0">
                                <div className="mb-4 main-content-label">
                                  Informations personnelles
                                </div>
                                <Form className="form-horizontal">
                                  <div className="mb-4 main-content-label">
                                    Nom
                                  </div>
                                  <FormGroup className="form-group ">
                                    <Row className=" row-sm">
                                      <Col md={3}>
                                        <Form.Label className="form-label">
                                          Nom
                                        </Form.Label>
                                      </Col>
                                      <Col md={9}>
                                        <Form.Control
                                          type="text"
                                          className="form-control"
                                          placeholder="Nouveau nom"
                                          defaultValue={
                                            profile ? profile.name : ""
                                          }
                                        />
                                      </Col>
                                    </Row>
                                  </FormGroup>
                                  <FormGroup className="form-group ">
                                    <Row className=" row-sm">
                                      <Col md={3}>
                                        <Form.Label className="form-label">
                                          Adresse physique
                                        </Form.Label>
                                      </Col>
                                      <Col md={9}>
                                        <Form.Control
                                          type="text"
                                          className="form-control"
                                          placeholder="Nouveau nom"
                                          defaultValue={
                                            profile ? profile.address : ""
                                          }
                                        />
                                      </Col>
                                    </Row>
                                  </FormGroup>
                                  <FormGroup className="form-group ">
                                    <Row className=" row-sm">
                                      <Col md={3}>
                                        <Form.Label className="form-label">
                                          Numéro Tel
                                        </Form.Label>
                                      </Col>
                                      <Col md={9}>
                                        <Form.Control
                                          type="text"
                                          className="form-control"
                                          placeholder="Nouveau nom"
                                          defaultValue={
                                            profile ? profile.phoneNumber : ""
                                          }
                                        />
                                      </Col>
                                    </Row>
                                  </FormGroup>
                                </Form>
                              </Card.Body>
                            </Card>
                          </div>
                        </Tab.Pane>
                      </Tab.Content>
                    </div>
                  </Col>
                </Row>
              </Tab.Container>
            </div>
          </span>
          {/* </SSRProvider> */}
        </Col>
      </Row>

      {/* <!-- Row --> */}
      <Row className=" row-sm">
        <Col lg={12} md={12}>
          <div className="tab-content"></div>
          {/* </div> */}
        </Col>
      </Row>
      {/* <!-- row closed --> */}
    </div>
  );
};

Profile.propTypes = {};

Profile.defaultProps = {};

Profile.layout = "Contentlayout";

export default Profile;
