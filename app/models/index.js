//select p.body, p.title, u.name from default p  join default u on keys 'User|' || p.`user`.`$ref`  where u._type='User' and p._type='Post' order by u._id desc  limit 1 offset 0 ;
;

import  {promify} from '../utils/util';
var ottoman = require('ottoman');
var couchbase = require('couchbase');
var N1qlQuery = couchbase.N1qlQuery;
var cluster = new couchbase.Cluster('couchbase://127.0.0.1?fetch_mutation_tokens=1&operation_timeout=3600&config_total_timeout=3600durabilty_interval=1&http_poolsize=100');
var bucket = ottoman.bucket = cluster.openBucket('default');
ottoman.bucket.query.consistency = 3;


var Users = ottoman.model('User', {
  name: 'string',
  count: 'number',
}, {
  queries: {
    myPosts: {
      of: 'Post',
      by: 'user'
    }
  }
});

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


promify(ottoman, ottoman.ensureIndices)
.then(data => {
  for (let i = 0; i < 1000000; i++) {
    var user = new Users({name: 'John' + i, count: "a"});
    console.log(user)
    var test = promify(user, user.save);
  }
  return test;
})
.then(user=>{
  var post = new Posts({user, title: 'title', body: 'body'});
  return promify(post, post.save)
})
.then(post=> promify(Users, Users.find, {}))
.then(
  (posts=>console.log(posts)),
  (err => console.log(err))
).then(
  () => {
    var query = N1qlQuery.fromString("select p.body, p.title, u.name from default p  join default u on keys 'User|' || p.`user`.`$ref`  where u._type='User' and p._type='Post' order by u._id desc  limit 10 offset 0");
    query.consistency(N1qlQuery.Consistency.STATEMENT_PLUS);
    return promify(bucket, ottoman.bucket.query, query);
  }
).then(
  (data => console.log(data)),
  (error => console.log(error))
)

module.exports = {
  Users,
  Posts
}
