const fs = require('fs');
const { spawn } = require('child_process');

const packageJson = fs.readFileSync('./package.json', 'utf8');

const json = JSON.parse(packageJson);

const scripts = [];

Object.entries(json.scripts)
  .map(([key, value]) => {
    if (key.includes('migrate')) {
      scripts.push(value);
    }
  });

let migrationIndex = 0;
executeMigration();

function executeMigration() {
  if (scripts[migrationIndex]) {
    execute(scripts[migrationIndex]);
    migrationIndex++;
  }
}

function execute(command) {
  const commandArr = command.split(' ');

  const ls = spawn(commandArr[0],  commandArr.slice(1));

  ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  ls.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  ls.on('close', (code) => {
    console.log(`child process: "${command}" exited with code ${code}`);
    executeMigration();
  });
}
