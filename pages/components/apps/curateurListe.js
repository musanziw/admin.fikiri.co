import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Modal } from "react-bootstrap";
import Link from "next/link";
import dynamic from "next/dynamic";
import Seo from "@/shared/layout-components/seo/seo";
const CurratorList = dynamic(
  () => import("@/shared/data/advancedui/curratorListCom"),
  { ssr: false }
);

import axios from "@/pages/api/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { set } from "immutable";
import { setOptions } from "filepond";
import Select from "react-select";

const CurrateurList = () => {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState();
  const [email, setEmail] = useState();

  const [options, setOptions] = useState();
  const [selectedOptions, setSelectedOptions] = useState();
  const [optionId, setOptionId] = useState([]);
  const [isLoadingCreating, setIsLoadingCreating] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {

    if(JSON.parse(localStorage.getItem("ACCESS_ACCOUNT")).roles[0].name === "ADMIN"){
        setIsAdmin(true);
    }
    const fetchRole = async () => {
      let data;
      try {
        const roleResponse = await axios.get("/roles");
        data = roleResponse.data.data;
        setOptions(
          data.map((option) => ({
            value: option.id,
            label: option.name,
          }))
        );
      } catch (e) {
        console.log(e);
      }
    };
    fetchRole();
  }, []);

  const handleSelectChange = async (selectedOptions) => {
    setSelectedOptions(selectedOptions);
    setOptionId([...optionId, selectedOptions.value]);
  };
  const hanleCreateCurrateur = async (e) => {
    e.preventDefault();
    try {
      setIsLoadingCreating(true);
      const payload = {
        name,
        email,
        roles: optionId,
      };

      await axios.post("/users", JSON.stringify(payload));
      toast.success("Curateur créé avec succès !");
      setIsLoadingCreating(false)
    } catch (e) {
      toast.error(e.response.data.message)
      setIsLoadingCreating(false);
    }finally{
      setIsLoadingCreating(false);
    }
  };

  return (
    <div>
      <Seo title={"Curator List"} />
      <div className="breadcrumb-header justify-content-between">
        {
          isAdmin ? (<div className="left-content mt-2">
            <Link
                className="btn ripple btn-primary"
                href="#!"
                onClick={handleShow}
            >
              <i className="fe fe-plus me-2"></i>{"Nouveau Curateur"}
            </Link>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header className="modal-header">
                <h6 className="modal-title">{"Ajouter Curateur"}</h6>
                <Button
                    variant=""
                    className="btn-close"
                    type="button"
                    onClick={handleClose}
                >
                  <span aria-hidden="true">×</span>
                </Button>
              </Modal.Header>

              <Modal.Body className="modal-body">
                <div className="p-4">
                  <Form className="form-horizontal">
                    <FormGroup className="form-group">
                      <Form.Control
                          type="text"
                          className="form-control"
                          id="inputName"
                          placeholder="Nom"
                          onChange={(e) => setName(e.target.value)}
                      />
                    </FormGroup>
                    <FormGroup className="form-group">
                      <Form.Control
                          type="email"
                          className="form-control"
                          id="inputEmail3"
                          placeholder="Email"
                          onChange={(e) => setEmail(e.target.value)}
                          required
                      />
                    </FormGroup>
                    <FormGroup className="form-group">
                      <Select options={options} onChange={handleSelectChange} />
                    </FormGroup>
                    <FormGroup className="form-group mb-0 justify-content-end">
                      <div className="checkbox">
                        <div className="custom-checkbox custom-control">
                          <input
                              type="checkbox"
                              data-checkboxes="mygroup"
                              className="custom-control-input"
                              id="checkbox-2"
                          />
                        </div>
                      </div>
                    </FormGroup>
                  </Form>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                    variant=""
                    className="btn ripple btn-primary"
                    type="button"
                    onClick={hanleCreateCurrateur}
                >
                  {isLoadingCreating ? "Ajouter en cour..." :"Ajouter"}
                </Button>
                <Button
                    variant=""
                    className="btn ripple btn-secondary"
                    onClick={handleClose}
                >
                  Fermer
                </Button>
              </Modal.Footer>
            </Modal>
          </div>) : ""
        }
      </div>
      <CurratorList isAdmin={isAdmin}/>
      <ToastContainer/>
    </div>
  );
};

CurrateurList.propTypes = {};
CurrateurList.defaultProps = {};
CurrateurList.layout = "Contentlayout";
export default CurrateurList;
