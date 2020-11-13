import { primitive, serializable } from 'serializr';

export class SessionQuicksaveOptions {
	/**
	 * The chrome internal ID of the Sessions Folder
	 */
	@serializable(primitive())
	sessionsFolderId?: string;

	constructor(sessionFolderId?: string) {
		this.sessionsFolderId = sessionFolderId;
	}
}
