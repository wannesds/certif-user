
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
