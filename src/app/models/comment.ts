export class Comment {
  constructor (
    public author: string,
    public email: string,
    public body: string,
    public date: string,
    public id: number,
    public postId: string,
  ) {
    this.author = author;
    this.email = email;
    this.body = body;
    this.date = date;
    this.id = id;
    this.postId = postId;
  }
}
