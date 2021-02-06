/**
 * This script is called via @snowpack/plugin-build-script in snowpack.config.js
 * This way it's integrated with the snowpack build correctly
 */

import loadJson from 'load-json-file';
import saveJson from 'write-json-file';

const manifestPath = $1;

async function main() {
	const packageJson = await loadJson('package.json');
	const manifestJson = await loadJson(manifestPath);
	manifestJson.version = packageJson.version;
	console.log(`Added version ${manifestJson.version} to ${manifestPath}`);
	await saveJson(manifestPath, manifestJson);
}

main().catch((error) => {
	console.error(error);
});
