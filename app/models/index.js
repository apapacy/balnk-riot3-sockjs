//select p.body, p.title, u.name from default p  join default u on keys 'User|' || p.`user`.`$ref`;

import  {promify} from '../utils/util';
var ottoman = require('ottoman');
var couchbase = require('couchbase');
var cluster = new couchbase.Cluster('couchbase://127.0.0.1');
ottoman.bucket = cluster.openBucket('default');


var Posts = ottoman.model('Post', {
  user: {ref: 'User'},
  title: 'string',
  body: 'string',
}, {
  index: {
    findByUser: {
      by: 'user',
      type: 'view'
    }
  }
});

var Users = ottoman.model('User', {
  name: 'string'
}, {
  queries: {
    myPosts: {
      of: 'Post',
      by: 'user'
    }
  }
});

promify(ottoman, ottoman.ensureIndices)
.then(data => {
  var user = new Users({name: 'John'});
  return promify(user, user.save);
})
.then(user=>{
  var post = new Posts({user, title: 'title', body: 'body'});
  return promify(post, post.save)
})
.then(post=> promify(Users, Users.myPosts, {}))
.then(
  (posts=>console.log(posts)),
  (err => console.log(err))
);
