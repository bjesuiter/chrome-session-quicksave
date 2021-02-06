/**
 * This script is a custom snowpack plugin
 */

const path = require('path');
const pkg = require('../package.json');

module.exports = function (snowpackConfig, pluginOptions) {
	return {
		name: 'add-pkg-version-to-manifest',

		async transform({ id, contents }) {
			const filename = path.basename(id);
			if (filename === 'manifest.json') {
				const manifest = JSON.parse(contents);
				manifest.version = pkg.version;
				console.info(`[add-pkg-version-to-manifest.js] Added version ${manifest.version} to ${filename}`);
				return JSON.stringify(manifest, null, '  ');
			}
		},
	};
};
