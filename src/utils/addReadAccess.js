import {
    getSolidDatasetWithAcl,
    getResourceAcl,
    setAgentResourceAccess,
    saveAclFor,
    hasAcl,
    getThing,
    getUrlAll,
    getSolidDataset
  } from "@inrupt/solid-client";

  
export async function AddReadAccess(certifListStored, session, validatorWebId){
    const STORAGE_PREDICATE = "http://www.w3.org/ns/pim/space#storage";

    try {
        const profileDataset = await getSolidDataset(session.info.webId, {
            fetch: session.fetch,
        });
          const profileThing = getThing(profileDataset, session.info.webId);
          const podsUrls = getUrlAll(profileThing, STORAGE_PREDICATE);
          const pod = podsUrls[0];
          const containerUri = `${pod}certificates/`
        //had to do these steps to get correct link, might be able to get it from session tho
        
        console.log('urltest', containerUri, certifListStored)
        // Fetch the SolidDataset and its associated ACLs, if available:
        const myDatasetWithAcl = await getSolidDatasetWithAcl(containerUri, {
            fetch: session.fetch
        });
        console.log("myDatasetWithAcl :", myDatasetWithAcl)

        const resourceAcl = getResourceAcl(myDatasetWithAcl);
        //console.log("resourceAcl", resourceAcl)
        console.log("hasAcl?", hasAcl(myDatasetWithAcl))
        console.log("userId", validatorWebId)
        console.log("session", session)
        const updatedAcl = setAgentResourceAccess(
            resourceAcl,
            validatorWebId,
            { read: true, append: false, write: false, control: false }
        );
        console.log("updatedAcl : ", updatedAcl)
        await saveAclFor(myDatasetWithAcl, updatedAcl , {
            fetch: session.fetch
        });

       
    } catch {
        console.log("AddReadAccess has failed")
    }

  return;
}