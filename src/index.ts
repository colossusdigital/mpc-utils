import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { recombineCommand } from './commands/recombine';
import { splitCommand } from './commands/split';

yargs(hideBin(process.argv))
	.command(splitCommand)
	.command(recombineCommand)
	.demandCommand(1, 'You must specify a command: split or recombine')
	.strict()
	.help()
	.parse();
