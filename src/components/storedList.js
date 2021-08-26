import React from 'react';
import { 
    getThing, 
    getUrl, 
    getStringNoLocale,
    getDatetime,
} from "@inrupt/solid-client";
// import StoredItem from './storedItem';
import AccessForm from './accessForm';

const TEXT_PREDICATE = "http://schema.org/text";
const PERSON_PREDICATE = "http://xmlns.com/foaf/0.1/Person";
const CREATED_PREDICATE = "http://www.w3.org/2002/12/cal/ical#created";


function StoredList({certifListStored, session}){
    
    console.log("storedList", certifListStored)

    const certifThings = !certifListStored ? [] : certifListStored
       console.log("certifThings", certifThings)
    // const certifThings = certifList.map((StoredItem => {
    //     return getThingAll(item)
    // })
    // certifThings.sort((a, b) => {
    //     return (
    //       getDatetime(a, CREATED_PREDICATE) - getDatetime(b, CREATED_PREDICATE)
    //     );
    // });

    // const thingsArray = certifThings
    //     //filters for todo-type predicates, (don't think this is needed in current version) but it can be an extra check
    //     .filter((t) => getUrl(t, TYPE_PREDICATE) === CERTIFICATION_CLASS)
    //     .map((t) => {
    //         return { dataset: certifListStored, thing: t }; 
        
    //     });

    // const date = getDatetime(thing, CREATED_PREDICATE);
    // const certifId = getStringNoLocale(thing, TEXT_PREDICATE);
    // const webId = getStringNoLocale(thing, PERSON_PREDICATE);
   
    return(
        <div className="table-container holder-container">
            <span className="holder-count">
            There {certifThings.length === 1 ? "is" : "are"} {certifThings.length} certificate{certifThings.length === 1 ? "" : "s"} on your Pod.
            </span>
                <div className="table holder-list">
                    { !certifThings ? <span>no</span>
                        : certifThings.map( (thing) => 
                             //<div>{getStringNoLocale(thing, PERSON_PREDICATE)}</div> ,
                            <div className="certificate">
                                {thing.url}
                                <AccessForm
                                    url={thing.url}
                                    session={session}
                                />
                            </div> 

                        )
                    }
                </div>
        </div>
    );
}

export default StoredList;