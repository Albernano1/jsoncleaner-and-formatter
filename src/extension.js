// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

/**
 * @description "Actual text Editor, declared to be globally used"
 */
let activeTextEditor;

/**
 * @description "Actual text Editor, declared to be globally used"
 */
let activeFilePath;


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

	//Initialize the extension
	// 1 - Set text editor and file
	getActiveTextEditorAndFile();

	context.subscriptions.push(disposableHelloWorld);

	let disposableCleanJson = vscode.commands.registerCommand('wjsoncleaner-and-formatter.cleanJson', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage(' Cleaning Json File ');
	});

	context.subscriptions.push(disposableCleanJson);
}

// this method is called when your extension is deactivated
function deactivate() {}

/**
 * @description "Sets the text editor and current file"
 * @returns nothing
 */
function getActiveTextEditorAndFile(){

	// Calls Vs to get the text editor being used
	activeTextEditor = vscode.window.activeTextEditor;

	if (!activeTextEditor){
		return;
	}

	activeFilePath = vscode.workspace.asRelativePath(
		activeTextEditor.document.uri
	  );
}

/**
 * @description "Cleans the current file"
 * @returns nothing
 */
function cleanJson(){
	//1 get actual editor and file
	getActiveTextEditorAndFile();

	//2 access text

	let text = vscode.window.activeTextEditor.document.getText();

	//;///";";
	text.replaceAll("///*", "*");
	//;/";";
	text.replaceAll("/\"","\"");
	//;"{;{;
	text.replaceAll("\"{","{");
	//;}";};
	text.replaceAll("}\"","}");
	//;"\[;\[;
	text.replaceAll("\"[","[");
	//;\]";\];
	text.replaceAll("]\"","}");
	//;///r///n; ;
	text.replaceAll("///r///n"," ");
	//;///n; ;
	text.replaceAll("///n"," ");
	//;//r//n; ;
	text.replaceAll("//r//n"," ");
	//;//n; ;
	text.replaceAll("//n"," ");
	//;/r/n; ;
	text.replaceAll("/r/n"," ");
	//;/n; ;
	text.replaceAll("/n"," ");

	//3 set text on the window

	activeTextEditor.edit(editBuilder => {
		editBuilder.replace(activeTextEditor.document.getText(), text);
	})
}

module.exports = {
	activate,
	deactivate
}
