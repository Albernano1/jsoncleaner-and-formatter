// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

/**
 * @description "Actual text Editor, declared to be globally used"
 */
let activeTextEditor: vscode.TextEditor | undefined;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "wjsoncleaner" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('wjsoncleaner.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from WJsonCleaner!');
	});

	context.subscriptions.push(disposable);

	let disposableCleanJson = vscode.commands.registerCommand('wjsoncleaner.cleanJson', () => {
		// The code you place here will be executed every time your command is executed
		getActiveTextEditorAndFile();
		cleanJson();

		// Display a message box to the user
		vscode.window.showInformationMessage(' Cleaning Json File ');

	});

	context.subscriptions.push(disposableCleanJson);

}

// this method is called when your extension is deactivated
export function deactivate() { }

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

	if (!activeTextEditor) {
		return;
	}

	//2 Modify
	let text = activeTextEditor.document.getText();

	let htmlregex1 = RegExp(/\/https[\S]*\/,/);
	let matches = text.match(htmlregex1);

	if (!matches) {
		return;
	}

	if (matches.length >= 1) {
		matches.forEach(element => {

			//first and last char are going to be replaced by ""
			let modified = element.replace(RegExp(/\//), '"');
			modified = modified.substring(0, modified.length - 1) + '",';

			text = text.replace(element, modified);

		});
	}

	//;///*;*;
	text = text.replaceAll("///*", "*");
	//;///";";
	text = text.replaceAll("///\"", '"');
	//;//";";
	text = text.replaceAll("//\"", '"');
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
	let range = new vscode.Range(0, 0, activeTextEditor.document.lineCount, 0);

	let validatedRange = activeTextEditor.document.validateRange(range);

	activeTextEditor.edit(editBuilder => {
		editBuilder.replace(validatedRange, text);
	});
}
