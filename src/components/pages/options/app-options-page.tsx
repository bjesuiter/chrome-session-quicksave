import { Component, h, State } from '@stencil/core';
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

	@State()
	formControls = {
		sessionsFolderId: null,
	};

	async componentWillLoad() {
		this.initialOptions = await readOptions();
		this.changeFormValue('sessionsFolderId', this.initialOptions.sessionsFolderId);
	}

	changeFormValue(controlName, value) {
		this.formControls = {
			...this.formControls,
			[controlName]: value,
		};

		console.debug(`ChangeFormValue called for '${controlName}' with new value '${value}'`);
	}

	handleSubmit(event) {
		event.preventDefault();
		console.debug('Form Submission with Data: ', this.formControls);
		this.saveOptions();
	}

	async saveOptions() {
		const newOptions = new SessionQuicksaveOptions();
		newOptions.sessionsFolderId = this.formControls.sessionsFolderId;
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

	render() {
		// TODO: Include an indicator, whether all changes are saved or not
		return (
			<ion-card class="frame">
				<ion-card-header>
					<h1>Session Quicksave Extension Options</h1>
				</ion-card-header>

				<form onSubmit={(e) => this.handleSubmit(e)}>
					<ion-card-body>
						<ion-content class="content">
							<ion-list>
								<ion-item>
									<ion-label position="stacked">Bookmark Folder for saving Sessions</ion-label>
									<ion-input
										type="number"
										required
										value={this.formControls.sessionsFolderId}
										onInput={(ev: any) => this.changeFormValue('sessionsFolderId', ev.target.value)}
									></ion-input>
								</ion-item>
							</ion-list>
						</ion-content>
					</ion-card-body>

					<ion-toolbar>
						<ion-buttons slot="end">
							<ion-button type="submit">Save options</ion-button>
						</ion-buttons>
					</ion-toolbar>
				</form>
			</ion-card>
		);
	}
}
