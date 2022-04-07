//@ts-check
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import {loadReplacements} from './loadReplacements';

//let loadReplacements = require('./loadReplacements');

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
		vscode.window.showInformationMessage('Hello World from WJsonCleaner TS!');
	});

	context.subscriptions.push(disposable);

	let disposableCleanJson = vscode.commands.registerCommand('wjsoncleaner.cleanJson', () => {
		// The code you place here will be executed every time your command is executed
		getActiveTextEditorAndFile(context);
		cleanJson(context);

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
function getActiveTextEditorAndFile(context: vscode.ExtensionContext) {

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
function cleanJson(context: vscode.ExtensionContext) {
	
	try {
	
		// Step 1 - Load replacements from file
		let replacements:string[][];
	
		replacements = loadReplacements(context);

		if (!vscode.window.activeTextEditor) {
			// Display a message box to the user
			vscode.window.showWarningMessage(' No active text editor in use ');
			return;
		}

		//Step 2 - Recover active editor text and apply modifications
		let text: string = vscode.window.activeTextEditor.document.getText();
		
		// Step 2.1 - Modify HTML urls
		text = htmltextModification(context, text) ;

		// Step 2.2 - Modify Loaded from text file replacement pairs
		replacements.forEach(element => {
			text = text.replaceAll(element[0],element[1]);
		});

		//Step 3 - Set text on the window
		//Creating a new range with startLine, startCharacter & endLine, endCharacter.
		let range: vscode.Range = new vscode.Range(0,0,vscode.window.activeTextEditor.document.lineCount, 0);
		range = vscode.window.activeTextEditor.document.validateRange(range);
		
		vscode.window.activeTextEditor.edit(editBuilder => {
			editBuilder.replace(range, text);
		});

		vscode.window.showWarningMessage(' File modified ');

	} catch (error: any) {
		vscode.window.showWarningMessage(" There has been an error triying to clean the file: "+error.message);
	}
}

/**
 * @description "Cleans the current file"
 * @returns nothing
 */
function htmltextModification(context: vscode.ExtensionContext, text: string):string{

	let htmlregex1: RegExp = RegExp(/\/https[\S]*\/,/);
	let matches: RegExpMatchArray | null = text.match(htmlregex1);
	
	if (!matches) {
		//Matches Null, warning and end
		vscode.window.showWarningMessage(' No matches to modify ');
		return '';

	}else if (matches.length >= 1) {
		matches.forEach(element => {
			//First and last char are going to be replaced by ""
			let modified = element.replace(RegExp(/\//), '"');
			modified = modified.substring(0, modified.length - 1) + '",';
			text = text.replace(element, modified);
		});

	}else{
		//No matches, warning and end
		vscode.window.showWarningMessage(' No matches to modify ');
		return '';
	}

	return text;
}

// //;///*;*;
	// text = text.replaceAll("///*", "*");
	// //;///";";
	// text = text.replaceAll("///\"", '"');
	// //;//";";
	// text = text.replaceAll("//\"", '"');
	// //;/";";
	// text = text.replaceAll("/\"", "\"");
	// //;"{;{;
	// text = text.replaceAll("\"{", "{");
	// //;}";};
	// text = text.replaceAll("}\"", "}");
	// //;"\[;\[;
	// text = text.replaceAll("\"[", "[");
	// //;\]";\];
	// text = text.replaceAll("]\"", "}");
	// //;///r///n; ;
	// text = text.replaceAll("///r///n", " ");
	// //;///n; ;
	// text = text.replaceAll("///n", " ");
	// //;//r//n; ;
	// text = text.replaceAll("//r//n", " ");
	// //;//n; ;
	// text = text.replaceAll("//n", " ");
	// //;/r/n; ;
	// text = text.replaceAll("/r/n", " ");
	// //;/n; ;
	// text = text.replaceAll("/n", " ");



