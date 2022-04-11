const db = require("../data/database");
const mongodb = require("mongodb");

const ObjectId = mongodb.ObjectId;
// const { ObjectId } = require("mongodb");

class Post {
  constructor(title, content, id) {
    this.title = title;
    this.content = content;
    // may be undefined
    if (id) {
      this.id = new ObjectId(id);
    }
  }

  static async fetchAll() {
    const posts = await db.getDb().collection("posts").find().toArray();
    return posts;
  }

  async fetch() {
    if (!this.id) {
      // throw new error || return
      return;
    }

    const postDocument = await db.getDb().collection("posts").findOne({ _id: this.id });
    this.title = postDocument.title;
    this.content = postDocument.content;
  }

  async save() {
    let result;
    // update POST /posts/:id/edit
    if (this.id) {
      result = await db
        .getDb()
        .collection("posts")
        .updateOne(
          { _id: this.id },
          { $set: { title: this.title, content: this.content } }
        );
    } else {
      // save POST /posts
      result = await db.getDb().collection("posts").insertOne({
        title: this.title,
        content: this.content,
      });
    }
    return result;
  }

  async delete() {
    if (!this.id) {
      // throw new error || return
      return;
    }
    const result = await db
      .getDb()
      .collection("posts")
      .deleteOne({ _id: this.id });
    return result;
  }
}

module.exports = Post;
