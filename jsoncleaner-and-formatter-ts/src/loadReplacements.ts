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

        let configuredReplacements: String|undefined ="";
        
        if (vscode.workspace.getConfiguration('WJC(WayletJsonCleaner).properties').has('wjc.textReplacments')){
            configuredReplacements = vscode.workspace.getConfiguration('WJC(WayletJsonCleaner).properties').get('wjc.textReplacments');
        }else{
            throw new Error("Nothing to retrieve from extension configuration");
        }

        let replacements: string[][] = [];
        let replacementsObjetc: Object = {};

        if(configuredReplacements !== ""){
            replacementsObjetc = JSON.parse(String(configuredReplacements));
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
        console.log("WJC - There's been an error reading replacements: "+ error.message);
        throw new Error("There's been an error reading replacements: "+ error.message);
    }
}


// module.exports = {
//     loadReplacements: loadReplacements
//   };