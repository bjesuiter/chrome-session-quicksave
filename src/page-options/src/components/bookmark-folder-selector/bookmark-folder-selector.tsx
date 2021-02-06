import { getBookmarkTreeComplete } from '@lib/chrome/bookmark-service';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TreeItem from '@material-ui/lab/TreeItem';
import TreeView from '@material-ui/lab/TreeView';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useStyles } from './bookmark-folder-selector.styles';


export function BookmarkFolderSelector(props: any) {
	const classes = useStyles();

	const [treeData, setTreeData]: [chrome.bookmarks.BookmarkTreeNode[], Function] = useState([]);
	const [expanded, setExpanded]: [string[], Function] = React.useState(['0', props.selectedFolderId]);
	const [selected, setSelected]: [string[], Function] = React.useState([props.selectedFolderId]);

	useEffect(() => {
		getBookmarkTreeComplete().then((bookmarkTree) => {
			console.log(bookmarkTree);
			setTreeData(bookmarkTree);
		});
	}, []);

	const handleToggle = (_: ChangeEvent<{}>, nodeIds: string[]) => {
		setExpanded(nodeIds);
	};

	const handleSelect = (_: ChangeEvent<{}>, nodeIds: string[]) => {
		setSelected(nodeIds);
	};

	const renderTree = (node: chrome.bookmarks.BookmarkTreeNode) =>
		node ? (
			<TreeItem key={node.id} nodeId={node.id} label={node.id === '0' ? 'Bookmarks' : node.title}>
				{Array.isArray(node.children) ? node.children.map((node) => renderTree(node)) : null}
			</TreeItem>
		) : null;

	return (
		<TreeView
			className={classes.root}
			defaultCollapseIcon={<ExpandMoreIcon />}
			defaultExpandIcon={<ChevronRightIcon />}
			expanded={expanded}
			selected={selected}
			onNodeToggle={handleToggle}
			onNodeSelect={handleSelect}
		>
			{renderTree(treeData[0])}
		</TreeView>
	);
}
