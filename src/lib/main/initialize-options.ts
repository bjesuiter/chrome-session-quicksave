import {
	bookmarkFolderExists,
	getBookmarkFolderByName,
} from '@lib/chrome-services/bookmark-service';
import { readOptions, saveOptions } from '@lib/chrome-services/synced-storage-service';
import { SessionQuicksaveOptions } from '@models/session-quicksave-options';
import { serialize } from 'serializr';
import { BOOKMARK_BAR_FOLDER_ID, createBookmarkFolder } from '../chrome-services/bookmark-service';

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
			console.log('Found options already - not doing anything: ', serialize(options));
		}
	} catch (error) {
		console.error('Chrome reading error while reading options: ', error);
	}

	console.log('Found no valid options, initializing new ones...');
	console.log(
		`Make sure that a Folder 'Sessions' exists in bookmark tree id 1 (which is likely the folder for BookmarkBar) ...`
	);

	await ensureDefaultSessionFolderAvailability();
	const sessionFolderNode = await getBookmarkFolderByName(
		BOOKMARK_BAR_FOLDER_ID,
		DEFAULT_SESSIONS_FOLDER_NAME
	);

	if (!sessionFolderNode) {
		throw new Error(`Critical Error: Creation of default sessions folder failed!`);
	}

	console.log(`The ID of the Folder Named ${sessionFolderNode.title} is: `, sessionFolderNode.id);
	console.log(`Creating new Options object...`);
	const options = new SessionQuicksaveOptions(sessionFolderNode.id);

	return saveOptions(options);
}

async function ensureDefaultSessionFolderAvailability() {
	const folderAvailable = await bookmarkFolderExists(
		BOOKMARK_BAR_FOLDER_ID,
		DEFAULT_SESSIONS_FOLDER_NAME
	);
	if (!folderAvailable) {
		await createBookmarkFolder(BOOKMARK_BAR_FOLDER_ID, DEFAULT_SESSIONS_FOLDER_NAME);
	}
}
