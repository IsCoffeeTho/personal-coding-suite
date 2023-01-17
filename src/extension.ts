import * as vscode from 'vscode';

import personalHeader from './personalHeader';

export function activate(context: vscode.ExtensionContext) {
	let commands = [
		...personalHeader
	];
	context.subscriptions.push(...commands);
}

/*
export function deactivate() {

}
*/
