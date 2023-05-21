/* ========================================================================== */
/*                                                                            */
/*                                                             /   /   \      */
/*   Made By IsCoffeeTho (Aaron Menadue)                     /    |      \    */
/*                                                          |     |       |   */
/*   det_comment.ts                                         |      \      |   */
/*                                                          |       |     |   */
/*   Last Edited: 11:50AM 21/05/2023                         \      |    /    */
/*                                                             \   /   /      */
/*                                                                            */
/* ========================================================================== */

import * as vscode from 'vscode';

export default function getCommentTokens(editor: vscode.TextEditor) {
	switch (editor.document.languageId) {
		case "json":
			return false;
		case "markdown":
		case "html":
		case "xml":
			return ["<!--", "-->"];
		case "javascript":
		case "typescript":
		case "css":
		case "c":
		case "cpp":
		case "objective-c":
		case "objective-cpp":
		case "csharp":
		case "groovy":
		case "kotlin":
			return ['/*', '*/'];
		case "asm-intel-x86-generic":
		case "nasm":
			return [';;']; // this looks better than one
		case "bat":
			return ['@REM #', '#'];
		case "ini":
		case "ignore":
		case "properties":
		case "makefile":
			return ['#'];
		default:
			vscode.window.showErrorMessage(`Unhandled Language: ${editor.document.languageId}`);
			return ['#'];
	}
}