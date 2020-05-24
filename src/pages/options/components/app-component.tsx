import React, {useState} from 'react';
import {IonButton} from '@ionic/react';
import {getBookmarkTreeComplete} from '@chrome/bookmark-service';

function renderListNodes(list: chrome.bookmarks.BookmarkTreeNode[]) {
	return list.map(node => (
		<li>
			<h3>{node.title}</h3>
			<ul>{node.children ? renderListNodes(node.children) : undefined}</ul>
		</li>
	));
}

export default function App(props: any) {
	const [bookmarks, setBookmarks] = useState<Array<chrome.bookmarks.BookmarkTreeNode>>([]);
	getBookmarkTreeComplete().then(bookmarks => setBookmarks(bookmarks));

	return (
		<div>
			<h1>Session Quicksave - Options</h1>
			<label htmlFor="defaultSessionsFolderInput">Default Sessions Folder:</label>
			<input type="text" id="defaultSessionsFolderInput" />
			<hr />
			<h1>Demo Area</h1>
			{/* <button ion-button>Button</button> */}
			<IonButton>Default</IonButton>
			{/* <h2>Bookmark List</h2> */}
			{/* <ul>
				{renderListNodes(bookmarks)}
			</ul> */}
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
