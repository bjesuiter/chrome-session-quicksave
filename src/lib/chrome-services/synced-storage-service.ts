import { deserialize, serialize } from 'serializr';
import { SessionQuicksaveOptions } from '@models/session-quicksave-options';

export function saveOptions(options: SessionQuicksaveOptions): Promise<void> {
	return new Promise((resolve, reject) => {
		const jsonObject = serialize(options);
		chrome.storage.sync.set(jsonObject, () => {
			const error = chrome.runtime.lastError;
			if (error) {
				console.debug('Error saving options: ', [jsonObject, error]);
				reject(error);
			} else {
				console.debug('New options saved successfully ', jsonObject);
				resolve();
			}
		});
	});
}

export function readOptions(): Promise<SessionQuicksaveOptions> {
	return new Promise((resolve, reject) => {
		chrome.storage.sync.get((items) => {
			if (chrome.runtime.lastError) {
				reject(chrome.runtime.lastError);
			} else {
				const decodedOptions = deserialize(SessionQuicksaveOptions, items);
				resolve(decodedOptions);
			}
		});
	});
}

export async function readOptionSessionsFolderId(): Promise<string | undefined> {
	try {
		const options = await readOptions();
		if (!!options.sessionsFolderId) {
			return options.sessionsFolderId;
		}
	} catch (error) {
		console.error('Error while reading options: ', error);
	}
}
