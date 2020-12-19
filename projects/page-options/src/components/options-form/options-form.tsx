import React, { useState } from 'react';
import { List, ListItem, makeStyles, TextField } from '@material-ui/core';

const styles = makeStyles((theme) => ({
	root: {},
}));

export function OptionsForm() {
	const classes = styles();

	const [formControls, setFormControls] = useState({
		sessionsFolderId: '',
	});

	function changeFormValue(controlName: string, value: any) {
		setFormControls({ ...formControls, [controlName]: value });
		console.debug(`ChangeFormValue called for '${controlName}' with new value '${value}'`);
	}

	return (
		<form autoComplete="off">
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
