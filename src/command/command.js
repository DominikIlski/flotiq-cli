#!/usr/bin/env node

const importer = require('../importer/importer');
const gatsbySetup = require('../gatsby/gatsbySetup');

require('yargs')
    .command('start [apiKey] [directory] [url]', 'Start the project', (yargs) => {
        yargs
            .positional('apiKey', {
                describe: 'Flotiq RO api key',
                type: 'string',
            })
            .positional('directory', {
                describe: 'Directory to create project',
                type: 'string',
            })
            .positional('url', {
                describe: 'Url to Gatbsy starter',
                type: 'string',
            })
    }, (argv) => {

        gatsbySetup.setup(argv.directory, argv.url).then(async () => {
            let examplesPath = getObjectDataPath(argv.directory);
            await importer.importer(argv.apiKey, examplesPath)
        });

    })
    .command('import [apiKey] [directory]', 'Import objects from directory to flotiq', (yargs) => {
        yargs
            .positional('apiKey', {
                describe: 'Flotiq RO api key',
                type: 'string',
            })
            .positional('directory', {
                describe: 'Directory to create project',
                type: 'string',
            })
    }, async (argv) => {
        let examplesPath = getObjectDataPath(argv.directory);
        await importer.importer(argv.apiKey, examplesPath)
    })
    .help('$0 start|import [apiKey] [directory] [url]')
    // .demandCommand(3, 3)
    .argv

function getObjectDataPath(projectDirectory){
     return __dirname + '/../../' + projectDirectory + '/example';
}