import React from 'react';
import { Button, Row, Col, Card, Form, FormGroup, Modal,Breadcrumb, } from "react-bootstrap";
import Link from "next/link";
import dynamic from 'next/dynamic';
import Seo from '@/shared/layout-components/seo/seo';
const Userlistcom = dynamic(() => import('@/shared/data/advancedui/userlistcom'), { ssr: false })

const Userlist = () => {
	const [show, setShow] = React.useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<div>
			<Seo title={"Liste d'innovateur"} />

			{/* <!-- breadcrumb --> */}
      <div className="breadcrumb-header justify-content-between">
          <div className="left-content">
            <span className="main-content-title mg-b-0 mg-b-lg-1">
              LISTE DES INNOVATEURS
            </span>
          </div>
          <div className="justify-content-center mt-2">
            <Breadcrumb>
              <Breadcrumb.Item className=" tx-15" href="#!">
                Innovateurs
              </Breadcrumb.Item>
              <Breadcrumb.Item active aria-current="page">
                Liste
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
			<Userlistcom />
		</div>
	);
}

Userlist.propTypes = {};

Userlist.defaultProps = {};

Userlist.layout = "Contentlayout"

export default Userlist;
