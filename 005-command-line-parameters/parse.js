const { Command } = require('commander');
const program = new Command();
program
  .version('1.0.0', '-v, --version')
  .usage('[OPTIONS]...')
    .option('-o, --output <output-file>', 'Overwrite the output file.', 'default-output-file.txt')
  .option('-R, --reverse', 'Flag to reverse the output.')
  .parse(process.argv);

const options = program.opts();

const reverse = (options.reverse ? 'Reverse flag is present.' : 'Reverse flag is not present.');

console.log('Reverse:', `${reverse}`);
console.log('Output:', `${options.output}`);
