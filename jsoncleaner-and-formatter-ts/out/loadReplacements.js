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
        let configuredReplacements = vscode.workspace.getConfiguration('jc').get('textReplacements', {});
        let replacements = [];
        Object.entries(configuredReplacements).forEach(propertie => {
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
//# sourceMappingURL=loadReplacements.js.map