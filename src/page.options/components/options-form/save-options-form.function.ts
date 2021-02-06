import { saveOptions } from '@lib/chrome/synced-storage-service';
import { SessionQuicksaveOptions } from '@lib/models/session-quicksave-options';
import type { OptionPageFormControls } from './option-page-form-controls.interface';

export async function saveOptionsForm(formControls: OptionPageFormControls): Promise<boolean> {
	const newOptions = new SessionQuicksaveOptions();
	newOptions.sessionsFolderId = formControls.sessionsFolderId || undefined;
	try {
		await saveOptions(newOptions);
		return true;
	} catch (error) {
		return false;
	}
}
