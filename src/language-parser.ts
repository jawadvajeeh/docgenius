import { Type } from "ts-morph";

export type DocEntry = {
	name: string;
	kind: 'function' | 'class' | 'variable';
	description?: string;
	params?: { name: string; type: string; }[];
	returnType?: string;
};


export interface LanguageParser {
	supports(filePath: string): boolean;
	parse(filePath: string): Promise<DocEntry[]>;
}
