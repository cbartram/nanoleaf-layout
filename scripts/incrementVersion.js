const fs = require('fs');
const chalk = require('chalk');
const packageJson = require('../package');
let { VERSION_NAME } = process.env;

VERSION_NAME = VERSION_NAME.toUpperCase();
let versionData = packageJson.version.split('.').map(v => parseInt(v, 10)); // [3, 1, 2]

try {
    switch (VERSION_NAME) {
        case 'MAJOR':
            versionData[0]++;
            break;
        case 'MINOR':
            versionData[1]++;
            break;
        case 'BUGFIX':
            versionData[2]++;
            break;
        case 'HOTFIX':
            versionData[2]++;
            break;
        default:
            throw new Error('Version Name does not match expected value: MAJOR, MINOR, BUGFIX');
    }

    versionData = versionData.join('.');
    packageJson.version = versionData; // Update the package.json

    // Write the package.json file
    fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 4));
    console.log(`Successfully Updated package.json ${VERSION_NAME} Version: `, versionData);
} catch(err) {
    console.log(chalk.red(err.message));
    process.exit(1);
}

