let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset_btn");
let newBtn = document.querySelector("#new_btn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnO = true;

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetgame = () => {
  turnO = true; // Reset to player "O" turn
  enablboxes();
  msgcontainer.classList.add("hide");
};


boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText === "") { // Only mark the box if it's empty
      if (turnO) {
        box.innerText = "O";
        box.classList.remove("x");  // Remove class for 'X' if present
        box.classList.add("o");     // Add class for 'O'
        turnO = false;              // Switch to 'X' for the next turn
      } else {
        box.innerText = "X";
        box.classList.remove("o");  // Remove class for 'O' if present
        box.classList.add("x");     // Add class for 'X'
        turnO = true;               // Switch to 'O' for the next turn
      }
      box.disabled = true; // Disable the box after marking it
      checkWinner();       // Check if there's a winner or a draw
    }
  });
});



const disablboxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enablboxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, the winner is ${winner}!`;
  msgcontainer.classList.remove("hide");
  disablboxes();
};

const checkDraw = () => {
  let allFilled = true;
  for (let box of boxes) {
    if (box.innerText === "") {
      allFilled = false;
      break;
    }
  }
  if (allFilled) {
    msg.innerText = "It's a draw!";
    msgcontainer.classList.remove("hide");
    disablboxes();
  }
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    // If all three positions in a pattern are filled and equal, we have a winner
    if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
      showWinner(pos1Val);
      return; // Exit the function early if there's a winner
    }
  }

  // If no winner, check for a draw
  checkDraw();
};

newBtn.addEventListener("click", resetgame);
resetBtn.addEventListener("click", resetgame);
