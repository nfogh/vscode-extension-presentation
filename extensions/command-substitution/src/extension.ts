import path from 'path';
import * as vscode from 'vscode';
import * as util from 'util';
const exec = util.promisify(require('child_process').exec);

function getActiveFileDirectory(): string | undefined {
	const fsPath = vscode.window.activeTextEditor?.document.uri.fsPath;
	if (fsPath) {
		return path.dirname(fsPath);
	}
	vscode.window.showErrorMessage("There is no active text editor");
	return undefined;
}

function getFilesToCompile(): string | undefined {
	const activeFileDirectory = getActiveFileDirectory();
	if (activeFileDirectory) {
		return path.join(activeFileDirectory, "*.cpp");
	}
	return undefined;
}

function getExecutableName(): string | undefined {
	const activeFileDirectory = getActiveFileDirectory();
	if (activeFileDirectory) {
		if (activeFileDirectory.includes("Library"))
			return "lib" + path.basename(activeFileDirectory) + ".so";
		else
			return path.basename(activeFileDirectory);
	}
	return undefined;
}

function getOtherCompileArgs(): string | undefined {
	const activeFileDirectory = getActiveFileDirectory();
	if (activeFileDirectory) {
		if (activeFileDirectory.includes("Library")) {
			return "-shared";
		}
	}
	return "";
}

function getExecutablePath(): string | undefined {
	return getActiveFileDirectory();
}

function getNeededLibsFromReadElf(readElfOutput: string): string[] {
	const reg = /\[(.*)\]/g;
	let libs: string[] = [];
	var match;
	while (match = reg.exec(readElfOutput)) {
		libs.push(match[1]);
	};
	return libs;
}


async function getAdditionalSOLibPaths(): Promise<string | undefined> {
	const activeFileDirectory = getActiveFileDirectory();
	const executableName = getExecutableName();
	if (!activeFileDirectory || !executableName) {
		return undefined;
	}

	const executablePath = path.join(activeFileDirectory, executableName);

	const readElfOutput = (await exec(`readelf -d ${executablePath} | grep 'NEEDED'`)).stdout;

	const allNeededLibs = getNeededLibsFromReadElf(readElfOutput);

	var searchPaths: string[] = [];
	for (const neededLib of allNeededLibs) {
		const candidates = await vscode.workspace.findFiles(`**/${neededLib}`);
		for (const candidate of candidates) {
			searchPaths.push(path.dirname(candidate.fsPath));
		}
	}

	return searchPaths.join(",");
}

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "myExtension" is now active');

	context.subscriptions.push(vscode.commands.registerCommand('my-extension.getFilesToCompile', getFilesToCompile));
	context.subscriptions.push(vscode.commands.registerCommand('my-extension.getExecutableName', getExecutableName));
	context.subscriptions.push(vscode.commands.registerCommand('my-extension.getExecutablePath', getExecutablePath));
	context.subscriptions.push(vscode.commands.registerCommand('my-extension.getOtherCompileArgs', getOtherCompileArgs));
	context.subscriptions.push(vscode.commands.registerCommand('my-extension.getAdditionalSOLibPaths', getAdditionalSOLibPaths));
}

export function deactivate() { }
