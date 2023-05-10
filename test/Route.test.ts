import { MockApplication } from './helpers';
import * as client from 'supertest';
import { Request, Response, SuperTest } from 'supertest';

describe('@Route', () => {
  let app: MockApplication;
  let endpoint: SuperTest<Request>;

  beforeAll(() => {
    app = new MockApplication();
    endpoint = client(app.init());
  });

  afterAll(() => {
    app.kill();
  });

  test("DELETE '/mocks' has been setup", async () => {
    const method: string = 'delete';
    const uri: string = '/mocks';
    const request: Request = endpoint.delete(uri);
    const response: Response = await request;

    expect(response.statusCode).toBe(200);
    expect(response.body.endpoint).toBe(uri);
    expect(response.body.method).toBe(method);
  });

  test("GET '/mocks' has been setup", async () => {
    const method: string = 'get';
    const uri: string = '/mocks';
    const request: Request = endpoint.get(uri);
    const response: Response = await request;

    expect(response.statusCode).toBe(200);
    expect(response.body.endpoint).toBe(uri);
    expect(response.body.method).toBe(method);
  });

  test("PATCH '/mocks' has been setup", async () => {
    const method: string = 'patch';
    const uri: string = '/mocks';
    const request: Request = endpoint.patch(uri);
    const response: Response = await request;

    expect(response.statusCode).toBe(200);
    expect(response.body.endpoint).toBe(uri);
    expect(response.body.method).toBe(method);
  });

  test("POST '/mocks' has been setup", async () => {
    const method: string = 'post';
    const uri: string = '/mocks';
    const request: Request = endpoint.post(uri);
    const response: Response = await request;

    expect(response.statusCode).toBe(200);
    expect(response.body.endpoint).toBe(uri);
    expect(response.body.method).toBe(method);
  });

  test("PUT '/mocks' has been setup", async () => {
    const method: string = 'put';
    const uri: string = '/mocks';
    const request: Request = endpoint.put(uri);
    const response: Response = await request;

    expect(response.statusCode).toBe(200);
    expect(response.body.endpoint).toBe(uri);
    expect(response.body.method).toBe(method);
  });
});
