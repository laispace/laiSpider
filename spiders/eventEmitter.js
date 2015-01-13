var EventEmitter = require('events').EventEmitter;

var event = new EventEmitter();

event.on('myEvent', function onMyEvent () {
    console.log('myEvent happened: ', arguments);
});
event.on('myEvent', function onMyEvent1 () {
    console.log('myEvent happened again: ', arguments);
});

event.emit('myEvent', '111', '222', '333');

event.emit('myEvent', '444', '555', '666');


event.once('myEvent1', function onMyEvent1 () {
    console.log('myEvent1 happened only once: ', arguments);
});

event.emit('myEvent1', '111', '222', '333');

event.emit('myEvent1', '444', '555', '666');

console.log(event.listeners('myEvent'));

console.log(module);
console.log(require);

