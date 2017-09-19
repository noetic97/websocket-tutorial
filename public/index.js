const socket = io();

$('.socket-input').submit(() => {
  socket.emit('chat message', $('#m').val());
  $('#m').val('');
  return false;
});

$('.login-submit').submit(() => {
  const userName = $('#user').val()
  socket.emit('logged in', userName);
  $('#user').val('');
  return false;
});

socket.on('chat message', (msg) => {
  $('#messages').append($('<li>').text(msg));
});

socket.on('logged in', (user) => {
  $('.logged-status').append($('<div>').text(user));
});

socket.on('broadcast', (user) => {
  $('.logged-status').append($('<div>').text(user));
})
