var ottoman = require('ottoman');
var couchbase = require('couchbase');
var cluster = new couchbase.Cluster('couchbase://127.0.0.1');
ottoman.bucket = cluster.openBucket('default');


function PhoneValidator(val) {
  var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if(val && !val.match(phoneno)) {
    throw new Error('Phone number is invalid.');
  }
}
var Furniture = ottoman.model('Furniture', {
  name: 'string',
  frame: 'Date'
}, {
  index: {
    findByName: {
      by: 'name'
    }
  }
});
Furniture.prototype.dance = function() {
  console.log('I am furniture, I do not dance.');
};

var Posts = ottoman.model('Post', {
  user: {ref:'User'},
  title: 'string',
  body: 'string'
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

var Employees = ottoman.model('Employee', {
  name: 'string'
}, {
  queries: {
    myPosts: {
      of: 'Post',
      by: 'user'
    }
  }
});


var CustomerMdl = ottoman.model('Customer', {
  customerID: { type:'string', auto:'uuid', readonly:true }, // ← auto-increment UUID
  createdON: { type:'Date', default:new Date() },            // ← auto populate date field
  name: {                                                    // ← embedded string document
    first: 'string',
    last: 'string'
  },
  address: {                                                 // ← embedded address document
    street: 'string',
    city: 'string',
    state: 'string',
    zip: 'integer',
    country: { type:'string', default:'USA' }                // ← auto populate string
  },
  phone: { type:'string', validator:PhoneValidator },        // ← string using custom validator
  email: 'string',
  history: [{                                                // ← array of historical events
    date: { type: 'Date', default:new Date() },
    employee: 'Employee',                                    // ← reference to another ottoman object
    interaction: 'string',
    notes: 'string'
  }],
  active: { type:'boolean', default:true }
},{
  index: {
    findByCustomerID: {            // ← refdoc index
      by: 'customerID',
      type: 'refdoc'
    },
    findByEmail: {                 // ← refdoc index
      by: 'email',
      type: 'refdoc'
    },
    findByFirstName: {             // ← secondary index
      by: 'name.first'
    },
    findByLastName: {              // ← secondary index
      by: 'name.last'
    }
  }
});


CustomerMdl.createAndSave = function (firstname, lastname, addrStreet, addrCity, addrState, addrZip, email, done) {
  this.create({
    name: {
      first: firstname,
      last: lastname
    },
    address: {
      street: addrStreet,
      city: addrCity,
      state: addrState,
      zip: addrZip
    },
    email: email
  }, done);
};

CustomerMdl.createAndSave('firstname', 'lastname', 'addrStreet', 'addrCity', 'addrState', 'addrZip', 'email', function(err, data) {
  if (err) {
    console.log('*********************')
    console.log(err)
  }
  console.log(data);
})

var user = new Users({name: 'Joe'});
var post = new Posts({user, title: 'title++', body: 'body++' })

post.save(
  function(err, data){
    user.save(function(){});
  }
);

var couch = new Furniture({name:'Couch'});
console.log(couch.name); // 'Couch'

var table = new Furniture({name:'Table', frame: new Date()});
table.dance();

table.save(function(err) {
  if (err) return console.error(err);
  table.dance();
});

ottoman.ensureIndices(function(err) {
  if (err) return console.error(err);
});

Furniture.findByName('Table', function(err, tables) {
  if (err) return console.error(err);
  console.log(tables);
})


Posts.find({}, {},function(err, data){
  console.log('++++++++++++++++++++++')
  if (err) {
    console.log(err)
  }
  data[0].user.load(function(err, data0){
    console.log('-------------------')
    if (err) {
      console.log(err)
    }
    console.log(data)
  })
})
