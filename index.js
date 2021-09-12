const express = require('express');
const path = require('path');
const fs = require('fs');

const fileOperations = require('./controller/fileOperations');


global.appRootPath = __dirname;
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
 
// parse application/json
app.use(express.json())

function readAnExcelSheetAndPrintAsTable() {
    let filePath = path.join(global.appRootPath, "files", "sampleCSV.csv");
    
    fileOperations
    .readAnExcelSheetAndPrintAsTable(filePath, (err, result) => {
        if(err) {
            throw err;
        }

        // console.table(result);
        let arr = result.split("\n");
        let columns = arr[0];
        let rows = [];
        for(let i = 1; i < arr.length;i++) {
            rows.push(arr[i]);
        }

        console.table(columns);
        console.log("\n");
        console.table(rows);
    });
}

readAnExcelSheetAndPrintAsTable();

function moveOneFileContentsToAnotherFileUsingStreams() {
    let sourceFilePath = path.join(global.appRootPath, "files", "file1.txt");
    let destFilePath = path.join(global.appRootPath, "files", "output.txt");
    
    fileOperations
    .moveOneFileContentsToAnotherFileUsingStreams(sourceFilePath, destFilePath, (err, result) => {
        if(err) {
            throw err;
        }

        
    });
}

// moveOneFileContentsToAnotherFileUsingStreams();


app.listen(5999, (result) => {
    console.log("App is listening on " + 5999);
});
