import {
    addDatetime,
    addUrl,
    addStringNoLocale,
    createThing,
    getSourceUrl,
    saveSolidDatasetAt,
    setThing,
    getStringNoLocale,
    getDatetime,
    getSolidDataset,
    getThing,
    getUrlAll,
  } from "@inrupt/solid-client";
import {createCertifFile} from './createCertifFile';
// import {getOrCreateCertifList} from './getOrCreateCertifList';
import { getPodUrl } from '../utils/getPodUrl';


const TEXT_PREDICATE = "http://schema.org/text";
const CREATED_PREDICATE = "http://www.w3.org/2002/12/cal/ical#created";
const SHA1_PREDICATE = "http://xmlns.com/foaf/0.1/sha1";
const PERSON_PREDICATE = "http://xmlns.com/foaf/0.1/Person";
const TYPE_PREDICATE = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type";
const CERTIFICATION_CLASS = "http://data.europa.eu/snb/credential/e34929035b";
// const STORAGE_PREDICATE = "http://www.w3.org/ns/pim/space#storage";



export async function StoreCertif(thing, certifListStored, setCertifListStored, session) {
    try {
    const pod = await getPodUrl(session)
    const ttlUri = `${pod}certificates-owned/${getStringNoLocale(thing, TEXT_PREDICATE)}.ttl`
    const certif = await createCertifFile(ttlUri, session.fetch)

    //gets the chosen dataset to store things in
    const indexUrl = getSourceUrl(certif);
    console.log(getStringNoLocale(thing, TEXT_PREDICATE))
    //creates a thing and adds triples to it each time needed using solid-client functions
    
    const certifWithText = addStringNoLocale(createThing(), TEXT_PREDICATE, getStringNoLocale(thing, TEXT_PREDICATE));
    const certifWithDate = addDatetime(certifWithText, CREATED_PREDICATE, getDatetime(thing, CREATED_PREDICATE));
    const certifWithHash = addStringNoLocale(certifWithDate, SHA1_PREDICATE, getStringNoLocale(thing, SHA1_PREDICATE));
    //const certifWithHolder = addStringNoLocale(certifWithHash, PERSON_PREDICATE, getStringNoLocale(thing, PERSON_PREDICATE));
    const certifWithIssuer = addStringNoLocale(certifWithHash, PERSON_PREDICATE, getStringNoLocale(thing, PERSON_PREDICATE));
//adds correct class
    const certifWithType = addUrl(certifWithIssuer, TYPE_PREDICATE, CERTIFICATION_CLASS);
    //updates certification list with newly added thing
    const updatedCertifList = setThing(certif, certifWithType);
    //saves dataset on Pod
    const updatedDataset = await saveSolidDatasetAt(indexUrl, updatedCertifList, {
        fetch: session.fetch,
    });
    
    //setCertifListStored(updatedDataset)
    } catch {        
        console.log("storeCertif: error with storing to pod")
        return null;
    }    
    console.log("storeCertif: should be stored on pod")
    return true;
}

