const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dirCodes = path.join(__dirname, '..', 'temp_codes');
const dirOutputs = path.join(__dirname, '..', 'temp_outputs');

if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recursive: true });
}
if (!fs.existsSync(dirOutputs)) {
    fs.mkdirSync(dirOutputs, { recursive: true });
}

const generateFile = async (format, content) => {
    const jobId = uuidv4();
    const filename = `${jobId}.${format}`;
    const filepath = path.join(dirCodes, filename);
    await fs.promises.writeFile(filepath, content);
    return filepath;
};

const executeCpp = (filepath, inputFilePath) => {
    const jobId = path.basename(filepath).split('.')[0];
    const outPath = path.join(dirOutputs, `${jobId}.exe`);
    const inputRedirect = inputFilePath ? ` < ${inputFilePath}` : '';

    return new Promise((resolve, reject) => {
        exec(
            `g++ ${filepath} -o ${outPath} && cd ${dirOutputs} && ${jobId}.exe${inputRedirect}`,
            { timeout: 5000 },
            (error, stdout, stderr) => {
                if (error) {
                    reject({ error, stderr });
                }
                if (stderr) {
                    reject({ stderr });
                }
                resolve(stdout);
            }
        );
    });
};

const executeC = (filepath, inputFilePath) => {
    const jobId = path.basename(filepath).split('.')[0];
    const outPath = path.join(dirOutputs, `${jobId}.exe`);
    const inputRedirect = inputFilePath ? ` < ${inputFilePath}` : '';

    return new Promise((resolve, reject) => {
        exec(
            `gcc ${filepath} -o ${outPath} && cd ${dirOutputs} && ${jobId}.exe${inputRedirect}`,
            { timeout: 5000 },
            (error, stdout, stderr) => {
                if (error) {
                    reject({ error, stderr });
                }
                if (stderr) {
                    reject({ stderr });
                }
                resolve(stdout);
            }
        );
    });
};

const executePython = (filepath, inputFilePath) => {
    const inputRedirect = inputFilePath ? ` < ${inputFilePath}` : '';
    return new Promise((resolve, reject) => {
        exec(
            `python ${filepath}${inputRedirect}`,
            { timeout: 5000 },
            (error, stdout, stderr) => {
                if (error) {
                    reject({ error, stderr });
                }
                if (stderr) {
                    reject({ stderr });
                }
                resolve(stdout);
            }
        );
    });
};

const executeJavaScript = (filepath, inputFilePath) => {
    const inputRedirect = inputFilePath ? ` < ${inputFilePath}` : '';
    return new Promise((resolve, reject) => {
        exec(
            `node ${filepath}${inputRedirect}`,
            { timeout: 5000 },
            (error, stdout, stderr) => {
                if (error) {
                    reject({ error, stderr });
                }
                if (stderr) {
                    reject({ stderr });
                }
                resolve(stdout);
            }
        );
    });
};

const executeJava = async (filepath, inputFilePath) => {
    // Java needs the class name to match the file name. 
    // For simplicity, we assume the public class is 'Main' and we rename the file to Main.java inside a specific temp folder.
    const jobId = uuidv4();
    const jobDir = path.join(dirCodes, jobId);
    await fs.promises.mkdir(jobDir, { recursive: true });
    const newFilepath = path.join(jobDir, 'Main.java');

    // Copy the contents to Main.java
    const content = await fs.promises.readFile(filepath, 'utf8');
    await fs.promises.writeFile(newFilepath, content);

    const inputRedirect = inputFilePath ? ` < ${inputFilePath}` : '';

    return new Promise((resolve, reject) => {
        exec(
            `cd ${jobDir} && javac Main.java && java Main${inputRedirect}`,
            { timeout: 5000 },
            (error, stdout, stderr) => {
                if (error) {
                    reject({ error, stderr });
                }
                if (stderr) {
                    reject({ stderr });
                }
                resolve(stdout);
            }
        );
    });
};


const runCode = async (language, code, expectedInput = "") => {
    let format = language;
    if (language === 'javascript') format = 'js';
    if (language === 'python') format = 'py';
    if (language === 'c++' || language === 'cpp') format = 'cpp';
    if (language === 'c') format = 'c';
    if (language === 'java') format = 'java';

    const filepath = await generateFile(format, code);

    let inputFilePath = null;
    if (expectedInput && expectedInput.trim().length > 0) {
        inputFilePath = await generateFile('txt', expectedInput);
    }

    let result = '';
    let isError = false;
    let timeTaken = 0;

    const startTime = Date.now();
    try {
        if (format === 'cpp') {
            result = await executeCpp(filepath, inputFilePath);
        } else if (format === 'c') {
            result = await executeC(filepath, inputFilePath);
        } else if (format === 'py') {
            result = await executePython(filepath, inputFilePath);
        } else if (format === 'js') {
            result = await executeJavaScript(filepath, inputFilePath);
        } else if (format === 'java') {
            result = await executeJava(filepath, inputFilePath);
        } else {
            throw new Error(`Unsupported language: ${language}`);
        }
    } catch (err) {
        isError = true;
        result = err.stderr || err.error?.message || err.message;
    }
    const endTime = Date.now();
    timeTaken = (endTime - startTime) / 1000;

    // Cleanup files in bg
    setTimeout(() => {
        try { fs.unlinkSync(filepath); } catch (e) { }
        if (inputFilePath) {
            try { fs.unlinkSync(inputFilePath); } catch (e) { }
        }
    }, 1000);

    return {
        output: result,
        success: !isError,
        time: timeTaken
    };
};

module.exports = {
    runCode
};
