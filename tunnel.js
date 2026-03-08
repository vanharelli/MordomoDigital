import { spawn } from 'child_process';

const startServer = () => {
  return new Promise((resolve, reject) => {
    console.log('Iniciando servidor principal...');
    const server = spawn('npm', ['run', 'dev'], { 
        stdio: ['ignore', 'pipe', 'pipe'],
        shell: true 
    });

    let port = 5173; // default
    let serverStarted = false;

    // Output stdout to console and check for port
    server.stdout.on('data', (data) => {
      const output = data.toString();
      process.stdout.write(output); 

      // Strip ANSI codes
      // eslint-disable-next-line no-control-regex
      const cleanOutput = output.replace(/\x1B\[\d+m/g, '');

      // Detect port - look for "localhost:<port>"
      const match = cleanOutput.match(/localhost:(\d+)/);
      if (match) {
        port = parseInt(match[1], 10);
        if (!serverStarted) {
            serverStarted = true;
            resolve({ child: server, port });
        }
      }
    });

    server.stderr.on('data', (data) => {
      process.stderr.write(data.toString());
    });

    server.on('error', (err) => {
      reject(err);
    });
  });
};

(async function() {
  try {
    const { child: serverChild, port } = await startServer();
    console.log(`\nServidor detectado na porta ${port}. Iniciando túnel ngrok...`);

    // Use npx ngrok directly for reliability
    const ngrok = spawn('npx', ['ngrok', 'http', port.toString(), '--host-header=rewrite', '--log=stdout'], { 
        shell: true,
        stdio: ['ignore', 'pipe', 'pipe'] 
    });

    let urlFound = false;

    const parseOutput = (data) => {
        const output = data.toString();
        // Look for url in logs: "url=https://..."
        const match = output.match(/url=(https:\/\/[^ ]+)/);
        if (match && !urlFound) {
            urlFound = true;
            console.log('\n================================================================');
            console.log('   LINK PARA O CELULAR: ' + match[1]);
            console.log('================================================================\n');
        }
    };

    ngrok.stdout.on('data', parseOutput);
    ngrok.stderr.on('data', parseOutput);

    // Keep process alive
    process.stdin.resume();

    // Handle cleanup
    const cleanup = () => {
        console.log('\nEncerrando serviços...');
        if (process.platform === 'win32') {
             spawn('taskkill', ['/pid', ngrok.pid, '/f', '/t']);
             spawn('taskkill', ['/pid', serverChild.pid, '/f', '/t']);
        } else {
             ngrok.kill();
             serverChild.kill();
        }
        process.exit();
    };

    process.on('SIGINT', cleanup);
    process.on('SIGTERM', cleanup);

  } catch (err) {
    console.error('\nErro ao iniciar:', err);
    process.exit(1);
  }
})();
