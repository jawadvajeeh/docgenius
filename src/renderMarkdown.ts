import { DocEntry } from "./language-parser";

export function renderMarkdown(filePath: string, entries: DocEntry[]): string {
	let md = `# Documentation for ${filePath}\n\n`;

	for (const entry of entries) {
		md += `## ${entry.kind}: ${entry.name}\n`;
		if (entry.description) md += `${entry.description}\n\n`;

		if (entry.kind === 'function') {
			if (entry.params?.length) {
				md += `**Parameters:**\n\n`;
				entry.params.forEach(p => {
					md += `- \`${p.name}: ${p.type}\`\n`;
				});
				md += `\n`;
			}
			md += `**Returns**: ${entry.returnType || 'void'}\n\n`;
		}

		md += `---\n\n`;
	}

	return md;
}
