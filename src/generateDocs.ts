import fg from 'fast-glob';
import path from 'path';
import fs from 'fs/promises';
import { TsParser } from './ts-parser';
import { renderMarkdown } from './renderMarkdown';


const parser = new TsParser();

export async function generateDocs() {
	const files = await fg(['**/*.{js,ts}', '!node_modules/**', '!dist/**', '!docs/**']);

	for (const file of files) {
		console.log(file);
		if (!parser.supports(file)) continue;
		const entries = await parser.parse(file);
		const markdown = renderMarkdown(file, entries);
		const mdPath = path.join('docs', file.replace(/\.(ts|js)$/, '.md'));
		await fs.mkdir(path.dirname(mdPath), { recursive: true });
		await fs.writeFile(mdPath, markdown);
	}

	console.log(`Generated docs for ${files.length} files.`);
}
