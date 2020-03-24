const { spawn } = require("child_process");
const { exec } = require("child_process");

// for (let i = 0; i < 3; i++) {
//     const child = spawn("node", ["support.js", i]);

//     child.stdout.on("data", data => {
//         console.log(`stdout`, data.toString());
//     });

//     child.stderr.on("data", data => {
//         console.log(`stderr`, data);
//     });

//     child.on("close", code => {
//         console.log(`close: ${code}`);
//     });
// }
// const ls = spawn("ls", ["-lh", "/usr"]);

// ls.stdout.on("data", data => {
//     console.log(`stdout: ${data}`);
// });

// ls.stderr.on("data", data => {
//     console.log(`stderr: ${data}`);
// });

// ls.on("close", code => {
//     console.log(`child process exited with code ${code}`);
// });
exec("ls -al", function(error, stdout, stderr) {
    if (error) {
        console.error("error: " + error);
        return;
    }
    console.log("stdout: " + stdout);
    console.log("stderr: " + stderr);
});

// 失败的例子
// exec("ls hello.txt", function(error, stdout, stderr) {
//     if (error) {
//         console.error("error: " + error);
//         return;
//     }
//     console.log("stdout: " + stdout);
//     console.log("stderr: " + stderr);
// });
