const filename = './posts.json';
const helper = require('../helpers/helper.js');

// avoid require(filename) which performs cached read
let posts = helper.readJSONFile(filename); 

const getPosts = () => {
  return new Promise((resolve, reject) => {
    if (posts.length === 0) {
      reject({
        message: 'no posts available',
        status: 202,
      });
    }
    resolve(posts);
  });
}
const getPost = (id) => {
  return new Promise((resolve, reject) => {
    helper
      .mustBeInArray(posts, id)
      .then((post) => resolve(post))
      .catch((err) => reject(err));
  });
}
const insertPost = (newPost) => {
  return new Promise((resolve, reject) => {
    const id = { id: helper.getNewId(posts) };
    const date = {
      createdAt: helper.newDate(),
      updatedAt: helper.newDate(),
    };
    newPost = { ...id, ...date, ...newPost };
    posts.push(newPost);
    helper.writeJSONFile(filename, posts);
    resolve(newPost);
  });
}
const updatePost = (id, newPost) => {
  return new Promise((resolve, reject) => {
    helper
      .mustBeInArray(posts, id)
      .then((post) => {
        const index = posts.findIndex((p) => p.id == post.id);
        id = { id: post.id };
        const date = {
          createdAt: post.createdAt,
          updatedAt: helper.newDate(),
        };
        posts[index] = { ...id, ...date, ...newPost };
        helper.writeJSONFile(filename, posts);
        resolve(posts[index]);
      })
      .catch((err) => reject(err));
  });
}
const deletePost = (id) => {
  return new Promise((resolve, reject) => {
    helper
      .mustBeInArray(posts, id)
      .then(() => {
        //posts = posts.filter((p) => p.id !== id); this does not work and I am not sure why
        const index = posts.findIndex((p) => p.id == id)
        posts.splice(index, 1);
        helper.writeJSONFile(filename, posts);
        resolve();
      })
      .catch((err) => reject(err));
  });
}
module.exports = {
  insertPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
};
