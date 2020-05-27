const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const absPath = path.resolve(__dirname, '../.');
const bowerPath = path.resolve(absPath, 'bower.json');
const packagePath = path.resolve(absPath, 'package.json');

const { version } = require('../package.json');
console.log(`Creating tags for ${version}`);

const originalBranch = execSync(`git rev-parse --abbrev-ref HEAD`);

execSync(`git fetch origin dist:dist --force`, { stdio: 'inherit' })
execSync(`git fetch origin stage:stage --force`, { stdio: 'inherit' })

createTag('dist');
createTag('stage');

execSync(`git checkout ${originalBranch}`, { stdio: 'inherit' })


/**
 * Copies the result and creates a tag
 * Pushes everything to origin
 * @param {*} branch 
 */
function createTag(branch) {
  const tagName = `${branch.toUpperCase()}-${version}`
  execSync(`git checkout ${branch}`, { stdio: 'inherit' });
  execSync(`git pull origin ${branch}`, { stdio: 'inherit' });
  execSync(`cp -r ${absPath}/${branch}/. ${absPath}/.`, { stdio: 'inherit' });

  // Update bower version
  const bowerFile = JSON.parse(fs.readFileSync(bowerPath));
  bowerFile.version = version;
  fs.writeFileSync(bowerPath, JSON.stringify(bowerFile, null, 2));
  // Update package version
  const packageFile = JSON.parse(fs.readFileSync(packagePath));
  packageFile.version = version;
  fs.writeFileSync(packagePath, JSON.stringify(packageFile, null, 2));

  execSync(`git add -u`, { stdio: 'inherit' });
  execSync(`git commit -m "Builded ${new Date().toUTCString()}"`, { stdio: 'inherit' });
  execSync(`git tag ${tagName}`, { stdio: 'inherit' });
  execSync(`git push origin ${branch}`, { stdio: 'inherit' });
  execSync(`git push origin ${tagName}`, { stdio: 'inherit' });
}