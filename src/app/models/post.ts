// export interface Post {
//   author: string;
//   title: string;
//   body: string;
//   _collapsed?: boolean;
// }

export class Post {
  constructor (
    public author: string,
    public title: string,
    public body: string,
    public _collapsed: boolean
  ) {
    this.author = author;
    this.title = title;
    this.body = body;
    this._collapsed = _collapsed;
  }
}
