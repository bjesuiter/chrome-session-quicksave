import format from 'date-fns/format';
import {searchBookmarkFolders, saveSession} from '@lib/chrome-services/bookmark-service';
import {getTabsInWindow} from '@lib/chrome-services/tabs-service';
import {showSimpleNotification} from '@lib/chrome-services/notification-service';

export async function quicksaveSession(currentTab: chrome.tabs.Tab): Promise<void> {
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
