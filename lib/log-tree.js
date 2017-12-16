/** Tool modules.**/
const Console = require('console').Console;
const Path = require('path');
const Fs = require('fs');
/** Definition. **/

function checkLogFilePath(baseFileDir) {
	/** Generate current log file path. **/
	var currentDate = new Date();
	var commonPath = Path.join(baseFileDir , currentDate.getFullYear().toString(),(parseInt(currentDate.getMonth())+1).toString());
	var yearPath = Path.join(baseFileDir , currentDate.getFullYear().toString());
	var monthPath = Path.join(baseFileDir ,currentDate.getFullYear().toString(),(parseInt(currentDate.getMonth())+1).toString());
	var currentOutFilePath = Path.join(commonPath,(currentDate.getDate()+'.log'));
	try {
		if (!Fs.existsSync(commonPath)) {
			!Fs.existsSync(yearPath) && Fs.mkdirSync(yearPath);
			!Fs.existsSync(monthPath) && Fs.mkdirSync(monthPath);
		}
	} catch(error) {
		console.log("create log directory failed" , error);
		return new Console(process.stdout, process.stderr);
	}


	if (Fs.existsSync(commonPath) && Fs.statSync(commonPath).isDirectory()) {
		const output = Fs.createWriteStream(currentOutFilePath , {flags: 'a+',defaultEncoding:'utf8'});
        return output;
	} else {
        return process.stdout;
	}
}


/** Export module. **/
module.exports = {
	getLogFilePath : checkLogFilePath,
};
