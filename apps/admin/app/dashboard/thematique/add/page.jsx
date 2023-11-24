"use client";


import { useState, useEffect } from "react";

import styles from "@/app/ui/dashboard/thematique/addThematique/addThematique.module.css";
import axios from "@/app/api/axios";
import Select from "react-select";

const THEMATIQUE_URI = "/thematics";

const AddUserPage = () => {
  const [thematique, setThematique] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [optionId, setOptionId] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    const fetchOdd = () => {};

    fetchOdd();
  }, []);

  const handleChangeThematique = (e) => {
    setThematique(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
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
          {isLoading ? "Création de la thématique" : "Créer la thématique"}
        </button>
      </form>
    </div>
  );
};

export default AddUserPage;
