var child_process = require('child_process');

var spawn = child_process.spawn;
var exec = child_process.exec;

exec('ls -ls', function (error, stdout, stderr) {
    if (error) {
        console.log('exec error: ', error);
    }
    console.log('exec stdout: ', stdout);
    console.log('exec stderr: ', stderr);
});

var ls = spawn('ls', ['-al']);
ls.stdout.on('data', function (data) {
    console.log('spawn stdout: ' + data);
});

ls.stderr.on('data', function (data) {
    console.log('spawn stderr: ' + data);
});

ls.on('close', function (code) {
    console.log('spawn child process exited with code ' + code);
});

