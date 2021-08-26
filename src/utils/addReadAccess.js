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
//   import {getPodUrl} from '../utils/getPodUrl';

  
export async function AddReadAccess(url, session, validatorWebId){

    try {
        // const pod = getPodUrl(session);
        // const containerUri = `${pod}certificates-owned/index.ttl`
        
        console.log('addAccess-urlTest : ', url)
        // Fetch the SolidDataset and its associated ACLs, if available:
        const myDataset = await getSolidDatasetWithAcl(url, {
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
        alert(`Read access has been given to ${validatorWebId}`)
       
    } catch {
        console.log("AddReadAccess has failed")
    }

  return;
}