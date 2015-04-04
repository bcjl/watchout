// start slingin' some d3 here.

var gameOptions = {
  height: 450,
  width: 700,
  nEnemies:3,
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
var d3_collisionCount = d3.select('body').select('.scoreboard').select('.current').select('span');

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
      x: 0,
      y: 0
    };
  });
};

var render = function(enemyData){
  // console.log("called render");
  var d3_enemies = d3_gameBoard.selectAll('circle.enemy')
  .data(enemyData, function(d){ return d.id;});

  d3_enemies.enter()
    .append('svg:circle')
    .attr('class', 'enemy')
    .attr('cx', function(enemy){ return axes.x(enemy.x)} )
    .attr('cy', function(enemy){ return axes.y(enemy.y)} )
    .attr('r', '10px');

  d3_enemies.attr('class', 'enemy').transition().duration(750)
    .attr('cx', function(enemy){ return axes.x(enemy.x)} )
    .attr('cy', function(enemy){ return axes.y(enemy.y)} )
    .attr('r', '10px');
};

var enemyArray = createEnemies();
var update = function(){
    // gameStats.score++;
    //how do we use d3 to update the score now?
    // enemyArray.forEach(function(elem){
    //   elem.x = Math.random(0)*100;
    //   elem.y = Math.random(0)*100;
    // });
    for(var key in enemyArray){
      enemyArray[key].x = Math.random() * 100;
      enemyArray[key].y = Math.random() * 100;
    }

    render(enemyArray);
  };

// d3_gameBoard();

setInterval(update, 3000);

