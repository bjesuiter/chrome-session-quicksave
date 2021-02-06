/**
 * https://developer.chrome.com/extensions/bookmarks
 */

/**
 * The Bookmark Bar should have the Parent ID of 1
 * CAUTION: This is only assumed, based on observation!
 */
export const BOOKMARK_BAR_FOLDER_ID = '1';

/**
 * Get arbitrary bookmark nodes by their IDs from chrome
 * @param bookmarkIds
 * @returns A promise which resolves to an array of bookmark nodes
 * 	for all specified bookmarkIds (regardless of hierarchy)
 */
export async function getBookmarkNodes(...bookmarkIds: string[]): Promise<chrome.bookmarks.BookmarkTreeNode[]> {
	return new Promise((resolve) => {
		chrome.bookmarks.get(bookmarkIds, resolve);
	});
}

/**
 * An alias function for getBookmarkNodes which returns a single value instead of an array
 * @param bookmarkId
 * @returns Promise which resolves to a single bookmark node
 */
export async function getBookmarkNode(bookmarkId: string): Promise<chrome.bookmarks.BookmarkTreeNode | undefined> {
	const [node] = await getBookmarkNodes(bookmarkId);
	return node;
}

/**
 *
 * @returns the root node of bookmarks
 */
export async function getBookmarkRoot(): Promise<chrome.bookmarks.BookmarkTreeNode | undefined> {
	return getBookmarkNode('0');
}

/**
 * Gets all children for a bookmark folder specified by parendId
 * @param parentId
 * @returns  A Promise which resolves to an array of child nodes from the specified parentId
 */
export async function getBookmarkChildren(parentId: string): Promise<chrome.bookmarks.BookmarkTreeNode[]> {
	return new Promise((resolve) => {
		chrome.bookmarks.getChildren(parentId, (resultList) => resolve(resultList));
	});
}

/**
 * Returns the complete bookmark tree
 * Warning: potentially very large result!
 * @returns resolves to array of all available bookmark nodes
 */
export async function getBookmarkTreeComplete(): Promise<chrome.bookmarks.BookmarkTreeNode[]> {
	return new Promise((resolve) => {
		chrome.bookmarks.getTree((resultList) => resolve(resultList));
	});
}

export async function searchAllBookmarkNodes(searchTerm: string): Promise<chrome.bookmarks.BookmarkTreeNode[]> {
	return new Promise((resolve) => chrome.bookmarks.search(searchTerm, (resultList) => resolve(resultList)));
}

/**
 *  Helper Functions
 * ------------------
 */

/**
 * Searches for folders with the specified folderName
 * Docs: https://developer.chrome.com/extensions/bookmarks#method-search
 *
 * @param folderName
 * @returns array of bookmark nodes for result folders
 */
export async function searchBookmarkFolders(folderName: string): Promise<chrome.bookmarks.BookmarkTreeNode[]> {
	const rawSearchResults: chrome.bookmarks.BookmarkTreeNode[] = await searchAllBookmarkNodes(folderName);
	return rawSearchResults.filter((result) => result.url === undefined);
}

/**
 *
 * @param searchTerm
 */
export async function searchBookmarks(searchTerm: string): Promise<chrome.bookmarks.BookmarkTreeNode[]> {
	const rawSearchResults: chrome.bookmarks.BookmarkTreeNode[] = await searchAllBookmarkNodes(searchTerm);
	return rawSearchResults.filter((result) => result.url !== undefined);
}

// /**
//  * Returns an ordered Array of BookmarkTreeNodeIds.
//  * It starts at the Root node (ID 0) and ends with the bookmark id passed in
//  */
// TODO: Evaluate if needed
// export async function getBookmarkPath(bookmarkId: number) {}

/**
 * Check if a folder with a given name does already exists inside a parent bookmark folder
 * @param {string} parentId
 * @param {string} folderName
 * @returns {Promise<boolean>} true, when bookmark folder exists
 */
