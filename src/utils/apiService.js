import RequestBuilder from "./apiClient/requestBuilder";

const apiService = {
  get: (url, params) => {
    return new RequestBuilder()
      .withUrl(url)
      .withMethod("GET")
      .withParams(params)
      .send();
  },

  post: (url, body) => {
    return new RequestBuilder()
      .withUrl(url)
      .withMethod("POST")
      .withBody(body)
      .send();
  },

  put: (url, body) => {
    return new RequestBuilder()
      .withUrl(url)
      .withMethod("PUT")
      .withBody(body)
      .send();
  },

  delete: (url) => {
    return new RequestBuilder().withUrl(url).withMethod("DELETE").send();
  },
};

export default apiService;
