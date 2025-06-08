import { watch } from "fs";
import { spawn } from 'bun';

async function runCommand() {
  const proc = spawn({
    cmd: ['bash', '-c', 'bun run dev'],
	stdout: "inherit",
	stderr: "inherit",
  });
  return proc;
}

let proc = await runCommand();  // Start the new process

// Gracefully kill the process before spawning a new one
async function killProc() {
  if (proc) {
    await proc.kill('SIGTERM');
    await proc.exit;
  }
}

const watcher = watch(import.meta.dir, { recursive: true }, async (event, filename) => {
  console.log("Detected change: " + filename);

  if (filename && (filename.includes('dist') || filename.includes('index.min.js'))) {
    console.log("Ignoring file change in build output: " + filename);
    return;
  } 


  if (proc !== undefined) {
    await killProc();
  }

  proc = await runCommand();  // Start the new process
});

process.on("SIGINT", () => {
  console.log("Closing watcher...");
  watcher.close();

  // Gracefully kill the current process before exiting
  killProc().then(() => {
    process.exit(0);
  });
});
