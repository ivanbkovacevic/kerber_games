import React from 'react';

export default (props) => {
  let picture=props.myPicture;
  let klassa;
  let gameStatus=props.gameStatus;
  let gameStatusCSS;
  
  if(picture){
    klassa="square show"
  }else{
    klassa="square"
  }

   gameStatusCSS= gameStatus.gs ? 'win' : null;

  let move = {
    transition:'transform 1s ease',
    transform:`translate(${props.classMove.x}px,${props.classMove.y}px)`,
   };

  return (
            <div style={move} className={`${props.classContainer} ${klassa} ${gameStatusCSS}`} 
                 onClick={props.onSquareClick}> 
                
               <img draggable="false" className={props.class} src={picture} alt=''></img>
              
                </div>
  )
}


