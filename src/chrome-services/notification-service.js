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
			// iconUrl: ,
			title,
			message
			// eventTime:
		};
		chrome.notifications.create(null, notification, resolve);
	});
}
