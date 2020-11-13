import { Component, h, State } from '@stencil/core';
import '@ionic/core';
import 'ionicons';
import { SessionQuicksaveOptions } from 'src/models/session-quicksave-options';
import { readOptions, saveOptions } from '@lib/chrome-services/synced-storage-service';

@Component({
	tag: 'app-options-page',
	styleUrl: 'app-options-page.css',
	shadow: true,
})
export class AppOptionsPage {
	initialOptions: SessionQuicksaveOptions;

	@State()
	sessionsFolderId = '';

	async componentWillLoad() {
		this.initialOptions = await readOptions();
		this.sessionsFolderId = this.initialOptions.sessionsFolderId;
	}

	saveOptions() {
		const newOptions = new SessionQuicksaveOptions();
		newOptions.sessionsFolderId = this.sessionsFolderId;

		return saveOptions(newOptions);
	}

	render() {
		return (
			<div class="app-home">
				<ion-item>
					<ion-label position="floating">Bookmark Folder for saving Sessions</ion-label>
					<ion-input
						value={this.sessionsFolderId}
						onIonChange={(event) => (this.sessionsFolderId = event.detail.value)}
					></ion-input>
				</ion-item>

				<ion-button onClick={this.saveOptions}>Save options</ion-button>
			</div>
		);
	}
}
