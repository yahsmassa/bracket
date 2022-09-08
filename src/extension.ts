// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import exp = require('constants');
import * as vscode from 'vscode';

function myBracket(leftSep: string, rightSep: string): boolean {
	let result = false;
	let editor = vscode.window.activeTextEditor;
	if (editor) {
		let doc = editor.document;
		let selection = editor.selection;

		if (selection.isSingleLine) {
			let rowNumber = selection.start.line;
			let nChar = selection.start.character;
			let lineTxt = doc.lineAt(rowNumber).text;
			let chars = lineTxt.split('');
			let start = 0;
			let end = chars.length;
			for (let i = nChar; i < chars.length; i++) {
				let moji = chars[i];
				// if (moji.match(rightSep))  {
				if (moji === rightSep) {
					end = i;
					break;
				}
			}
			if (end === chars.length) { return result; }
			for (let i = nChar; i > 0; i--) {
				if (i === nChar && selection.isEmpty) { continue; }
				let moji = chars[i];
				// if (moji.match(leftSep))  {
				if (moji === leftSep) {
					start = i;
					break;
				}
			}
			if (start === 0) { return result; }
			let startPos = new vscode.Position(rowNumber, start + 1);
			let endPos = new vscode.Position(rowNumber, end);
			let selectedRange = new vscode.Selection(startPos, endPos);

			editor.edit(edit => {
				edit.delete(selectedRange);
				let resut = true;
			});
			// vscode.window.showInformationMessage('Hello World from extension!');
		}
	}
	return result;
}
export function activate(context: vscode.ExtensionContext) {

	let disposable1 = vscode.commands.registerCommand('bracket.deleteInBracket1', () => {
		if (myBracket('"', '"')) { return; }
		else if (myBracket("'", "'")) { return; }
		else if (myBracket("(", ")")) { return; }
		else if (myBracket('{', '}')) { return; }
		else if (myBracket('\[', '\]')) { return; }
	});
	context.subscriptions.push(disposable1);

	let disposable2 = vscode.commands.registerCommand('bracket.deleteInBracket2', () => {
		if (myBracket(' ', ' ')) { return; }
		else if (myBracket(" ", ">")) { return; }
		else if (myBracket(" ", '"')) { return; }
		else if (myBracket('"', " ")) { return; }
	});
	context.subscriptions.push(disposable2);
}

// this method is called when your extension is deactivated

export function deactivate() { }
