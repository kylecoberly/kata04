const { spawn } = require('child_process');

module.exports = function runScript(command, args, callback) {
  const child = spawn(command, args);

  let scriptOutput = '';

  child.stdout.setEncoding('utf8');
  child.stdout.on('data', (data) => {
    scriptOutput += data.toString();
  });

  child.stderr.setEncoding('utf8');
  child.stderr.on('data', (data) => {
    scriptOutput += data.toString();
  });

  child.on('close', (code) => {
    callback(scriptOutput, code);
  });
};
