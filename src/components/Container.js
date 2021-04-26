import React, { Component } from 'react';
import Square from './Square';
import {PlayAudio,GameWin} from './Utility';
import audio from "../assets/SlidingCroped.mp3";

class Container extends Component {
    state={
        puzzle:[],
        myPicture:null,
        emptyPoz:{x:3,y:3},
        gameStatus:{
            gameStatusCounter:0,
            gs:false
        }
          
        
    }

    componentDidMount() {
      let {puzzle}=this.state;
      puzzle=[...puzzle];
      console.log('Willmount')
      let classArr=[];
      let classContainerArr=[];
      let classArrTrimed=[];
    
      let square={};
      let clas;
      let clasContainer;

      for(let i=1; i<4;i++){
        for(let k=1; k<4; k++){
            clas=`square-${i}${k}`;//creating class for images
            classArr.push(clas);
            clasContainer=`container-square-${i}${k}`;//creating class for container divs images
            classContainerArr.push(clasContainer);
        }}
        classArr.pop();
         classArr.sort(()=>Math.random()-0.5); //shufleing the array of images
     
        let indx=0;

      for(let i=1; i<4;i++){
        for(let k=1; k<4; k++){
            square={id:indx,x:k,y:i,class:classArr[indx],
            classContainer:classContainerArr[indx],
            classMove:{x:0,y:0},
            empty:{x:k,y:i},
            sound:true
        };
            puzzle.push(square);    
            indx++;
        }
      }
    
      puzzle.pop()
      square={id:8, x:3, y:3, class:'square-empty',
      classContainer:'container-square-empty',
      classMove:{x:0,y:0},
      empty:{x:null,y:null},
      sound:false
    };
      puzzle.push(square);

      for(let i in puzzle){ // CHECKING IS IT SOLVED
        let temp= puzzle[i].class.slice(7,9);      
      classArrTrimed.push(temp);
    }
    classArrTrimed.pop();
    classArrTrimed.push('33');

 

      this.setState({puzzle,classArr,classArrTrimed});
    }


    onSquareClick=(i)=>{
        let {puzzle,emptyPoz,classArrTrimed}=this.state;
        puzzle=[...puzzle];
     
        classArrTrimed=[...classArrTrimed]
        let emptySquare;
        let squareClicked=puzzle[i];
        let gameStatus;
        
        for(let i in puzzle){
            if(puzzle[i].x===emptyPoz.x && puzzle[i].y===emptyPoz.y ){  
                emptySquare=puzzle[i];//looking for empty square
              
                 
                if(Math.abs((squareClicked.x - emptySquare.x))===1 && squareClicked.y === emptySquare.y){
                //  moving on X axis
             
                    if(emptySquare.x-squareClicked.x===1){//checking is it moving right
                        squareClicked.classMove.x+=133;
                        emptySquare.classMove.x-=133;
                        squareClicked.x++;
                        emptySquare.x--;  
                        emptyPoz.x--;
                        emptySquare.sound=false;   
                        this.setState({puzzle,emptyPoz})         
                     } 
                     else if(emptySquare.x-squareClicked.x===-1){//checking is it moving left
                        squareClicked.classMove.x-=133;
                        emptySquare.classMove.x+=133;
                        squareClicked.x--;
                        emptySquare.x++;  
                        emptyPoz.x++; 
                        emptySquare.sound=false;   
                        this.setState({puzzle,emptyPoz})             
                     }
                     
                }
                if(Math.abs((squareClicked.y - emptySquare.y))===1 && squareClicked.x === emptySquare.x){
                 //moving on Y axis
                 if(emptySquare.y-squareClicked.y===1){//checking is it moving up
                    squareClicked.classMove.y+=133;
                    emptySquare.classMove.y-=133;
                    squareClicked.y++;
                    emptySquare.y--;  
                    emptyPoz.y--;   
                    emptySquare.sound=false;   
                    this.setState({puzzle,emptyPoz})         
                 } 
                 else if(emptySquare.y-squareClicked.y===-1){//checking is it moving down
                    squareClicked.classMove.y-=133;
                    emptySquare.classMove.y+=133;
                    squareClicked.y--;
                    emptySquare.y++;  
                    emptyPoz.y++; 
                    emptySquare.sound=false;   
                    this.setState({puzzle,emptyPoz})             
                 }
                }
            } 
              
                if(squareClicked.sound){ // play audio when moving
                    let myAudio = this.refs.myAudio;
                    PlayAudio(myAudio);
                }

                let pozContainerArr=[];
                for(let i in puzzle){
                    let temp= `${puzzle[i].y}${puzzle[i].x}`;
                    pozContainerArr.push(temp);
                }
                gameStatus=GameWin(pozContainerArr,classArrTrimed);//checking is it all solved 
                console.log(gameStatus);
                this.setState({puzzle,gameStatus,pozContainerArr,classArrTrimed});
        }
    }


    
    
    render() {
   
        let squareMaped=this.state.puzzle.map((sq,i)=>{
            return(
            <Square onSquareClick={()=>this.onSquareClick(i)}
             key={i}
             x={sq.x} y={sq.y} 
             class={sq.class}
             classContainer={sq.classContainer}
             classMove={sq.classMove}
             myPicture={this.props.myPicture}
             gameStatus={this.state.gameStatus}
            />)
        })
        return (
            <div className="app-container">   
              {squareMaped}
              <audio ref={"myAudio"} src={audio} ></audio>   
           </div>
        );
    }
}

export default Container;