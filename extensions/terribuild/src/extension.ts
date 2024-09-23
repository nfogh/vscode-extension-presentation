import * as vscode from 'vscode';
import { TerribuildConfig, parseTerribuildJson } from './terribuildConfig';
import { TerribuildTreeDataProvider } from './terribuildTreeDataProvider';
import * as path from 'path';

let myStatusBarItem: vscode.StatusBarItem;

let terribuildConfig: TerribuildConfig;
let currentBinary: string;
let terribuildTreeDataProvider: TerribuildTreeDataProvider;

async function selectBinary(binary: string | undefined) {
	let selectedBinary = binary;
	if (!selectedBinary) {
		selectedBinary = await vscode.window.showQuickPick(Array.from(terribuildConfig.binaries.keys()));
	}
	if (selectedBinary) {
		currentBinary = selectedBinary;
		updateStatusBarItem();
		terribuildTreeDataProvider.setSelectedBinary(selectedBinary);
		terribuildTreeDataProvider.refresh();
	}
}

function selectedBinary() {
	return currentBinary;
}

function selectedBinaryPath() {
	const binary = terribuildConfig.binaries.get(currentBinary);
	if (binary) {
		const binaryPath = path.join(binary.dest, binary.name ?? currentBinary);
		console.log(`Binary path is: ${binaryPath}`);
		return binaryPath;
	}
}

function selectedBinaryDir() {
	const binary = terribuildConfig.binaries.get(currentBinary);
	if (binary) {
		console.log(`Binary dir is: ${binary.dest}`);
		return binary.dest;
	}
}

function selectedBinarySOLibPaths() {
	const binary = terribuildConfig.binaries.get(currentBinary);
	if (binary && vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders[0]) {
		const workspaceFolder = vscode.workspace.workspaceFolders[0].uri.fsPath;
		let depDirs = [];
		for (const dep of binary.dependencies) {
			const depBinary = terribuildConfig.binaries.get(dep);
			if (depBinary) {
				depDirs.push(path.join(workspaceFolder, depBinary.dest));
			}
		}
		const paths = depDirs.join(";");
		console.log(`SOLibPaths are: ${paths}`);
		return paths;
	}
}

export async function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "terribuild" is now active!');

	context.subscriptions.push(vscode.commands.registerCommand('terribuild.selectBinary', selectBinary));

	if (vscode.workspace.workspaceFolders === undefined) {
		throw new Error("No workspace is opened");
	}

	const fileData = await vscode.workspace.fs.readFile(vscode.Uri.joinPath(vscode.workspace.workspaceFolders[0].uri, "terribuild.json"));

	terribuildConfig = await parseTerribuildJson(fileData.toString());
	currentBinary = Array.from(terribuildConfig.binaries.keys())[0];

	terribuildTreeDataProvider = new TerribuildTreeDataProvider();
	vscode.window.registerTreeDataProvider('terribuild-binaries', terribuildTreeDataProvider);
	terribuildTreeDataProvider.setSelectedBinary(currentBinary);
	terribuildTreeDataProvider.refresh();

	context.subscriptions.push(vscode.commands.registerCommand('terribuild.selectedBinary', selectedBinary));
	context.subscriptions.push(vscode.commands.registerCommand('terribuild.selectedBinaryPath', selectedBinaryPath));
	context.subscriptions.push(vscode.commands.registerCommand('terribuild.selectedBinaryDir', selectedBinaryDir));
	context.subscriptions.push(vscode.commands.registerCommand('terribuild.selectedBinarySOLibPaths', selectedBinarySOLibPaths));

	myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	myStatusBarItem.command = 'terribuild.selectBinary';
	context.subscriptions.push(myStatusBarItem);
	updateStatusBarItem();
}

function updateStatusBarItem(): void {
	myStatusBarItem.text = `Terribuild (${currentBinary})`;
	myStatusBarItem.show();
}

export function deactivate() {

}
