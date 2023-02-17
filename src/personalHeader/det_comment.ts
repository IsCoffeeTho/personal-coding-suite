/* ========================================================================== */
/*                                                                            */
/*                                                             /   /   \      */
/*   Made By IsCoffeeTho (Aaron Menadue)                     /    |      \    */
/*                                                          |     |       |   */
/*   det_comment.ts                                         |      \      |   */
/*                                                          |       |     |   */
/*   Last Edited: 12:24AM 18/02/2023                         \      |    /    */
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
		case "bat":
			return ['@REM #', '#'];
		case "ini":
		case "ignore":
		case "properties":
			return ['#']
		default:
			console.error('Unhandled Language:', editor.document.languageId);
			return ['#'];
	}
}