# Notes on Networking

## Basics

Networking means communicating between two endpoints on the Internet. The Internet is just interconnected computers, each using its own individual addresses (IP addresses). The addresses each machine has can be of different types and machines can even have temporary addresses. These computers are also called hosts.

The user's computer is usually called the client and the machine you want to exchange data with is called the server. The main difference between the client and the server is in the roles they play. There is nothing that prevents the roles from being reversed in a subsequent operation. A transfer initiative is always taken by the client, as the server cannot contact the client but the client can contact the server.

When the client want to initiate a transfer from or to a server, it usually does not know its IP address but instead  usually knows its name. The name of the machine to communicate with is typically embedded in the URL that we work with when we use tools like curl or a browser.

Once the client knows the hostname, it needs to figure out which IP addresses the host with that name has so that it can contact it. Converting the name to an IP address is called `name resolving`. The name is resolved to one or a set of addresses. This is usually done by a DNS server, DNS being like a lookup table that can convert names to addresses. The computer normally already knows the address of a DNS server as that is part of setting up the network. The network client therefore asks the DNS server: "Hello, please give me all the addresses for example.com". The DNS server responds with a list of addresses back. Or in case of spelling errors, it can answer back that the name does not exist.

With one or more IP addresses for the host the client wants to contact, it sends a `connect request`. The connection it wants to establish is called a `TCP` (Transmission Control Protocol) or `QUIC` connection, which is like connecting an invisible string between two computers. Once established, the string can be used to send a stream of data in both directions. If the client has received more than one address for the host, it traverses that list of addresses when connecting, and if one address fails it tries to connect to the next one, repeating until either one address works or they have all failed.

When connecting with `TCP` or `QUIC` to a remote server, a client selects which port number to do that on. A port number is just a dedicated place for a particular service, which allows that same server to listen to other services on other port numbers at the same time. Most common protocols have default port numbers that clients and servers use. For example, when using the "<http://example.com/index.html>" URL, that URL specifies a scheme called HTTP which tells the client that it should try TCP port number 80 on the server by default. If the URL uses HTTPS instead, the default port number is 443. The URL can include a custom port number. If a port number is not specified, the client uses the default port for the scheme used in the URL.

After a `TCP` connection has been established, many transfers require that both sides negotiate a better security level before continuing (if for example `HTTPS` is used), which is done with `TLS` (Transport Layer Security). If so, the client and server do a `TLS handshake` first, and continue further only if that succeeds. If the connection is done using `QUIC`, the `TLS handshake` is done automatically in the connect phase.

When the connected metaphorical string is attached to the remote computer, there is a connection established between the two machines. This connection can then be used to exchange data. Traditionally, a download is when data is transferred from a server to a client; conversely, an upload is when data is sent from the client to the server. The client is down here; the server is up there.

When a single transfer is completed, the connection may have served its purpose. It can then either be reused for further transfers, or it can be disconnected and closed.

## Protocols

The language used to ask for data to get sent in either direction is called the protocol. The protocol describes exactly how to ask the server for data, or to tell the server that there is data coming. Examples: DICT, FILE, FTP, FTPS, GOPHER, GOPHERS, HTTP, HTTPS, IMAP, IMAPS, LDAP, LDAPS, MQTT, POP3, POP3S, RTMP, RTSP, SCP, SFTP, SMB, SMBS, SMTP, SMTPS, TELNET, TFTP, WS, WSS.

### HTTP

The Hypertext Transfer Protocol, HTTP, is the most widely used protocol for transferring data on the web and over the Internet. `RFC 9110` for general HTTP Semantics, `RFC 9112` for HTTP/1.1, `RFC 9113` for HTTP/2 and `RFC 9114` for HTTP/3. HTTP servers and clients use TCP port 80. Secure HTTP is HTTP done over an SSL/TLS connection. See `RFC 2818`. HTTPS servers and clients use TCP port 443, unless they speak HTTP/3 which then uses QUIC (`RFC 8999`) and is done over UDP.

A client sends a request to and receives a response from a server. An HTTP request sent by a client starts with a request line, followed by headers and then optionally a body. The most common HTTP request is probably the `GET` request which asks the server to return a specific resource, and this request does not contain a body.

A URl is converted into a request. `https://www.example.com/path/to/file` is parsed like so:

