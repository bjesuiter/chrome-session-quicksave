// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/#configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
	plugins: [
		'@snowpack/plugin-react-refresh',
		'@snowpack/plugin-typescript',
		'./tools/add-pkg-version-to-manifest.js',
	],
	buildOptions: {
		metaUrlPath: 'private/snowpack',
		out: 'dist',
		// watch: true,
	},
	packageOptions: {
		knownEntrypoints: [
			'./src/page-background/webroot/background.html',
			'./src/page-options/webroot/options.html',
		],
	},
	alias: {
		'@lib': './src/lib',
		'@page-options': './projects/page-options/src',
		'@page-background': './src/page-background',
	},
	mount: {
		'src/': { url: '/' },
		'src/assets': { url: '/assets', static: true },
		'src/page-background/': { url: '/' },
		'src/page-options/': { url: '/' },
		'src/page-options/src': { url: '/build' },
		'src/lib': { url: '/build' },
	},
	routes: [{ match: 'routes', src: '.*', dest: '/options.html' }],
};
