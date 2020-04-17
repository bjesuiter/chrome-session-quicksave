/**
 * https://developer.chrome.com/extensions/bookmarks
 */

/**
 *
 * @param  {...string} bookmarkIds
 * @returns {Promise<chrome.bookmarks.BookmarkTreeNodes>}
 */
export async function getBookmarkNodes(...bookmarkIds) {
	return new Promise(resolve => {
		chrome.bookmarks.get(bookmarkIds, resolve);
	});
}

/**
 * An alias function for getBookmarkNodes which returns a single value instead of an array
 * @param {string} bookmarkId
 * @returns {Promise<chrome.bookmarks.BookmarkTreeNode>} a single BookmarkTreeNode
 */
export async function getBookmarkNode(bookmarkId) {
	return new Promise(resolve => {
		chrome.bookmarks.get(bookmarkId, resolve);
	});
}

/**
 * @returns {Promise<chrome.bookmarks.BookmarkTreeNode>}
 */
export async function getBookmarkRoot() {
	return getBookmarkNode('0');
}

/**
 * @returns {Promise<Array<chrome.bookmarks.BookmarkTreeNodes>>}resolves to array of all available BookmarkTreeNodes
 */
export async function getBookmarkTreeComplete() {
	return new Promise(resolve => {
		chrome.bookmarks.getTree(resolve);
	});
}

/**
 *
 * Docs: https://developer.chrome.com/extensions/bookmarks#method-search
 * @param {string} folderName
 * @returns array of BookmarkTreeNodes for folders
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
 *
 * @param {*} parentId
 * @param {*} folderName
 * @returns Promise, which resolves with the created BookmarkTreeNode for the folder
 */
export async function createBookmarkFolder(parentId, folderName) {
	return new Promise(resolve => {
		chrome.bookmarks.create({parentId, title: folderName, url: null}, resolve);
	});
}

/**
 *
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
 *
 * @param {Array<chrome.tabs.Tab>} tabs
 */
export async function createBookmarksForTabs(parentId, tabs) {
	const bookmarkPromises = tabs.map(tab => createBookmark(parentId, tab.url, tab.title));
	return Promise.all(bookmarkPromises);
}

/**
 * Combines several simpler bookmark manipulation functions to save a bunch of tabs as a session
 * @param {string} parentId
 * @param {string} sessionName
 * @param {Array<chrome.tabs.Tab>} tabs
 * @param {*} options
 */
export async function saveSession(parentId, sessionName, tabs, options) {
	const optionDefaults = {mode: 'overwrite'};
	options = {...optionDefaults, ...options};
	const {mode} = options;

	// create new Folder for session
	// TODO: Check if folder is already available & which mode is set (overwrite, error, ...)
	const sessionFolder = await createBookmarkFolder(parentId, sessionName);

	await createBookmarksForTabs(sessionFolder.id, tabs);

	return sessionFolder;
}
