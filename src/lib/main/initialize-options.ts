import {
	bookmarkFolderExists,
	getBookmarkFolderByName,
	getBookmarkNode,
	BOOKMARK_BAR_FOLDER_ID,
	createBookmarkFolder,
} from '@lib/chrome/bookmark-service';
import { showError } from '@lib/chrome/notification-service';
import { readOptions, saveOptions } from '@lib/chrome/synced-storage-service';
import { SessionQuicksaveOptions } from '@lib/models/session-quicksave-options';
import { serialize } from 'serializr';

export const DEFAULT_SESSIONS_FOLDER_NAME = 'Sessions';

/**
 * Creates the neccessary options for this extension in chrome synced storage
 */
export async function initializeOptions() {
	console.log('Initializing Option Storage for Session Quicksave Extension.');
	console.log('Checking for already available options...');

	try {
		const options = await readOptions();
		if (!!options) {
			console.log('Found options already: ', serialize(options));
		}
		console.log('Validating options.sessionsFolderId...');
		if (isSessionFolderIdValid(options.sessionsFolderId)) {
			console.log('Session Folder Id is valid.');
			return;
		}
	} catch (error) {
		console.error('Chrome reading error while reading options: ', error);
	}

	// Path for no or invalid options found
	console.log('Found no or invalid options, initializing new ones...');
	console.log(
		`Make sure that a Folder 'Sessions' exists in bookmark tree id 1 (which is likely the folder for BookmarkBar) ...`
	);

	const sessionFolderNode = await ensureDefaultSessionFolderAvailability();

	console.log(`The ID of the Folder Named ${sessionFolderNode.title} is: `, sessionFolderNode.id);
	console.log(`Creating new Options object...`);
	const options = new SessionQuicksaveOptions(sessionFolderNode.id);

	try {
		const optionsSaved = await saveOptions(options);
		console.log('New Options successfully saved!', optionsSaved);
		console.log('New options:', options);
	} catch (error) {
		error.message = `[initializeOptions]: Critical Error while saving options:  ${error.message}`;
		throw error;
	}
}

/**
 * @returns Session Folder Node
 */
async function ensureDefaultSessionFolderAvailability(): Promise<chrome.bookmarks.BookmarkTreeNode> {
	const folderAvailable = await bookmarkFolderExists(BOOKMARK_BAR_FOLDER_ID, DEFAULT_SESSIONS_FOLDER_NAME);
	if (!folderAvailable) {
		await createBookmarkFolder(BOOKMARK_BAR_FOLDER_ID, DEFAULT_SESSIONS_FOLDER_NAME);
	} else {
		console.log('Default sessions folder already available: ', folderAvailable);
	}
	const defaultSessionFolderNode = await getBookmarkFolderByName(BOOKMARK_BAR_FOLDER_ID, DEFAULT_SESSIONS_FOLDER_NAME);

	if (defaultSessionFolderNode === undefined) {
		throw new Error(`[Critical Error] Can't create default session folder!
    Please inform the developer about this error at bjesuiter@gmail.com!`);
	}

	return defaultSessionFolderNode;
}

async function isSessionFolderIdValid(sessionFolderId: string | undefined) {
	if (!sessionFolderId) return false;
	const sessionsFolderNode = await getBookmarkNode(sessionFolderId);
	return !!sessionsFolderNode;
}
