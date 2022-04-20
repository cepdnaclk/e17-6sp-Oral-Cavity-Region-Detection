var fs = require('fs');
const {uploadFile , downloadFile , deleteFile , listFiles} = require('./storage-config');


// list all content in the container
//listFiles()


// load a file from the local storage
let name = "reg116495582954900902f6d74_bottom_5.png"
let image;
try{
    image = fs.readFileSync('./configurations/'+name)
}catch(err){
    console.log(err);
}

const uploadfileName = name
uploadFile(uploadfileName, image)
.then(res => console.log('Uploaded the file ' ,uploadfileName ))
.catch(err => console.log(err))


/* Get Download URL */
// const filename = 'my.jpeg';
// downloadFile(filename)
//     .then(res => console.log("URL : " ,res))
//     .catch(err => console.log(err))

/* Delete File */
/*
const deleteFileName = 'new5.jpeg'
deleteFile(deleteFileName)
.catch(err=> console.log('file not exist to delete'))
*/