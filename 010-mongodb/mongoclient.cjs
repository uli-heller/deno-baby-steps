const { Command } = require('commander');
const program = new Command();
const { MongoClient, ServerApiVersion } = require("mongodb");

const tls=true;
const apiVersion=1;

program
    .version('1.0.0', '-v, --version')
    .usage('[OPTIONS]...')
    .option('-c, --connectionString <mongodb-connection-string>', 'connection-string to connect to mongo db.', 'mongodb://localhost:27017/')
    //.option('-t, --tlsCertificateKeyFile <certificate.pem>', 'client certificate for TLS auth.')
    .parse(process.argv);

const options = program.opts();

const connectionString = options.connectionString;
//const tlsCertificateKeyFile = options.tlsCertificateKeyFile;

const mongoClient = new MongoClient(connectionString, {
    //tls: true,
    //tlsCertificateKeyFile: tlsCertificateFile,
    serverApi: {
	version: ServerApiVersion.v1,
	strict: true,
	deprecationErrors: true
    }
});

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await mongoClient.connect();
    // Send a ping to confirm a successful connection
    await mongoClient.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoClient.close();
  }
}

run().catch(console.dir);
