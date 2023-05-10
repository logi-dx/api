import { Delete, Get, Patch, Post, Put, Route } from '../../src';

//@ts-ignore
@Route('/mocks')
export class MockController {
  //@ts-ignore
  @Delete()
  public delete(_req: any, res: any, _next: any) {
    res.status(200).json({ endpoint: '/mocks', method: 'delete' });
  }

  //@ts-ignore
  @Get()
  public get(_req: any, res: any, _next: any) {
    res.status(200).json({ endpoint: '/mocks', method: 'get' });
  }

  //@ts-ignore
  @Get('/:id')
  public getId(req: any, res: any, _next: any) {
    res.status(200).json({ endpoint: '/mocks/:id', id: req.params.id, method: 'get' });
  }

  //@ts-ignore
  @Patch()
  public patch(_req: any, res: any, _next: any) {
    res.status(200).json({ endpoint: '/mocks', method: 'patch' });
  }

  //@ts-ignore
  @Put()
  public put(_req: any, res: any, _next: any) {
    res.status(200).json({ endpoint: '/mocks', method: 'put' });
  }

  //@ts-ignore
  @Post()
  public post(_req: any, res: any, _next: any) {
    res.status(200).json({ endpoint: '/mocks', method: 'post' });
  }
}
