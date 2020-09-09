import {Config} from '@stencil/core';

// https://stenciljs.com/docs/config

export const config: Config = {
	globalStyle: 'src/global/app.css',
	globalScript: 'src/global/app.ts',
	taskQueue: 'async',
	outputTargets: [
		{
			type: 'www',
			// Activate to copy special folders over to output www folder
			// copy: [{src: 'chrome'}],

			// Comment the following line to enable service workers in production
			serviceWorker: null,
			// baseUrl: 'https://myapp.local/',
			// prerenderConfig: './stencil.prerender.config.ts',
		},
	],
	// this disables all inlining by the stencil compiler
	// => needed for chrome extension because inline script is viewed as evil in chrome
	allowInlineScripts: false,
};
