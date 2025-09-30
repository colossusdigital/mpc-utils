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
				demandOption: true,
				description: 'Output format',
			})
			.option('filePath', {
				alias: 'f',
				type: 'string',
				demandOption: false,
				default: '',
				description: 'Path to save output file',
			}),
	handler: async argv => {
		const args = {
			...argv,
			shares: argv.shares?.map(s => s.toString()),
		};

		const res: string = recombineShares(args.shares);

		responseSender(args.outputType, args.filePath, res, 'recombined_secret.key');
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
		},
		{
			type: 'input',
			name: 'filePath',
			message: 'Enter file path to save output:',
			default: '',
			when: ans => ans.outputType === 'file',
		},
	]);

	const res: string = recombineShares(answers.shares);

	responseSender(answers.outputType, answers.filePath, res, 'recombined_secret.key');
}
