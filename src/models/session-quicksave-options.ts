import { serializable } from 'serializr';

export interface SessionQuicksaveOptions {
	/**
	 * The chrome internal ID of the Sessions Folder
	 */
	sessionsFolderId: string;
}

export class SessionQuicksaveOptionsModel implements SessionQuicksaveOptions {
	@serializable
	sessionsFolderId: string;
}
