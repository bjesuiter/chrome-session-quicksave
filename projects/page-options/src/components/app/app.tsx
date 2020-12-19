import React, { useState } from 'react';
import { appStyles } from './app.styles';
import MuiAlert from '@material-ui/lab/Alert';
import { Button, Card, CardActions, CardContent, Divider, Typography } from '@material-ui/core';

function Alert(props: any) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function App() {
	// let initialOptions: SessionQuicksaveOptions;
	const classes = appStyles();

	const [formControls, setFormControls] = useState({
		sessionsFolderId: '',
	});

	const [toastData, setToastData] = useState({
		open: false,
		severity: 'success',
		message: '',
	});

	// function changeFormValue(controlName: string, value: any) {
	// 	setFormControls({ ...formControls, [controlName]: value });
	// 	console.debug(`ChangeFormValue called for '${controlName}' with new value '${value}'`);
	// }

	// async function saveOptions() {
	// 	const newOptions = new SessionQuicksaveOptions();
	// 	newOptions.sessionsFolderId = formControls.sessionsFolderId || undefined;
	// 	try {
	// 		await saveSyncOptions(newOptions);
	// 		setToastData({
	// 			open: true,
	// 			severity: 'success',
	// 			message: 'Options saved successfully!',
	// 		});
	// 	} catch (error) {
	// 		setToastData({
	// 			open: true,
	// 			severity: 'error',
	// 			message: 'Error while saving Options!',
	// 		});
	// 	}
	// }

	// function handleSubmit<T>(event: any) {
	// 	event.preventDefault();
	// 	console.debug('Form Submission with Data: ', formControls);
	// 	saveOptions();
	// }

	// readSyncOptions().then((options) => {
	// 	initialOptions = options;
	// 	changeFormValue('sessionsFolderId', initialOptions.sessionsFolderId);
	// });

	// const handleClose = (event: SyntheticEvent<any, Event>, reason: SnackbarCloseReason) => {
	// 	if (reason === 'clickaway') {
	// 		return;
	// 	}
	// 	setToastData({ ...toastData, open: false });
	// };

	// return (
	// 	<div>
	// 		{/* <Snackbar open={toastData.open} autoHideDuration={2500} onClose={handleClose}> */}
	// 		<Snackbar open={toastData.open} autoHideDuration={2500}>
	// 			{/* <Alert onClose={handleClose} severity={toastData.severity}> */}
	// 			<Alert severity={toastData.severity}>This is a success message!</Alert>
	// 		</Snackbar>
	// 		<h1>Überschrift!!!</h1>
	// 	</div>
	// );

	return (
		<Card className={classes.frame} variant="outlined">
			<header className={classes.header}>
				<Typography component="h1" className={classes.h1} color="textPrimary">
					Session Quicksave Extension Options
				</Typography>
				<Divider component="hr" />
			</header>
			<CardContent></CardContent>
			<CardActions className={classes.actions}>
				<Button>Save Settings</Button>
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
