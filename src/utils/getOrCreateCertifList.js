import {
    createSolidDataset,
    getSolidDataset,
    getThingAll,
    saveSolidDatasetAt,
  } from "@inrupt/solid-client";
  
export async function getOrCreateCertifList(indexUrl, fetch) {
  try {
    //finds the given dataset if available
    const certifFolder = await getSolidDataset(indexUrl, { fetch });
    console.log("certifFolder", certifFolder)
    const ttlArray = getThingAll(certifFolder).slice(1)
    //slice first as its no real ttl
  
    return ttlArray;
    
  } catch (error) {
    if (error.statusCode === 404) {
      //if not found, then create new dataset
      const certifFolder = await saveSolidDatasetAt(
        indexUrl,
        createSolidDataset(),
        {
          fetch,
        }
      );
      console.log("A folder called certifications-owned has been added to your Pod.")
      return certifFolder;
    }
  }
}