const fs = require('fs');
const path = require('path');
const { resolve } = require('path');
const glob = require('glob');


const outputPath = (myPath) => {
    console.log('path ---> ', myPath)
    console.log('exists ---> ', fs.existsSync(myPath))
    console.log('resolve ---> ', resolve(__dirname, '../package-lock.json', myPath))
    console.log('----------')


    if (!fs.existsSync(myPath)) {
        fs.mkdirSync(myPath, err => {
            if (err) throw new Error(err);
        })
        console.log(`Created directory: ${myPath}`);
    }

    return resolve(__dirname, '../', myPath);
}

const getEntries = (pattern) => {
    const entries = {};

    console.log('pattern ---> ', glob.sync(pattern))

    glob.sync(pattern).forEach((file) => {
        console.log('file ---> ', file)
        if (file.match(/\.(ts|js)x?$/)) {
            const outputFileKey = file.replace("src/", "");
            const outputFileName = outputFileKey.replace(/\.[^/.]+$/, ''); // Remove file extension
            entries[outputFileName] = path.join(__dirname, '../', file);
    
            console.log('outputFileKey ---> ', outputFileKey)
            console.log('path.join(__dirname, file) -->', path.join(__dirname, file))
        }
    });
    console.log('entries', {entries})

    return entries;
}

module.exports = {
    outputPath,
    getEntries
}