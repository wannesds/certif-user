import {
    createSolidDataset,
    getSolidDataset,
    saveSolidDatasetAt,
  } from "@inrupt/solid-client";
  
export async function createCertifFile(indexUrl, fetch) {
  try {
    const certifList = await saveSolidDatasetAt(
      indexUrl,
      createSolidDataset(),
      {
        fetch,
      }
    );
    console.log('created new certif file', certifList)
    return certifList;
  } catch (error) {
    console.log("couldn't create certif ttl file")
  }
}