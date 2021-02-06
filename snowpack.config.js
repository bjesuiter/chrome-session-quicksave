// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/#configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
	mount: {
		'src/assets': { url: '/', static: true },
		'src/': { url: '/' },
		'projects/page-background/webroot': { url: '/', static: true },
		'projects/page-background/src': { url: '/' },
		'projects/page-options/webroot': { url: '/', static: true },
		'projects/page-options/src': { url: '/build' },
		'projects/lib': { url: '/build' },
	},
	plugins: ['@snowpack/plugin-react-refresh', '@snowpack/plugin-typescript', './tools/add-pkg-version-to-manifest.js'],
	routes: [{ match: 'routes', src: '.*', dest: '/options.html' }],
	buildOptions: {
		metaUrlPath: 'private/snowpack',
		out: 'dist',
		// watch: true,
	},
	alias: {
		'@lib': './projects/lib',
		'@page-options': './projects/page-options/src',
		'@page-background': './projects/page-background/src',
	},
};
