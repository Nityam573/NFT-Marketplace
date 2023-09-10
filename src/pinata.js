const key = "bf6d6642c75090cff512";
const secret = "34ce04e4d5d4b1bd9648b8c5701b34161d7e8beaefdadb963ef8477853fa830e";

const axios = require('axios');
const FormData = require('form-data');

export const uploadJSONToIPFS = async(JSONBody) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    //making axios POST request to Pinata ⬇️
    return axios 
        .post(url, JSONBody, {
            headers: {
                'pinata_api_key': key,
                'pinata_secret_api_key': secret,
                "path": "Anime",
            }
        })
        .then(function (response) {
           return {
               success: true,
               pinataURL: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
           };
        })
        .catch(function (error) {
            console.log(error)
            return {
                success: false,
                message: error.message,
            }

    });
};

export const uploadFileToIPFS = async(file) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    //making axios POST request to Pinata ⬇️
    
    let data = new FormData();
    data.append('file', file,{filepath: "Animeverse"});

    // const metadata = JSON.stringify({
    //     name: 'testname',
    //     keyvalues: {
    //         exampleKey: 'exampleValue'
    //     }
    // });
    // data.append('pinataMetadata', metadata);

    //pinataOptions are optional
    // const pinataOptions = JSON.stringify({
    //     cidVersion: 0,
    //     customPinPolicy: {
    //         regions: [
    //             {
    //                 id: 'FRA1',  
    //                 desiredReplicationCount: 1
    //             },
    //             {
    //                 id: 'NYC1',
    //                 desiredReplicationCount: 2
    //             }
    //         ]
    //     }
    // });
    // data.append('pinataOptions', pinataOptions);

    return axios 
        .post(url, data, {
            maxBodyLength: 'Infinity',
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                "pinata_api_key": key,
                "pinata_secret_api_key": secret,
                "path": "Anime",
            }
        })
        .then(function (response) {
            console.log("image uploaded", response.data.IpfsHash)
            return {
               success: true,
               pinataURL: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
           };
        })
        .catch(function (error) {
            console.log(error,"Error uploading file to IPFS")
            return {
                success: false,
                message: error.message,
            }

    });
};