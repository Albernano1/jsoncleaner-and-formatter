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

        let configuredReplacements: string|null;
        
        configuredReplacements = vscode.workspace.getConfiguration('jc.textReplacments').get('replacements',null);

        let replacements: string[][] = [];
        let replacementsObjetc: Object = {};

        if(configuredReplacements !== null){
            replacementsObjetc = JSON.parse(String(configuredReplacements.get()));
        }else{
            throw new Error("Couldn't retrieve value from configuration");
        }

        // fileContent.split('\r\n').forEach(line => {
        //     let selectedPard: string[] = line.split(';');
        //     replacements.push([selectedPard[0], selectedPard[1]]);
        // });

        Object.entries(replacementsObjetc).forEach(propertie =>{
            replacements.push([propertie[0], propertie[1]]);
        });

        return replacements;

    } catch (error: any){
        console.log("JC - There's been an error reading replacements: "+ error.message);
        throw new Error("There's been an error reading replacements: "+ error.message);
    }
}


// module.exports = {
//     loadReplacements: loadReplacements
//   };