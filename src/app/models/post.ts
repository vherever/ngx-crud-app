export class Post {
  constructor (
    public author: string,
    public title: string,
    public body: string,
    public _collapsed: boolean,
    public id: number
  ) {
    this.author = author;
    this.title = title;
    this.body = body;
    this._collapsed = _collapsed;
    this.id = id;
  }
}
