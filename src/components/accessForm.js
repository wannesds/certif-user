import React, {useState } from "react";
import {AddReadAccess} from '../utils/addReadAccess';

function AccessForm({certifListStored, session}) {
  const [validatorWebId, setValidatorWebId] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      AddReadAccess(certifListStored, session, validatorWebId)
    } catch (error) {
      console.log("calling AddReadAccess failed", error)
    }
    console.log("calling AddReadAccess succes")
  };

  const handleChange = (e) => {
    setValidatorWebId(`https://${e.target.value}/profile/card#me`) 
  };

  return (
      <form onSubmit={handleSubmit} className="validator-access-form">
        <label htmlFor="Validator WebID">
          <input
            id="webID-input"
            type="text"
            //value={todoText}
            onChange={handleChange}
          />
        </label>
        <button type="submit" className="add-button">
          give read access
        </button>
      </form>
  );
}
  
  export default AccessForm;