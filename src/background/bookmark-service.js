/**
 * https://developer.chrome.com/extensions/bookmarks
 */
const folderToStoreNewSessions = "Sessions";

/**
 *
 * @param  {...any} bookmarkIds
 * @returns array of BookmarkTreeNodes
 */
export async function getBookmarkNodes(...bookmarkIds) {
  return new Promise((resolve) => {
    chrome.bookmarks.get(bookmarkIds, (resultNodes) => resolve(resultNodes));
  });
}

/**
 * An alias function for getBookmarkNodes which returns a single value instead of an array
 * @param {string} bookmarkId
 * @returns {bookmarkTreeNodes} a single BookmarkTreeNode
 */
export async function getBookmarkNode(bookmarkId) {
  return new Promise((resolve) => {
    chrome.bookmarks.get(bookmarkId, (resultNode) => resolve(resultNode));
  });
}

export async function getBookmarkRoot() {
  return getBookmarkNode("0");
}

/**
 * @returns Promise
 */
export async function getBookmarkTreeComplete() {
  return new Promise((resolve) => {
    chrome.bookmarks.getTree((bookmarkTreeNodes) => {
      resolve(bookmarkTreeNodes);
    });
  });
}

/**
 *
 * Docs: https://developer.chrome.com/extensions/bookmarks#method-search
 * @param {string} folderName
 */
export async function searchBookmarkFolders(folderName) {
  return new Promise((resolve) => {
    chrome.bookmarks.search(
      {
        url: null,
        title: folderName,
      },
      (results) => resolve(results)
    );
  });
}
