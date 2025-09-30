import fs from 'fs';
import path from 'node:path';

export function writeToFile(filePath: string, content: any) {
	const directory = path.dirname(filePath);

	if (!fs.existsSync(directory)) {
		fs.mkdirSync(directory, { recursive: true });
	}

	fs.writeFileSync(filePath, JSON.stringify(content));
}

export function responseSender(
	outputType: 'json' | 'file',
	filePath: string = '',
	content: string | string[],
	filename: string,
) {
	switch (outputType) {
		case 'json':
			console.log(content);
			break;
		case 'file':
			if (filePath !== '') {
				filePath = path.join(filePath, filename);
			} else {
				filePath = filename;
			}

			if (Array.isArray(content)) {
				content.forEach((item: string, index: number) => {
					const indexedFilePath: string = `${filePath}_${index}.key`;
					writeToFile(indexedFilePath, item);
					console.log('Share written to', indexedFilePath);
				});
			} else {
				writeToFile(filePath, content);
			}
			break;
	}
}
