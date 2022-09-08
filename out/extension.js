"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
function myBracket(leftSep, rightSep) {
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
            if (end === chars.length) {
                return result;
            }
            for (let i = nChar; i > 0; i--) {
                if (i === nChar && selection.isEmpty) {
                    continue;
                }
                let moji = chars[i];
                // if (moji.match(leftSep))  {
                if (moji === leftSep) {
                    start = i;
                    break;
                }
            }
            if (start === 0) {
                return result;
            }
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
function activate(context) {
    let disposable1 = vscode.commands.registerCommand('bracket.deleteInBracket1', () => {
        if (myBracket('"', '"')) {
            return;
        }
        else if (myBracket("'", "'")) {
            return;
        }
        else if (myBracket("(", ")")) {
            return;
        }
        else if (myBracket('{', '}')) {
            return;
        }
        else if (myBracket('\[', '\]')) {
            return;
        }
    });
    context.subscriptions.push(disposable1);
    let disposable2 = vscode.commands.registerCommand('bracket.deleteInBracket2', () => {
        if (myBracket(' ', ' ')) {
            return;
        }
        else if (myBracket(" ", ">")) {
            return;
        }
        else if (myBracket(" ", '"')) {
            return;
        }
        else if (myBracket('"', " ")) {
            return;
        }
    });
    context.subscriptions.push(disposable2);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map