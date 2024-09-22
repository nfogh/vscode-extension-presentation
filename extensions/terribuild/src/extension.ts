import * as vscode from 'vscode';
import { TerribuildConfig, parseTerribuildJson } from './terribuildConfig';
import { TerribuildTreeDataProvider } from './terribuildTreeDataProvider';

let myStatusBarItem: vscode.StatusBarItem;

let terribuildConfig: TerribuildConfig;
let currentBinary: string;
let terribuildTreeDataProvider: TerribuildTreeDataProvider;

async function selectBinary(binary: string | undefined) {
	let selectedBinary = binary;
	if (!selectedBinary) {
		selectedBinary = await vscode.window.showQuickPick(terribuildConfig.binaries);
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

export async function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "terribuild" is now active!');

	context.subscriptions.push(vscode.commands.registerCommand('terribuild.selectBinary', selectBinary));

	if (vscode.workspace.workspaceFolders === undefined) {
		throw new Error("No workspace is opened");
	}

	const fileData = await vscode.workspace.fs.readFile(vscode.Uri.joinPath(vscode.workspace.workspaceFolders[0].uri, "terribuild.json"));

	terribuildConfig = await parseTerribuildJson(fileData.toString());
	currentBinary = terribuildConfig.binaries[0];

	terribuildTreeDataProvider = new TerribuildTreeDataProvider();
	vscode.window.registerTreeDataProvider('terribuild-binaries', terribuildTreeDataProvider);
	terribuildTreeDataProvider.setSelectedBinary(currentBinary);
	terribuildTreeDataProvider.refresh();

	context.subscriptions.push(vscode.commands.registerCommand('terribuild.selectedBinary', selectedBinary));

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
