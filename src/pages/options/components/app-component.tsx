import React from 'react';

export default function App(props: any) {
	return (
		<div>
			<h1>Session Quicksave - Options</h1>
			<label htmlFor="defaultSessionsFolderInput">Default Sessions Folder:</label>
			<input type="text" id="defaultSessionsFolderInput" />
		</div>
	);

	//  Favorite color:
	// <select id="color">
	//     <option value="red">red</option>
	//     <option value="green">green</option>
	//     <option value="blue">blue</option>
	//     <option value="yellow">yellow</option>
	// </select>

	// <label>
	//     <input type="checkbox" id="like">
	//     I like colors.
	// </label>

	// <div id="status"></div>
	// <button id="save">Save</button></label>
}
