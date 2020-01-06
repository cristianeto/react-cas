//@Injectable()
export class HttpService {
  // constructor() {}

  /**
   * Método responsável por realizar uma requisição com url completa.
   *
   * @param url
   */
  doGetUrlXML(url) {
    return this.http.get(url, { responseType: "text" });
  }

  /**
   * Método responsável por realizar requisição get para API
   *
   * @param path
   */
  doGet(path) {
    return this.http.get(path);
  }
}
