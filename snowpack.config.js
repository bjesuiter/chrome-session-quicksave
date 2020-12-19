// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/#configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
	mount: {
		'webroot': { url: '/', static: true },
		'projects/page-background/webroot': { url: '/', static: true },
		'projects/page-background/src': { url: '/' },
		'projects/page-options/webroot': { url: '/', static: true },
		'projects/page-options/src': { url: '/build' },
	},
	plugins: ['@snowpack/plugin-react-refresh', '@snowpack/plugin-typescript'],
	install: [],
	installOptions: {},
	devOptions: {
		fallback: 'options.html',
	},
	buildOptions: {
		metaDir: 'private/snowpack',
		out: 'dist',
	},
	proxy: {},
	alias: {
		'@lib': './projects/lib',
		'@options-page': './projects/options-page/src',
	},
};
