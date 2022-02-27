// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

/**
 * @description "Actual text Editor, declared to be globally used"
 */
let activeTextEditor;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "wjsoncleaner-and-formatter" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposableHelloWorld = vscode.commands.registerCommand('wjsoncleaner-and-formatter.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage(' WJsonCleaner and formatter Activated!');
	});

	let disposableCleanJson = vscode.commands.registerCommand('wjsoncleaner-and-formatter.cleanJson', function () {
		// The code you place here will be executed every time your command is executed
		getActiveTextEditorAndFile();
		cleanJson();

		// Display a message box to the user
		vscode.window.showInformationMessage(' Cleaning Json File ');

	});

	let disposableFormatJson = vscode.commands.registerCommand('wjsoncleaner-and-formatter.formatJson', function () {
		// The code you place here will be executed every time your command is executed
		getActiveTextEditorAndFile();
		formatJson();

		// Display a message box to the user
		vscode.window.showInformationMessage(' Formatting Json File ');

	});

	let disposableCleanAndFormatJson = vscode.commands.registerCommand('wjsoncleaner-and-formatter.cleanAndFormatJson', function () {
		// The code you place here will be executed every time your command is executed
		getActiveTextEditorAndFile();
		cleanAndFormatJson();

		// Display a message box to the user
		vscode.window.showInformationMessage(' Cleaning & Formatting Json File ');

	});

	context.subscriptions.push(disposableHelloWorld);
	context.subscriptions.push(disposableCleanJson);
	context.subscriptions.push(disposableFormatJson);
	context.subscriptions.push(disposableCleanAndFormatJson);


}

// this method is called when your extension is deactivated
function deactivate() { }

/**
 * @description "Sets the text editor and current file"
 * @returns nothing
 */
function getActiveTextEditorAndFile() {

	// Calls Vs to get the text editor being used
	activeTextEditor = vscode.window.activeTextEditor;

	if (!activeTextEditor) {
		return;
	}
}

/**
 * @description "Cleans the current file"
 * @returns nothing
 */
function cleanJson() {
	//1 get actual editor and file - Update done first outside
	//getActiveTextEditorAndFile();

	//2 Modify
	let text = vscode.window.activeTextEditor.document.getText();

	let htmlregex1 = RegExp(/\/https[\S]*\/,/);
	let matches = text.match(htmlregex1);

	if (matches.length >= 1){
		matches.forEach(element => {

			//first and last char are going to be replaced by ""
			let modified = element.replace(RegExp(/\//), '"');
			modified = modified.substring(0, modified.length - 1)+ '",';
	
			text = text.replaceAll(element, modified);
	
		});
	}
	
	//;///*;*;
	text = text.replaceAll("///*", "*");
	//;///";";
	text = text.replaceAll("///\"", '"')
	//;//";";
	text = text.replaceAll("//\"", '"')
	//;/";";
	text = text.replaceAll("/\"", "\"");
	//;"{;{;
	text = text.replaceAll("\"{", "{");
	//;}";};
	text = text.replaceAll("}\"", "}");
	//;"\[;\[;
	text = text.replaceAll("\"[", "[");
	//;\]";\];
	text = text.replaceAll("]\"", "}");
	//;///r///n; ;
	text = text.replaceAll("///r///n", " ");
	//;///n; ;
	text = text.replaceAll("///n", " ");
	//;//r//n; ;
	text = text.replaceAll("//r//n", " ");
	//;//n; ;
	text = text.replaceAll("//n", " ");
	//;/r/n; ;
	text = text.replaceAll("/r/n", " ");
	//;/n; ;
	text = text.replaceAll("/n", " ");

	//3 set text on the window
	//Creating a new range with startLine, startCharacter & endLine, endCharacter.
	let range = new vscode.Range(0, 0, vscode.window.activeTextEditor.document.lineCount, 0);

	let validatedRange = vscode.window.activeTextEditor.document.validateRange(range);

	activeTextEditor.edit(editBuilder => {
		editBuilder.replace(validatedRange, text);
	})
}

/**
 * @description "Formats the current File"
 * @returns nothing
 */
function formatJson() {

	//MUAHHAHAHAHAHHAHAHAHHAHAH
	vscode.commands.executeCommand('vscode.executeFormatDocumentProvider', vscode.window.activeTextEditor.document.uri)

}

/**
 * @description "Cleans and formats the current File"
 * @returns nothing
 */
function cleanAndFormatJson() {

	//Just Call the two functions
	cleanJson();
	formatJson();

}

module.exports = {
	activate,
	deactivate
}
