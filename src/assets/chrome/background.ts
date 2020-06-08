import format from 'date-fns/format';
import {searchBookmarkFolders, saveSession} from '../../chrome-services/bookmark-service';
import {getTabsInWindow} from '../../chrome-services/tabs-service';
import {showSimpleNotification, showError} from '../../chrome-services/notification-service';

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

async function quicksaveSession(currentTab: chrome.tabs.Tab): Promise<void> {
	const currentWindowId: number = currentTab.windowId;

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
	const [sessionsFolder]: chrome.bookmarks.BookmarkTreeNode[] = await searchBookmarkFolders('Sessions');
	const tabs: chrome.tabs.Tab[] = await getTabsInWindow(currentWindowId);
	// const newSessionFolder = await saveSession(sessionsFolder.id, sessionName, tabs);
	await saveSession(sessionsFolder.id, sessionName, tabs);

	// Todo: show notification which allows jumping to the new session folder in bookmark manager view
	await showSimpleNotification(
		'Session Quicksave - Success',
		`The new Session "${sessionName}" was saved successfully`
	);
}

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
