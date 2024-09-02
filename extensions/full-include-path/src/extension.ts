import * as vscode from 'vscode';
import * as glob from 'glob';

//If the current line includes an include directive, make it relative to the workspace root
async function makeIncludeFullPath(editor: vscode.TextEditor, edit: vscode.TextEditorEdit) {
	const line = editor.document.lineAt(editor.selection.active.line);
	const includeDirective = line.text.match(/#include\s+["<](.*)[">]/);
	if (includeDirective) {
		const includePath = includeDirective[1];
		const workspaceFolder = vscode.workspace.getWorkspaceFolder(editor.document.uri);
		if (workspaceFolder) {
			// Search fo the file in the workspace
			const fullPaths = glob.globSync(`${workspaceFolder.uri.fsPath}/**/${includePath}`);
			if (fullPaths.length === 0) {
				vscode.window.showErrorMessage(`Unable to find file ${includePath}`);
				return;
			}
			if (fullPaths.length > 1) {
				vscode.window.showErrorMessage(`Multiple files found for ${includePath}`);
				return;
			}
			const relativePath = vscode.workspace.asRelativePath(fullPaths[0], false);
			edit.replace(line.range, `#include "${relativePath}"`);
		}
	}
}

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "full-include-path" is now active!');

	const disposable = vscode.commands.registerTextEditorCommand('full-include-path.make-include-full-path', makeIncludeFullPath);

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
