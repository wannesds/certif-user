import React, {useState } from "react";
import {AddReadAccess} from '../utils/addReadAccess';

function AccessForm({url, session}) {
  const [validatorWebId, setValidatorWebId] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      AddReadAccess(url, session, validatorWebId)
    } catch (error) {
      console.log("calling AddReadAccess failed", error)
    }
    console.log("calling AddReadAccess succes")
  };

  const handleChange = (e) => {
    setValidatorWebId(`https://${e.target.value}/profile/card#me`) 
  };

  return (
      <form onSubmit={handleSubmit} className="access-form">
        <label htmlFor="Validator WebID">
          <input
            id="webID-input"
            type="text"
            //value={todoText}
            onChange={handleChange}
          />
        </label>
        <button type="submit" className="button">
          give read access
        </button>
      </form>
  );
}
  
  export default AccessForm;