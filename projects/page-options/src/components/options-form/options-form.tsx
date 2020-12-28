import React, { useEffect, useState } from 'react';
import { List, ListItem, makeStyles, TextField } from '@material-ui/core';

import { readOptions } from '@lib/chrome/synced-storage-service';
import type { SessionQuicksaveOptions } from '@lib/models/session-quicksave-options';
import { BookmarkFolderSelector } from '../bookmark-folder-selector/bookmark-folder-selector';

const styles = makeStyles((theme) => ({
	root: {},
}));

export function OptionsForm(props: { onFormChange: Function; onFormError: Function }) {
	const classes = styles();

	/**
	 * Initial Data Load
	 */
	let initialOptions: SessionQuicksaveOptions;
	useEffect(() => {
		readOptions()
			.then((options) => {
				initialOptions = options;
				changeFormValue('sessionsFolderId', initialOptions.sessionsFolderId);
			})
			.catch((err) => props.onFormError(err));
	}, []);

	/**
	 * Form State & Handling
	 */
	const [formControls, setFormControls] = useState({
		sessionsFolderId: '',
	});

	function changeFormValue(controlName: string, value: any) {
		console.debug(`ChangeFormValue called for '${controlName}' with new value '${value}'`);
		const newFormControls = { ...formControls, [controlName]: value };
		setFormControls(newFormControls);
		props.onFormChange(newFormControls);
	}

	/**
	 * Render JSX
	 */

	return (
		<form autoComplete="off">
			<List>
				<ListItem>
					<h3>Which bookmark folder should be used to store sessions?</h3>
				</ListItem>
				<ListItem>
					<BookmarkFolderSelector selectedFolderId={formControls.sessionsFolderId} />
				</ListItem>
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
