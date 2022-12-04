var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module2, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", !isNodeMode && module2 && module2.__esModule ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __toCommonJS = /* @__PURE__ */ ((cache) => {
  return (module2, temp) => {
    return cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp);
  };
})(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

// src/extension.ts
var extension_exports = {};
__export(extension_exports, {
  activate: () => activate,
  deactivate: () => deactivate
});
var vscode2 = __toESM(require("vscode"));

// src/loadReplacements.ts
var path = __toESM(require("path"));
var fs = __toESM(require("fs"));
var vscode = __toESM(require("vscode"));
function loadReplacements(context) {
  try {
    let fullFilePath = context.asAbsolutePath(path.join("resources", "replacements.txt"));
    let fileContent = fs.readFileSync(fullFilePath, "utf8");
    let configuredReplacements = vscode.workspace.getConfiguration("jc").get("textReplacements", {});
    let replacements = [];
    Object.entries(configuredReplacements).forEach((propertie) => {
      replacements.push([propertie[0], propertie[1]]);
    });
    return replacements;
  } catch (error) {
    console.log("JC - There's been an error reading replacements: " + error.message);
    throw new Error("There's been an error reading replacements: " + error.message);
  }
}

// src/extension.ts
var activeTextEditor;
function activate(context) {
  console.log('Congratulations, your extension "jsoncleaner" is now active!');
  let disposableCleanJson = vscode2.commands.registerCommand("jsoncleaner.cleanJson", () => {
    getActiveTextEditorAndFile(context);
    cleanJson(context);
    vscode2.window.showInformationMessage(" Cleaning Json File ");
  });
  context.subscriptions.push(disposableCleanJson);
  console.log("Command registered");
}
function deactivate() {
}
function getActiveTextEditorAndFile(context) {
  activeTextEditor = vscode2.window.activeTextEditor;
  if (!activeTextEditor) {
    return;
  }
}
function cleanJson(context) {
  try {
    let replacements;
    replacements = loadReplacements(context);
    if (!vscode2.window.activeTextEditor) {
      throw new Error("No active text editor in use");
    }
    let text = vscode2.window.activeTextEditor.document.getText();
    text = htmltextModification(context, text);
    replacements.forEach((element) => {
      text = text.replaceAll(element[0], element[1]);
    });
    let range = new vscode2.Range(0, 0, vscode2.window.activeTextEditor.document.lineCount, 0);
    range = vscode2.window.activeTextEditor.document.validateRange(range);
    let edit = new vscode2.WorkspaceEdit();
    edit.replace(vscode2.window.activeTextEditor.document.uri, range, text);
    vscode2.workspace.applyEdit(edit);
    vscode2.window.showInformationMessage(" Execution Completed ");
  } catch (error) {
    console.log("JC - There has been an error triying to clean the file: " + error.message);
    vscode2.window.showErrorMessage(" There has been an error triying to clean the file: " + error.message);
  }
}
function htmltextModification(context, text) {
  let htmlregex1 = RegExp(/\/https[\S]*\/,/);
  let matches = text.match(htmlregex1);
  if (!matches) {
    vscode2.window.showInformationMessage(" No matches to modify ");
  } else if (matches.length >= 1) {
    matches.forEach((element) => {
      let modified = element.replace(RegExp(/\//), '"');
      modified = modified.substring(0, modified.length - 1) + '",';
      text = text.replace(element, modified);
    });
  } else {
    vscode2.window.showInformationMessage(" No matches to modify ");
  }
  return text;
}
module.exports = __toCommonJS(extension_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate,
  deactivate
});
//# sourceMappingURL=main.js.map
