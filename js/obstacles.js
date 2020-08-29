var obstacles = [
   {
      spriteX: 446,
      width: 33,
      height: 69,
      x: 760,
      y: 115,
   },
   {
      spriteX: 480,
      width: 67,
      height: 69,
      x: 760,
      y: 115,
   },
   {
      spriteX: 548,
      width: 101,
      height: 69,
      x: 760,
      y: 115,
   },
   {
      spriteX: 652,
      width: 47,
      height: 98,
      x: 760,
      y: 100,
   },
   {
      spriteX: 752,
      width: 97,
      height: 98,
      x: 760,
      y: 100,
   },
   {
      spriteX: 850,
      width: 101,
      height: 98,
      x: 760,
      y: 100,
   },
]

obstacles.forEach(e => {
   e.spriteY = 3
   e.i = 0
});

var pterodactyls = [
   {
      spriteX: [260, 352],
      width: 91,
      height: 79,
      x: 760,
      y: 110,
   },
   {
      spriteX: [260, 352],
      width: 91,
      height: 79,
      x: 760,
      y: 79,
   },
   {
      spriteX: [260, 352],
      width: 91,
      height: 79,
      x: 760,
      y: 62,
   }
]

pterodactyls.forEach(e => {
   e.spriteY = 3
   e.i = 0
});