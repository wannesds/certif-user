import React from 'react';
import { 
    getStringNoLocale,
} from "@inrupt/solid-client";
import { StoreCertif } from '../utils/storeCertif';

const TEXT_PREDICATE = "http://schema.org/text";
const SHA1_PREDICATE = "http://xmlns.com/foaf/0.1/sha1";
const PERSON_PREDICATE = "http://xmlns.com/foaf/0.1/Person";

function QueItem({id, thing, certifListStored, setCertifListStored, certifListQue, setCertifListQue, session}){
    
    const handleStoreCertif = async () => {
        try {
            await StoreCertif(thing, certifListStored, setCertifListStored, session)
        } catch {
            console.log("Storing to Pod has Failed (handleStoreCertif)")
        }
    }

    return(
        <tr>
            <td>{getStringNoLocale(thing, TEXT_PREDICATE)}</td>
            <td>{getStringNoLocale(thing, PERSON_PREDICATE)}</td>
            <td>{getStringNoLocale(thing, SHA1_PREDICATE)}</td>
            <button onClick={handleStoreCertif}>Store to Pod</button>
        </tr>
    );
}

export default QueItem;