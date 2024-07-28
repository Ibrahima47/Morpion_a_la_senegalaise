//  Implement local storing functionality to store scores and players
//  Implement Drag and Drop functionalty to move pieces
let player1 = {

  username : 'Youssouf',
  remainingPieces : 3,
  firstMovePos : undefined ,
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
  this.pieces.forEach(piece =>{
    piece.addEventListener('click',(e)=>{
      let data = e.dataTransfert.setData('text',e.currentTarget.id);
      alert (`attached data for piece ${e.currentTarget.id} is ${data}`)
    })
  })

  game.switchTurn() //  last action after making move
  },
  setUsername(newName){
    this.username = newName;
  },
  reset(){
    this.remainingPieces = 3;
    this.firstMovePos = undefined;
    this.lastMovePos = undefined;
    let pieces=document.querySelectorAll(`.${this.pieceType}`)
    pieces.forEach(piece => {
      console.log(piece.toggleAttribute('disabled'))
      piece.classList.remove('not-allowed-action')
      piece.classList.add('not-allowed-action')
      }
   );
  }

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
    this.firstMovePos = undefined;
    this.lastMovePos = undefined;
    
  }

}
// show userName on the UI
let game ={
    guest : player1,
    host : player2,
    turn : undefined, // to determine who's making a move : undefined,guest,host
    board : undefined,// array of three pieces
    pieces : document.querySelectorAll('.piece'),
    score : undefined, // as the name, it indicates score
    message : '', // as the name, it indicates score
    winner : false, // boolean type of value to determine weither there's a winner or not

  start(){
    hideElementById('#resetting','#ending','#starting') // switch UI action buttons visibility 
    hideElementsByClass('.piece-box-item') // switch UI action buttons visibility 
    // Initializing informations about the whole game
    this.board = document.querySelectorAll('.cell')
    
    this.board.forEach(element => {
      element.classList.toggle('is-empty')
      element.toggleAttribute('disabled')
    });
    this.pieces.forEach(element => {
      element.addEventListener('click', (event)=>{
        alert(event.currentTarget.parentNode)
      })
      element.toggleAttribute('disabled')
    });
    // showing the username on the UI

    if(!this.guest.username) this.guest.username="player1" 
    if(!this.host.username) this.host.username="player2" 
    
    document.querySelector('#user1').innerText=player1.username 
    document.querySelector('#user2').innerText=player2.username 
    // verifying winner and eventually switching turn
    this.winner ?
      this.message=`We have a winner!
Congratulations ${this.turn.username}` :
      this.message=this.switchTurn()
    document.querySelector('.storyteller').innerHTML=`<p>${this.message}</p>`
    console.log(this.turn.username)
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
    // let pieces=document.querySelectorAll(`.${this.turn.pieceType}`)
    // pieces.forEach(piece => {
    //   console.log(piece.classList.toggle('not-allowed-action'))
    // });
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
    return `It's your turn, dear ${this.turn.username}!`
  },

  calculateWinner(){
    alert('comme')

  },

  isMoveValid(){},
  
  cellValueToggler(val, elmt){
    let res=''
    !elmt ? res = val : res = elmt
    return res
  },

}


// let piece = {
// id : document.querySelector('#G').addEventListener('click')

// }
// let piece = {
// id : document.querySelector('#G').addEventListener('click')

// }
// let piece = {
// id : document.querySelector('#')
// }
// let piece = {
// id : document.querySelector('#')
// }
// let piece = {
// id : document.querySelector('#')
// }

function hideElementById(...ids){
  ids.forEach(element => {
  document.querySelector(`${element}`).toggleAttribute('hidden')
  });
}
function hideElementsByClass(...classes){
  console.log(classes.length)
  classes.forEach(element => {
    console.log(element)
    // store all elements with the same class
    let node=document.querySelectorAll(element)
    console.log(`noeud : ${node.length}`)
    node.forEach(child => {
      child.toggleAttribute('hidden')
    }
    )
      // const element = array[i];
      // console.log(document.querySelector(`${element}`).item(i))
    })
  // });
}