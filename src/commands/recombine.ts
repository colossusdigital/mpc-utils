import inquirer from 'inquirer';
import { CommandModule } from 'yargs';
import { recombineShares } from '../shamir/shamir-functions';
import { RecombineArgs } from '../utils/types';
import { responseSender } from '../utils/utils';

export const recombineCommandCli: CommandModule<any, RecombineArgs> = {
	command: 'recombine',
	describe: 'Recombine a secret from shares',
	builder: yargs =>
		yargs
			.option('shares', {
				alias: 's',
				type: 'array',
				demandOption: true,
				description: 'List of shares to recombine',
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
		const args = {
			...argv,
			shares: argv.shares?.map(s => s.toString()),
		};

		const res: string = recombineShares(args.shares);

		responseSender(args.outputType, args.fileBasePath, res, 'recombined_secret.key');
	},
};

export async function recombineCommandInteractive() {
	const answers = await inquirer.prompt([
		{
			type: 'input',
			name: 'shares',
			message: "Enter the shares (comma separated ','):",
			filter: val => val.split(',').map((s: string) => s.trim()),
		},
		{
			type: 'list',
			name: 'outputType',
			message: 'Select output format:',
			choices: ['json', 'file'],
			default: 'json',
		},
		{
			type: 'input',
			name: 'fileBasePath',
			message: 'Enter file path to save output:',
			default: '',
			when: ans => ans.outputType === 'file',
		},
	]);

	const res: string = recombineShares(answers.shares);

	responseSender(answers.outputType, answers.fileBasePath, res, 'recombined_secret.key');
}
