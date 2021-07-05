import {
    createSolidDataset,
    getSolidDataset,
    saveSolidDatasetAt,
  } from "@inrupt/solid-client";
  
export async function getOrCreateCertifList(containerUri, fetch) {
  const indexUrl = `${containerUri}index.ttl`;
  try {
    //finds the given dataset if available
    const certifList = await getSolidDataset(indexUrl, { fetch });
    return certifList;
  } catch (error) {
    if (error.statusCode === 404) {
      //if not found, then create new dataset
      const certifList = await saveSolidDatasetAt(
        indexUrl,
        createSolidDataset(),
        {
          fetch,
        }
      );
      return certifList;
    }
  }
}