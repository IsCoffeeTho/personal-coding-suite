/* ========================================================================== */
/*                                                                            */
/*                                                             /   /   \      */
/*   Made By IsCoffeeTho (Aaron Menadue)                     /    |      \    */
/*                                                          |     |       |   */
/*   extension.ts                                           |      \      |   */
/*                                                          |       |     |   */
/*   Last Edited: 12:24AM 18/02/2023                         \      |    /    */
/*                                                             \   /   /      */
/*                                                                            */
/* ========================================================================== */

import * as vscode from 'vscode';

import personalHeader from './personalHeader';

export function activate(context: vscode.ExtensionContext) {
	let commands = [
		...personalHeader
	];
	context.subscriptions.push(...commands);
	vscode.workspace.onWillSaveTextDocument((event) => {
		var document = event.document;
		if (document.uri.scheme === "file")
			vscode.commands.executeCommand('personalCodingSuite.personalHeader.replaceExisting', vscode.window.activeTextEditor);
	});
}

/*
export function deactivate() {

}
*/
