module.exports = function(io) {
  return {
    mensaje: function(req, res) {
      io.sockets.emit('hello', 'world');
      res.send('hello world');
    }
  };
}