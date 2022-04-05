import * as fs from 'fs';

/**
 * Read Replacement values present in replacements txt, returns them as an strin array
 */

function loadReplacements(){

    let fileContent = fs.readFileSync('replacements.txt','utf8');

    let replacements: string[][] = [];

    fileContent.split('\r\n').forEach(line => {
        let selectedPard = line.split(';');
        replacements.push([selectedPard[0], selectedPard[1]]);
    });

    return replacements;
}


module.exports = {
    loadReplacements: loadReplacements
  };