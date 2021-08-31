import React, {useState } from "react";

//doesn't get called anywhere yet
function IssuerForm({setIssuerWebId}) {
    
    const [input, setInput] = useState("");

    const handleFetch = async (e) => {
        e.preventDefault();
        setIssuerWebId(input)
    };

    const handleChange = (e) => {   
        setInput(e.target.value) 
    };

  return (
      <form className="form">
        <label htmlFor="User WebID">
          <span>Fill in an issuer webID</span>
          <input
            id="webID-input"
            type="text"
            //value={todoText}
            placeholder='ksbissuer.solidcommunity.net'
            onChange={handleChange}
          />
        </label>
        <button onClick={handleFetch} className="add-button">
          Find Certificates
        </button>
      </form>
  );
}
  
  export default IssuerForm;