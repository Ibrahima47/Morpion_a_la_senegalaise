//  Implement local storing functionality to store scores and players
//  Implement Drag and Drop functionalty to move pieces
let player1 = {

  username : 'Youssouf',
  remainingPieces : 3,
  firstMovePos : undefined , // a boolean value stating a piece is being selected
  lastMovePos : undefined ,
  pieceType : 'guest',
  pieces:document.querySelectorAll(`.${this.pieceType}`),
  makeMove(){
/*
 1 . cells are initially disabled   done
 2 . when a piece is clicked : 
    a . retrieve its location, meaning its parentNoe
    b . if it's a cell, toggleAttribute "disabled" for possibleMove

*/
    // attach event to each piece on the bord and cells also
  //  There're remaining pieces
    //  click on a piece to store HTMLelement on firstMovePos
    //  click on a cell to appendChild element on it
      //  if firstMovePos : store ; cell.toggleClass is full 
      //  
  //  There're no remaining pieces
  if (this.remainingPieces) this.remainingPieces--
  game.switchTurn() //  last action after making move
 
  },
  setUsername(newName){
    this.username = newName;
  },
  reset(){
    this.remainingPieces = 3;
    // a boolean value that indicates wether a piece is currently selected
    this.firstMovePos = false;
    this.selectedPiece = undefined;
    let pieces=document.querySelectorAll(`.${this.pieceType}`)
    pieces.forEach(piece => {
      console.log(piece.toggleAttribute('disabled'))
      piece.classList.remove('not-allowed-action')
      piece.classList.add('not-allowed-action')
      }
   );
  },

}

let player2 = {

  username : '',
  remainingPieces : 3,
  firstMovePos : undefined ,
  lastMovePos : undefined ,
  pieceType : 'host',
  pieces:document.querySelectorAll(`.${this.pieceType}`),
  makeMove(){
/*
 1 . cells are initially disabled
 2 . when a piece is clicked : 
    a . retrieve its location, meaning its parentNoe
    b . if it's a cell, toggleAttribute "disabled" for possibleMove

*/
    // attach event to each piece on the bord and cells also
  //  There're remaining pieces
    //  click on a piece to store HTMLelement on firstMovePos
    //  click on a cell to appendChild element on it
      //  if firstMovePos : store ; cell.toggleClass is full 
      //  
  //  There're no remaining pieces
  game.switchTurn() //  last action after making move
  
  },
  setUsername(newName){
    this.username = newName;
  },
  reset(){
    let pieces=document.querySelectorAll(`.${this.pieceType}`)
    pieces.forEach(pion => {
      console.log(pion.toggleAttribute('disabled'))
      pion.classList.remove('not-allowed-action')
      pion.classList.add('not-allowed-action')
      }
    );
    this.remainingPieces = 3;
    // a boolean value that indicates wether a piece is currently selected
    this.firstMovePos = false;
    this.selectedPiece = undefined;
    
  },

}
// show userName on the UI
let game ={
    guest : player1,
    host : player2,
    turn : undefined, // to determine who's making a move : undefined,guest,host
    board : undefined,// array of three pieces
    winningMoves : [
      ['1','2','3'],
      ['4','5','6'],
      ['7','8','9'],
      ['1','4','7'],
      ['2','5','8'],
      ['3','6','9'],
      ['1','5','9'],
      ['7','5','3'],
    ],
    pieces : document.querySelectorAll('.piece'),
    score : undefined, // as the name, it indicates score
    message : '', // as the name, it indicates score
    winner : false, // boolean type of value to determine weither there's a winner or not

    
  start(){
    hideElementById('#resetting','#ending','#starting') // switch UI action buttons visibility 
    hideElementsByClass('.piece-box-item') // switch UI action buttons visibility 
    // Defining and showing usernames on the UI
    if(!this.guest.username) this.guest.username="player1" 
    if(!this.host.username) this.host.username="player2" 
    document.querySelector('#user1').innerText=player1.username 
    document.querySelector('#user2').innerText=player2.username 
    // verifying winner and eventually switching turn
//  retrieve this part of code an insert it into calculate winner
    this.winner ?
      this.message=`We have a winner!
Congratulations ${this.turn.username}` :
      this.message=this.switchTurn()
    // Initializing informations about the whole game
    this.board = document.querySelectorAll('.cell')
    this.pieces = document.querySelectorAll('.piece'),
    
    this.board.forEach(element => {
      element.classList.toggle('is-empty')
      // element.toggleAttribute('disabled')
      element.addEventListener('click',this.turn.makeMove)
    });
    this.pieces.forEach(element => {
      // element.toggleAttribute('disabled')
      element.addEventListener('click',this.selectPion)
    });
    // Showing ingame messages on the UI
    document.querySelector('.storyteller').innerHTML=`<p>${this.message}</p>`
  },

  restart(){
    let a = this.turn;
    // console.log(`${this.turn.username}'s turn before restart`)
    this.exit();
    this.turn = a;
    this.start();
    // console.log(`${this.turn.username}'s turn after restart`)
  },

  exit(){
    hideElementById('#resetting','#ending','#starting') // switch UI action buttons visibility 
    hideElementsByClass('.piece-box-item') // switch UI action buttons visibility 
    this.guest.reset();
    this.host.reset();
    this.turn = undefined;
    this.board = undefined;
    this.score = undefined;
    this.message = '';
    this.winner = false;

    document.querySelector('.storyteller').innerHTML=`<p>${this.message}</p>`
  },
// solve the  issue of only allowing action to the one whos has turn
  switchTurn(){
    let roll = Math.random()
    if(!this.turn) {    // the game has just started there's no move yet
    roll < 0.5 ? this.turn = this.guest : this.turn = this.host
    } else {  // the game has already started, someone has already made his move
      this.turn === this.guest ? this.turn=this.host : this.turn= this.guest
    }
    let pieces=document.querySelectorAll(`.${this.turn.pieceType}`)
    pieces.forEach(piece => {
      console.log(piece.classList.toggle('not-allowed-action'))
    });
    console.log(`It's your turn, dear ${this.turn.username}!`)
    return `It's your turn, dear ${this.turn.username}!`
  },

  selectPion(){
    if (game.turn.selectedPiece) {
      game.turn.selectedPiece.classList.toggle('moving') // disable selection of the previous clicked piece
      }
      game.turn.selectedPiece = this // retrieve selected piece
      this.classList.toggle('moving')
      let localise = this.parentNode.classList
      if(localise.contains('cell')){// selected piece location to prepare for further actions 
        possiblemvs.forEach(cell =>{
          cell.classList.remove('possible-move')
          cell.classList.add('possible-move')
          cell.toggleAttribute('disabled')
        })
        console.log(game.turn.selectedPiece.id) // for  testing purpose
        
      }
      else{
        possiblemvs = ['1','2','3','4','5','6','7','8','9']
      }
      
    // console.log(this.selectedPiece)
    // event.currentTarget.classList.toggle('moving')
    // if (true) {// player has pieces left
    // }else{
    //   console.log(`autro ${this.turn}`)
    // }
  },
  
  calculateWinner(){
    alert (this.turn)
  },
  cellValueToggler(val, elmt){
    let res=''
    !elmt ? res = val : res = elmt
    return res
  },

}


function hideElementById(...ids){
  ids.forEach(element => {
  document.querySelector(`${element}`).toggleAttribute('hidden')
  });
}
function hideElementsByClass(...classes){
  classes.forEach(element => {
    // store all elements with the same class
    let node=document.querySelectorAll(element)
    node.forEach(child => {
      child.toggleAttribute('hidden')
    }
    )
    })
}
