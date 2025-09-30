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
	fileBasePath: string = '',
	content: string | string[],
	filename: string,
) {
	switch (outputType) {
		case 'json':
			console.log('\n', content);
			break;
		case 'file':
			if (fileBasePath !== '') {
				fileBasePath = path.join(fileBasePath, filename);
			} else {
				fileBasePath = filename;
			}

			if (Array.isArray(content)) {
				content.forEach((item: string, index: number) => {
					const indexedFilePath: string = `${fileBasePath}_${index}.key`;
					writeToFile(indexedFilePath, item);
					console.log('Share written to', indexedFilePath);
				});
			} else {
				writeToFile(fileBasePath, content);
			}
			break;
	}
}
