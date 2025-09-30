import inquirer from 'inquirer';
import { CommandModule } from 'yargs';
import { splitSecret } from '../shamir/shamir-functions';
import { SplitArgs } from '../utils/types';
import { responseSender } from '../utils/utils';
import { validateSplitArgs } from '../utils/validation';

export const splitCommandCli: CommandModule<any, SplitArgs> = {
	command: 'split',
	describe: 'Split a secret into shares',
	builder: yargs =>
		yargs
			.option('secret', {
				alias: 'x',
				type: 'string',
				demandOption: true,
				description: 'Secret to split',
			})
			.option('sharesNum', {
				alias: 's',
				type: 'number',
				demandOption: true,
				description: 'Number of shares',
			})
			.option('threshold', {
				alias: 't',
				type: 'number',
				demandOption: true,
				description: 'Threshold number of shares required to recombine',
			})
			.option('outputType', {
				alias: 'o',
				choices: ['json', 'file'] as const,
				demandOption: false,
				default: 'json',
				description: 'Output format',
			})
			.option('fileBasePath', {
				alias: 'f',
				type: 'string',
				demandOption: false,
				default: '',
				description: 'Base path to save output file',
			}),
	handler: async argv => {
		validateSplitArgs(argv.sharesNum!, argv.threshold!);

		const res: string[] = splitSecret(argv.secret, argv.sharesNum, argv.threshold);

		responseSender(argv.outputType, argv.fileBasePath, res, 'share');
	},
};

export async function splitCommandInteractive() {
	const answers = await inquirer.prompt([
		{
			type: 'input',
			name: 'secret',
			message: 'Enter the secret to split:',
		},
		{
			type: 'number',
			name: 'sharesNum',
			message: 'Enter number of shares:',
		},
		{
			type: 'number',
			name: 'threshold',
			message: 'Enter threshold number:',
		},
		{
			type: 'list',
			name: 'outputType',
			message: 'Select output format:',
			default: 'json',
			choices: ['json', 'file'],
		},
		{
			type: 'input',
			name: 'fileBasePath',
			message: 'Enter file path to save output:',
			default: '',
			when: ans => ans.outputType === 'file',
		},
	]);

	validateSplitArgs(answers.sharesNum!, answers.threshold!);

	const res: string[] = splitSecret(answers.secret, answers.sharesNum, answers.threshold);

	responseSender(answers.outputType, answers.fileBasePath, res, 'share');
}
