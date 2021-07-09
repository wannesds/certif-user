import React, {useEffect, useState} from 'react';
import { 
    getThingAll,
    getUrl,
    getDatetime,
} from "@inrupt/solid-client";
import { Table, TableColumn } from "@inrupt/solid-ui-react";

const TEXT_PREDICATE = "http://schema.org/text";
const CREATED_PREDICATE = "http://www.w3.org/2002/12/cal/ical#created";
const SHA1_PREDICATE = "http://xmlns.com/foaf/0.1/sha1";
const PERSON_PREDICATE = "http://xmlns.com/foaf/0.1/Person";
const TYPE_PREDICATE = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type";
const CERTIFICATION_CLASS = "http://data.europa.eu/snb/credential/e34929035b";
const STRING = "http://www.w3.org/2001/XMLSchema#string;"


function QueList({certifListQue}){
    console.log("certifListQue", certifListQue)


    const certifThings = certifListQue ? getThingAll(certifListQue) : [];
    certifThings.sort((a, b) => {
        return (
          getDatetime(a, CREATED_PREDICATE) - getDatetime(b, CREATED_PREDICATE)
        );
    });

    const thingsArray = certifThings
        //filters for todo-type predicates, (don't think this is needed in current version) but it can be an extra check
        .filter((t) => getUrl(t, TYPE_PREDICATE) === CERTIFICATION_CLASS)
        .map((t) => {
            return { dataset: certifListQue, thing: t }; 
        
        });

    return(
        <div className="table-container">
            <span className="tasks-message">
            There are {certifThings.length} certificates waiting for you.
            </span>
            <Table className="table" things={thingsArray}>
                <TableColumn 
                    property={TEXT_PREDICATE} 
                    header="Certificate" 
                    sortable
                />
                <TableColumn 
                    property={PERSON_PREDICATE} 
                    header="WebID" 
                    sortable
                />
                <TableColumn
                    property={SHA1_PREDICATE}
                    header="Validation Hash"
                />
                <TableColumn
                    property={CREATED_PREDICATE}
                    dataType="datetime"
                    header="Created At"
                    body={({ value }) => value.toDateString()}
                    sortable
                />
            </Table>
        </div>
    );
}

export default QueList;