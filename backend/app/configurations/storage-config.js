const { BlobServiceClient } = require("@azure/storage-blob");
const dotenv = require('dotenv')
dotenv.config()

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;

if (!AZURE_STORAGE_CONNECTION_STRING) {
  throw Error("Azure Storage Connection string not found");
}

const blobServiceClient = BlobServiceClient.fromConnectionString(
    AZURE_STORAGE_CONNECTION_STRING
);

const uploadFile = async (filename , file)=>{
    

    const containerName = "images";
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobName = filename;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const data = file;
    const uploadBlobResponse = await blockBlobClient.upload(data, data.length);
    return uploadBlobResponse

}


const downloadFile = async (filename)=>{
    
    const containerName = "images";
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobName = filename;
    //const blobClient = containerClient.getBlobClient(filename);
    const blobClient = containerClient.getBlockBlobClient(blobName);
    
    
    const existance = await blobClient.exists()
    if(existance){
        //console.log(existance);
        return blobClient.url
    }else{
        throw new Error("File doesn't exist");
    }
    
}


const deleteFile = async (filename)=>{
   

    const containerName = "images";
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobName = filename;
    //const blobClient = containerClient.getBlobClient(filename);
    const blobClient = containerClient.getBlockBlobClient(blobName);
    
    
    const deletedResponse = await blobClient.delete();
    return deletedResponse
    
}


const listFiles = async ()=>{
    

    const containerName = "images";
    const containerClient = blobServiceClient.getContainerClient(containerName);
    for await (const blob of containerClient.listBlobsFlat()) {
        console.log("\t", blob.name);
    }
    
}





exports.listFiles = listFiles;
exports.uploadFile = uploadFile;
exports.downloadFile = downloadFile;
exports.deleteFile = deleteFile;