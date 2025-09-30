import inquirer from 'inquirer';
import { recombineCommandInteractive } from '../commands/recombine';
import { splitCommandInteractive } from '../commands/split';

export async function runInteractive() {
	const { command } = await inquirer.prompt([
		{
			type: 'list',
			name: 'command',
			message: 'Select the function to perform:',
			choices: ['split', 'recombine'],
		},
	]);

	switch (command) {
		case 'split':
			await splitCommandInteractive();
			break;
		case 'recombine':
			await recombineCommandInteractive();
			break;
	}
}
