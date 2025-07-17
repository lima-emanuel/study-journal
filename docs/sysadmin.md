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
- `proc/sys`: Kernel features, changeable through `sysctl`
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
- `cat /etc/passwd`: info about all users in the form `username:password:user_id:group_id:notes:/home/dirname:shell`. The actual passwords are stored in `/etc/shadow`.
- `adduser` and `addgroup`: adds users and groups to the system
- `usermod` and `userdel`: modifies and deletes users on the system
- `passwd`: change password of user
- `ps aux`: see all processes
- `kill [PID]`: sends `SIGTERM` to process `[PID]`
- `pkill [PROCESS]`: sends `SIGTERM` to process `[PROCESS]`
- `kill -s [SIG] [PID]`: sends `[SIG]` to process `[PID]`
- `lsof`: lists open files
- `cat /proc/cpuinfo`: information about the CPU
- `cat /proc/meminfo`: information about the memory
- `cat /proc/cmdline`: all the parameters passed to the kernel at the bootup time
- `nice -n [INT] [COMMAND]`: runs `[COMMAND]` with an adjusted niceness, which affects process scheduling.  With no `[COMMAND]`, print the current niceness.  Niceness values range from -20 (most favorable to the process) to 19 (least favorable to the process). `[INT]` defaults to 10. `nice` launches a new command with a modified nice level (lower priority than it would have otherwise had, or higher priority if you have permission). You specify which command to launch by providing it as an argument to nice itself. nice actually execs that command, so nice itself doesn't terminate until the command does.
- `renice [--priority|--relative] [INT] [-g|-p|-u] [ID]`:  alters the scheduling priority of one or more running processes. The first argument is the priority value to be used. The other arguments are interpreted as process IDs (by default), process group IDs, user IDs, or user names. reniceing a process group causes all processes in the process group to have their scheduling priority altered. reniceing a user causes all processes owned by the user to have their scheduling priority altered. `renice` changes the priority of an existing running process, then terminates immediately.

## Systemd

A set of software used to provide an array of system components for Linux. It aims is to unify service configuration and behavior across Linux distributions. Its primary component is a "system and service manager" — an init system used to bootstrap user space and manage user processes.

In systemd, a unit is the basic object that systemd manages and supervises. Units represent resources like services, sockets, devices, mount points, and more. Each unit is defined by a configuration file (ending in .service, .socket, .mount, etc.) that describes how systemd should manage it. Units are used to start, stop, enable, and monitor system resources and processes.

__Commands:__

- `systemctl --type=service`: lists all service units;
- `sudo systemctl status [SERVICE]`: shows the current status of the service
- `sudo systemctl start [SERVICE]`: starts the service
- `sudo systemctl enable [SERVICE]`: starts the service now and on all bootups
- `sudo systemctl disable [SERVICE]`: removes the service from bootups

### journalctl

Systemd runs the systemd-journald.service, which stores logs in the journal from the different services maintained by systemd.

__Commands:__

- `sudo journalctl`: prints log entries from the systemd journal;
- `sudo journalctl --since [DATE]`: prints log entries from the systemd journal starting from `[DATE]`;
- `sudo journalctl -u [SERVICE]`: prints log entries from the systemd journal about `[SERVICE]`. Add `-f` to see a continuous stream;
- `sudo journalctl --list-boots`: history from past boots;
- `sudo journalctl -b [BOOT ID]`: prints log entries from the systemd journal during boot `[BOOT ID]`
- `sudo journalctl --disk-usage`: prints the size of the journals

## Packages

### DNF

- `dnf search [PKG]`: search for `[PKG]`
- `dnf info [PKG]`: show information about `[PKG]`
- `sudo dnf install [PKG]`: install `[PKG]`
- `sudo dnf list updates`: list available updates
- `sudo dnf updateinfo list --security`: list available security updates
- `sudo dnf update`: update the system
- `sudo needs-restarting`: show which processes need restarting to be updated

### APT

- `apt search [PKG]`: search for `[PKG]`
- `apt policy [PKG]`: show information about `[PKG]`
- `sudo apt install [PKG]`: install `[PKG]`
- `sudo apt list --upgradable`: list available updates
- `sudo apt update`: update package information
- `sudo apt full-upgrade`: update the system

## SELinux

TODO

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
- `curl -d @data.json -H 'Content-Type: application/json' [URL]`: `POST` the contents of `data.json` into URL specifying that the content-type is json;
- `curl --json @data.json [URL]`: better than the above;
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
