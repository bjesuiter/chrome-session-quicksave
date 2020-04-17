/**
 *
 * Chrome Docs for chrome.tabs.query: https://developer.chrome.com/extensions/tabs#method-query
 * Chrome Docs for chrome.tabs.Tab Type: https://developer.chrome.com/extensions/tabs#type-Tab
 * TODO: Check how to deal with Tabs sleeping from 'The Great Suspender' Extension
 * @returns {Promise<Array<chrome.tabs.Tab>>}
 */
export async function getTabsInWindow(windowId) {
	return new Promise(resolve => {
		const queryInfo = {
			windowId
		};
		chrome.tabs.query(queryInfo, resolve);
	});
}
