"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadReplacements = void 0;
const path = require("path");
const fs = require("fs");
const vscode = require("vscode");
/**
 * Read Replacement values present in replacements txt, returns them as an strin array
 */
function loadReplacements(context) {
    try {
        let fullFilePath = context.asAbsolutePath(path.join('resources', 'replacements.txt'));
        let fileContent = fs.readFileSync(fullFilePath, 'utf8');
        let configuredReplacements;
        configuredReplacements = vscode.workspace.getConfiguration('jc.textReplacments').get('replacements', null);
        let replacements = [];
        let replacementsObjetc = {};
        if (configuredReplacements !== null) {
            replacementsObjetc = JSON.parse(String(configuredReplacements));
        }
        else {
            throw new Error("Couldn't retrieve value from configuration");
        }
        // fileContent.split('\r\n').forEach(line => {
        //     let selectedPard: string[] = line.split(';');
        //     replacements.push([selectedPard[0], selectedPard[1]]);
        // });
        Object.entries(replacementsObjetc).forEach(propertie => {
            replacements.push([propertie[0], propertie[1]]);
        });
        return replacements;
    }
    catch (error) {
        console.log("JC - There's been an error reading replacements: " + error.message);
        throw new Error("There's been an error reading replacements: " + error.message);
    }
}
exports.loadReplacements = loadReplacements;
// module.exports = {
//     loadReplacements: loadReplacements
//   };
//# sourceMappingURL=loadReplacements.js.map