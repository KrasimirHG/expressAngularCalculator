// Variant 1: angular-calculator.exe

const path = require('path');
const { exec } = require('child_process');
const spawn = require('cross-spawn');

const mainDirectory = __dirname;
const serverPath = path.join(mainDirectory, 'dist', 'index.js');
const clientPath = path.join(mainDirectory, 'angularCalculator');
console.log('clientPath', clientPath);

exec(`node ${serverPath}`, (error) => {
    if (error) {
        console.log(`Error executing the server: ${error.message}`);
    }
});
console.log('The server is running');

const ngServeProcess = spawn('npx', ['ng', 'serve'], {
    cwd: clientPath,
    stdio: 'inherit'
});

ngServeProcess.on('error', (error) => {
    console.log(`Error executing the angular client: ${error.message}`);
});

ngServeProcess.on('close', (code) => {
    if (code === 0) {
        console.log('The client has started successfully.');
    } else {
        console.log(`The client failed to start (exit code ${code}).`);
    }
});

// Variant 2 calculator.exe

// const path = require('path');
// const { exec } = require('child_process');

// const mainDirectory = __dirname;
// const serverPath = path.join(mainDirectory, 'dist', 'index.js');

// exec(`node ${serverPath}`, (error) => {
//     if (error) {
//         console.log(`Error executing the server: ${error.message}`);
//     }
// });
// console.log('The server is running');
