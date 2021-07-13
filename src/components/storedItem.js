import React from 'react';
import { 
    getStringNoLocale,
} from "@inrupt/solid-client";

const TEXT_PREDICATE = "http://schema.org/text";
const SHA1_PREDICATE = "http://xmlns.com/foaf/0.1/sha1";
const PERSON_PREDICATE = "http://xmlns.com/foaf/0.1/Person";

function StoredItem({id, thing}){

    return(
        <tr>
            <td>{getStringNoLocale(thing, TEXT_PREDICATE)}</td>
            <td>{getStringNoLocale(thing, SHA1_PREDICATE)}</td>
        </tr>
    );
}

export default StoredItem;