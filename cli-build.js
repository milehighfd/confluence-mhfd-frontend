#!/usr/bin/env node

const program = require('commander');
const shell = require('shelljs');
const fs = require('fs-extra');
const path = require('path');
const buildOutputFolder = 'build';
program
  .version('1.0.0')
  .description('CLI for building different environments')
  .option('-e, --env <environment>', 'Specify the environment (development, production, test)')
  .parse(process.argv);

const validEnvironments = ['prod', 'dev2', 'test'];
const selectedEnv = program.opts().env;

const runBuild = (env) => {
  // Update .env.production file or generate a new one based on the selected environment
  console.log(`Building for ${env} environment...`);
  
  const sourceEnvPath = path.join(__dirname, `.env.${env}`);
  const destEnvPath = path.join(__dirname, '.env.production');
  
  // Check if the source env file exists
  if (fs.existsSync(sourceEnvPath)) {
    // Copy the source env file to .env.production
    fs.copyFileSync(sourceEnvPath, destEnvPath);
    console.log(`Environment file ${sourceEnvPath} copied to ${destEnvPath}`)
  } else {
    console.error(`No environment file found for ${env}.`);
    process.exit(1);
  }

  // Run build command with selected environment file
  const buildCommand = `npm run build -- --env=${env}`;
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
  if (!fs.existsSync(selectedEnv)) {
    fs.mkdirSync(selectedEnv);
  }else {
    fs.removeSync(selectedEnv);
    fs.mkdirSync(selectedEnv);
  }
  fs.copySync(buildOutputFolder, selectedEnv + '/' + buildOutputFolder);
} else {
  function createBuildFolders() {
    validEnvironments.forEach(environment => {
      if (!fs.existsSync(environment)) {
        fs.mkdirSync(environment);
      }else {
        fs.removeSync(environment);
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

