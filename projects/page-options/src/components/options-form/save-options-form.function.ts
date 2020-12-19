import { saveOptions } from '@lib/chrome/synced-storage-service';
import { SessionQuicksaveOptions } from '@lib/models/session-quicksave-options';

export async function saveOptionsForm(formControls: any): Promise<boolean> {
	const newOptions = new SessionQuicksaveOptions();
	newOptions.sessionsFolderId = formControls.sessionsFolderId || undefined;
	try {
		await saveOptions(newOptions);
		return true;
	} catch (error) {
		return false;
	}
}
