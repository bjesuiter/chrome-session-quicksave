// import { showError } from '@lib/chrome-services/notification-service';
// import { initializeOptions } from '@lib/main/initialize-options';
// import { quicksaveSession } from '@lib/main/quicksave-session';

self.addEventListener('install', function (event) {
	console.log('Background Worker installed!', event);
});

// /**
//  * The code to be executed should be placed within a default function that is
//  * exported by the global script. Ensure all of the code in the global script
//  * is wrapped in the function() that is exported.
//  *
//  * IMPORTANT: This file contains the chrome extensions background script code!
//  * It is inside here to take advantage of the stencil compile & bundling pipeline.
//  */

// // Code to run when extension gets installed
// chrome.runtime.onInstalled.addListener(async function () {
// 	try {
// 		await initializeOptions();
// 		console.log('Extension Installed Successfully!');
// 	} catch (error) {
// 		const errorMessage = `Error while creating Extension Options Storage! Please contact the developer about it!`;
// 		showError('Installation Error', errorMessage);
// 		console.error(errorMessage, error);
// 	}
// });

// // TODO: make PR for Definiteliy Typed github Repo with new Manifest V3 Chrome Typing Changes
// // https://developer.chrome.com/docs/extensions/mv3/mv3-migration-checklist/
// const chromeAny = chrome as any;
// chromeAny.action.onClicked.addListener(
// 	/**
// 	 * @param currentTab see https://developer.chrome.com/extensions/tabs#type-Tab
// 	 */
// 	async (currentTab) => {
// 		try {
// 			await quicksaveSession(currentTab);
// 		} catch (error) {
// 			await showError('Session Quicksave - Error', `The session could not be saved.`);
// 			console.error(error);
// 		}
// 	}
// );
