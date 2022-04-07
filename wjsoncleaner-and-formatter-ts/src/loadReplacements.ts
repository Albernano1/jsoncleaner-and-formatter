import * as path from 'path';
import * as fs from 'fs';
import * as vscode from 'vscode';

/**
 * Read Replacement values present in replacements txt, returns them as an strin array
 */

export function loadReplacements(context: vscode.ExtensionContext): string[][] {

    try {
        
    
    let fullFilePath: string = context.asAbsolutePath(path.join('resources', 'replacements.txt'));
    let fileContent = fs.readFileSync(fullFilePath,'utf8');

    let replacements: string[][] = [];

    fileContent.split('\r\n').forEach(line => {
        let selectedPard: string[] = line.split(';');
        replacements.push([selectedPard[0], selectedPard[1]]);
    });

    return replacements;

    } catch (error: any){
        console.log("WJC - There's been an error reading replacement file: "+ error.message);
        throw new Error("There's been an error reading replacement file: "+ error.message);
    }
}


// module.exports = {
//     loadReplacements: loadReplacements
//   };