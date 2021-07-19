import React from 'react';
import { 
    getThingAll, 
    getUrl, 
    getDatetime,
} from "@inrupt/solid-client";
import StoredItem from './storedItem';

function StoredList({certifListStored}){
    
    console.log(certifListStored)

    const certifThings = certifListStored ? getThingAll(certifListStored) : [];
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
   
    return(
        <div className="table-container">
            <span className="tasks-message">
            There {certifThings.length === 1 ? "is" : "are"} {certifThings.length} certificate{certifThings.length === 1 ? "" : "s"} on your Pod.
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
                    { !certifThings ? <span>no</span>
                        : certifThings.map( (item, index) => 
                            <StoredItem 
                                thing={item}
                                key={index}
                            />
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}

export default StoredList;