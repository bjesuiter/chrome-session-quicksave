import {showError} from '@lib/chrome-services/notification-service';
import {quicksaveSession} from '@lib/main/quicksave-session';

export default async () => {
	/**
	 * The code to be executed should be placed within a default function that is
	 * exported by the global script. Ensure all of the code in the global script
	 * is wrapped in the function() that is exported.
	 *
	 * IMPORTANT: This file contains the chrome extensions background script code!
	 * It is inside here to take advantage of the stencil compile & bundling pipeline.
	 */

	// Code to run when extension gets installed
	chrome.runtime.onInstalled.addListener(function () {
		// Add code to run after install
		//
		// Demo Code:
		// chrome.storage.sync.set({color: '#3aa757'}, function() {
		//   console.log("The color is green.");
		// });

		alert('Extension Installed!');
	});

	chrome.browserAction.onClicked.addListener(
		/**
		 * @param currentTab see https://developer.chrome.com/extensions/tabs#type-Tab
		 */
		async currentTab => {
			try {
				await quicksaveSession(currentTab);
			} catch (error) {
				await showError('Session Quicksave - Error', `The session could not be saved.`);
				console.error(error);
			}
		}
	);
};
