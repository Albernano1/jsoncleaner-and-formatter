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

        let configuredReplacements: Object = vscode.workspace.getConfiguration('jc').get('textReplacements',{});
        let replacements: string[][] = [];

        Object.entries(configuredReplacements).forEach(propertie =>{
            replacements.push([propertie[0], propertie[1]]);
        });

        return replacements;

    } catch (error: any){
        console.log("JC - There's been an error reading replacements: "+ error.message);
        throw new Error("There's been an error reading replacements: "+ error.message);
    }
}