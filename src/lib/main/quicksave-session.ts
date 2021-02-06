import { format } from 'date-fns';
import { getTabsInWindow } from '@lib/chrome/tabs-service';
import { showSimpleNotification } from '@lib/chrome/notification-service';
import { readOptionSessionsFolderId } from '@lib/chrome/synced-storage-service';
import { saveSession } from '@lib/chrome/bookmark-service';
import { showError } from '@lib/chrome/notification-service';

/**
 * This function will be called by src/global/app.ts when extension icon is clicked
 * @param currentTab
 */
export async function quicksaveSession(currentTab: chrome.tabs.Tab): Promise<void> {
	const currentWindowId: number = currentTab.windowId;

	const sessionName = prompt('Please insert a name for the session', 'New Session ' + format(new Date(), 'yyyy-MM-dd'));

	// user clicked on 'cancel' for the session name promt
	if (!sessionName || sessionName.length < 0) {
		return;
	}

	// this uses the first result, may break easily!
	// replace with target folder selection via plugin later
	const sessionFolderId: string | undefined = await readOptionSessionsFolderId();

	if (sessionFolderId === undefined) {
		showError(
			'Error wile saving session',
			'No valid session folder configured. Please go to the options for this extension and configure a valid folder for storing the sessions!'
		);
		return;
	}

	const tabs: chrome.tabs.Tab[] = await getTabsInWindow(currentWindowId);
	await saveSession(sessionFolderId, sessionName, tabs);

	// Todo: show notification which allows jumping to the new session folder in bookmark manager view
	await showSimpleNotification(
		'Session Quicksave - Success',
		`The new Session "${sessionName}" was saved successfully`
	);
}
