"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const path_1 = __importDefault(require("path"));
const vscode = __importStar(require("vscode"));
const util = __importStar(require("util"));
const exec = util.promisify(require('child_process').exec);
function getActiveFileDirectory() {
    const fsPath = vscode.window.activeTextEditor?.document.uri.fsPath;
    if (fsPath) {
        return path_1.default.dirname(fsPath);
    }
    vscode.window.showErrorMessage("There is no active text editor");
    return undefined;
}
function getFilesToCompile() {
    const activeFileDirectory = getActiveFileDirectory();
    if (activeFileDirectory) {
        return path_1.default.join(activeFileDirectory, "*.cpp");
    }
    return undefined;
}
function getExecutableName() {
    const activeFileDirectory = getActiveFileDirectory();
    if (activeFileDirectory) {
        if (activeFileDirectory.includes("Library"))
            return "lib" + path_1.default.basename(activeFileDirectory) + ".so";
        else
            return path_1.default.basename(activeFileDirectory);
    }
    return undefined;
}
function getOtherCompileArgs() {
    const activeFileDirectory = getActiveFileDirectory();
    if (activeFileDirectory) {
        if (activeFileDirectory.includes("Library")) {
            return "-shared";
        }
    }
    return "";
}
function getExecutablePath() {
    return getActiveFileDirectory();
}
function getNeededLibsFromReadElf(readElfOutput) {
    const reg = /\[(.*)\]/g;
    let libs = [];
    var match;
    while (match = reg.exec(readElfOutput)) {
        libs.push(match[1]);
    }
    ;
    return libs;
}
async function getAdditionalSOLibPaths() {
    const activeFileDirectory = getActiveFileDirectory();
    const executableName = getExecutableName();
    if (!activeFileDirectory || !executableName) {
        return undefined;
    }
    const executablePath = path_1.default.join(activeFileDirectory, executableName);
    const readElfOutput = (await exec(`readelf -d ${executablePath} | grep 'NEEDED'`)).stdout;
    const allNeededLibs = getNeededLibsFromReadElf(readElfOutput);
    var searchPaths = [];
    for (const neededLib of allNeededLibs) {
        const candidates = await vscode.workspace.findFiles(`**/${neededLib}`);
        for (const candidate of candidates) {
            searchPaths.push(path_1.default.dirname(candidate.fsPath));
        }
    }
    return searchPaths.join(",");
}
function activate(context) {
    console.log('Congratulations, your extension "myExtension" is now active');
    context.subscriptions.push(vscode.commands.registerCommand('my-extension.getFilesToCompile', getFilesToCompile));
    context.subscriptions.push(vscode.commands.registerCommand('my-extension.getExecutableName', getExecutableName));
    context.subscriptions.push(vscode.commands.registerCommand('my-extension.getExecutablePath', getExecutablePath));
    context.subscriptions.push(vscode.commands.registerCommand('my-extension.getOtherCompileArgs', getOtherCompileArgs));
    context.subscriptions.push(vscode.commands.registerCommand('my-extension.getAdditionalSOLibPaths', getAdditionalSOLibPaths));
}
function deactivate() { }
//# sourceMappingURL=extension.js.map