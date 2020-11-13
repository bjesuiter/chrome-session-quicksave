import { Component, h } from '@stencil/core';
import '@ionic/core';
import 'ionicons';
import { SessionQuicksaveOptions } from '@models/session-quicksave-options';
import { readOptions, saveOptions } from '@lib/chrome-services/synced-storage-service';
import { toastController } from '@ionic/core';

@Component({
	tag: 'app-options-page',
	styleUrl: 'app-options-page.css',
	shadow: true,
})
export class AppOptionsPage {
	initialOptions: SessionQuicksaveOptions;

	sessionsFolderId = '';

	async componentWillLoad() {
		this.initialOptions = await readOptions();
		this.sessionsFolderId = this.initialOptions.sessionsFolderId;
	}

	async saveOptions() {
		const newOptions = new SessionQuicksaveOptions();
		newOptions.sessionsFolderId = this.sessionsFolderId;
		try {
			await saveOptions(newOptions);
			const toast = await toastController.create({
				message: 'Options saved successfully!',
				duration: 2500,
			});
			toast.present();
		} catch (error) {
			const toast = await toastController.create({
				message: 'Error while saving Options!',
				duration: 2500,
			});
			toast.present();
		}
	}

	updateSessionsFolderId(ionEvent) {
		this.sessionsFolderId = ionEvent.detail.value;
		console.debug('updateSessionsFolderId called with ', this.sessionsFolderId);
	}

	render() {
		// TODO: Include an indicator, whether all changes are saved or not
		return (
			<ion-card class="frame">
				<ion-card-header>
					<h1>Session Quicksave Extension Options</h1>
				</ion-card-header>

				<ion-card-body>
					<ion-content class="content">
						<ion-item>
							<ion-label position="floating">Bookmark Folder for saving Sessions</ion-label>
							<ion-input
								value={this.sessionsFolderId}
								onIonChange={(event) => this.updateSessionsFolderId(event)}
							></ion-input>
						</ion-item>
					</ion-content>
				</ion-card-body>

				<ion-toolbar>
					<ion-buttons slot="end">
						<ion-button onClick={() => this.saveOptions()}>Save options</ion-button>
					</ion-buttons>
				</ion-toolbar>
			</ion-card>
		);
	}
}
