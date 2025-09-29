import inquirer from 'inquirer';
import { CommandModule } from 'yargs';
import { SplitArgs } from '@/utils/types';
import { validateSplitArgs } from '@/utils/validation';

export const splitCommand: CommandModule<any, SplitArgs> = {
	command: 'split',
	describe: 'Split a secret into shares',
	builder: yargs =>
		yargs
			.option('sharesNum', { alias: 's', type: 'number', description: 'Number of shares' })
			.option('thresholdNum', {
				alias: 't',
				type: 'number',
				description: 'Threshold number of shares required to recombine',
			})
			.option('outputType', {
				alias: 'o',
				choices: ['json', 'text'] as const,
				description: 'Output format',
			})
			.option('fileToSavePath', {
				alias: 'f',
				type: 'string',
				description: 'Path to save output file',
			}),
	handler: async argv => {
		let args = argv;

		//TODO: Define usage and errors from cli to inquirer method. If flags not all provided send error ?
		const answers = await inquirer.prompt([
			{
				type: 'number',
				name: 'sharesNum',
				message: 'Enter number of shares:',
				when: () => !args.sharesNum,
			},
			{
				type: 'number',
				name: 'thresholdNum',
				message: 'Enter threshold number:',
				when: () => !args.thresholdNum,
			},
			{
				type: 'list',
				name: 'outputType',
				message: 'Select output format:',
				choices: ['json', 'text'],
				when: () => !args.outputType,
			},
			{
				type: 'input',
				name: 'fileToSavePath',
				message: 'Enter file path to save output:',
				when: () => !args.fileToSavePath,
			},
		]);

		args = { ...args, ...answers };

		// Validation
		validateSplitArgs(args.sharesNum!, args.threshold!);

		// Place your actual split logic here
	},
};
