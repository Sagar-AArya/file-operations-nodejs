"use strict";

const fileCruDs = require('./fileCRUDs');

const fileOperations = (function(){

    function readAnExcelSheetAndPrintAsTable(filePath, cb){
        fileCruDs
        .getFileContentUsingStream(filePath, (err, result) => {
            if(err) {
                return cb(err);
            }

            return cb(err, result);
        })
    }

    function moveOneFileContentsToAnotherFileUsingStreams(sourceFileAbsolutePath, destinationPath, cb) {
        fileCruDs
        .moveOneFileContentsToAnotherFileUsingStreams(sourceFileAbsolutePath, destinationPath, (err, result) => {
            if(err) {

            }


        })
    }

    return {
        readAnExcelSheetAndPrintAsTable,
        moveOneFileContentsToAnotherFileUsingStreams
    }
}());

module.exports = fileOperations;