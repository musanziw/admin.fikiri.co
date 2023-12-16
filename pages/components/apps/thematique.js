import React from 'react';
import { Button, Row, Col, Card, Form, FormGroup, Modal } from "react-bootstrap";
import Link from "next/link";
import dynamic from 'next/dynamic';
import Seo from '@/shared/layout-components/seo/seo';
const Thematiquecom = dynamic(() => import('@/shared/data/advancedui/thematiquecom'), { ssr: false })

const Thematique = () => {
	const [show, setShow] = React.useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<div>
			<Seo title={"Curator List"} />
			<div className="breadcrumb-header justify-content-between">
				<div className="left-content mt-2">
					<Link className="btn ripple btn-primary" href="#!" onClick={handleShow}><i className="fe fe-plus me-2"></i>Nouvelle thématique</Link>

					<Modal show={show} onHide={handleClose}>
						<Modal.Header className="modal-header">
							<h6 className="modal-title">Ajouter Thématique</h6>
							<Button variant="" className="btn-close" type="button" onClick={handleClose}>
								<span aria-hidden="true">×</span></Button>
						</Modal.Header>

						<Modal.Body className="modal-body"> <div className="p-4">
							<Form className="form-horizontal">
								<FormGroup className="form-group">
									<Form.Control type="text" className="form-control" id="inputName" placeholder="Nom" />
								</FormGroup>
								<FormGroup className="form-group">
									<Form.Control type="text" className="form-control" id="inputName1" placeholder="odds" />
								</FormGroup>
                <FormGroup className="form-group">
									<Form.Control type="text" className="form-control" id="inputName1" placeholder="challengs" />
								</FormGroup>
								<FormGroup className="form-group">
									<Form.Control type="email" className="form-control" id="inputEmail3" placeholder="Email" />
								</FormGroup>
								<FormGroup className="form-group mb-0 justify-content-end">
									<div className="checkbox">
										<div className="custom-checkbox custom-control">
											<input type="checkbox" data-checkboxes="mygroup" className="custom-control-input" id="checkbox-2" />
											<label htmlFor="checkbox-2" className="custom-control-label mt-1 text-dark">Nouvelle theématique ?</label>
										</div>
									</div>
								</FormGroup>
							</Form>
						</div>
						</Modal.Body>
						<Modal.Footer>
							<Button variant="" className="btn ripple btn-primary" type="button">
								Ajouter
							</Button>
							<Button variant="" className="btn ripple btn-secondary" onClick={handleClose}>
								Fermer
							</Button>
						</Modal.Footer>
					</Modal>
				</div>
			</div>
			{/* <!-- /breadcrumb --> */}
			<Thematiquecom />

		</div>
	);
}

Thematique.propTypes = {};

Thematique.defaultProps = {};

Thematique.layout = "Contentlayout"

export default Thematique;
