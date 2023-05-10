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

_______________________________________________________________________________

## Sample Application

When consuming ```@logi-dx/api```, you'll want to simply implement it with some 
```index.ts``` file that looks *something* like this. 

You'll want to ensure that you register all controllers against the 
```Application``` class. 

```typescript

import { ApplicationBuilder } from "@logi-dx/api";
import { TestsController } from "./TestsController";

// Inline example.

ApplicationBuilder
    .port(8080)
    .build()
    .register(TestsController)
    .start();

// Class example.

import { ApplicationBuilder, Port } from "@logi-dx/api";
import { TestsController } from "./TestsController";

@Port(1234)
class MyApplication {
    private readonly app;

    public constructor() {
        this.app = ApplicationBuilder.build();
    }

    public registerControllers(): void {
        this.app.register(TestsController);
    }

    public start(): void {
        this.app.start();
    }
}

new MyApplication().registerControllers().start();
```

There are some notes that you'll want to take into consideration, 
such as naming conflicts, for instance, if you have two controllers 
that have the same name, *currently* ```@logi-dx/api``` will not handle
this. 

This is by design, this is to ensure that it doesn't enforce any 
practices that may be considered opinionated. Not to mention that if you 
also have endpoint conflicts, you'll get the same result as if you were 
to do this with the Express library. 

Considering the above, to implement a controller, you'll simply want 
to implement it like so:

```typescript
import { Get, Route } from "@logi-dx/api";

@Route('/tests')
export class TestsController {
    @Get()
    public get(_req: any, res: any, _next: any) {
        console.log('Here...');
        res.status(200).json({ endpoint: '/tests', method: 'get' });
    }

    @Get('/:id')
    public getId(req: any, res: any, _next: any) {
        console.log('There...');
        res.status(200).json({ endpoint: '/tests/:id', id: req.params.id, method: 'get' });
    }
}
```

As you can see above, this controller *only* implements two HTTP get methods. However, the 
library exposes the following decorators:

* ```@Delete('/path')``` - Allows you to implement a request handler for a delete HTTP method.
* ```@Get('/path')``` - Allows you to implement a request handler for a get http method.
* ```@Patch('/path')``` - Allows you to implement a request handler for a path http method.
* ```@Port(portNumber)``` - Allows you to specify the port number you wish the application server to use. 
* ```@Post('/path')``` - Allows you to implement a request handler for a post http method.
* ```@Put('/path')``` - Allows you to implement a request handler for a put http method.
* ```@Route('/routeName')``` - This is required to specify the route for the controller.

It's worth documenting that the decorators for the different HTTP methods are specifically 
class method decorators & the other two decorators (```@Port()``` & ```@Route()```) are class 
decorators. 
