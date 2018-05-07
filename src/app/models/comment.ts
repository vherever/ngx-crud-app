export class Comment {
  constructor (
    public author: string,
    public email: string,
    public body: string,
    public id: number,
    public postId: string,
  ) {
    this.author = author;
    this.email = email;
    this.body = body;
    this.id = id;
    this.postId = postId;
  }
}
