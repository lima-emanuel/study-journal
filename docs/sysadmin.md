# Notes on System Administration

## Table of Contents

- [Notes on System Administration](#notes-on-system-administration)
  - [Table of Contents](#table-of-contents)
  - [Users](#users)
  - [File System](#file-system)
    - [Filesystem Hierarchy Standard](#filesystem-hierarchy-standard)
    - [Commands](#commands)
    - [Permissions](#permissions)
  - [Shell](#shell)
    - [Wildcards](#wildcards)
    - [Commands](#commands-1)
    - [Variables](#variables)
  - [System Information](#system-information)
  - [Environment](#environment)
  - [Internet](#internet)
  - [Utilities](#utilities)
  - [Vim](#vim)
  - [Regular Expressions](#regular-expressions)

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
- `id [user]`: get user id
- `set`: print all env variables

## Environment

TODO

## Internet

TODO

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
- `at [options] `: o

## Vim

TODO

## Regular Expressions

TODO
