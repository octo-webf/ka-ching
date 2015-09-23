module.exports = {
  authentify: function authentify(server) {
    return function (done) {
      server
        .post('/api/authenticate')
        .send({login: 'john.doe', password: 'foobar'})
        .expect(200)
        .end(onResponse);

      function onResponse(err, res) {
        if (err) return done(err);
        TOKEN = res.body.token;
        return done();
      }
    };
  }
};
