import './App.css';
import React, { useEffect, useState } from "react";
import { LoginButton, LogoutButton, Text, useSession, CombinedDataProvider } from "@inrupt/solid-ui-react";
import { getSolidDataset, getUrlAll, getThing } from "@inrupt/solid-client";
import { getOrCreateCertifList } from "./utils/getOrCreateCertifList";

const STORAGE_PREDICATE = "http://www.w3.org/ns/pim/space#storage";

const authOptions = {
  clientName: "Certif-create App",
};

function App() {

  const { session } = useSession();
  const [oidcIssuer, setOidcIssuer] = useState("");
  const [certifList, setCertifList] = useState("");

  const handleChange = (event) => {
    setOidcIssuer(event.target.value);
  };

  useEffect(() => {
    if (!session || !session.info.isLoggedIn) return;
    (async () => {
      const profileDataset = await getSolidDataset(session.info.webId, {
        fetch: session.fetch,
      });
      const profileThing = getThing(profileDataset, session.info.webId);
      const podsUrls = getUrlAll(profileThing, STORAGE_PREDICATE);
      const pod = podsUrls[0];
      const containerUri = `${pod}certificates/`;
      const list = await getOrCreateCertifList(containerUri, session.fetch);
      setCertifList(list);

      
        // const Web3 = require('web3');
        // const web3 = new Web3("https://eth-rinkeby.alchemyapi.io/v2/aOmf3RlJunKUJcRWbVXWMdZukj_SMvTl");
        // // Modern dapp browsers...
        // if (window.ethereum) {
        //     window.web3 = new Web3("https://eth-rinkeby.alchemyapi.io/v2/aOmf3RlJunKUJcRWbVXWMdZukj_SMvTl");
        //     try {
        //         // Request account access if needed
        //         await window.ethereum.enable();
        //         // Acccounts now exposed
    
        //     } catch (error) {
        //         // User denied account access...
        //     }
        // }
        // // Legacy dapp browsers...
        // else if (window.web3) {
        //     window.web3 = new Web3(web3.currentProvider);
        //     // Acccounts always exposed
        // }
        // // Non-dapp browsers...
        // else {
        //     console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
        //}
    

    })();

    
    
  }, [session, session.info.isLoggedIn]);

  

  return (
    <div className="app-container">
      {session.info.isLoggedIn ? ( //logged in?
        <CombinedDataProvider
          datasetUrl={session.info.webId}
          thingUrl={session.info.webId}
        >
          <div className="message logged-in f4">
            <span>You are logged in as: </span>
              <Text 
                properties={[
                  "http://www.w3.org/2006/vcard/ns#fn",
                  "http://xmlns.com/foaf/0.1/name",
                ]} 
                className="ma2 dark-blue"
              />
              <LogoutButton/>
          </div>
          <section>
            {/* <QueList certifList={certifList} setCertifList={setCertifList}/> */}
          </section>
        </CombinedDataProvider>
      ) : (  //if not logged in then
        <div className="message">
          <span>You are not logged in. </span>
          <span>
            Log in with:
            <input
              className="oidc-issuer-input "
              type="text"
              name="oidcIssuer"
              list="providers"
              value={oidcIssuer}
              onChange={handleChange}
            />
           <datalist id="providers">
             <option value="https://broker.pod.inrupt.com/" />
             <option value="https://inrupt.net/" />
             <option value="https://solidcommunity.net" />
           </datalist>
          </span>
          <LoginButton
            oidcIssuer={oidcIssuer}
            redirectUrl={window.location.href}
            authOptions={authOptions}
          />
        </div>
      )}
    </div>
  );
}

export default App;