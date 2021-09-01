import React, {useEffect, useState} from 'react';
import { 
    getThingAll,
    getUrl,
    getDatetime,
    getStringNoLocale,
    getStringByLocaleAll,
} from "@inrupt/solid-client";
import QueItem from './queItem';
//import CheckIfValid from '../utils/checkIfValid';
//import { CheckIfStored } from '../utils/checkIfStored';

const TEXT_PREDICATE = "http://schema.org/text";
const CREATED_PREDICATE = "http://www.w3.org/2002/12/cal/ical#created";
const SHA1_PREDICATE = "http://xmlns.com/foaf/0.1/sha1";


function QueList({certifListStored, setCertifListStored, certifListQue, setCertifListQue, session}){
    const queThings = certifListQue;
    console.log(certifListStored)
    const storedThings = certifListStored ? certifListStored : [];
  
    const storedThingsHashes = storedThings.map((thing) => {
        return getStringNoLocale(thing, SHA1_PREDICATE);
    })

    let certifThings = [];

    //try incase our que is empty, without the try an error will be given sometimes on empty que
    try {
        certifThings = queThings.filter((thing) => {
            if(true !== storedThingsHashes.includes(getStringNoLocale(thing, SHA1_PREDICATE)) ){
                return thing;
            }
        }) 
        console.log("queList certifThings", certifThings)
    } catch (error) {
        console.log("queList couldn't check certifs against webId")
    }
    console.log("queList queThings", queThings )

    certifThings.sort((a, b) => {
        return (
          getDatetime(a, CREATED_PREDICATE) - getDatetime(b, CREATED_PREDICATE)
        );
    });
    
    return(
        <div className="table-container">
            <span className="tasks-message">
            There {certifThings.length === 1 ? "is" : "are"} {certifThings.length} certificate{certifThings.length === 1 ? "" : "s"} ready to be stored.
            </span>
            <table className="table">
                <thead>
                    <tr>
                        <th>Certificate</th>
                        <th>WebID</th>
                        <th>Created</th>
                    </tr>
                </thead>
                <tbody>
                    { !certifThings.length > 0 ? <span>no</span>
                        : certifThings.map( (item, index) => 
                            <QueItem 
                                thing={item}
                                certifListStored={certifListStored}
                                setCertifListStored={setCertifListStored}
                                certifListQue={certifListQue}
                                setCertifListQue={setCertifListQue}
                                session={session}
                                key={index}
                            />
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}

export default QueList;