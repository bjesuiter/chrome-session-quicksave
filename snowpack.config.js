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
		metaUrlPath: 'snowpack',
		out: 'dist',
	},
	packageOptions: {
		knownEntrypoints: ['./src/page.background/background.html', './src/webroot/options.html'],
	},
	alias: {
		'@lib': './src/lib',
		'@page-options': './src/page-options/src',
		'@page-background': './src/page-background',
	},
	mount: {
		// builds especially manifest => avoids mapping of 'src/' to '/', which causes trouble with import filepaths in my code
		'src/webroot': { url: '/' },
		'src/page.background/': { url: '/' },
		'src/assets': { url: '/assets', static: true },
		'src/lib': { url: '/build' },
		'src/page.options/': { url: '/build' },
	},
	routes: [{ match: 'routes', src: '.*', dest: '/options.html' }],
};
