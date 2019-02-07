var scores, roundScore, activePlayer, diceDOM, buttonRollDOM, gamePlaying;

init()

diceDOM = document.querySelector(".dice")
buttonRollDOM = document.querySelector(".btn-roll")
buttonHoldDOM = document.querySelector(".btn-hold")


buttonRollDOM.addEventListener('click', function(){
    if (gamePlaying){

        // 1. Random Number
        var dice = Math.floor(Math.random() * 6) + 1

        // 2. Display the results
        diceDOM.style.display = 'block';
        diceDOM.src = "dice-" + dice + ".png"

        // 3. Update the round score if the rolled number wasn't 1
        if (dice !== 1){
            
            // Add score
            roundScore += dice
            document.querySelector("#current-"+activePlayer).textContent = roundScore;
        }else{
            nextPlayer()
        }
    }
})


buttonHoldDOM.addEventListener('click', function(){
    if (gamePlaying){
        // Add current score to Global Score
        scores[activePlayer] += roundScore

        // Update the UI
        document.querySelector("#score-"+activePlayer).textContent = scores[activePlayer]

        // Check if player won the game
        if (scores[activePlayer] >= 20){
            document.querySelector("#name-"+activePlayer).textContent = "Winner"
            document.querySelector(".dice").style.display = 'none'
            document.querySelector(".player-"+activePlayer+"-panel").classList.remove("active")
            document.querySelector(".player-"+activePlayer+"-panel").classList.add("winner")

            gamePlaying = false
        }else{
            // Next Player
            nextPlayer()
        }
    }
})


function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 :  activePlayer = 0 
    roundScore = 0
    document.querySelector("#current-0").textContent = "0"
    document.querySelector("#current-1").textContent = "0"

    document.querySelector(".player-0-panel").classList.toggle("active")
    document.querySelector(".player-1-panel").classList.toggle("active")

    document.querySelector(".dice").style.display = 'none'
}

document.querySelector(".btn-new").addEventListener('click', init)


function init(){
    gamePlaying = true

    scores = [0, 0]
    activePlayer = 0
    roundScore = 0

    document.getElementById("name-0").textContent = "Player 1"
    document.getElementById("name-1").textContent = "Player 2"

    document.getElementById("score-0").textContent = "0"
    document.getElementById("score-1").textContent = "0"
    document.getElementById("current-0").textContent = "0"
    document.getElementById("current-1").textContent = "0"

    document.querySelector(".player-0-panel").classList.remove("winner")
    document.querySelector(".player-1-panel").classList.remove("winner")
    document.querySelector(".player-0-panel").classList.remove("active")
    document.querySelector(".player-1-panel").classList.remove("active")
    document.querySelector(".player-0-panel").classList.add("active")
}