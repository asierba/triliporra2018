export class Hypermedia {
  constructor(body) {
    this.body = body;
  }

  getHref(value) {
    const rel = this.body.links.find(link => link.rel.includes(value));
    return rel.href;
  }
}
