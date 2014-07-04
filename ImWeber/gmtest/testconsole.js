var gm = require('gm')
var EventEmitter = require('events').EventEmitter,
    events = new EventEmitter();
var w1 = 800;
var h1;
var newSize = {};

console.log(1)

gm( 'imgs/img.jpg' ).size(function(e, v){
  w = v.width;
  h = v.height;
  h1 = (w1*h)/w;
  newSize["h1"] = h1;
// setTimeout(function(){console.dir(newSize)}, 600);
  events.emit('resize');

})
console.log(2);
events.on('resize', function(){
  console.log(3)
  console.log(newSize)
})

console.log(4)
// setTimeout(function(){console.dir(newSize)}, 600);
