# Logi-DX API

The purpose of this library is to simply implement a relatively 
simplistic means of writing API's in a more simplistic manner.

This library is simply built on top of the Express library, 
and if you wish to gain access to the Express application server, 
you can take advantage of the  ```expose()``` method, within the 
```Application``` class.

The intention is to simply ensure that it's not too limiting,
any middleware that may have been written for express can still be 
used without any major hassle. By default, this library comes with 
little to no bundled libraries, the sole dependency being Express.

If you don't want to talk *directly* to the Express library, but want 
to pass middleware to the express application, you can use the ```consume()```
method on the ```Application``` class, this is *essentially* a wrapper 
around the ```use()``` method with Express.

[TODO...]