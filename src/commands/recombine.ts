import inquirer from 'inquirer';
import { CommandModule } from 'yargs';
import { RecombineArgs } from '@/utils//types';

export const recombineCommand: CommandModule<any, RecombineArgs> = {
	command: 'recombine',
	describe: 'Recombine a secret from shares',
	builder: yargs =>
		yargs.option('shares', {
			alias: 's',
			type: 'array',
			description: 'List of shares to recombine',
		}),
	handler: async argv => {
		let args = {
			...argv,
			shares: argv.shares?.map(s => s.toString()),
		};

		if (!args.shares || args.shares.length === 0) {
			const answers = await inquirer.prompt([
				{
					type: 'input',
					name: 'shares',
					message: "Enter the shares (comma separated ','):",
					filter: val => val.split(',').map((s: string) => s.trim()),
				},
			]);
			args = { ...args, ...answers };
		}

		// Qui va la logica reale di recombine
	},
};
