// start slingin' some d3 here.

var gameOptions = {
  height: 450,
  width: 700,
  nEnemies:1,
  padding:20
};

var gameStats = {
  score: 0,
  bestScore: 0,
  collisionCount: 0
};

var axes = {
  x: d3.scale.linear().domain([0,100]).range([0,gameOptions.width]),
  y: d3.scale.linear().domain([0,100]).range([0,gameOptions.height])
};


var d3_highScore = d3.select('body').select('.scoreboard').select('.high').select('span');
var d3_currentScore = d3.select('body').select('.scoreboard').select('.current').select('span');
var d3_collisionCount = d3.select('body').select('.scoreboard').select('.collisions').select('span');

var updateScore = function(){
  gameStats.bestScore = Math.max(gameStats.score, gameStats.bestScore);
  d3_highScore.data([gameStats.bestScore]).text(function(d){ return d; } );
  d3_currentScore.data([gameStats.score]).text(function(d){ return d; } );
  d3_collisionCount.data([gameStats.collisionCount]).text(function(d){ return d; } );
  // d3_highScore.text()
};

var d3_gameBoard = d3.select('body').append('div')
.attr('class', 'game')
.append('svg:svg')
.attr('width', gameOptions.width)
.attr('height', gameOptions.height);

var createEnemies = function(){ // returns an array of objects that contain enemy data
  var rangeArr = [];
  for(var i = 0; i < gameOptions.nEnemies; i++){
    rangeArr.push(i);
  }
  return rangeArr.map(function(elem){
    return {
      id: elem,
      x: Math.random() * 100,
      y: Math.random() * 100,
      r: 25
    };
  });
};

var player = [{
  x: 50,
  y: 50,
  r: 50
}];

var initialize = function(enemyData){
  var d3_enemies = d3_gameBoard.selectAll('circle.enemy')
  .data(enemyData, function(d){ return d.id;});
// drag constructor
  var drag = d3.behavior.drag()
    .on('dragstart', function(){d3_player.style({'fill': 'green'})})
    .on('drag', function(){d3_player
                  .attr('cx', d3.event.x)
                  .attr('cy', d3.event.y)
                })
    .on('dragend', function(){d3_player.style({'fill': 'red'})} );

//instantiation of dom elements
  d3_enemies.enter()
    .append('svg:circle')
    .attr('class', 'enemy')
    .attr('cx', function(enemy){ return axes.x(enemy.x)} )
    .attr('cy', function(enemy){ return axes.y(enemy.y)} )
    .attr('r', function(enemy){ return  (enemy.r) + 'px' } );

  var d3_player = d3_gameBoard.selectAll('circle.player')
    .data(player);

  d3_player.enter()
    .append('svg:circle')
    .attr('class', 'player')
    .attr('cx', function(player){ return axes.x(player.x)} )
    .attr('cy', function(player){ return axes.y(player.y)} )
    .attr('r', function(player){ return player.r + 'px'} )
    .call(drag)
    .style({'fill': 'red'});

};


var render = function(enemyData){
  // console.log("called render");
  var d3_enemies = d3_gameBoard.selectAll('circle.enemy')
  .data(enemyData, function(d){ return d.id;});

  d3_enemies.attr('class', 'enemy').transition().duration(750)
    .attr('cx', function(enemy){ return axes.x(enemy.x)} )
    .attr('cy', function(enemy){ return axes.y(enemy.y)} )
    .attr('r', function(enemy){ return enemy.r + 'px'});


};

var checkCollision = function(enemy){
  var radiusSum = enemy.r + player[0].r;
  var xDiff = Math.abs(axes.x(enemy.x - player[0].x));
  var yDiff = Math.abs(axes.y(enemy.y - player[0].y));

  var pythagoreanDistance = Math.sqrt(Math.pow(xDiff,2) + Math.pow(yDiff,2));
  // console.log(pythagoreanDistance, radiusSum);
  console.log(xDiff, yDiff);
  if(pythagoreanDistance < radiusSum){
    // updateHighScore();
    gameStats.score = 0;
    gameStats.collisionCount++;
    updateScore();
    console.log('collision detected');
  }
};

// game starting below

var enemyArray = createEnemies();
initialize(enemyArray);
var update = function(){
    // gameStats.score++;
    //how do we use d3 to update the score now?
    // enemyArray.forEach(function(elem){
    //   elem.x = Math.random(0)*100;
    //   elem.y = Math.random(0)*100;
    // });
    gameStats.score++;
    updateScore();
    for(var key in enemyArray){
      enemyArray[key].x = Math.random() * 100;
      enemyArray[key].y = Math.random() * 100;
      checkCollision(enemyArray[key]);
    }

    render(enemyArray);
  };

// d3_gameBoard();

setInterval(update, 3000);

