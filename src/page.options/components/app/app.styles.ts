import { makeStyles } from '@material-ui/core';

export const appStyles = makeStyles((theme) => {
	return {
		frameSmall: {
			margin: '8px',
			width: 'auto',
			minWidth: '300px',
			maxWidth: '800px',
		},
		frameBig: {
			margin: '40px auto',
			width: '100%',
			minWidth: '300px',
			maxWidth: '800px',
		},
		header: {
			background: '#000000ad',
			color: 'white',
			padding: '25px',
			display: 'flex',
			alignItems: 'center',
			boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.26)',
		},
		icon: {
			marginLeft: '8px',
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
	};
});
