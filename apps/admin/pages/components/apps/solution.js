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

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";

import Link from "next/link";
import ImageViewer from "react-simple-image-viewer";
import { images } from "../../../shared/data/pages/profile";
import Seo from "@/shared/layout-components/seo/seo";
import { useRouter } from "next/router";
import axios from "@/pages/api/axios";
import moment from "moment";

const Solution = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const [profileInnovateur, setProfileInnovateur] = useState();
  const [solution, setSolution] = useState();
  const [thematique, setThematique] = useState();
  const [status, setStatus] = useState();

  const [domLoaded, setDomLoaded] = useState(false);
  const [parametreId, setParametreId] = useState(null);
  const [parametreUserId, setParametreUserId] = useState(null);
  const [parametreThematiqueId, setParametreThematiqueId] = useState(null);
  const navigate = useRouter();
  const id = navigate.query.id;
  const innovateurId = navigate.query.innovateurId;
  const thematiqueId = navigate.query.thematiqueId;

  const [options, setOptions] = useState();
  const [selectedOptions, setSelectedOptions] = useState();
  const [optionId, setOptionId] = useState([]);


  useEffect(() => {
    const status = JSON.parse(localStorage.getItem("STATUS_ACCOUNT"));

    if (status.authenticate) {
      setDomLoaded(true);
      setParametreId(id);
      setParametreUserId(innovateurId);
      setParametreThematiqueId(thematiqueId);

      const fetchInnovateur = async () => {
        try {
          const profileResponse = await axios.get(`/users/${innovateurId}`);
          setProfileInnovateur(profileResponse.data.data);
        } catch (error) {
          console.log(error);
        }
      };

      const fetchSolution = async () => {
        try {
          const solutionResponse = await axios.get(`/solutions/${id}`);
          setSolution(solutionResponse.data.data);
        } catch (error) {
          console.log(error);
        }
      };

      const fetchThematique = async () => {
        try {
          const thematiqueResponse = await axios.get(
            `/thematics/${thematiqueId}`
          );
          setThematique(thematiqueResponse.data.data);
        } catch (error) {
          console.log(error);
        }
      };

      const fetchStatus = async () => {
        let data;
        try {
          const statusResponse = await axios.get("/status");
          data = statusResponse.data.data;

          setOptions(
            data.map((option) => ({
              value: option.id,
              label: option.name,
            }))
          );
        } catch (error) {
          console.log(error);
        }
      };

      fetchInnovateur();
      fetchSolution();
      fetchThematique();
      fetchStatus();
    } else {
      navigate.push("/");
    }
  }, [
    navigate.query.id,
    navigate.query.innovateurId,
    navigate.query.thematiqueId,
  ]);

  const handleSelectChange = async (selectedOptions) => {
    setSelectedOptions(selectedOptions);
    setOptionId([...optionId, selectedOptions.value]);
  };

  return (
    <div>
      <Seo title={"Profile"} />

      {/* <!-- breadcrumb --> */}
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1">
            SOLUTION DETAIL
          </span>
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
              Detail solution
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
                  {profileInnovateur ? profileInnovateur.name : ""}
                </h4>
                <p className="tx-13 text-muted ms-md-4 ms-0 mb-2 pb-2 ">
                  <span className="me-3">
                    <i className="far fa-address-card me-2"></i>Innovateur
                  </span>
                  <span className="me-3">
                    <i class="bi bi-geo-alt-fill me-2"></i>
                    {profileInnovateur ? profileInnovateur.address : ""}
                  </span>
                  <span>
                    <i className="far fa-flag me-2"></i>RDC
                  </span>
                </p>
                <p className="text-muted ms-md-4 ms-0 mb-2">
                  <span>
                    <i className="fa fa-phone me-2"></i>
                  </span>
                  <span className="font-weight-semibold me-2">Phone:</span>
                  <span>
                    {profileInnovateur ? profileInnovateur.phoneNumber : ""}
                  </span>
                </p>
                <p className="text-muted ms-md-4 ms-0 mb-2">
                  <span>
                    <i className="fa fa-envelope me-2"></i>
                  </span>
                  <span className="font-weight-semibold me-2">Email:</span>
                  <span>
                    {profileInnovateur ? profileInnovateur.email : ""}
                  </span>
                </p>
                <p className="text-muted ms-md-4 ms-0 mb-2">
                  <span>
                    <i class="bi bi-calendar-check me-2"></i>
                  </span>
                  <span className="font-weight-semibold me-2">
                    {"Date d'inscription sur la plateforme:"}
                  </span>
                  <span>
                    {profileInnovateur
                      ? moment(profileInnovateur.createdAt).format(
                          "DD MMMM YYYY [à] HH:mm"
                        )
                      : ""}
                  </span>
                </p>
              </div>
            </Card.Body>
          </Card>

          <span className=" py-0 ">
            <div className="profile-tab tab-menu-heading border-bottom-0 ">
              <Tab.Container id="left-tabs-example" defaultActiveKey="About">
                <Nav
                  variant="pills"
                  className="nav profile-tabs main-nav-line tabs-menu profile-nav-line bg-white mb-4 border-0 br-5 mb-0	"
                >
                  <Nav.Item className="me-1">
                    <Nav.Link className=" mb-2 mt-2" eventKey="About">
                      Detail sur la Solution
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="me-1">
                    <Nav.Link className="mb-2 mt-2" eventKey="EditProfile">
                      Status de la Solution
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="me-1">
                    <Nav.Link className="mb-2 mt-2" eventKey="Timeline">
                      Feed-Back
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
                            <Card className="">
                              <Card.Body className="border-0 p-10 rounded-10">
                                <div className="p-4">
                                  <h4 className="text-primary tx-17 text-uppercase mb-3">
                                    <b className="text-primary m-b-5 tx-17 text-uppercase">
                                      Description
                                    </b>
                                  </h4>
                                  <p className="m-b-5 text-justify tx-15 p-10">
                                    {solution ? solution.description : ""}
                                  </p>
                                  <div className="m-t-30">
                                    <div className=" p-t-10">
                                      <h5 className="text-primary m-b-5 tx-17 text-uppercase">
                                        Thématique
                                      </h5>
                                      <p className="">
                                        {thematique ? thematique.name : ""}
                                      </p>
                                      <h5 className="text-primary m-b-5 tx-17 text-uppercase">
                                        ODD concerné
                                      </h5>
                                      <p className="">
                                        {thematique ? thematique.odds : ""}
                                      </p>
                                      <p className="text-primary m-b-5 tx-17 text-uppercase">
                                        <b className="text-primary m-b-5 tx-17 text-uppercase">
                                          En quoi est-ce que cette solution /
                                          initiative locale est innovante ?
                                        </b>
                                      </p>
                                      <p className=" tx-15 m-b-0">
                                        {solution
                                          ? solution.targetedProblem
                                          : ""}
                                      </p>
                                    </div>
                                    <div className="">
                                      <h5 className="text-primary m-b-5 tx-17 text-uppercase">
                                        Challenges
                                      </h5>
                                      <p className="">
                                        {thematique &&
                                          thematique.challenges.map(
                                            (challenge) => (
                                              <p key={challenge.id}>
                                                → {challenge.name}
                                              </p>
                                            )
                                          )}
                                      </p>
                                    </div>
                                    <div className="">
                                      <h5 className="text-primary m-b-5 tx-17 text-uppercase">
                                        Lien
                                      </h5>
                                      <p className="">
                                        {solution && solution.lien
                                          ? `lien youtube : ${solution.videoLink}`
                                          : "pas de lien youtube"}
                                      </p>
                                    </div>

                                    <div className="">
                                      <h5 className="text-primary m-b-5 tx-17 text-uppercase">
                                        Date de soumission :
                                      </h5>
                                      <p className="">
                                        {solution
                                          ? moment(solution.createdAt).format(
                                              "DD MMMM YYYY [à] HH:mm"
                                            )
                                          : ""}
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
                            <Card style={{height: "300px"}}>
                              <Card.Body className=" border-0">
                                <div className="mb-4 main-content-label">
                                  Solution
                                </div>
                                <Row className="row">
                                  <Col md={3}>Status de la Solution</Col>
                                  <Col md={9}>
                                    <Select
                                      options={options}
                                      onChange={handleSelectChange}
                                    />
                                  </Col>
                                </Row>
                              </Card.Body>
                            </Card>
                          </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="Timeline">
                          {/* <div
                            className="main-content-body  tab-pane border-top-0"
                            id="timeline"
                          >
                            <div className="border-0">
                              <div className="main-content-body main-content-body-profile">
                                <div className="main-profile-body p-0">
                                  <Row className=" row-sm">
                                    <div className="col-12">
                                      <Card className=" mg-b-20 border">
                                        <Card.Header className=" p-4">
                                          <div className="media">
                                            <div className="media-user me-2">
                                              <div className="main-img-user avatar-md">
                                                <img
                                                  alt=""
                                                  className="rounded-circle"
                                                  src={
                                                    "../../../assets/img/faces/6.jpg"
                                                  }
                                                />
                                              </div>
                                            </div>
                                            <div className="media-body">
                                              <h6 className="mb-0 mg-t-2 ms-2">
                                                Mintrona Pechon Pechon
                                              </h6>
                                              <span className="text-primary ms-2">
                                                just now
                                              </span>
                                            </div>
                                            <div className="ms-auto">
                                              <Dropdown className=" show main-contact-star">
                                                <Dropdown.Toggle
                                                  variant=""
                                                  className="new option-dots2"
                                                  data-bs-toggle="dropdown"
                                                >
                                                  <i className="fe fe-more-vertical  tx-18"></i>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu className="dropdown-menu shadow">
                                                  {" "}
                                                  <Dropdown.Item
                                                    className="dropdown-item"
                                                    href="#!"
                                                  >
                                                    Edit Post
                                                  </Dropdown.Item>{" "}
                                                  <Dropdown.Item
                                                    className="dropdown-item"
                                                    href="#!"
                                                  >
                                                    Delete Post
                                                  </Dropdown.Item>{" "}
                                                  <Dropdown.Item
                                                    className="dropdown-item"
                                                    href="#!"
                                                  >
                                                    Personal Settings
                                                  </Dropdown.Item>{" "}
                                                </Dropdown.Menu>
                                              </Dropdown>
                                            </div>
                                          </div>
                                        </Card.Header>
                                        <div className="card-body">
                                          <p className="mg-t-0">
                                            There are many variations of
                                            passages of Lorem Ipsum available,
                                            but the majority have suffered
                                            alteration in some form, by injected
                                            humour, or randomised words which{" "}
                                            {`don't`} look even slightly
                                            believable.
                                          </p>
                                          <Row className=" row-sm">
                                            <div className="col">
                                              <Link
                                                href={`/components/pages/gallery/`}
                                              >
                                                <img
                                                  alt="img"
                                                  className="wd-200 br-5 mb-2 mt-2 me-4"
                                                  src={
                                                    "../../../assets/img/media/1.jpg"
                                                  }
                                                />
                                              </Link>
                                              <Link
                                                href={`/components/pages/gallery/`}
                                              >
                                                <img
                                                  alt="img"
                                                  className="wd-200 br-5"
                                                  src={
                                                    "../../../assets/img/media/2.jpg"
                                                  }
                                                />
                                              </Link>
                                            </div>
                                          </Row>
                                          <div className="media mg-t-15 profile-footer">
                                            <div className="media-user me-2">
                                              <div className="demo-avatar-group">
                                                <div className="demo-avatar-group main-avatar-list-stacked">
                                                  <div className="main-img-user">
                                                    <img
                                                      alt=""
                                                      className="rounded-circle"
                                                      src={
                                                        "../../../assets/img/faces/12.jpg"
                                                      }
                                                    />
                                                  </div>
                                                  <div className="main-img-user">
                                                    <img
                                                      alt=""
                                                      className="rounded-circle"
                                                      src={
                                                        "../../../assets/img/faces/12.jpg"
                                                      }
                                                    />
                                                  </div>
                                                  <div className="main-img-user online">
                                                    <img
                                                      alt=""
                                                      className="rounded-circle"
                                                      src={
                                                        "../../../assets/img/faces/5.jpg"
                                                      }
                                                    />
                                                  </div>
                                                  <div className="main-img-user">
                                                    <img
                                                      alt=""
                                                      className="rounded-circle"
                                                      src={
                                                        "../../../assets/img/faces/6.jpg"
                                                      }
                                                    />
                                                  </div>
                                                  <div className="main-avatar">
                                                    {" "}
                                                    +23{" "}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="media-body">
                                              <h6 className="mb-0 mg-t-10">
                                                28 people like your photo
                                              </h6>
                                            </div>
                                          </div>
                                        </div>
                                      </Card>
                                      <Card className=" mg-b-20 border">
                                        <Card.Header className=" p-4">
                                          <div className="media">
                                            <div className="media-user me-2">
                                              <div className="main-img-user avatar-md">
                                                <img
                                                  alt=""
                                                  className="rounded-circle"
                                                  src={
                                                    "../../../assets/img/faces/6.jpg"
                                                  }
                                                />
                                              </div>
                                            </div>
                                            <div className="media-body">
                                              <h6 className="mb-0 ms-2 mg-t-3">
                                                Mintrona Pechon Pechon
                                              </h6>
                                              <span className="text-muted ms-2">
                                                Sep 26 2019, 10:14am
                                              </span>
                                            </div>
                                            <div className="ms-auto">
                                              <Dropdown className=" show main-contact-star">
                                                <Dropdown.Toggle
                                                  variant=""
                                                  className="new option-dots2"
                                                  data-bs-toggle="dropdown"
                                                >
                                                  <i className="fe fe-more-vertical  tx-18"></i>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu className="dropdown-menu shadow">
                                                  {" "}
                                                  <Dropdown.Item
                                                    className="dropdown-item"
                                                    href="#!"
                                                  >
                                                    Edit Post
                                                  </Dropdown.Item>{" "}
                                                  <Dropdown.Item
                                                    className="dropdown-item"
                                                    href="#!"
                                                  >
                                                    Delete Post
                                                  </Dropdown.Item>{" "}
                                                  <Dropdown.Item
                                                    className="dropdown-item"
                                                    href="#!"
                                                  >
                                                    Personal Settings
                                                  </Dropdown.Item>{" "}
                                                </Dropdown.Menu>
                                              </Dropdown>
                                            </div>
                                          </div>
                                        </Card.Header>
                                        <Card.Body className=" h-100">
                                          <p className="mg-t-0">
                                            There are many variations of
                                            passages of Lorem Ipsum available,
                                            but the majority have suffered
                                            alteration in some form, by injected
                                            humour, or randomised words which{" "}
                                            {`don't`} look even slightly
                                            believable.
                                          </p>
                                          <Row className=" row-sm">
                                            <div className="col">
                                              <Link
                                                href={`/components/pages/gallery/`}
                                              >
                                                <img
                                                  alt="img"
                                                  className="wd-200 br-5 mb-2 mt-2 me-4"
                                                  src={
                                                    "../../../assets/img/media/4.jpg"
                                                  }
                                                />
                                              </Link>
                                              <Link
                                                href={`/components/pages/gallery/`}
                                              >
                                                <img
                                                  alt="img"
                                                  className="wd-200 br-5 mb-2 mt-2"
                                                  src={
                                                    "../../../assets/img/media/1.jpg"
                                                  }
                                                />
                                              </Link>
                                            </div>
                                          </Row>
                                          <div className="media mg-t-15 profile-footer">
                                            <div className="media-user me-2">
                                              <div className="demo-avatar-group">
                                                <div className="demo-avatar-group main-avatar-list-stacked">
                                                  <div className="main-img-user">
                                                    <img
                                                      alt=""
                                                      className="rounded-circle"
                                                      src={
                                                        "../../../assets/img/faces/12.jpg"
                                                      }
                                                    />
                                                  </div>
                                                  <div className="main-img-user online">
                                                    <img
                                                      alt=""
                                                      className="rounded-circle"
                                                      src={
                                                        "../../../assets/img/faces/7.jpg"
                                                      }
                                                    />
                                                  </div>
                                                  <div className="main-img-user online">
                                                    <img
                                                      alt=""
                                                      className="rounded-circle"
                                                      src={
                                                        "../../../assets/img/faces/5.jpg"
                                                      }
                                                    />
                                                  </div>
                                                  <div className="main-img-user">
                                                    <img
                                                      alt=""
                                                      className="rounded-circle"
                                                      src={
                                                        "../../../assets/img/faces/6.jpg"
                                                      }
                                                    />
                                                  </div>
                                                  <div className="main-avatar">
                                                    {" "}
                                                    +23{" "}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="media-body">
                                              <h6 className="mb-0 mg-t-10">
                                                28 people like your photo
                                              </h6>
                                            </div>
                                          </div>
                                        </Card.Body>
                                      </Card>
                                      <Card className=" mg-b-20 border">
                                        <Card.Header className=" p-4">
                                          <div className="media">
                                            <div className="media-user me-2">
                                              <div className="main-img-user avatar-md">
                                                <img
                                                  alt=""
                                                  className="rounded-circle"
                                                  src={
                                                    "../../../assets/img/faces/6.jpg"
                                                  }
                                                />
                                              </div>
                                            </div>
                                            <div className="media-body">
                                              <h6 className="mb-0 ms-2 mg-t-3">
                                                Mintrona Pechon Pechon
                                              </h6>
                                              <span className="text-muted ms-2">
                                                Sep 26 2019, 10:14am
                                              </span>
                                            </div>
                                            <div className="ms-auto">
                                              <Dropdown className=" show main-contact-star">
                                                <Dropdown.Toggle
                                                  variant=""
                                                  className="new option-dots2"
                                                  data-bs-toggle="dropdown"
                                                >
                                                  <i className="fe fe-more-vertical  tx-18"></i>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu className="dropdown-menu shadow">
                                                  {" "}
                                                  <Dropdown.Item
                                                    className="dropdown-item"
                                                    href="#!"
                                                  >
                                                    Edit Post
                                                  </Dropdown.Item>{" "}
                                                  <Dropdown.Item
                                                    className="dropdown-item"
                                                    href="#!"
                                                  >
                                                    Delete Post
                                                  </Dropdown.Item>{" "}
                                                  <Dropdown.Item
                                                    className="dropdown-item"
                                                    href="#!"
                                                  >
                                                    Personal Settings
                                                  </Dropdown.Item>{" "}
                                                </Dropdown.Menu>
                                              </Dropdown>
                                            </div>
                                          </div>
                                        </Card.Header>
                                        <Card.Body className=" h-100">
                                          <p className="mg-t-0">
                                            There are many variations of
                                            passages of Lorem Ipsum available,
                                            but the majority have suffered
                                            alteration in some form, by injected
                                            humour, or randomised words which{" "}
                                            {`don't`} look even slightly
                                            believable.
                                          </p>
                                          <div className="media mg-t-15 profile-footer">
                                            <div className="media-user me-2">
                                              <div className="demo-avatar-group">
                                                <div className="demo-avatar-group main-avatar-list-stacked">
                                                  <div className="main-img-user online">
                                                    <img
                                                      alt=""
                                                      className="rounded-circle"
                                                      src={
                                                        "../../../assets/img/faces/12.jpg"
                                                      }
                                                    />
                                                  </div>
                                                  <div className="main-img-user">
                                                    <img
                                                      alt=""
                                                      className="rounded-circle"
                                                      src={
                                                        "../../../assets/img/faces/3.jpg"
                                                      }
                                                    />
                                                  </div>
                                                  <div className="main-img-user">
                                                    <img
                                                      alt=""
                                                      className="rounded-circle"
                                                      src={
                                                        "../../../assets/img/faces/4.jpg"
                                                      }
                                                    />
                                                  </div>
                                                  <div className="main-img-user online">
                                                    <img
                                                      alt=""
                                                      className="rounded-circle"
                                                      src={
                                                        "../../../assets/img/faces/10.jpg"
                                                      }
                                                    />
                                                  </div>
                                                  <div className="main-avatar">
                                                    {" "}
                                                    +23{" "}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="media-body">
                                              <h6 className="mb-0 mg-t-10">
                                                28 people like your photo
                                              </h6>
                                            </div>
                                          </div>
                                        </Card.Body>
                                      </Card>
                                      <Card className=" border">
                                        <Card.Header className=" p-4">
                                          <div className="media">
                                            <div className="media-user me-2">
                                              <div className="main-img-user avatar-md">
                                                <img
                                                  alt=""
                                                  className="rounded-circle"
                                                  src={
                                                    "../../../assets/img/faces/2.jpg"
                                                  }
                                                />
                                              </div>
                                            </div>
                                            <div className="media-body">
                                              <h6 className="mb-0 ms-2 mg-t-3">
                                                Mintrona Pechon Pechon
                                              </h6>
                                              <span className="text-muted ms-2">
                                                Sep 26 2019, 10:14am
                                              </span>
                                            </div>
                                            <div className="ms-auto">
                                              <Dropdown className=" show main-contact-star">
                                                <Dropdown.Toggle
                                                  variant=""
                                                  className="new option-dots2"
                                                  data-bs-toggle="dropdown"
                                                >
                                                  <i className="fe fe-more-vertical  tx-18"></i>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu className="dropdown-menu shadow">
                                                  {" "}
                                                  <Dropdown.Item
                                                    className="dropdown-item"
                                                    href="#!"
                                                  >
                                                    Edit Post
                                                  </Dropdown.Item>{" "}
                                                  <Dropdown.Item
                                                    className="dropdown-item"
                                                    href="#!"
                                                  >
                                                    Delete Post
                                                  </Dropdown.Item>{" "}
                                                  <Dropdown.Item
                                                    className="dropdown-item"
                                                    href="#!"
                                                  >
                                                    Personal Settings
                                                  </Dropdown.Item>{" "}
                                                </Dropdown.Menu>
                                              </Dropdown>
                                            </div>
                                          </div>
                                        </Card.Header>
                                        <Card.Body className=" h-100">
                                          <p className="mg-t-0">
                                            There are many variations of
                                            passages of Lorem Ipsum available,
                                            but the majority have suffered
                                            alteration in some form, by injected
                                            humour, or randomised words which{" "}
                                            {`don't`} look even slightly
                                            believable.
                                          </p>
                                          <Row className=" row-sm">
                                            <div className="col">
                                              <Link
                                                href={`/components/pages/gallery/`}
                                              >
                                                <img
                                                  alt="img"
                                                  className="wd-200 br-5 mb-2 mt-2 me-3"
                                                  src={
                                                    "../../../assets/img/media/4.jpg"
                                                  }
                                                />
                                              </Link>
                                              <Link
                                                href={`/components/pages/gallery/`}
                                              >
                                                <img
                                                  alt="img"
                                                  className="wd-200 br-5 mb-2 mt-2"
                                                  src={
                                                    "../../../assets/img/media/3.jpg"
                                                  }
                                                />
                                              </Link>
                                            </div>
                                          </Row>
                                          <div className="media mg-t-15 profile-footer">
                                            <div className="media-user me-2">
                                              <div className="demo-avatar-group">
                                                <div className="demo-avatar-group main-avatar-list-stacked">
                                                  <div className="main-img-user online">
                                                    <img
                                                      alt=""
                                                      className="rounded-circle"
                                                      src={
                                                        "../../../assets/img/faces/11.jpg"
                                                      }
                                                    />
                                                  </div>
                                                  <div className="main-img-user">
                                                    <img
                                                      alt=""
                                                      className="rounded-circle"
                                                      src={
                                                        "../../../assets/img/faces/12.jpg"
                                                      }
                                                    />
                                                  </div>
                                                  <div className="main-img-user">
                                                    <img
                                                      alt=""
                                                      className="rounded-circle"
                                                      src={
                                                        "../../../assets/img/faces/3.jpg"
                                                      }
                                                    />
                                                  </div>
                                                  <div className="main-img-user online">
                                                    <img
                                                      alt=""
                                                      className="rounded-circle"
                                                      src={
                                                        "../../../assets/img/faces/5.jpg"
                                                      }
                                                    />
                                                  </div>
                                                  <div className="main-avatar">
                                                    {" "}
                                                    +23{" "}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="media-body">
                                              <h6 className="mb-0 mg-t-10">
                                                28 people like your photo
                                              </h6>
                                            </div>
                                          </div>
                                        </Card.Body>
                                      </Card>
                                    </div>
                                  </Row>
                                </div>
                              </div>
                            </div>
                          </div> */}
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

Solution.propTypes = {};

Solution.defaultProps = {};

Solution.layout = "Contentlayout";

export default Solution;
