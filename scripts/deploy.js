const process = require('process');
const { execSync } = require('child_process');
const { version } = require('../package.json');

// Change Working directory
process.chdir('dist/spa');


execSync(`git init`, { stdio: 'inherit' })
execSync(`git add - A`, { stdio: 'inherit' })

const dateNow = new Date().toISOString().split('.').shift();
execSync(`git commit -m 'Build ${version} at ${dateNow}`, { stdio: 'inherit' })

execSync(`git push -f git@github.com:AaronHernandezPerez/covid-tracker-front-dist.git master`, { stdio: 'inherit' })
