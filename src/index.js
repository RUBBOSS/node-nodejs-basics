import { homedir } from 'os';
import { chdir } from 'process';
import { createInterface } from 'readline';
import { parse, resolve, join } from 'path';
import { promises as fs } from 'fs';

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

const getCompletions = async (line) => {
    try {
        if (!line.startsWith('cd ')) {
            return [[], line];
        }

        const currentDir = process.cwd();
        const partial = line.substring(3).trim();

        if (!partial) {
            const items = await fs.readdir(currentDir, { withFileTypes: true });
            const dirs = items
                .filter(item => item.isDirectory())
                .map(item => item.name);
            return [dirs, ''];
        }

        const items = await fs.readdir(currentDir, { withFileTypes: true });
        const matchingDirs = items
            .filter(item => item.isDirectory())
            .map(item => item.name)
            .filter(name => name.toLowerCase().startsWith(partial.toLowerCase()));

        if (matchingDirs.length === 1 && matchingDirs[0].toLowerCase() !== partial.toLowerCase()) {
            return [[matchingDirs[0]], partial];
        }

        if (matchingDirs.length > 1) {
            return [matchingDirs, partial];
        }

        return [[], partial];
    } catch (err) {
        return [[], line];
    }
};

const listDirectory = async () => {
    try {
        const currentDir = process.cwd();
        const items = await fs.readdir(currentDir, { withFileTypes: true });
        
        const directories = items
            .filter(item => item.isDirectory())
            .map(item => ({ name: item.name, type: 'directory' }));
        
        const files = items
            .filter(item => item.isFile())
            .map(item => ({ name: item.name, type: 'file' }));

        directories.sort((a, b) => a.name.localeCompare(b.name));
        files.sort((a, b) => a.name.localeCompare(b.name));

        const nameColumnWidth = Math.max(
            ...items.map(item => item.name.length),
            'Name'.length
        );
        const typeColumnWidth = Math.max('Type'.length, 'directory'.length);

        const horizontalLine = '─'.repeat(typeColumnWidth + 2 + nameColumnWidth);

        console.log('┌' + horizontalLine + '┐');
        console.log(
            '│' + 
            'Type'.padEnd(typeColumnWidth) + 
            '  ' + 
            'Name'.padEnd(nameColumnWidth) + 
            '│'
        );
        console.log('├' + horizontalLine + '┤');

        directories.forEach(item => {
            console.log(
                '│' +
                item.type.padEnd(typeColumnWidth) +
                '  ' +
                item.name.padEnd(nameColumnWidth) +
                '│'
            );
        });

        files.forEach(item => {
            console.log(
                '│' +
                item.type.padEnd(typeColumnWidth) +
                '  ' +
                item.name.padEnd(nameColumnWidth) +
                '│'
            );
        });

        console.log('└' + horizontalLine + '┘');

    } catch (err) {
        console.log('Operation failed');
    }
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
                    const items = await fs.readdir(process.cwd(), { withFileTypes: true });
                    const dirs = items
                        .filter(item => item.isDirectory())
                        .map(item => item.name);
                    console.log('Available directories:');
                    console.log(dirs.join(', '));
                    console.log('Invalid input: cd command requires a path argument');
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
                    try {
                        const items = await fs.readdir(process.cwd(), { withFileTypes: true });
                        const dirs = items
                            .filter(item => item.isDirectory())
                            .map(item => item.name)
                            .filter(name => name.toLowerCase().includes(targetPath.toLowerCase()));
                        
                        if (dirs.length > 0) {
                            console.log('Did you mean one of these?');
                            console.log(dirs.join(', '));
                        }
                    } catch (listErr) {
                    }
                    console.log('Operation failed');
                }
                break;
            case 'ls':
                await listDirectory();
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
    output: process.stdout,
    completer: async function(line) {
        const [hits, partial] = await getCompletions(line);
        
        if (hits && hits.length > 0) {
            if (hits.length === 1) {
                const completion = hits[0];
                const fullCommand = `cd ${completion}`;
                return [[fullCommand], partial];
            }
            return [hits, partial];
        }
        
        return [[], line];
    }
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