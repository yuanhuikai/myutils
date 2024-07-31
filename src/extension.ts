// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "myutils" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('myutils.text2List', () => {
		const editor = vscode.window.activeTextEditor;

        if (!editor) {
            vscode.window.showErrorMessage('未选中内容');
            return;
        }

        const document = editor.document;
        const selection = editor.selection;
        const text = document.getText(selection);

        // Process the text
        const processedText = text.split('\n')
            .map(line => {
				const trimmedLine = line.trim();
				if (trimmedLine === ""){
					return '';
				}
				if ((trimmedLine.startsWith('"') && trimmedLine.endsWith('"')) || (trimmedLine.startsWith("'") && trimmedLine.endsWith("'"))) {
							return trimmedLine;
				}
				return `"${trimmedLine}"`;
			})
			.filter(line => line !== "")
            .join(',');

        editor.edit(editBuilder => {
            editBuilder.replace(selection, processedText);
        });
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
