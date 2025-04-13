#!/usr/bin/env node

import pkgJSON from "../package.json";
import { Command } from "commander";
import { generateDocs } from "./generateDocs";

const program = new Command();


program
	.name(pkgJSON.name)
	.description(pkgJSON.description)
	.version(pkgJSON.version);

program
	.command('generate')
	.description('Generate Markdown docs for your source code')
	.action(async () => {
		console.log(`Generating docs...`);
		generateDocs();
	});

program.parse();

/**
 * Adds Two numbers
 * @param num1 number one
 * @param num2 number two
 * @returns returns sum of two numbers
 */
function add(num1: number, num2: number) {
	return num1 + num2;
}