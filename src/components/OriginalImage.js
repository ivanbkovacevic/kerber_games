import React from 'react';


export default (props) => {
  let picture=props.myPicture;
  let klassa;
  
  if(picture){
    klassa="original-image show"
  }else{
    klassa="original-image"
  }
  return (
    <div className="img-container">
          <img className={klassa} src={props.myPicture} alt=''></img>
    </div>
  )
}
