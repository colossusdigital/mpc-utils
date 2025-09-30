import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { recombineCommandCli } from './commands/recombine';
import { splitCommandCli } from './commands/split';
import { runInteractive } from './utils/interactive.utils';

async function main() {
	const argv = hideBin(process.argv);

	if (argv.length === 0) {
		await runInteractive();
	} else {
		yargs(argv)
			.command(splitCommandCli)
			.command(recombineCommandCli)
			.demandCommand(1, "You must specify a function: 'split', 'recombine'")
			.strict()
			.help()
			.parse();
	}
}

main();
