"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadReplacements = void 0;
const path = require("path");
const fs = require("fs");
/**
 * Read Replacement values present in replacements txt, returns them as an strin array
 */
function loadReplacements(context) {
    try {
        let fullFilePath = context.asAbsolutePath(path.join('resources', 'replacements.txt'));
        let fileContent = fs.readFileSync(fullFilePath, 'utf8');
        let replacements = [];
        fileContent.split('\r\n').forEach(line => {
            let selectedPard = line.split(';');
            replacements.push([selectedPard[0], selectedPard[1]]);
        });
        return replacements;
    }
    catch (error) {
        console.log("WJC - There's been an error reading replacement file: " + error.message);
        throw new Error("There's been an error reading replacement file: " + error.message);
    }
}
exports.loadReplacements = loadReplacements;
// module.exports = {
//     loadReplacements: loadReplacements
//   };
//# sourceMappingURL=loadReplacements.js.map