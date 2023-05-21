/* ========================================================================== */
/*                                                                            */
/*                                                             /   /   \      */
/*   Made By IsCoffeeTho (Aaron Menadue)                     /    |      \    */
/*                                                          |     |       |   */
/*   index.ts                                               |      \      |   */
/*                                                          |       |     |   */
/*   Last Edited: 01:00AM 18/02/2023                         \      |    /    */
/*                                                             \   /   /      */
/*                                                                            */
/* ========================================================================== */

import * as vscode from 'vscode';

import getCommentTokens from './det_comment';
import generateHeader from './gen_header';

export default [
	vscode.commands.registerTextEditorCommand('personalCodingSuite.personalHeader.update', (editor: vscode.TextEditor) => {
		var commentTokens = getCommentTokens(editor);
		if (!commentTokens) return false; // if file doesn't have a comment token, do not proceed

		var commentTokenStart = commentTokens[0];
		var commentTokenEnd = commentTokens[0];
		if (commentTokens.length == 2) commentTokenEnd = commentTokens[1];

		var linesToRemove = 0;
		var testAgainst = editor.document.getText(new vscode.Range(0, 0, editor.document.lineCount, 0)).split('\n');
		while (testAgainst.length > 0) {
			var line = <string>testAgainst.shift();

			if (line.at(-1) == '\r')
				line = line.slice(0, -1); // windows line endings being \r\n

			if (line.startsWith(commentTokenStart) && line.endsWith(commentTokenEnd))
				linesToRemove++;
			else {
				if (line == '')
					linesToRemove++;
				break;
			}
		}
		editor.edit((edit) => {
			var text = <string>generateHeader(editor);
			var headerSize = text.split('\n').length;

			console.log(linesToRemove, headerSize);

			if (linesToRemove == headerSize)
				edit.replace(new vscode.Range(0, 0, headerSize, 0), `${text}\n`);
			else {
				edit.delete(new vscode.Range(0, 0, linesToRemove, 0));
				edit.insert(new vscode.Position(0, 0), `${text}\n`);
			}
		});
	}),
	vscode.commands.registerTextEditorCommand('personalCodingSuite.personalHeader.replaceExisting', (editor: vscode.TextEditor) => {
		var commentTokens = getCommentTokens(editor);
		if (!commentTokens) return false; // if file doesn't have a comment token, do not proceed

		var commentTokenStart = commentTokens[0];
		var commentTokenEnd = commentTokens[0];
		if (commentTokens.length == 2) commentTokenEnd = commentTokens[1];

		var linesToRemove = 0;
		var testAgainst = editor.document.getText(new vscode.Range(0, 0, editor.document.lineCount, 0)).split('\n');
		while (testAgainst.length > 0) {
			var line = <string>testAgainst.shift();

			if (line.at(-1) == '\r')
				line = line.slice(0, -1); // windows line endings being \r\n

			if (line.startsWith(commentTokenStart) && line.endsWith(commentTokenEnd))
				linesToRemove++;
			else {
				if (line == '')
					linesToRemove++;
				break;
			}
		}
		editor.edit((edit) => {
			var text = <string>generateHeader(editor);
			var headerSize = text.split('\n').length;

			console.log(linesToRemove, headerSize);

			if (linesToRemove == headerSize)
				edit.replace(new vscode.Range(0, 0, headerSize, 0), `${text}\n`);
		});
	})
]