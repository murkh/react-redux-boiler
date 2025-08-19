import { client } from "./index";

class RequestBuilder {
  constructor() {
    this.request = {};
  }

  withUrl(url) {
    this.request.url = url;
    return this;
  }

  withMethod(method) {
    this.request.method = method;
    return this;
  }

  withHeaders(headers) {
    this.request.headers = { ...this.request.headers, ...headers };
    return this;
  }

  withBody(body) {
    this.request.data = body;
    return this;
  }

  withParams(params) {
    this.request.params = params;
    return this;
  }

  withAuthorization(useAuth = true) {
    this.request.authorization = useAuth;
    return this;
  }

  build() {
    return this.request;
  }

  async send() {
    const response = await client(this.build());
    return response.data;
  }
}

export default RequestBuilder;
