
//const SHA1_PREDICATE = "http://xmlns.com/foaf/0.1/sha1";

export async function CheckIfStored({certifThings, certifListStored}){
    let newArray = [];

    certifThings.map((queThing) => {
        certifListStored.map((storeThing) => {
            if (storeThing !== queThing) {
                newArray.push(queThing)
            }
        })
    })
    return newArray;

}
