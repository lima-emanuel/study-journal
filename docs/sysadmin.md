# Notes on System Administration

## Users

- `passwd [options] [user]`: changes passwords for user accounts. A normal user may only change the password for their own account, while the superuser may change the password for any account. It also changes the account or associated password validity period.
- `su [options] [-] [user]`: allows commands to be run with a substitute user and group ID. `-` starts the shell as a login shell. `-c command` passes a command.

## File System

### Filesystem Hierarchy Standard

- `bin`: Essential command binaries
- `boot`: Static files of the boot loader
- `dev`: Device files
- `etc`: Host-specific system configuration
- `home`: Users directories
- `lib`: Essential shared libraries and kernel modules
- `media`: Mount point for removable media
- `mnt`: Mount point for mounting a filesystem temporarily
- `opt`: Add-on application software packages
- `proc`: Kernel and process file system
- `root`: Home directory for the root user
- `run`: Data relevant to running processes
- `sbin`: Essential system binaries
- `srv`: Data for services provided by this system
- `sys`: Kernel and system information
- `usr/bin`: Most user commands
- `usr/include`: Standard header files
- `usr/lib`: Libraries for programming and packages
- `usr/libexec`: Binaries run by other programs
- `usr/local`: Local software
- `usr/share`: Arch independent data
- `tmp`: Temporary files
- `var`: Variable data
- `var/spool/cron`: Cron jobs' data

### Commands

- `cmp [options] [file1] [file2]`: compare two files byte by byte.
- `find [options] [start directory] -name [pattern]`: searches for files.
- `plocate [pattern]`: searches for files. `sudo updatedb` to update its database.
- `tree [options] [directory]`: a recursive directory listing program that produces a depth indented listing of files. `-L` sets the max display depth of the directory tree.
- `cp [options] [origin] [destination]`: copy from `origin` to `destination`. `-i` asks before copying. `-r` recursive copy. `-t folder` copy everything from origin into folder. `-T` destination is a file.
- `mv [options] [origin] [destination]`: move/rename from `origin` to `destination`. `-i` asks before moving. `-t folder` move everything from origin into folder. `-T` destination is a file.
- `rm [options] [file]`: remove/rename `file`. `-i` asks before removing. `-r` recursive remove.
- `ln -s [origin] [destination]`: soft link from `origin` to `destination`.
- `ln [origin] [destination]`: hard link from `origin` to `destination`. Almost like a copy, but the contents of origin and destination are always the same (are synced).

### Permissions

- `d rwx rwx rwx`: if directory and read, write, execute for user, group and others
- `groups [user]`: list the groups the user is a member of
- `chgrp [options] [group] [file]`: change the group of the file
- `chown [options] [user] [file]`: change the user of the file
- `chmod u=rwx,g=rx,o=r [file]`: change the permissions of the file to the exact ones provided
- `chmod u+wx [file]`: add permissions to the file
- `chmod ug-wx [file]`: remove permissions from the file

## Shell

### Wildcards

Wildcards are placeholders for omitted letters or numbers:

- `?`: placeholder for one character
- `*`: placeholder for zero or more characters

```bash
$ ls k?d*

kidder.txt kiddo kidnews kidneypie
```

### Commands

- `chsh [-s shell] [user]`: change users shell. `-l` lists installed shells.

### Variables

- `$SHELL`: path to current shell binary
- `export VAR=MyVar`: new env variavle for current session

## System Information

- `uname -a`: info on system
- `df -h`: see all file systems
- `du -h`: disk usage of files on current directory
- `lsblk`: list block devices
- `lsblk`: list block devices
- `file [file]`: query what kind of file is it
- `who [options]`: print logged users
- `w`: print logged users and processes
- `id [user]`: get user and groups ids
- `set`: print all env variables
- `pwd`: print absolute path of the current working directory
- `printenv`: print all env vars

## Environment

TODO

## Internet

TODO

### Curl

`curl` is a command-line tool used for transferring data with URLs. It supports various protocols including HTTP, HTTPS, FTP, etc.

- `curl [URL]`: downloads the file from the URL to STDOUT;
- `curl [URL] -o [destination]`: downloads the file from the URL to `destination`;
- `curl [URL] -O`: downloads the file from the URL and saves with the same name;
- `curl -d "name=fulano&lang=Python" [URL]`: `POST` into URL;
- `curl -d @data.txt [URL]`: `POST` the contents of `data.txt` into URL;
- `curl -I [URL]`: fetches only the HTTP header;
- `curl -L [URL]`: follows redirects;
- `curl -I [URL] --next -d @data.txt [URL]`: `--next` makes multiple requests one after another resetting all options used before;
- `curl -v [URL]`: verbose output. Lines with `>` at the start of the line, show the headers in the request, while those with `<` show the headers in the response. Using `-s` helps to see only the headers. Using `-o /dev/null` helps to ignore the return content;
- `curl -H [header/@header_file] [url]`: adds extra header to the request;

## Utilities

- `apropos [options] [keyword]`: searches for `keyword` on manpages
- `wc [options] [file]`: prints metrics from file. `-c`counts bytes, `-m` counts chars, `-l` counts lines, `-w` counts words.
- `head [-n] [file]`: prints the first n lines of file
- `tail [-n] [file]`: prints the last n lines of file
- `grep [options] [pattern] [file]`: print lines that match pattern on file. If file is `-`, stdin is considered. `-c` just counts matches. `v` consider non matches
- `sed 's/old/new/g' [file]`: replace all the occurrence of the pattern on the file
- `awk -F, ‘{ print $2 “ “ $1 “ “ $7 }’ [file]`: print fields 2, 1 and 7 of file considering a comma delimited file
- `sdiff -s [file1] [file2]`: prints the comparison of file1 and file2. `<` if the line exists only in the first file, `>` if the line exists only in the second file, `|` if they are different
- `sort [options] [files...]`: sort lines of text files. `-t char` char delimited files, `+n` sort by the nth field, `-n` sort numerically
- `uniq [options] [input] [output]`: report or omit repeated lines. `-u` print unique lines, `-D` print duplicate lines
- `tee [file]`: read from standard input and write to standard output and file. `-a` append, do not overwrite.
- `split [options] [size] [file] [prefix]`: output pieces of file to PREFIXaa, PREFIXab, ... in chunks of size size. `-b` size in bytes, `-l` size in lines, `-t char` use char as separator
- `at [options]`: o
- `date`: prints the current date
- `tar -xzvf file.tar.gz`: extract file
- `tar -czvf files.tar.gz file1.c file2.txt`: create a tar called `files` from `file1` and `file2`
- `locate [name]`: finds files named `name` in the system.

## Vim

TODO

## Regular Expressions

TODO
