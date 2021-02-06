/**
 * This script is a custom snowpack plugin
 */

const path = require('path');
const loadJson = require('load-json-file');

module.exports = function (snowpackConfig, pluginOptions) {
	return {
		name: 'add-pkg-version-to-manifest',
		resolve: {
			input: ['.json'],
			output: ['.json'],
		},
		async load({ filePath }) {
			if (path.basename(filePath) === 'manifest' && path.extname(filePath) === '.json') {
				const packageJson = await loadJson('../package.json');
				const manifestObject = JSON.parse(contents);
				manifestObject.version = packageJson.version;
				console.log(`Added version ${manifestObject.version} to ${filePath}`);
				return JSON.stringify(manifestObject);
			}
		},
	};
};
