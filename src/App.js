import './App.css';
import './styles/styles.scss';
import React, { useEffect, useState } from "react";
import { LoginButton, LogoutButton, Text, useSession, CombinedDataProvider } from "@inrupt/solid-ui-react";
import { getSolidDataset, getUrlAll, getThing, getThingAll, getStringNoLocale } from "@inrupt/solid-client";
import { getOrCreateCertifList } from "./utils/getOrCreateCertifList";
import StoredList from './components/storedList';
import QueList from './components/queList';
// import AccessForm from './components/accessForm';
import IssuerForm from './components/issuerForm';

const STORAGE_PREDICATE = "http://www.w3.org/ns/pim/space#storage";
const PERSON_PREDICATE = "http://xmlns.com/foaf/0.1/Person";


const authOptions = {
  clientName: "Certif-User App",
};

function App() {

  const { session } = useSession();
  const [oidcIssuer, setOidcIssuer] = useState("");
  const [certifListStored, setCertifListStored] = useState('');
  const [certifListQue, setCertifListQue] = useState('');
  const [issuerWebId, setIssuerWebId] = useState("");

  const handleChange = (event) => {
    setOidcIssuer(event.target.value);
  };

  useEffect(() => {
    if (!session || !session.info.isLoggedIn) return;
    (async () => {
      
      //fetches stored certifications
      const profileDataset = await getSolidDataset(session.info.webId, {
        fetch: session.fetch,
      });
      const profileThing = getThing(profileDataset, session.info.webId);
      const podsUrls = getUrlAll(profileThing, STORAGE_PREDICATE);
      const pod = podsUrls[0];
      const containerUri = `${pod}certificates-owned/`;
      const list = await getOrCreateCertifList(containerUri, session.fetch);
   
      setCertifListStored(list);      
      console.log("thingtestt", list)

    
      //fetches que'd certifications
      //this could be changed in a textfield where user fills in the issuer WebId
      
      const issuerUrl = `https://${issuerWebId}/certificates-issued/${pod.split("/")[2]}.ttl`
      console.log("issuerUrl", issuerUrl)
      const rawCertifList = await getSolidDataset(issuerUrl, { 
        fetch : session.fetch 
      });

      //checks que'd certifs for correct user webId, 
      //could make own file. OR We could do this in queList like the 'check for stored certifs', but
      //we put it here because this is more sensitive data that should be put in back-end later, while
      //the other check doesn't need to be in back-end. 
      //and so making the distinct seperation between these 2 checks.
      //incase we create a turtle file for each user from the issuerapp then we don't need to filter these
      const queThings = rawCertifList ? getThingAll(rawCertifList) : [];
      // try { //try incase our que is empty
      //   const certifThings = queThings.filter((thing) => {
      //     if(session.info.webId === getStringNoLocale(thing, PERSON_PREDICATE) ){
      //         return thing;
      //     }
      //   })
        console.log("queThings", queThings)
        setCertifListQue(queThings)
      // } catch (error) {
      //   console.log("couldn't check certifs against webId", error)
      // }
      //a loading screen could be put to prevent the inital filtering progress from showing on screen with flashes
    })();

  }, [session, session.info.isLoggedIn, issuerWebId, certifListQue]);

  

  return (
    <div className="app-container">
      {session.info.isLoggedIn ? ( //logged in?
        <CombinedDataProvider
          datasetUrl={session.info.webId}
          thingUrl={session.info.webId}
        >
          <div className="header logged-in">
            <div className="message">
              <span>Welcome, </span>
                <Text 
                  properties={[
                  "http://www.w3.org/2006/vcard/ns#fn",
                  "http://xmlns.com/foaf/0.1/name",
                ]} 
              />
              <span>( {session.info.webId} )</span>
            </div>

              <LogoutButton className="logout-button"
                onLogout={() => window.location.reload()}
              />
          </div>

          <div className="content">
            <h3>Issuer Data</h3>
            <div className="local-content">
              <IssuerForm
                setIssuerWebId={setIssuerWebId}
              />              
              <QueList 
                certifListStored={certifListStored} 
                setCertifListStored={setCertifListStored} 
                certifListQue={certifListQue} 
                setCertifListQue={setCertifListQue}
                session={session}
              />
            </div>
            <h3>Your Data</h3>
            <div className="solid-content">
              {/* <AccessForm
                certifListStored={certifListStored}
                session={session}
              /> */}
              <StoredList 
                certifListStored={certifListStored}
                session={session}
              />
            </div>
          </div>
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