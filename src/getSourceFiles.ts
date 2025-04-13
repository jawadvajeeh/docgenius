import fg from 'fast-glob';

const getSourceFiles = async () => {
	return await fg(['**/*.{js,ts}', '!node_modules/**', '!dist/**', '!docs/**']);
};
