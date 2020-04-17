import format from 'date-fns/format';
import {searchBookmarkFolders, saveSession} from './chrome-services/bookmark-service';
import {getTabsInWindow} from './chrome-services/tabs-service';
import {showSimpleNotification, showError} from './chrome-services/notification-service';

// Code to run when extension gets installed
chrome.runtime.onInstalled.addListener(function () {
	// Demo Alert Works!
	//alert("Chrome Session Quicksave installed successfully");
	//
	// Demo Code:
	// chrome.storage.sync.set({color: '#3aa757'}, function() {
	//   console.log("The color is green.");
	// });
});

async function quicksaveSession(currentTab) {
	const currentWindowId = currentTab.windowId;

	const sessionName = prompt(
		'Please insert a name for the session',
		'New Session ' + format(new Date(), 'yyyy-MM-dd')
	);

	if (!sessionName) {
		// user clicked on 'cancel' for the session name promt
		return;
	}

	// this uses the first result, may break easily!
	// replace with target folder selection via plugin later
	const [sessionsFolder] = await searchBookmarkFolders('Sessions');
	console.log('SessionsFolder: ', sessionsFolder);

	const tabs = await getTabsInWindow(currentWindowId);
	console.log('Tabs', tabs);

	// TODO: saveSession
	const newSessionFolder = await saveSession(sessionsFolder.id, sessionName, tabs);
	console.log('NewSessionFolder', newSessionFolder);
	return newSessionFolder;
}

chrome.browserAction.onClicked.addListener(
	/**
	 * @param currentTab see https://developer.chrome.com/extensions/tabs#type-Tab
	 */
	async currentTab => {
		try {
			const sessionFolder = await quicksaveSession(currentTab);
			// Todo: show notification which allows jumping to the new session folder in bookmark manager view
			await showSimpleNotification(
				'Session Quicksave - Success',
				`The new Session "${sessionFolder.title}" was saved successfully`
			);
		} catch (error) {
			await showError('Session Quicksave - Error', `The session could not be saved.`);
			console.error(error);
		}
	}
);