- `https` means to use TLS to the remote port 443 (which is the default port number when no specified is used in the URL).
- `www.example.com` is the hostname to be resolved to one or more IP addresses to connect to. This hostname is also used in the HTTP request in the `Host:` header.
- `/path/to/file` is used in the HTTP request to tell the server which exact document/resources to fetch;

HTTP is stateless, meaning that each request is independent. No request knows what others did.

__HTTP Methods__:

- `GET`: Retrieve data from server;
- `POST`: Submit data to server;
- `PUT`: Update data already on server;
- `DELETE`: Deletes data on server;

__HTTP Header Fields__:

Are always of the format `Name: Value`.

- `Host`: the requested URL;
- `Request Method`: which HTTP method was used;
- `Status Code`: status of the response;
- `Remote Address`: IP address of the host;
- `Server`: If it's Apache, Nginx, etc;
- `Date`: date and time of the response;
- `Content-Type`: If it is text/html, text/css, image/png, application/json, etc.
- `Authorization`: token to validate access to protected resource;
- `User-Agent`: the software used to make the request;

__HTTP Status Codes__:

- `1--`: Informational. Request received/processing;
- `2--`: Success. Successfully received, understood and accepted;
- `3--`: Redirect. Further action must be taken;
- `4--`: Client error. Request doesn`t have what it needs;
- `5--`: Server error. Server failed to fullfill the request;

__HTTP Status Codes Common Examples__:

- `200`: OK;
- `301`: Moved to new URL;
- `401`: Unauthorized;
- `500`: Internal server error;

## URIs

A Uniform Resource Identifier (URI) is a unique sequence of characters that identifies an abstract or physical resource, such as resources on a webpage, mail address, phone number, books, real-world objects such as people and places, concepts. URIs which provide a means of locating and retrieving information about resources on a network (either on the Internet or on another private network, such as a computer filesystem or an Intranet) are Uniform Resource Locators (URLs). Therefore, URLs are a subset of URIs, i.e. every URL is a URI (and not necessarily the other way around). Other URIs provide only a unique name, without a means of locating or retrieving the resource or information about it; these are Uniform Resource Names (URNs).

A Uniform Resource Name (URN) is a URI that identifies a resource by name in a particular namespace. A URN may be used to talk about a resource without implying its location or how to access it. For example, in the International Standard Book Number (ISBN) system, ISBN 0-486-27557-4 identifies a specific edition of the William Shakespeare play Romeo and Juliet. The URN for that edition would be `urn:isbn:0-486-27557-4`. However, it gives no information as to where to find a copy of that book.

A Uniform Resource Locator (URL) is a URI that specifies the means of acting upon or obtaining the representation of a resource, i.e. specifying both its primary access mechanism and network location. For example, the URL `http://example.org/wiki/Main_Page` refers to a resource identified as `/wiki/Main_Page`, whose representation is obtainable via the Hypertext Transfer Protocol (http:) from a network host whose domain name is `example.org`.

### Syntax

The syntax for an URI follows the form:

```uri
URI = scheme ":" ["//" authority] path ["?" query] ["#" fragment]
```

Or in picture:

![image](img/uri.jpg)

Example: `https://www.google.com/search?q=casa&sca_esv=1e37#rlimm=17546`, where:

- `https` is the scheme (or protocol);
- `www.google.com` is the authority. Authorities are of the form `username:password@host:port`, `host` is the only obligatory;
- `/search` is the path, specifically a pathinfo (because it's not a file, but rather a command);
- `?q=casa&sca_esv=1e37` is the (optional) query with the form `?key=value&key=value` or `?key=value;key=value`;
- `#rlimm=17546` is the (optional) fragment.

An http or https URI containing a pathinfo part without a query or fragment part is a `clean URL`.

## Commands

- `ip a`: shows the ip addresses of the system
- `ip n`: finds the hardware addresses (MAC address) of the computers in the local network
- `vim /etc/hosts`: edit the first file to be looked for name resolution
- `vim  /etc/systemd/resolved.conf`: edit the file that sets the DNS servers used
- `resolvectl status`: shows info on DNS resolvers used
- `host [address|ip]`: looks up the ip or domain name
- `dig [address|ip]`: looks up the ip or domain name
- `dig [address|ip] @[DNS]`: looks up the ip or domain name using `[DNS]`
- `ss -putn`: shows active TCP and UDP connections along with the associated processes
- `traceroute [URL]`: shows each hop along the route to the URL, including the time taken for each hop
- `tracepath [URL]`: modern version of the above
- `cat /etc/services`: shows all ports that can be used
