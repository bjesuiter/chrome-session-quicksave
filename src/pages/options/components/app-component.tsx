import React from 'react';
import {Button} from '@material-ui/core';

export default function App(props: any) {
	return (
		<div>
			<h1>Session Quicksave - Options</h1>
			<label htmlFor="defaultSessionsFolderInput">Default Sessions Folder:</label>
			<input type="text" id="defaultSessionsFolderInput" />

{/* This button doesn't work right now, but JSX in general works */}
			<Button color="primary">Material Core Button - Save</Button>
		</div>
	);
}
