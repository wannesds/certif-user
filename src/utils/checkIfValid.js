import CreateHash  from '../utils/createHash';
import { FetchEthApi } from './fetchEthApi';

async function CheckIfValid(data){
    try {
        const user = window.ethereum.selectedAddress;
        const apiOption = `https://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=${user}&startblock=0&endblock=99999999&sort=asc&apikey=`;
        const array = await FetchEthApi(apiOption)
        //console.log('checkIfValid :' , chainData, chainData.txnList)
        const hash = CreateHash(data)
        //checks if qued certificate hash is included in a Txn on-chain
        //this means the certif is stored succesfully on-chain
        const validTxn = array.result.find((resTxn) => resTxn.input === '0x' + hash)
        const state = validTxn ? true : false

        return {state: state, validTxn: validTxn}
    } catch {
        console.log("checkIfValid has failed")
        return null;
    }
    
}

export default CheckIfValid;