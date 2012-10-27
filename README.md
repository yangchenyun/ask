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

There comes `ask`, you could ask it for commands:

    ask -q random number
    [1]: strings /dev/urandom | grep -o '[:alnum:]]' | head -n 30 | tr -d '\n'; echo
      Generate a random password 30 characters long
    [2]: echo $[RANDOM%X+1]
      Random Number Between 1 And X

You could paste the commands right in the terminal: 

    ask -e 2
    echo $[RANDOM%X+1]

You could share more commands right from terminal with your `$EDITOR`:
    
    ask add

More useful options are:

    $ ask --help
    usage: ask [options] 

    options:
      --add, -a             open your $EDITOR, edit and submit your last command(!!).
      --exec, -e <id>       exec the command with given id.
      --query, -q <words>   query for commands containing the keywords.
      --paste, -p <id>      paste in the command with given id.
