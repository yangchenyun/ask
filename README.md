It is frustrating when we need some sophisticated unix commands right in the terminal. Right now, the process probably likes this:
- need some command
- google / duckduckgo / wiki to find the command I need
- copy and paste
- tweak the command until it work, otherwise go back to step 2
- forget the knowledge somewhere else

This toggle between browser and terminal sucks, how about we **keep commands where it belongs to -- terminal**:
- We could add/query commands suit our need right from terminal
- We will have a community to help us maintain the knowledge

There comes `ask`, you could ask it for commands:

    ask random number
    [1]: strings /dev/urandom | grep -o '[:alnum:]]' | head -n 30 | tr -d '\n'; echo
      Generate a random password 30 characters long
    [2]: echo $[RANDOM%X+1]
      Random Number Between 1 And X

You could paste the commands right in the terminal: 

    ask 2
    echo $[RANDOM%X+1]

You could share more commands right from terminal with your `$EDITOR`:
    
    ask add
 
