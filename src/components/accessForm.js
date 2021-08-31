import React, {useState } from "react";
import { AddReadAccess } from '../utils/addReadAccess';
import { getPodUrl } from '../utils/getPodUrl';

function AccessForm({url, session}) {
  const [validatorWebId, setValidatorWebId] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      //adds access controls to given uri & webid
      AddReadAccess(url, session, validatorWebId)
      //gives also needed read-access to the container
      const pod = await getPodUrl(session)
      AddReadAccess(`${pod}certificates-owned/`, session, validatorWebId)
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
            placeholder='ksbvalidator.solidcommunity.net'
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