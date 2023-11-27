"use client";

import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "@/app/ui/dashboard/thematique/addThematique/addThematique.module.css";
import axios from "@/app/api/axios";

import Select from "react-select";

const THEMATIQUE_URI = "/thematics";

const AddUserPage = () => {
  const [thematique, setThematique] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeThematique = (e) => {
    setThematique(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const response = await axios.post(
        THEMATIQUE_URI,
        JSON.stringify({ name: thematique }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      toast.success("Thématique créée avec succès !");

      setIsLoading(false);
      
    } catch (e) {
      toast.error("Echec survenu lors de la création de la thématique !");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Entrer le Nom de la thématique"
            required
            onChange={handleChangeThematique}
          />

          <select name="isAdmin" id="isAdmin">
            <option value={true}>Selectionner l'ODD</option>
            <option value={false}>ODD 1</option>
            <option value={false}>ODD 2</option>
            <option value={false}>ODD 4</option>
            <option value={false}>ODD 5</option>
            <option value={false}>ODD 6</option>
          </select>
          <button type="submit">
            {isLoading
              ? "Création de la thématique ..."
              : "Créer la thématique"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default AddUserPage;
