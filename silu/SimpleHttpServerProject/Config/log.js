import fs from "fs";


const dir_path = '/tmp';
const fileName = '/log.txt'
const logFilePath = dir_path+fileName;
export const initializeLog = () => {
    if (!fs.existsSync(dir_path)) {
        fs.mkdirSync(dir_path);
    }
    try{
        fs.writeFileSync(logFilePath, "");
    }catch(err){
        console.log('File Allready there')
    }
}

export const logToFile = (message) => {
    try {
        const timestamp = new Date(Date.now()).toString()
        const logMessage = `${timestamp} : ${message}\n`;
        fs.appendFileSync(logFilePath, logMessage);
    } catch (err) {
        console.error('Error writing to log file:', err);
    }
}
