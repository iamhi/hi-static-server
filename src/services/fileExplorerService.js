import { readdir } from 'fs/promises';

const SERVICE_PREFIX = process.env.SERVICE_PREFIX || '';
const PUBLIC_PREFIX = (SERVICE_PREFIX) ? `${SERVICE_PREFIX}/public` : 'public';
const STATIC_PREFIX = 'static';

const listFiles = async (pathname) => {
	const dirpath = pathname.replace(PUBLIC_PREFIX, STATIC_PREFIX);
	const files = await readdir(global.appRoot + '/src' + dirpath);
	const filteredFiles = files.filter(file => !file.endsWith('.js') && !file.endsWith('.html'));
	const urlPath = dirpath.replace(STATIC_PREFIX, PUBLIC_PREFIX);

	return filteredFiles.map(file => ({
		label: file,
		url: urlPath + file,
	}));
};

export default {
	listFiles,
};
