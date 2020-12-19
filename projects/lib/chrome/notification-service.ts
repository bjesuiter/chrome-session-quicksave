async function basicNotification(title: string, message: string, iconUrl: string) {
	return new Promise(resolve => {
		const notification = {
			type: 'basic',
			iconUrl: iconUrl,
			title,
			message
		};
		chrome.notifications.create(notification, resolve);
	});
}

/**
 *
 * Chrome Docs for NotificationOptions
 * @param {*} text
 * @returns {Promise<string>} resolves with the id of the notification
 */
export async function showSimpleNotification(title: string, message: string) {
	return basicNotification(title, message, chrome.extension.getURL('assets/img/icon-512.png'));
}

export async function showError(title: string, message: string) {
	return basicNotification(title, message, chrome.extension.getURL('assets/icons/error.png'));
}
