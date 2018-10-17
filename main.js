var message = document.getElementById('display-message');

var cells = document.querySelectorAll('.cell');

var tourDuJoueur1 = true;
var partieGagnee = false;

// var name1 = prompt("Nom du joueur 1");
// var name2 = prompt("Nom du joueur 2");

var nbCoups = 0;

var combinaisons = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
// var combinaison = combinaisons[0];

var ajouterSymbole = function(cell){
  if (cell.classList.length < 2) {
    if (tourDuJoueur1){
      cell.classList.add('cercle');
    } else{
      cell.classList.add('croix');
    }
    tourDuJoueur1 = !tourDuJoueur1;
  }
  console.log('test');
};

var verifierCombinaisons = function() {
        combinaisons.forEach(function(combinaison) {
            if (
                cells[combinaison[0]].classList[1] === cells[combinaison[1]].classList[1] &&
                cells[combinaison[1]].classList[1] === cells[combinaison[2]].classList[1] &&
                cells[combinaison[0]].classList[1] !== undefined
            ) {
                console.log('WIN');
                if (tourDuJoueur1) {
                    currentPlayer = 'Player 2';
                } else {
                    currentPlayer = 'Player 1';
                }
                cancelAnimationFrame( timer );
                timerState = "paused";
                clock.classList.add("paused");
                message.textContent = 'You rock ' + currentPlayer + ' !';
                partieGagnee = true;
            }
        });
        if (nbCoups == 9) {
            document.querySelector('#display-message').textContent='No one';
            }
    };
    
    cells.forEach(function(cell) {
        cell.addEventListener('click', function() {
            if (!partieGagnee) {
                ajouterSymbole(cell);
                verifierCombinaisons();
            }
        });
    });
    
    
    var start = document.querySelector(".morpion"),
    stop = document.querySelector(".stop"),
    clock = document.querySelector(".clock"),
    timerState = "stopped", //Clock is either stopped, paused, or running
    startTime, elapsed, timer;
//timer states

start.addEventListener("click", function(){
  if(timerState == "stopped"){
  startTime = Date.now();
  timer = requestAnimationFrame(updateTime);
    timerState = "running";
    clock.classList.remove("paused");
    clock.classList.add("running");
  }
});

stop.addEventListener("click", function(){
  if(!this.classList.contains("disabled") ){
    timerState = "stopped";
    clock.classList.remove("paused", "running");
    start.innerHTML = "Start";
    clock.innerHTML = "00 : 00 : 00"
  }
});

function updateTime(){

  timer = requestAnimationFrame(updateTime);
  elapsed = new Date(Date.now() - startTime);
  
  //minutes
  var mins = elapsed.getMinutes();
  //seconds  
  var secs = elapsed.getSeconds();
  // hundredths
  var hund = Math.floor(elapsed.getMilliseconds()/10);
   //add leading zeros
  if ( mins < 10 ){ mins = "0"+ mins }
  if ( secs < 10 ){ secs = "0"+ secs}
  if ( hund < 10 ){ hund = "0"+ hund }
  
  //update clock
  clock.innerHTML = mins + " : "+ secs + " : " + hund;
  
};