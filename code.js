const gameBox = document.getElementById("gameBox");

const start = document.getElementById("start");

start.addEventListener("click", resetGame);

start.disabled = true;

const gameBoard = (function() {
    let player = "X";

    let gameBoard = [
        [null, null, null],
        [null, null, null],
        [null, null, null]];

    function checkWinState() {
        let one = gameBoard[0][0];
        let two = gameBoard[0][1];
        let three = gameBoard[0][2];
        let four = gameBoard[1][0];
        let five = gameBoard[1][1];
        let six = gameBoard[1][2];
        let seven = gameBoard[2][0];
        let eight = gameBoard[2][1];
        let nine = gameBoard[2][2];

        if(one !== "empty" && one === two && two === three) {
            return one;
        }
        else if (one !== "empty" && one === four && four === seven) {
            return one;
        }
        else if (one !== "empty" && one === five && five === nine) {
            return one;
        }
        else if (two !== "empty" && two === five && five === eight) {
            return two;
        }
        else if (three !== "empty" && three === six && six === nine) {
            return three;
        }
        else if (three !== "empty" && three === five && five === seven) {
            return three;
        }
        else if (four !== "empty" && four === five && five === six) {
            return four;
        }
        else if (seven !== "empty" && seven === eight && eight === nine) {
            return seven;
        }
        else if (one !== "empty" && two !== "empty" && three !== "empty" && four !== "empty" && five !== "empty"
        && six !== "empty" && seven !== "empty" && eight !== "empty" && nine !== "empty") {
            return "tie";
        }
        return false;
    }

    const changePlayer = () => {
        if(player === "X") {
            player = "O";
        }
        else {
            player = "X";
        }
    };
    const createBoard = (x, y) => gameBoard[x][y] = "empty";
    const updateBoard = (x, y) => gameBoard[x][y] = player;
    const checkWinner = () => {
        const winner = checkWinState();
        if(winner !== false) {
            if(winner === "tie") {
                alert("Tie!");
                resetBoard();

                let blocks = document.querySelectorAll(".block");
                for(let i = 0; i < blocks.length; i++) {
                blocks[i].disabled = true;

                start.disabled = false;
                }
            }
            else {
                alert(winner + " wins!");
                resetBoard();

                let blocks = document.querySelectorAll(".block");
                for(let i = 0; i < blocks.length; i++) {
                blocks[i].disabled = true;

                start.disabled = false;
                }
            }
        }
    };
    const getPlayer = () => player;

    const resetBoard = () => gameBoard = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];

    return {changePlayer, updateBoard, createBoard, checkWinner, getPlayer};
})();

function createBlock (xCoord, yCoord) {
    let block = document.createElement("button");
    block.classList.add("block");
    block.value = [];
    block.textContent = "";
    gameBoard.createBoard(xCoord, yCoord);

    block.addEventListener("click", function() {
        block.textContent = gameBoard.getPlayer();
        block.disabled = true;
        gameBoard.updateBoard(xCoord, yCoord);
        setTimeout(function() {
            gameBoard.checkWinner();
        }, 100);
        gameBoard.changePlayer();
    });

    gameBox.appendChild(block);
}

function resetGame() {
    let blocks = document.querySelectorAll(".block");
    for(let i = 0; i < blocks.length; i++) {
        blocks[i].remove();
    }

    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            createBlock(i, j);
        }
    }
    start.disabled = true;
}

for(let i = 0; i < 3; i++) {
    for(let j = 0; j < 3; j++) {
        createBlock(i, j);
    }
}