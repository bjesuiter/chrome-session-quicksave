import React, { SyntheticEvent, useState } from 'react';
import { appStyles } from './app.styles';
import {
	Button,
	Card,
	CardActions,
	CardContent,
	Divider,
	Snackbar,
	SnackbarCloseReason,
	Typography,
} from '@material-ui/core';
import { OptionsForm } from '../options-form/options-form';
import type { OptionPageFormControls } from '../options-form/option-page-form-controls.interface';
import { saveOptionsForm } from '../options-form/save-options-form.function';
import { Alert } from '@lib/shared/alert';

export default function App() {
	const classes = appStyles();

	/**
	 * Form Data Handling
	 */
	let formControls: OptionPageFormControls;

	function onFormChange(newFormControls: OptionPageFormControls) {
		console.log('New Form Control State: ', newFormControls);
		formControls = newFormControls;
	}

	async function onFormSubmit() {
		console.debug('Form Submission with Data: ', formControls);
		const result = await saveOptionsForm(formControls);
		if (result) {
			setToastData({
				open: true,
				severity: 'success',
				message: 'Options saved successfully!',
			});
		} else {
			setToastData({
				open: true,
				severity: 'error',
				message: 'Error while saving Options!',
			});
		}
	}

	function onFormError(err: any) {
		console.error(err);
		setToastData({
			open: true,
			severity: 'error',
			message: 'Error while loading Options!',
		});
	}

	/**
	 * Toast State & Handling
	 */
	const [toastData, setToastData] = useState({
		open: false,
		severity: 'success',
		message: '',
	});

	function handleToastClose(event: SyntheticEvent<any, Event>, reason: SnackbarCloseReason) {
		if (reason === 'clickaway') {
			return;
		}
		setToastData({ ...toastData, open: false });
	}

	/**
	 * Render JSX
	 */
	return (
		<Card className={classes.frame} variant="outlined">
			<Snackbar open={toastData.open} autoHideDuration={2500} onClose={handleToastClose}>
				{/* <Snackbar open={toastData.open} autoHideDuration={2500}> */}
				<Alert onClose={handleToastClose} severity={toastData.severity}>
					{/* <Alert severity={toastData.severity}>*/}
					{toastData.message}
				</Alert>
			</Snackbar>

			<header className={classes.header}>
				<Typography component="h1" className={classes.h1} color="textPrimary">
					Session Quicksave Extension Options
				</Typography>
				<Divider component="hr" />
			</header>
			<CardContent className={classes.content}>
				<OptionsForm onFormChange={onFormChange} onFormError={onFormError} />
			</CardContent>
			<CardActions className={classes.actions}>
				<Button onClick={onFormSubmit}>Save Settings</Button>
			</CardActions>
		</Card>
	);
}

// render() {
//   // TODO: Include an indicator, whether all changes are saved or not
//   return (
//     <ion-card class="frame">
//       <ion-card-header>
//         <h1>Session Quicksave Extension Options</h1>
//       </ion-card-header>

//       <form onSubmit={(e) => this.handleSubmit(e)}>
//         <ion-card-body>
//           <ion-content class="content">
//             <ion-list>
//               <ion-item>
//                 <ion-label position="stacked">Bookmark Folder for saving Sessions</ion-label>
//                 <ion-input
//                   type="number"
//                   required
//                   value={this.formControls.sessionsFolderId}
//                   onInput={(ev: any) => this.changeFormValue('sessionsFolderId', ev.target.value)}
//                 ></ion-input>
//               </ion-item>
//             </ion-list>
//           </ion-content>
//         </ion-card-body>

//         <ion-toolbar>
//           <ion-buttons slot="end">
//             <ion-button type="submit">Save options</ion-button>
//           </ion-buttons>
//         </ion-toolbar>
//       </form>
//     </ion-card>
//   );
// }