export async function bookmarkFolderExists(parentId: string, folderName: string): Promise<boolean> {
	const result = await getBookmarkFolderByName(parentId, folderName);
	return !!result;
}

/**
 * Queries a bookmark folder by name in parentId.
 * @param parentId
 * @param folderName
 */
export async function getBookmarkFolderByName(
	parentId: string,
	folderName: string
): Promise<chrome.bookmarks.BookmarkTreeNode | undefined> {
	const children = await getBookmarkChildren(parentId);
	const result = children.find((childNode) => childNode.title === folderName);
	return result;
}

/**
 * Creates a bookmark folder inside another folder specified by its parentId
 * @param {string} parentId the parent folder where to create the new folder
 * @param {string} folderName the name of the new bookmark folder
 * @returns {Promise<chrome.bookmarks.BookmarkTreeNode>}
 */
export function createBookmarkFolder(parentId: string, folderName: string): Promise<chrome.bookmarks.BookmarkTreeNode> {
	return new Promise((resolve) => {
		chrome.bookmarks.create({ parentId, title: folderName, url: undefined }, resolve);
	});
}

/**
 * Creates a bookmark
 * @param {string} parentId
 * @param {string} title
 * @param {string} url
 * @returns {Promise<chrome.bookmarks.BookmarkTreeNode>}
 */
export async function createBookmark(
	parentId: string,
	url: string,
	title: string
): Promise<chrome.bookmarks.BookmarkTreeNode> {
	return new Promise((resolve) => {
		chrome.bookmarks.create({ parentId, title, url }, resolve);
	});
}

/**
 * Creates a bookmark for each tab and saves it into the folder specified by parendId
 * @param {Promise<Array<chrome.tabs.Tab>>} tabs
 */
export async function createBookmarksForTabs(parentId: string, tabs: Array<chrome.tabs.Tab>) {
	const bookmarkPromises = tabs.map((tab) => {
		const bookmarkUrl = tab.url || chrome.extension.getURL('../assets/error-htmls/illegal-or-missing-url.html');
		let bookmarkTitle = tab.title || 'Tab without title';
		if (tab.url === undefined) {
			bookmarkTitle = `No Url: ${bookmarkTitle}`;
		}
		return createBookmark(parentId, bookmarkUrl, bookmarkTitle);
	});
	return Promise.all(bookmarkPromises);
}

export interface SaveSessionOptions {
	// mode can be: overwrite, alwaysNew (creates new folder with same name regardless of existing), ask
	mode: 'overwrite' | 'alwaysNew' | 'ask';
}

/**
 * Combines several simpler bookmark manipulation functions to save a bunch of tabs as a logical 'session'
 * @param {string} parentId
 * @param {string} sessionName
 * @param {Array<chrome.tabs.Tab>} tabs
 * @param {SaveSessionOptions} options
 */
export async function saveSession(
	parentId: string,
	sessionName: string,
	tabs: Array<chrome.tabs.Tab>,
	options?: SaveSessionOptions
) {
	const optionDefaults: SaveSessionOptions = { mode: 'alwaysNew' };
	options = { ...optionDefaults, ...options };
	const { mode } = options;

	// check if new session does already exist
	const sessionsFolderExists = await bookmarkFolderExists(parentId, sessionName);
	if (sessionsFolderExists && mode === 'overwrite') {
		console.log('Overwrite existing session folder');
		// TODO: delete existing session folder
	} else if (sessionsFolderExists && mode === 'alwaysNew') {
		// do nothing, simply create sessionFolder and child bookmarks as is
	} else if (sessionsFolderExists && mode === 'ask') {
		// TODO: ask the user what to do
	}

	// create new Folder for session
	const sessionFolder = await createBookmarkFolder(parentId, sessionName);

	await createBookmarksForTabs(sessionFolder.id, tabs);

	return sessionFolder;
}
