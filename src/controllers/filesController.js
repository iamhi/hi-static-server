import HttpStatus from 'http-status-codes';

import FileExplorerService from '@services/fileExplorerService';

export const listFiles = async (req, res) => {
	const { location } = req.query;
	const files = await FileExplorerService.listFiles(location);

	return res.status(HttpStatus.OK).send(files);
};
