## Purpose
It is frustrating when we want to find some sophisticated unix commands right in the terminal. Right now, the process probably likes this:
- need some commands
- google / duckduckgo / wiki to find the some probably broken command
- copy and paste the command line
- tweak the command until it work, otherwise go back to step 2
- forget the knowledge days later

This process sucks. How about we **keep commands where it belongs to** -- terminal:
- Query for commands solving the problem right in the terminal
- Add your smart solutions back right from terminal
- Leverage the community power such as commandlinefu.com

## Install
- `git clone` the repo
- `npm install`

## Usage

### Query Command
You can ask it for commands from remote server:

    bin/ask query random number

    [1]: strings /dev/urandom | grep -o '[:alnum:]]' | head -n 30 | tr -d '\n'; echo
      Generate a random password 30 characters long
    [2]: Random Number Between 1 And X
      echo $[RANDOM%X+1]

You can also ask it from local server:

    bin/ask query random number --local
  
### Add Command
Add new command to local storage

    bin/ask add <command> --desc "it is an awesome command"

(work in progress) You could share more commands right from terminal with your `$EDITOR`:
    
    bin/ask add

### Execute Command

(work in progress) You could exec the commands right in the terminal: 

    bin/ask exec <command id>
    echo $[RANDOM%X+1]

(word in progress) Also paste to clipboard

    bin/ask copy <command id>

### (work in progress) Import and Export Command

    bin/ask export cmd.json

    bin/ask import backup.json

### More Information

    bin/ask --help

## For Developers

### Data Structure
Current data structure for each command:

    { 
      id: '11621',
      command: 'ifconfig |grep broadcast  | awk \'{print $2}\'',
      description: "it is a test command",
      keywords: ""
    }

### The structure of local cache directory(First Edition)
Like `git`, ask cab be total local. By default, all the commands will be cached in `~/.ask` direcotry.

The structure of `~/.ask` directory will similar to a local `.git` repository.

```
|-- index
`-- objects
    |-- 0.json
    |-- 1.json
    |-- … … 
    |-- info
    `-- pack
``` 

### RoadMap
On version 1.0
- develop a local storage engine
- implement local `ask add`, `ask exec <id>`, `ask query 'grep'` 
- use your `$EDITOR` to add commands to your local storage engine
- build a server model backed by postgreSQL
- build a server API interface

## How to Contribute
We follow the [`npm` code styles](https://npmjs.org/doc/npm.html).

## Contributors
- yangchenyun <yangchenyun@gmail.com>
- kuno <neokuno@gmail.com>
