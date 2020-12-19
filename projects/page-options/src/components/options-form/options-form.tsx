import React, { SyntheticEvent, useState } from 'react';
import { List, ListItem, makeStyles, Snackbar, SnackbarCloseReason, TextField } from '@material-ui/core';
import { saveOptionsForm } from './save-options-form.function';
import { Alert } from '@lib/shared/alert';

const styles = makeStyles((theme) => ({
	root: {},
}));

export function OptionsForm() {
	const classes = styles();

	/**
	 * Form State & Handling
	 */

	const [formControls, setFormControls] = useState({
		sessionsFolderId: '',
	});

	function changeFormValue(controlName: string, value: any) {
		setFormControls({ ...formControls, [controlName]: value });
		console.debug(`ChangeFormValue called for '${controlName}' with new value '${value}'`);
	}

	async function handleFormSubmit(event: any) {
		event.preventDefault();
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
		<form autoComplete="off" onSubmit={handleFormSubmit}>
			<Snackbar open={toastData.open} autoHideDuration={2500} onClose={handleToastClose}>
				{/* <Snackbar open={toastData.open} autoHideDuration={2500}> */}
				<Alert onClose={handleToastClose} severity={toastData.severity}>
					{/* <Alert severity={toastData.severity}>*/}
					{toastData.message}
				</Alert>
			</Snackbar>
			<List>
				<ListItem>
					<TextField
						id="bookmark-folder-id"
						type="number"
						fullWidth={true}
						variant="filled"
						required
						value={formControls.sessionsFolderId}
						onChange={(event) => changeFormValue('sessionsFolderId', event.target.value)}
						label="Bookmark Folder ID for saving Sessions"
					/>
				</ListItem>
			</List>
		</form>
	);
}
