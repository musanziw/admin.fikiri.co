import React, {useState, useEffect, useRef, createRef} from "react";
import { Button, Form, FormGroup, Modal } from "react-bootstrap";
import dynamic from "next/dynamic";
import Seo from "@/shared/layout-components/seo/seo";

const CurratorList = dynamic(
  () => import("@/shared/data/advancedui/curratorListCom"),
  { ssr: false }
);

import axios from "@/pages/api/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";

const CurrateurList = () => {
  const [show, setShow] = React.useState(false);
  const email = createRef();
  const name = createRef();
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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateUsers = async () => {
    try {
      const responseUser = await axios.get("/users");
      const usersWithImages = responseUser.data.data.map((user) => ({
        ...user,
        img: (
            <img
                src={"../../../assets/img/faces/4.jpg"}
                className="rounded-circle"
                alt=""
            />
        ),
        class: "avatar-md rounded-circle",
      }));
      const allowedRoles = ["CURATOR", "ADMIN", "EXPLORATOR"];
      setUsers(usersWithImages.filter(user => user.roles.some(role => allowedRoles.includes(role.name))));
    } catch (error) {
      console.error("Erreur lors de la mise à jour des données :", error);
    }
  };

  const hanleCreateCurrateur = async (e) => {
    e.preventDefault();
    try {
      setIsLoadingCreating(true);

      const payload = {
        name : name.current.value,
        email : email.current.value,
        roles: optionId,
      };

      await axios.post("/users", JSON.stringify(payload));

      toast.success("Curateur créé avec succès !");
      handleClose();
      setIsLoadingCreating(false)
      updateUsers();
    } catch (e) {
      toast.error(e.response.data.message)
      setIsLoadingCreating(false);
    }finally{
      setIsLoadingCreating(false);
    }
  };

  const handleSelectChange = async (selectedOptions) => {
    setSelectedOptions(selectedOptions);
    setOptionId([...optionId, selectedOptions.value]);
  };

  return (
    <div>
      <Seo title={"Curator List"} />
      <div className="breadcrumb-header justify-content-between">
        {
          isAdmin ? (<div className="left-content mt-2">
            <Button
                className="btn ripple btn-primary"
                onClick={handleShow}
                size="sm"
            >
              <i className="fe fe-plus me-2"></i>{"Nouveau Curateur"}
            </Button>
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
                          ref={name}
                      />
                    </FormGroup>
                    <FormGroup className="form-group">
                      <Form.Control
                          type="email"
                          className="form-control"
                          id="inputEmail3"
                          placeholder="Email"
                          ref={email}
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
      <CurratorList updateUsers={updateUsers}/>
      <ToastContainer/>
    </div>
  );
};

CurrateurList.propTypes = {};
CurrateurList.defaultProps = {};
CurrateurList.layout = "Contentlayout";
export default CurrateurList;
