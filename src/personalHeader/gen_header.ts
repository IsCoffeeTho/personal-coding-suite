/* ========================================================================== */
/*                                                                            */
/*                                                             /   /   \      */
/*   Made By IsCoffeeTho (Aaron Menadue)                     /    |      \    */
/*                                                          |     |       |   */
/*   gen_header.ts                                          |      \      |   */
/*                                                          |       |     |   */
/*   Last Edited: 01:00AM 18/02/2023                         \      |    /    */
/*                                                             \   /   /      */
/*                                                                            */
/* ========================================================================== */

import * as vscode from 'vscode';

let settings: vscode.WorkspaceConfiguration;

import getCommentTokens from './det_comment';

export default function generateHeader(editor: vscode.TextEditor) {
	settings = vscode.workspace.getConfiguration('personalCodingSuite.personalHeader');
	var commentTokens = getCommentTokens(editor);
	if (!commentTokens) return false; // if file doesn't have a comment token, do not proceed

	var commentTokenStart = commentTokens[0];
	var commentTokenEnd = commentTokens[0];

	if (commentTokens.length == 2)
		commentTokenEnd = commentTokens[1];

	var text = <string>settings.get('headerText');
	text = text.replace(/<date>/g, () => {
		var currentDate = new Date();
		var isTwelveHrTime = false;
		var date = <string>settings.get('dateFormat');
		date = date.replace(/D+/g, (match) => {
			if (match.length > 1)
				return `${currentDate.getDate()}`.padStart(match.length, '0');
			return `${currentDate.getDate()}`;
		}).replace(/M+/g, (match) => {
			if (match.length > 1)
				return `${currentDate.getMonth() + 1}`.padStart(match.length, '0');
			return `${currentDate.getMonth() + 1}`;
		}).replace(/Y+/g, (match) => {
			if (match.length > 1)
				return `${currentDate.getFullYear()}`.padStart(match.length, '0');
			return `${currentDate.getFullYear()}`;
		}).replace(/a+/g, () => {
			isTwelveHrTime = true;
			if (currentDate.getHours() > 12)
				return "pm";
			return "am";
		}).replace(/A+/g, () => {
			isTwelveHrTime = true;
			if (currentDate.getHours() > 12)
				return "PM";
			return "AM";
		}).replace(/h+/g, (match) => {
			var hour = currentDate.getHours();
			if (isTwelveHrTime) {
				hour %= 12;
				if (hour == 0)
					hour = 12;
			}
			if (match.length > 1)
				return `${hour}`.padStart(match.length, '0');
			return `${hour}`;
		}).replace(/m+/g, (match) => {
			if (match.length > 1)
				return `${currentDate.getMinutes()}`.padStart(match.length, '0');
			return `${currentDate.getMinutes()}`;
		}).replace(/s+/g, (match) => {
			if (match.length > 1)
				return `${currentDate.getMinutes()}`.padStart(match.length, '0');
			return `${currentDate.getMinutes()}`;
		});
		return date;
	}).replace(/<filename>/g, () => { return `${editor.document.fileName.split('/').at(-1)}`; });

	var header = text.split('\n');
	while (header.at(0) == '')
		header.shift();
	while (header.at(-1) == '')
		header.pop();
	var art = (<string>settings.get('asciiArt')).split('\n');
	var artWidth = 0;
	art.forEach((line) => { if (line.length > artWidth) artWidth = line.length; });
	text = "";
	var maxLength = 0;
	if (settings.get('columnWidth.enable')) {
		maxLength = <number>settings.get('columnWidth.width') - 2;
		maxLength -= commentTokenEnd.length;
		maxLength -= commentTokenStart.length;
		if (maxLength < 0) maxLength = 0;
	}
	else {
		header.forEach((line) => { if (line.length > maxLength) maxLength = line.length; });
		maxLength += artWidth;
	}
	text += `${commentTokenStart} ${"=".repeat(maxLength)} ${commentTokenEnd}\n${commentTokenStart} ${" ".repeat(maxLength)} ${commentTokenEnd}\n`;

	var printHeaderTextAfter = 0;
	var printAsciiTextAfter = 0;

	var heightMax = Math.max(header.length, art.length);

	switch (settings.get("textAlign")) {
		case "Bottom":
			printHeaderTextAfter = art.length - header.length;
			printAsciiTextAfter = header.length - art.length;
			break;
		case "Center":
			printHeaderTextAfter = Math.floor((art.length - header.length) / 2);
			printAsciiTextAfter = Math.floor((header.length - art.length) / 2);
			break;
		case "Top": // already done
			break;
	}
	if (printHeaderTextAfter < 0) printHeaderTextAfter = 0;
	if (printAsciiTextAfter < 0) printAsciiTextAfter = 0;

	var padding = " ".repeat(<number>settings.get("textPadding"));

	for (var lineNo = 0; lineNo < heightMax; lineNo++) {
		var line = "";
		var altLineNo = lineNo - printHeaderTextAfter;
		if (altLineNo >= 0 && altLineNo < header.length) {
			line += padding;
			line += header[altLineNo];
		}
		line = line.padEnd(maxLength, " ");
		line = line.slice(0, maxLength);
		altLineNo = lineNo - printAsciiTextAfter
		if (altLineNo >= 0 && altLineNo < art.length) {
			line = line.slice(0, 0 - (artWidth + padding.length));
			line += art[altLineNo];
		}
		line = line.padEnd(maxLength, " ");
		line = line.slice(0, maxLength);
		text += `${commentTokenStart} ${line} ${commentTokenEnd}\n`;
	}
	text += `${commentTokenStart} ${" ".repeat(maxLength)} ${commentTokenEnd}\n${commentTokenStart} ${"=".repeat(maxLength)} ${commentTokenEnd}\n`;
	return text;
}