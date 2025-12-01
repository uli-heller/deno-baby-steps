const { Command } = require('commander');
const program = new Command();
const { MongoClient, ServerApiVersion } = require("mongodb");

const tls=true;
const apiVersion=1;

program
    .version('1.0.0', '-v, --version')
    .usage('[OPTIONS]...')
    .option('-c, --connectionString <mongodb-connection-string>', 'connection-string to connect to mongo db.', 'mongodb://localhost:27017/')
    .option('-t, --tlsCertificateFile <certificate.pem>', 'client certificate for TLS auth.')
    .parse(process.argv);

const options = program.opts();

const connectionString = options.connectionString;
const tlsCertificateFile = options.tlsCertificateFile;

const mongoClient = new MongoClient(connectionString, {
    serverApi: {
	version: ServerApiVersion.v1,
	strict: true,
	deprecationErrors: true
    }
});
