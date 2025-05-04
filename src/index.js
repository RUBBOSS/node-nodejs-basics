import { homedir } from 'os';
import { chdir } from 'process';

const parseArgs = () => {
    const args = process.argv.slice(2);
    const usernameArg = args.find(arg => arg.startsWith('--username='));
    
    if (!usernameArg) {
        console.error('Please provide username using --username=your_username');
        process.exit(1);
    }

    return usernameArg.split('=')[1];
};

const username = parseArgs();
console.log(`Welcome to the File Manager, ${username}!`);

chdir(homedir());
console.log(`You are currently in ${process.cwd()}`);

process.on('SIGINT', () => {
    console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
    process.exit(0);
});

process.stdin.on('data', (data) => {
    const input = data.toString().trim();
    if (input === '.exit') {
        console.log(`Thank you for using File Manager, ${username}, goodbye!`);
        process.exit(0);
    }
});