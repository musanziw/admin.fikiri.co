import React, { useCallback, useEffect, useState } from "react";

import { Card, Col, Breadcrumb, Row } from "react-bootstrap";

import Link from "next/link";
import ImageViewer from "react-simple-image-viewer";
import { images } from "../../../shared/data/pages/profile";
import Seo from "@/shared/layout-components/seo/seo";
import axios from "@/pages/api/axios";
import { useRouter } from "next/router";
import moment from "moment";

const detailCurateur = () => {

  const [profileInnovateur, setProfileInnovateur] = useState();
  const [domLoaded, setDomLoaded] = useState(false);
  const navigate = useRouter();
  const id = navigate.query.id;

  useEffect(() => {
    setDomLoaded(true);

    const fetchInnovateur = async () => {
      try {
        const profileResponse = await axios.get(`/users/${id}`);
        setProfileInnovateur(profileResponse.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchInnovateur();
  }, []);

  return (
    <div>
      <Seo title={"Détail Innovateur"} />

      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1">
            PROFILE INNOVATEUR
          </span>
        </div>

        <div className="justify-content-center mt-2">
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item tx-15" href="/components/apps/users">
              Accueil
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
        </Col>
      </Row>
    </div>
  );
};

detailCurateur.propTypes = {};

detailCurateur.defaultProps = {};

detailCurateur.layout = "Contentlayout";

export default detailCurateur;
