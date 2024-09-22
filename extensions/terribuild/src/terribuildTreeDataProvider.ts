import * as vscode from 'vscode';
import { TerribuildConfig, parseTerribuildJson } from './terribuildConfig';

export class TerribuildTreeDataProvider implements vscode.TreeDataProvider<Dependency> {

    private _onDidChangeTreeData: vscode.EventEmitter<Dependency | undefined | void> = new vscode.EventEmitter<Dependency | undefined | void>();
    readonly onDidChangeTreeData: vscode.Event<Dependency | undefined | void> = this._onDidChangeTreeData.event;

    private selectedBinary: string = "";

    setSelectedBinary(selectedBinary: string): void {
        this.selectedBinary = selectedBinary;
    }

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element: Dependency): vscode.TreeItem {
        return element;
    }

    async getChildren(element?: Dependency): Promise<Dependency[]> {
        if (vscode.workspace.workspaceFolders === undefined) {
            throw new Error("No workspace is opened");
        }

        const fileData = await vscode.workspace.fs.readFile(vscode.Uri.joinPath(vscode.workspace.workspaceFolders[0].uri, "terribuild.json"));
        const terribuildConfig = await parseTerribuildJson(fileData.toString());

        const binaries = terribuildConfig.binaries.map(binary => new Dependency(binary === this.selectedBinary ? "[x] " + binary : binary));

        return binaries;
    }
}

export class Dependency extends vscode.TreeItem {

    constructor(
        public readonly label: string,
    ) {
        super(label, vscode.TreeItemCollapsibleState.None);

        this.tooltip = `${this.label}`;
        this.command = {
            command: "terribuild.selectBinary",
            title: "Select binary",
            arguments: [this.label]
        };
    }

    contextValue = 'binary';
}