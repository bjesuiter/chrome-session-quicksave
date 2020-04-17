async function basicNotification(title, message, iconUrl) {
	return new Promise(resolve => {
		const notification = {
			type: 'basic',
			iconUrl: iconUrl,
			title,
			message
		};
		chrome.notifications.create(null, notification, resolve);
	});
}

/**
 *
 * Chrome Docs for NotificationOptions
 * @param {*} text
 * @returns {Promise<string>} resolves with the id of the notification
 */
export async function showSimpleNotification(title, message) {
	return basicNotification(title, message, chrome.extension.getURL('assets/img/icon-512.png'));
}

export async function showError(title, message) {
	return basicNotification(title, message, chrome.extension.getURL('assets/icons/warning.png'));
}
