import { makeStyles } from '@material-ui/core';

export const appStyles = makeStyles((theme) => ({
	frame: {
		margin: '40px auto',
		width: '100%',
		minWidth: '300px',
		maxWidth: '900px',
	},
	header: {
		background: '#5851ff',
		color: 'white',
		height: '56px',
		display: 'flex',
		alignItems: 'center',
		boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.26)',
	},
	h1: {
		fontSize: '1.4rem',
		fontWeight: 500,
		color: '#fff',
		padding: '0 12px',
	},
	content: {
		minHeight: '150px',
		padding: '20px',
	},
	actions: {
		display: 'flex',
		flexFlow: 'row nowrap',
		justifyContent: 'flex-end',
	},
}));
