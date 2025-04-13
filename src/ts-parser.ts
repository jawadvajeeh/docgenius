import { Project } from 'ts-morph';
import { DocEntry, LanguageParser } from './language-parser';

export class TsParser implements LanguageParser {
	supports(filePath: string): boolean {
		return filePath.endsWith('.ts') || filePath.endsWith('.js');
	}
	async parse(filePath: string): Promise<DocEntry[]> {
		const project = new Project();
		const sourceFile = project.addSourceFileAtPath(filePath);
		const entries: DocEntry[] = [];

		// Variables
		sourceFile.getVariableStatements().forEach(stmt => {
			stmt.getDeclarations().forEach(decl => {
				entries.push({
					name: decl.getName(),
					kind: 'variable',
				});
			});
		});

		// Functions
		sourceFile.getFunctions().forEach(fn => {
			const jsDoc = fn.getJsDocs()[0];
			entries.push({
				name: fn.getName() || 'anonymous',
				kind: 'function',
				description: jsDoc?.getDescription(),
				params: fn.getParameters().map(p => ({
					name: p.getName(),
					type: p.getType().getText()
				})),
				returnType: fn.getReturnType().getText(),
			});
		});

		// Classes
		sourceFile.getClasses().forEach(cls => {
			entries.push({
				name: cls.getName() || 'UnnamedClass',
				kind: 'class',
			});
		});


		return entries;

	}

}
