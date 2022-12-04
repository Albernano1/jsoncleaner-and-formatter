"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
//@ts-check
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const loadReplacements_1 = require("./loadReplacements");
//let loadReplacements = require('./loadReplacements');
/**
 * @description "Actual text Editor, declared to be globally used"
 */
let activeTextEditor;
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "jsoncleaner" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposableCleanJson = vscode.commands.registerCommand('jsoncleaner.cleanJson', () => {
        // The code you place here will be executed every time your command is executed
        getActiveTextEditorAndFile(context);
        cleanJson(context);
        // Display a message box to the user
        vscode.window.showInformationMessage(' Cleaning Json File ');
    });
    context.subscriptions.push(disposableCleanJson);
    console.log('Command registered');
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
/**
 * @description "Sets the text editor and current file"
 * @returns nothing
 */
function getActiveTextEditorAndFile(context) {
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
function cleanJson(context) {
    try {
        // Step 1 - Load replacements from file
        let replacements;
        replacements = (0, loadReplacements_1.loadReplacements)(context);
        if (!vscode.window.activeTextEditor) {
            // Handle as error
            throw new Error('No active text editor in use');
        }
        //Step 2 - Recover active editor text and apply modifications
        let text = vscode.window.activeTextEditor.document.getText();
        // Step 2.1 - Modify HTML urls
        text = htmltextModification(context, text);
        // Step 2.2 - Modify Loaded from text file replacement pairs
        replacements.forEach(element => {
            text = text.replaceAll(element[0], element[1]);
        });
        //Step 3 - Set text on the window
        //Creating a new range with startLine, startCharacter & endLine, endCharacter.
        let range = new vscode.Range(0, 0, vscode.window.activeTextEditor.document.lineCount, 0);
        range = vscode.window.activeTextEditor.document.validateRange(range);
        let edit = new vscode.WorkspaceEdit();
        edit.replace(vscode.window.activeTextEditor.document.uri, range, text);
        vscode.workspace.applyEdit(edit);
        vscode.window.showInformationMessage(' Execution Completed ');
    }
    catch (error) {
        console.log("JC - There has been an error triying to clean the file: " + error.message);
        vscode.window.showErrorMessage(" There has been an error triying to clean the file: " + error.message);
    }
}
/**
 * @description "Cleans the current file"
 * @returns nothing
 */
function htmltextModification(context, text) {
    let htmlregex1 = RegExp(/\/https[\S]*\/,/);
    let matches = text.match(htmlregex1);
    if (!matches) {
        //Matches Null, warning and end
        vscode.window.showInformationMessage(' No matches to modify ');
    }
    else if (matches.length >= 1) {
        matches.forEach(element => {
            //First and last char are going to be replaced by ""
            let modified = element.replace(RegExp(/\//), '"');
            modified = modified.substring(0, modified.length - 1) + '",';
            text = text.replace(element, modified);
        });
    }
    else {
        //No matches, warning and end
        vscode.window.showInformationMessage(' No matches to modify ');
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
//# sourceMappingURL=extension.js.map