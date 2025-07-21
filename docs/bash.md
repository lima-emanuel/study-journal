# Notes on Bash

## Basics

```bash
# This is a comment

# A shebang tells the operating system which script engine should be used to run the script:
#!/usr/bin/env bash

# A single command can be written in multiple lines if each line ends in a backslash:
curl --request GET -sL \
    --user-agent 'Shellman' \
    --cookie 'key=value' \
    --url 'http://example.com'

# One can write multiple commands in a single line and separate them by semicolon (;):
var1=2; var2=3; var3="hello"

# Variable assignment. Variables are case sensitive. Spaces are not allowed:
firstName=Pedro

# Variable reading. To access a variable value prefix it with $:
echo "$firstName"
echo "${firstName}"

# Spaces have special meaning.
firstName = Pedro
# means command firstName is receiving arguments = and Pedro

# Always surround variables in "" when accessing their values if they may contain whitespaces:
fileName="some file.txt"
rm ${fileName}

# To concat variables and interpolate the string:
a="abc"
b="def"
c="ghi"
echo "${a}a ${b}b ${c}c"
# abca defb ghic
# Only double quotes expand variables and preserve special meaning to symbols. Single quotes make it raw.

# To assign a variable if and only if it has no value currently, use the default value snippet:
: "${variable:=default}"

# 3 types exist: Number, String and Array
var1=123
var2="oi, gente"
myArray=("one" "two" "three")
myArray2=(
    "four"
    "five"
    "six"
)
echo "${myArray[@]}" # one two three
echo "${myArray2[@]}" # four five six
echo "${myArray[0]}" # one
echo "${myArray2[2]}" # six

# Functions:
function my_func () {
    echo "${1}"
}
my_func hello    # hello

# Define functions before you can use them. If function B calls function A, then function A definition should precede definition of function B.

# $0 - Name of the script
# $1 to $9 - Arguments to the script. $1 is the first argument and so on.
# $@ - All the arguments
# $# - Number of arguments
# $? - Return code of the previous command
# $$ - Process Identification Number (PID) for the current script
# !! - Entire last command, including arguments
# $_ - Last argument from the last command

# To return, use echo
# return keyword only for integer status code (0 - 255) for functions
# exit keyword only for integer status code (0 - 255) for the entire script
# 0 is no error, the others, different kind of errors

# To store the output of commands inside variables:
output=$(command)

# check last command failure:
if [[ $? != 0 ]]; then
    echo "command failed"
fi

# check last command success:
if [[ $? == 0 ]]; then
    echo "command failed"
fi

# On a script, a flag is used for boolean values and its presence means True while Switch accepts argument(s).
# A snippet to handle them:
POSITIONAL=()
while [[ $# > 0 ]]; do # while arguments count > 0
    case "${1}" in
        -f|--flag)
        echo flag: ${1}
        shift # shift once since flags have no values
        ;;
        -s|--switch)
        echo switch ${1} with value: ${2}
        shift 2 # shift twice to bypass switch and its value
        ;;
        *) # unknown flag/switch
        POSITIONAL+=("${1}")
        shift
        ;;
    esac # end of case.
done
set -- "${POSITIONAL[@]}" # restore positional params
# replace -f|--flag with desired flag, i.e. -v|--verbose and on the next lines (before shift) do whatever you need.

# Good structure for scripts:
# 1. shebang
# 2. summary
# 3. handler functions region (if any)
# 4. event handlers region (if any)
# 5. animation frames region (if any)
# 6. functions region
# 7. argument parsing
# 8. setting default variable values
# 9. rest of code (minimize it to function calls)

# Summary is:
# Title: script
# Description: a script
# Author: Fulano <fulano@gmail.com>
# Date: 2019-01-06
# Version: 1.0.0
#
# Exit codes
# ==========
# 0 no error
# 1 script interrupted
# 2 error description

# Booleans:
# true and false
# || is or
# && is and

# Process substitution:
<( CMD )
# will execute CMD and place the output in a temporary file and substitute the <() with that file’s name.
diff <(ls foo) <(ls bar)
# will show differences between files in dirs foo and bar.

# Iterate through the arguments provided, grep for the string foobar, and append it to the file as a comment if it’s not found:
for file in "$@"; do
    grep foobar "$file" > /dev/null 2> /dev/null
    # When pattern is not found, grep has exit status 1
    # We redirect STDOUT and STDERR to a null register since we do not care about them
    if [[ $? -ne 0 ]]; then
        echo "File $file does not have any foobar, adding one"
        echo "# foobar" >> "$file"
    fi
done

# Globbing:
# ? match one
# * match any
# {} expand on common substring
*{.py,.sh} # means all .py and .sh files
```
