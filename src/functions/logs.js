export const writeLog = (moduleName, log, variable) => {
	// write to journal
	console.warn(moduleName, ':', log, ':', variable)
}