import { homedir } from 'os';
import { chdir } from 'process';
import { createInterface } from 'readline';
import { parse, resolve } from 'path';

const parseArgs = () => {
    const args = process.argv.slice(2);
    const usernameArg = args.find(arg => arg.startsWith('--username='));
    
    if (!usernameArg) {
        console.error('Please provide username using --username=your_username');
        process.exit(1);
    }

    return usernameArg.split('=')[1];
};

const displayPrompt = () => {
    console.log(`You are currently in ${process.cwd()}`);
    process.stdout.write('> ');
};

const parseCommand = (input) => {
    const [command, ...args] = input.trim().split(' ');
    
    const validCommands = [
        'up', 'cd', 'ls', 'cat', 'add', 'rn', 'cp', 'mv', 'rm', 
        'os', 'hash', 'compress', 'decompress', '.exit'
    ];

    if (!validCommands.includes(command)) {
        console.log('Invalid input');
        return null;
    }

    return { command, args };
};

const isAboveRoot = (path) => {
    const { root } = parse(process.cwd());
    const resolvedPath = resolve(process.cwd(), path);
    return !resolvedPath.startsWith(root);
};

const handleCommand = async (parsed) => {
    if (!parsed) return;

    const { command, args } = parsed;

    try {
        switch (command) {
            case 'up':
                const currentDir = process.cwd();
                if (isAboveRoot('..')) {
                    console.log('Operation failed');
                    break;
                }
                try {
                    chdir('..');
                    if (process.cwd() === currentDir) {
                        console.log('Operation failed');
                    }
                } catch (err) {
                    console.log('Operation failed');
                }
                break;
            case 'cd':
                if (!args.length) {
                    console.log('Invalid input');
                    break;
                }
                const targetPath = args[0];
                if (isAboveRoot(targetPath)) {
                    console.log('Operation failed');
                    break;
                }
                try {
                    chdir(targetPath);
                } catch (err) {
                    console.log('Operation failed');
                }
                break;
            case '.exit':
                console.log(`Thank you for using File Manager, ${username}, goodbye!`);
                rl.close();
                process.exit(0);
                break;
            default:
                console.log('Invalid input');
                break;
        }
    } catch (err) {
        console.log('Operation failed');
    }
};

const username = parseArgs();
console.log(`Welcome to the File Manager, ${username}!`);

chdir(homedir());

const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

displayPrompt();

process.on('SIGINT', () => {
    console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
    rl.close();
    process.exit(0);
});

rl.on('line', async (input) => {
    const parsed = parseCommand(input);
    await handleCommand(parsed);
    displayPrompt();
});