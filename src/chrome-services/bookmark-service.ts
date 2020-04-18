/**
 * https://developer.chrome.com/extensions/bookmarks
 */

/**
 * Get arbitrary bookmark nodes by their IDs from chrome
 * @param  {...string} bookmarkIds
 * @returns {Promise<Array<chrome.bookmarks.BookmarkTreeNode>>} A promise which resolves to an array of bookmark nodes
 * 																 for all specified bookmarkIds (regardless of hierarchy)
 */
export function getBookmarkNodes(...bookmarkIds: string[]): Promise<Array<chrome.bookmarks.BookmarkTreeNode>> {
	return new Promise(resolve => {
		chrome.bookmarks.get(bookmarkIds, resolve);
	});
}

/**
 * An alias function for getBookmarkNodes which returns a single value instead of an array
 * @param {string} bookmarkId
 * @returns {Promise<chrome.bookmarks.BookmarkTreeNode>} Promise which resolves to a single bookmark node
 */
export async function getBookmarkNode(bookmarkId: string): Promise<chrome.bookmarks.BookmarkTreeNode> {
	const [node] = await getBookmarkNodes(bookmarkId);
	return node;
}

/**
 * Returns the root node of bookmarks
 * @returns {Promise<chrome.bookmarks.BookmarkTreeNode>}
 */
export function getBookmarkRoot(): Promise<chrome.bookmarks.BookmarkTreeNode> {
	return getBookmarkNode('0');
}

/**
 * Gets all children for a bookmark folder specified by parendId
 * @param {*} parentId
 * @returns {Promise<Array<chrome.bookmarks.BookmarkTreeNode>>} A Promise which resolves to an array of child nodes from the specified parentId
 */
export function getBookmarkChildren(parentId: any): Promise<Array<chrome.bookmarks.BookmarkTreeNode>> {
	return new Promise(resolve => {
		chrome.bookmarks.getChildren(parentId, resolve);
	});
}

/**
 * Returns the complete bookmark tree
 * Warning: potentially very large result!
 * @returns {Promise<Array<chrome.bookmarks.BookmarkTreeNode>>}resolves to array of all available bookmark nodes
 */
export function getBookmarkTreeComplete(): Promise<Array<chrome.bookmarks.BookmarkTreeNode>> {
	return new Promise(resolve => {
		chrome.bookmarks.getTree(resolve);
	});
}

/**
 * Searches for folders with the specified folderName
 * Docs: https://developer.chrome.com/extensions/bookmarks#method-search
 * @param {string} folderName
 * @returns {Promise<Array<chrome.bookmarks.BookmarkTreeNode>>} array of bookmark nodes for result folders
 */
export function searchBookmarkFolders(folderName: string): Promise<Array<chrome.bookmarks.BookmarkTreeNode>> {
	return new Promise(resolve => {
		const searchQuery: chrome.bookmarks.BookmarkSearchQuery = {
			url: undefined,
			title: folderName
		};

		chrome.bookmarks.search(searchQuery, resolve);
	});
}

/**
 * Check if a folder with a given name does already exists inside a parent bookmark folder
 * @param {string} parentId
 * @param {string} folderName
 * @returns {Promise<boolean>} true, when bookmark folder exists
 */
export async function bookmarkFolderExists(parentId: string, folderName: string): Promise<boolean> {
	const children = await getBookmarkChildren(parentId);
	const result = children.find(childNode => childNode.title === folderName);
	return !!result;
}

/**
 * Creates a bookmark folder inside another folder specified by its parentId
 * @param {string} parentId the parent folder where to create the new folder
 * @param {string} folderName the name of the new bookmark folder
 * @returns {Promise<chrome.bookmarks.BookmarkTreeNode>}
 */
export function createBookmarkFolder(parentId: string, folderName: string): Promise<chrome.bookmarks.BookmarkTreeNode> {
	return new Promise(resolve => {
		chrome.bookmarks.create({parentId, title: folderName, url: undefined}, resolve);
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
	return new Promise(resolve => {
		chrome.bookmarks.create({parentId, title, url}, resolve);
	});
}

/**
 * Creates a bookmark for each tab and saves it into the folder specified by parendId
 * @param {Promise<Array<chrome.tabs.Tab>>} tabs
 */
export async function createBookmarksForTabs(parentId: string, tabs: Array<chrome.tabs.Tab>) {
	const bookmarkPromises = tabs.map(tab => {
		const bookmarkUrl = tab.url || chrome.extension.getURL('../assets/error-htmls/illegal-or-missing-url.html');
		let bookmarkTitle = tab.title || 'Tab without title';
		if (tab.url === undefined) {
			bookmarkTitle = `No Url: ${bookmarkTitle}`;
		}
		return createBookmark(parentId, bookmarkUrl, bookmarkTitle);
	});
	return Promise.all(bookmarkPromises);
}

/**
 * Combines several simpler bookmark manipulation functions to save a bunch of tabs as a logical 'session'
 * @param {string} parentId
 * @param {string} sessionName
 * @param {Array<chrome.tabs.Tab>} tabs
 * @param {*} options
 */
export async function saveSession(parentId: string, sessionName: string, tabs: Array<chrome.tabs.Tab>, options: any) {
	const optionDefaults = {mode: 'alwaysNew'};
	options = {...optionDefaults, ...options};
	// mode can be: overwrite, alwaysNew (creates new folder with same name regardless of existing), ask
	const {mode} = options;

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
