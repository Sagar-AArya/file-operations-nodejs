"use strict";

const os = require('os');
const fs = require('fs');


const fileCRUDs = (function(){

    function getFileContent(fileAbsolutePath, cb){
        // This will put all the contents of the file into RAM. if the file is large then it'll RAM consuming process.
        // Instead of this we can use streams which will read and write data in chunks.
        fs.readFile(fileAbsolutePath, (err, data) => {
            if(err) {

            }

            let content = data;
            return cb(null, content);
        });
    }

    function getFileContentUsingStream(fileAbsolutePath, cb){
        let readableStream = fs.createReadStream(fileAbsolutePath);
        let content = "";

        // We can create a pipe to parse the CSV data using fast-csv or NodeCSV
        readableStream.on('data', (chunk) => {
            chunk = chunk.toString();
            content += chunk;
        });
          
        readableStream.on('end', () => {
            return cb(null, content);
        });
    }

    function moveOneFileContentsToAnotherFileUsingStreams(sourceFileAbsolutePath, destinationPath, cb){
        let readableSrc = fs.createReadStream(sourceFileAbsolutePath);
        let writableStream = fs.createWriteStream(destinationPath);

        // readableSrc.pipe(writableStream);

        readableSrc.on('data', (chunk) => {
            writableStream.write(chunk);
        });
          
        readableSrc.on('end', () => {
            writableStream.end();
        });

        return cb(null, true);
    }

    return {
        getFileContent,
        getFileContentUsingStream,
        moveOneFileContentsToAnotherFileUsingStreams
    }
}());

module.exports = fileCRUDs;