const hapi = require('hapi');
const server = new hapi.Server();
const runHttp = require('./http-run');
const Breed = require('./models/breed');

runHttp(server, 4444);

server.route({
  method: 'GET',
  path: '/dogbreeds', 
  handler: function(request, reply) {
    Breed.find({}).select('name group')
      .then(breeds => {
        let response = reply(breeds).code(200);
        response.type('application/json');
      })
      .catch(() => {
        let response = reply({ ERROR: 'Failed to GET breed' }).code(404);
        response.type('application/json');
      });
  }
});

server.route({
  method: 'GET',
  path: '/dogbreeds/{id}', 
  handler: function(request, reply) {
    Breed.findOne({_id: request.params.id })
      .then(breeds => {
        let response = reply(breeds).code(200);
        response.type('application/json');
      })
      .catch(() => {
        let response = reply({ ERROR: 'Failed to GET breed by id' }).code(404);
        response.type('application/json');
      });
  }
});

server.route({
  method: 'POST',
  path: '/dogbreeds', 
  handler: function(request, reply) {
    new Breed(request.payload)
      .save()
      .then(breed => {
        let response = reply(breed).code(200);
        response.type('application/json');
      })
      .catch(() => {
        let response = reply({ ERROR: 'Breed name is required' }).code(404);
        response.type('application/json');
      });
  }
});

server.route({
  method: 'DELETE',
  path: '/dogbreeds/{id}', 
  handler: function(request, reply) {
    Breed.findOneAndRemove({_id: request.params.id })
      .then(breed => {
        reply({ Success: `${ breed.name } has been removed` });
      })
      .catch(() => {
        reply({ ERROR: 'Failed to delete breed by id' }).code(404);
      });
  }
});

module.exports = server;
