import fs from 'fs';
import path from 'node:path';

export function writeToFile(filePath: string, content: any) {
	const directory = path.dirname(filePath);

	if (!fs.existsSync(directory)) {
		fs.mkdirSync(directory, { recursive: true });
	}

	fs.writeFileSync(filePath, JSON.stringify(content));
}
