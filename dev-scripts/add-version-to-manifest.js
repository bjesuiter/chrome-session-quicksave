import loadJson from 'load-json-file';
import saveJson from 'write-json-file';

const manifestPath = 'dist/manifest.json';

(async () => {
	try {
		const packageJson = await loadJson('package.json');
		const manifestJson = await loadJson(manifestPath);

		manifestJson.version = packageJson.version;

		console.log(`Added version ${manifestJson.version} to ${manifestPath}`);

		await saveJson(manifestPath, manifestJson);
	} catch (error) {
		console.error(error);
	}
})();
