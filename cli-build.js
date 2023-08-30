#!/usr/bin/env node

const program = require('commander');
const shell = require('shelljs');
const fs = require('fs-extra');
const buildOutputFolder = 'build';
program
  .version('1.0.0')
  .description('CLI for building different environments')
  .option('-e, --env <environment>', 'Specify the environment (development, production, test)')
  .parse(process.argv);

const validEnvironments = ['production', 'dev2', 'test'];
const selectedEnv = program.opts().env;

const runBuild = (env) => {
  console.log(`Building for ${env} environment...`);

  // Run build command with selected environment file
  const buildCommand = `npm run build -- --env=env.${env}`;
  const result = shell.exec(buildCommand);

  if (result.code !== 0) {
    console.error('Build failed.');
    process.exit(1);
  }

  console.log('Build successful.');
};

if (!selectedEnv || !([...validEnvironments, 'all']).includes(selectedEnv)) {
  console.error('Please specify a valid environment (-e/--env)');
  process.exit(1);
}

if (selectedEnv != 'all') {
  runBuild(selectedEnv);
} else {
  function createBuildFolders() {
    validEnvironments.forEach(environment => {
      if (!fs.existsSync(environment)) {
        fs.mkdirSync(environment);
      }
    });
  }
  
  createBuildFolders();
  validEnvironments.forEach(environment => {
    runBuild(environment);
    fs.copySync(buildOutputFolder, environment + '/' + buildOutputFolder);
  });
}

