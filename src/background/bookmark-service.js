/**
 * https://developer.chrome.com/extensions/bookmarks
 */

/**
 *
 * @param  {...any} bookmarkIds
 * @returns Promise, which resolves with array of BookmarkTreeNodes
 */
export async function getBookmarkNodes(...bookmarkIds) {
  return new Promise((resolve) => {
    chrome.bookmarks.get(bookmarkIds, resolve);
  });
}

/**
 * An alias function for getBookmarkNodes which returns a single value instead of an array
 * @param {string} bookmarkId
 * @returns {Promise<BookmarkTreeNodes>} a single BookmarkTreeNode
 */
export async function getBookmarkNode(bookmarkId) {
  return new Promise((resolve) => {
    chrome.bookmarks.get(bookmarkId, resolve);
  });
}

export async function getBookmarkRoot() {
  return getBookmarkNode("0");
}

/**
 * @returns Promise, which resolves to array of all available bookmarkTreeNodes
 */
export async function getBookmarkTreeComplete() {
  return new Promise((resolve) => {
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
  return new Promise((resolve) => {
    chrome.bookmarks.search(
      {
        url: null,
        title: folderName,
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
  return new Promise((resolve) => {
    chrome.bookmarks.create({ parentId, title: folderName, url: null }, resolve);
  });
}

export async function createBookmarks() {}
