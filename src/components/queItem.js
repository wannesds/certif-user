import React from 'react';
import { 
    getStringNoLocale,
    getDatetime,
} from "@inrupt/solid-client";
import { StoreCertif } from '../utils/storeCertif';

const TEXT_PREDICATE = "http://schema.org/text";
const PERSON_PREDICATE = "http://xmlns.com/foaf/0.1/Person";
const CREATED_PREDICATE = "http://www.w3.org/2002/12/cal/ical#created";



function QueItem({thing, certifListStored, setCertifListStored, session}){
    
    const date = getDatetime(thing, CREATED_PREDICATE);
    const certifId = getStringNoLocale(thing, TEXT_PREDICATE);
    const webId = getStringNoLocale(thing, PERSON_PREDICATE);

    const handleStoreCertif = async () => {
        try {
            await StoreCertif(thing, certifListStored, setCertifListStored, session)
        } catch {
            console.log("Storing to Pod has Failed (handleStoreCertif)")
        }
    }

    return(
        <tr>
            <td>{certifId}</td>
            {/* <td>{webId}</td> */}
            <td>{date.toDateString()}</td>
            <button onClick={handleStoreCertif}>Store to Pod</button>
        </tr>
    );
}

export default QueItem;