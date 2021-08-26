import {
    getSolidDataset,
    getThing,
    getUrlAll
} from "@inrupt/solid-client";

const STORAGE_PREDICATE = "http://www.w3.org/ns/pim/space#storage";
  
export async function getPodUrl(session) {
  try {
    const profileDataset = await getSolidDataset(session.info.webId, {
        fetch: session.fetch,
    });
    const profileThing = getThing(profileDataset, session.info.webId);
    const podsUrls = getUrlAll(profileThing, STORAGE_PREDICATE);
    const pod = podsUrls[0];
    console.log("podurl", pod)
    return pod;

  } catch (error) {
    console.log("getPodUrL error", error)
  }
}