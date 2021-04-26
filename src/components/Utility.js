export function PlayAudio(myAudio) {
    myAudio.play();
  }

  export function GameWin(pozContainerArr,classArrTrimed) {
 
    let gameStatus={
      gameStatusCounter:0,
      gs:false
    };
    for(let i=0;i<9;i++){
       if(pozContainerArr[i]===classArrTrimed[i]){
        gameStatus.gameStatusCounter++;
       }
    }
    gameStatus.gs= gameStatus.gameStatusCounter===9 ? true : false;
   return gameStatus
  }

