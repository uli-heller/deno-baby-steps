node-baby-steps
===============

This is a tutorial project for myself to get
some basic knowledge about deno and javascript.
At the moment, it may not be beneftial to you
at all!

Preparations
------------

Install DENO. Details: TBD.

Verify the installation:

```sh
$ deno --version
deno 2.5.6 (stable, release, x86_64-unknown-linux-gnu)
v8 14.0.365.5-rusty
typescript 5.9.2
```

Hello World
-----------

- Folder: [000-hello-world](00-hello-world)
- File: [000-hello-world/hello-world.cjs](000-hello-world/hello-world.cjs)
  ```
  console.log('Hello world from deno.cjs');
  ```
- Run:
  ```
  $ deno 000-hello-world/hello-world.cjs 
  Hello world from deno.cjs
  ```

Command Line Parameters
-----------------------

### Dump Them All

- Folder: [005-command-line-parameters](005-command-line-parameters)
- File: [005-command-line-parameters/dump.cjs)(005-command-line-parameters/dump.cjs)
  ```
  console.log(process.argv);
  ```
- Run:
  ```
  $ deno 005-command-line-parameters/dump.cjs -o sample.out
  [ [Getter], [Getter], "-o", "sample.out" ]
  ```

### Use "commander"

- Some preparations:
  ```
  cd 005-command-line-parameters
  deno install npm:commander@latest
  # ... installs version 14.0.2
  ```
- File: [parse.cjs](005-command-line-parameters/parse.cjs)
- Run:
  ```
  $ deno -A --node-modules-dir=auto  ./parse.cjs -h
  Usage: parse [OPTIONS]...
  
  Options:
    -v, --version               output the version number
    -o, --output <output-file>  Overwrite the output file. (default: "default-poutput-file.txt")
    -R, --reverse               Flag to reverse the output.
    -h, --help                  display help for command
  
  $ deno -A --node-modules-dir=auto parse.cjs 
  Reverse: Reverse flag is not present.
  Output: default-output-file.txt

  $ deno -A --node-modules-dir=auto parse.cjs -R -o uli.txt
  Reverse: Reverse flag is present.
  Output: uli.txt
  ```

### Use "util.parseArgs"

There is the method `parseArgs()` from module `node:util` to parse command line arguments. I don't give an example here, since it is way more tedious to
set up and it provides no command line help for example (option `--help`).

See [Node.js v25.2.1 documentation - util.parseArgs([config])](https://nodejs.org/api/util.html#utilparseargsconfig) for details!

### Preparing A MongoDB Client

For a mongodb client, I will probably need similar command line parameters
as mongosh, so I need these parameters:

- connectionString - mongodb://localhost:27017/
- apiVersion 1
- tls true
- tlsCertificateKeyFile

Here a dummy implementation based on "commander":

- File: [dummy-mongoclient.cjs](005-command-line-parameters/dummy-mongoclient.cjs)
- Run:
  ```
  $ deno -A --node-modules-dir=auto dummy-mongoclient.cjs -h
  Usage: dummy-mongoclient [OPTIONS]...
  
  Options:
    -v, --version                                       output the version number
    -c, --connectionString <mongodb-connection-string>  connection-string to connect to mongo db. (default:
                                                        "mongodb://localhost:27017/")
    -t, --tlsCertificateFile <certificate.pem>          client certificate for TLS auth.
    -h, --help                                          display help for command
  ```

Working With MongoDB
--------------------

- Create project directory and cd into it: [010-mongodb](010-mongodb)
- Initialize the node project: `npm init -y` -> creates [package.json](010-mongodb/package.json)
  ```json
  {
    "name": "010-mongodb",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "type": "commonjs"
  }
  ```
- Install the mongodb driver: `npm install mongodb@latest` -> 7.0.0
  ```diff
  diff --git a/010-mongodb/package.json b/010-mongodb/package.json
  index de1cc83..af704c5 100644
  --- a/010-mongodb/package.json
  +++ b/010-mongodb/package.json
  @@ -9,5 +9,8 @@
     "keywords": [],
     "author": "",
     "license": "ISC",
  -  "type": "commonjs"
  +  "type": "commonjs",
  +  "dependencies": {
  +    "mongodb": "^7.0.0"
  +  }
   }
  ```
  
Links And References
--------------------

- [W3Schools - Node.js Tutorial](https://www.w3schools.com/nodejs/)
- [DigitalOcean - How To Handle Command-line Arguments in Node.js Scripts](https://www.digitalocean.com/community/tutorials/nodejs-command-line-arguments-node-scripts)
- [NPM - Commander.js](https://www.npmjs.com/package/commander)
- [MongoDB - MongoDB Node Driver](https://www.mongodb.com/docs/drivers/node/current/)
- [dev.to -The final step: How to package a Node.JS application as an exe](https://dev.to/luckynkosi/the-final-step-how-to-package-a-node-js-application-4hol)
- [Amplification -5 Different Tools to Bundle Node.js Apps]( https://amplication.com/blog/5-different-tools-to-bundle-nodejs-apps)
