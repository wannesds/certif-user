import {
    getSolidDatasetWithAcl,
    getResourceAcl,
    hasResourceAcl,
    setAgentResourceAccess,
    saveAclFor,
    hasAcl,
    getThing,
    getUrlAll,
    getSolidDataset,
    createAcl,
    createAclFromFallbackAcl
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
          //above to be removed to just a pod parameter given?
          const containerUri = `${pod}certificates2/index.ttl`
        //had to do these steps to get correct link, might be able to get it from session tho
        
        console.log('urltest', containerUri, certifListStored)
        // Fetch the SolidDataset and its associated ACLs, if available:
        const myDataset = await getSolidDatasetWithAcl(containerUri, {
            fetch: session.fetch
        }); 
        let resourceAcl = "";
        if (hasResourceAcl(myDataset)) {
            resourceAcl = getResourceAcl(myDataset)
        } else {
            resourceAcl = createAclFromFallbackAcl(myDataset)
        }
        //if no acl is present then it'll be null
        // console.log("myDatasetWithAcl:", myDatasetWithAcl)
        // console.log("hasAcl?", hasResourceAcl(myDatasetWithAcl))
        // console.log("validatorId", validatorWebId)
        
        console.log("resourceAcl :", resourceAcl)
        //console.log("hasResourceAcl?", hasResourceAcl(resourceAcl))
        // console.log("resourceACL", resourceAcl)
        // //console.log("resourceAcl", resourceAcl)
        // console.log("hasAcl?", hasAcl(myDataset))
        
        //console.log("session", session)
        const updatedAcl = setAgentResourceAccess(
            resourceAcl,
            validatorWebId,
            { read: true, append: false, write: false, control: false }
        );
        console.log("updatedAcl : ", updatedAcl)
        await saveAclFor(myDataset, updatedAcl , {
            fetch: session.fetch
        });
        console.log("AddReadAccess should have worked")
       
    } catch {
        console.log("AddReadAccess has failed")
    }

  return;
}