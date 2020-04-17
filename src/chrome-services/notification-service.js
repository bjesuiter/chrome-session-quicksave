/**
 *
 * Chrome Docs for NotificationOptions
 * @param {*} text
 * @returns {Promise<string>} resolves with the id of the notification
 */
export async function showSimpleNotification(title, message) {
	return new Promise(resolve => {
		const notification = {
			type: 'basic',
			iconUrl: chrome.extension.getURL('assets/img/icon-512.png'),
			title,
			message
		};
		chrome.notifications.create(null, notification, resolve);
	});
}
