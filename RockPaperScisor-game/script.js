
function game(playerSelection){
    let pCounter = parseInt(document.getElementById('pScore').innerHTML);
    let cCounter = parseInt(document.getElementById('cScore').innerHTML);

    if(pCounter < 5 && cCounter < 5){
        let computerSelection = computerPlay();
        playRound(computerSelection,playerSelection,pCounter,cCounter);
    }
    else{
        return 1;
    }
    
}

// Computer choice //
function computerPlay(){
    let choice = choices[Math.floor(Math.random() * 3)];
    let ele = document.getElementsByClassName('computer-box')[0];
    if (choice == 'rock'){
        ele.style.backgroundImage = "url('https://yugo-r.github.io/image-repo/rock.png')";
        return choice;
    }
    else if (choice == 'scissors'){
        ele.style.backgroundImage = "url('https://yugo-r.github.io/image-repo/scissors.png')";
        return choice;
    }
    else if (choice == 'paper'){
        ele.style.backgroundImage = "url('https://yugo-r.github.io/image-repo/paper.png')";
        return choice;
    }
    
}

function playRound(computer, player, playerScore, computerScore){
    let playerWin = () => {let newScore = playerScore +1;
        let result = 'playerWin';
        borderColor(result);
    if (newScore == 5){
        document.getElementById("pScore").innerHTML = playerScore + 1;
        document.getElementById("resultText").innerHTML = `Player win the game`;
        document.getElementById("cpuMumble").innerHTML = "Nooo!! This is not pos..i.sble *BIP* I. W..ill be b.a..ck *BIP* *BIP* SYSTEM ERROR"
        gameOver();
        }
    else{
        document.getElementById("resultText").innerHTML = `Player win this round`;
        document.getElementById("cpuMumble").innerHTML = cpLoosetext[Math.floor(Math.random() * 3)];
        document.getElementById("pScore").innerHTML = playerScore + 1;
    }}
    let computerWin = () => {let newScore = computerScore +1;
        let result = 'computerWin';
        borderColor(result);
        if (newScore == 5){
            document.getElementById("cScore").innerHTML = computerScore + 1;
            document.getElementById("resultText").innerHTML = `Computer win the game`;
            document.getElementById("cpuMumble").innerHTML = "You didn't stand a chance!! Computer will always rule over humans MWAHAHAHA";
            gameOver();
            }
        else{
            document.getElementById("resultText").innerHTML = `Computer win this round`;
            document.getElementById("cpuMumble").innerHTML = cpWintext[Math.floor(Math.random() * 3)];
            document.getElementById("cScore").innerHTML = computerScore + 1;
        }}
    let noWin = () => {let result = 'tie';
            borderColor(result);
            document.getElementById("resultText").innerHTML =`It's a tie`;
            document.getElementById("cpuMumble").innerHTML = tieText[Math.floor(Math.random() * 3)];}

    if (player === 'rock'){
        if (computer === 'scissors'){
            return playerWin();
        }
        else if (computer === 'paper'){
            return computerWin();
        }
        else{
            return noWin();
        }
    }
    else if (player === 'scissors'){
        if (computer === 'paper'){
            return playerWin();
        }
        else if (computer === 'rock'){
            return computerWin();
        }
        else{
            return noWin();
        }
    }
    else if (player == 'paper'){
        if (computer === 'rock'){
            return playerWin();
        }
        else if (computer === 'scissors'){
            return computerWin();
        }
        else{
            return noWin();
        }
    }  
}

function borderColor(result){
    let playerBorder = document.getElementsByClassName("player-box")[0];
    let computerBorder = document.getElementsByClassName("computer-box")[0];
    
    if (result == 'playerWin'){
        playerBorder.style.boxShadow =  '0 0 15px #26bf47';
        computerBorder.style.boxShadow =  '0 0 15px #bf2659';
    }
    else if (result == 'computerWin'){
        playerBorder.style.boxShadow =  '0 0 15px #bf2659';
        computerBorder.style.boxShadow =  '0 0 20px #26bf47';
    }
    else {
        playerBorder.style.boxShadow =  '0 0 15px #bf2659';
        computerBorder.style.boxShadow =  '0 0 15px #bf2659';
    }
}

function playerClick(clicked_Id){
    let ele = document.getElementsByClassName("player-box")[0];
    if (clicked_Id == 'rock'){
        ele.style.backgroundImage = "url('https://yugo-r.github.io/image-repo/rock.png')";
        game(clicked_Id);
    }
    else if (clicked_Id == 'scissors'){
        ele.style.backgroundImage = "url('https://yugo-r.github.io/image-repo/scissors.png')";
        game(clicked_Id);
    }
    else if (clicked_Id == 'paper'){
        ele.style.backgroundImage = "url('https://yugo-r.github.io/image-repo/paper.png')";
        game(clicked_Id);
    }
}

function gameOver(){
    let playAgain = document.getElementById('playAgain');
    playAgain.style.display = 'block';
    document.getElementById("rock").disabled = true;
    document.getElementById("scissors").disabled = true;
    document.getElementById("paper").disabled = true;
}

function restartGame(){
    location.reload();
}

// 3 choices //
let choices = ['rock','scissors','paper'];

let playerBorder = document.getElementsByClassName("player-box")[0];
let computerBorder = document.getElementsByClassName("computer-box")[0];

let cpWintext = ["Haha, I am inside your head!", "You can't win against me human !!", "My next move will obliterate you !!"]
let cpLoosetext = ["This is only a warm up don't get carried away !", "You think you are strong? I havn't used all my processors yet!", "I'm only playing with you. Pathetic living organism!"]
let tieText = ["I'm giving you a chance! As if you had one HaHaHa!!", "A tie again? let me show the true meaning of equality!", "See? I can copy your move, your mind is already downloaded!"]




