/**
 * https://developer.chrome.com/extensions/bookmarks
 */

/**
 * Get arbitrary bookmark nodes by their IDs from chrome
 * @param  {...string} bookmarkIds
 * @returns {Promise<Array<chrome.bookmarks.BookmarkTreeNodes>>} A promise which resolves to an array of bookmark nodes
 * 																 for all specified bookmarkIds (regardless of hierarchy)
 */
export async function getBookmarkNodes(...bookmarkIds) {
	return new Promise(resolve => {
		chrome.bookmarks.get(bookmarkIds, resolve);
	});
}

/**
 * An alias function for getBookmarkNodes which returns a single value instead of an array
 * @param {string} bookmarkId
 * @returns {Promise<chrome.bookmarks.BookmarkTreeNode>} Promise which resolves to a single bookmark node
 */
export async function getBookmarkNode(bookmarkId) {
	const [node] = await getBookmarkNodes(bookmarkId);
	return node;
}

/**
 * Returns the root node of bookmarks
 * @returns {Promise<chrome.bookmarks.BookmarkTreeNode>}
 */
export async function getBookmarkRoot() {
	return getBookmarkNode('0');
}

/**
 * Gets all children for a bookmark folder specified by parendId
 * @param {*} parentId
 * @returns {Promise<Array<chrome.bookmarks.BookmarkTreeNodes>>} A Promise which resolves to an array of child nodes from the specified parentId
 */
export async function getBookmarkChildren(parentId) {
	return new Promise(resolve => {
		chrome.bookmarks.getChildren(parentId, resolve);
	});
}

/**
 * Returns the complete bookmark tree
 * Warning: potentially very large result!
 * @returns {Promise<Array<chrome.bookmarks.BookmarkTreeNodes>>}resolves to array of all available bookmark nodes
 */
export async function getBookmarkTreeComplete() {
	return new Promise(resolve => {
		chrome.bookmarks.getTree(resolve);
	});
}

/**
 * Searches for folders with the specified folderName
 * Docs: https://developer.chrome.com/extensions/bookmarks#method-search
 * @param {string} folderName
 * @returns {Promise<chrome.bookmarks.BookmarkTreeNodes} array of bookmark nodes for result folders
 */
export async function searchBookmarkFolders(folderName) {
	return new Promise(resolve => {
		chrome.bookmarks.search(
			{
				url: null,
				title: folderName
			},
			resolve
		);
	});
}

/**
 * Check if a folder with a given name does already exists inside a parent bookmark folder
 * @param {*} parentId
 * @param {*} folderName
 * @returns {Promise<boolean>} true, when bookmark folder exists
 */
export async function bookmarkFolderExists(parentId, folderName) {
	const children = await getBookmarkChildren(parentId);
	const result = children.find(childNode => childNode.title === folderName);
	return !!result;
}

/**
 * Creates a bookmark folder inside another folder specified by its parentId
 * @param {*} parentId the parent folder where to create the new folder
 * @param {*} folderName the name of the new bookmark folder
 * @returns {Promise<chrome.bookmarks.BookmarkTreeNode>}
 */
export async function createBookmarkFolder(parentId, folderName) {
	return new Promise(resolve => {
		chrome.bookmarks.create({parentId, title: folderName, url: null}, resolve);
	});
}

/**
 * Creates a bookmark
 * @param {*} parentId
 * @param {*} title
 * @param {*} url
 * @returns {Promise<chrome.bookmarks.BookmarkTreeNode>}
 */
export async function createBookmark(parentId, url, title) {
	return new Promise(resolve => {
		chrome.bookmarks.create({parentId, title, url}, resolve);
	});
}

/**
 * Creates a bookmark for each tab and saves it into the folder specified by parendId
 * @param {Array<chrome.tabs.Tab>} tabs
 */
export async function createBookmarksForTabs(parentId, tabs) {
	const bookmarkPromises = tabs.map(tab => createBookmark(parentId, tab.url, tab.title));
	return Promise.all(bookmarkPromises);
}

/**
 * Combines several simpler bookmark manipulation functions to save a bunch of tabs as a logical 'session'
 * @param {string} parentId
 * @param {string} sessionName
 * @param {Array<chrome.tabs.Tab>} tabs
 * @param {*} options
 */
export async function saveSession(parentId, sessionName, tabs, options) {
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
