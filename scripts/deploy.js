const process = require('process');
const { execSync } = require('child_process');
const { version } = require('../package.json');
const fs = require('fs')
const fsExtra = require('fs-extra')

const dir = './dist/git-dist';

if (fs.existsSync(dir)) {
  fs.rmdirSync(dir, { recursive: true });
}
fs.mkdirSync(dir)

// Change Working directory
process.chdir(dir);

execSync(`git clone git@github.com:AaronHernandezPerez/covid-tracker-front-dist.git .`, { stdio: 'inherit' })
execSync(`git rm -rf .`, { stdio: 'inherit' })
fsExtra.copySync('../spa', '.')
execSync(`git add -A`, { stdio: 'inherit' })

const dateNow = new Date().toISOString().split('.').shift();
try {
  execSync(`git commit -m "Build ${version} at ${dateNow}"`, { stdio: 'inherit' })
  execSync(`git push -f origin master`, { stdio: 'inherit' })
} catch (error) {
  // console.error(error);
  console.log('No changes detected, nothing commited');
}

process.chdir('./../../');
fs.rmdirSync(dir, { recursive: true });
