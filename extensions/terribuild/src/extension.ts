import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "terribuild" is now active!');

	let disposable = vscode.commands.registerCommand('terribuild.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from terribuild!');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }
