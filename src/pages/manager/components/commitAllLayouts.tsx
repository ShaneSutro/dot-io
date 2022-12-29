import React, { ReactElement } from 'react';
import {
  MainControls,
    pressCommitButton,
    sendCommandString,
    readGetOneChordLayout

} from '../controls/mainControls'


export async function commitAll(){
    console.log("commitAll()");
    const dataTable = document.getElementById("layoutDataTable");
    //iterate through table from bottom to top to see if there's a commit enabled
    //TODO check if we need to skip the header row
    for(let i =1; i<4; i++){
        for(let t =0; t<90; t++){
    
          await sendCommandString("VAR B4 A"+i +" "+t);
          readGetOneChordLayout();
    
          //readGetOneAndToss();
          //readGetNone();
          
         // console.log('what ever respisne from sending command string '+ tt);
        }
      }


    for (let i = dataTable.rows.length-1; i>=1; i--) {
      //iterate through rows
      const row = dataTable.rows[i];
      // console.log(row);
      // console.log(row.cells);
      // console.log(row.cells[0]);
      // console.log(row.cells[0].innerHTML);
      const virtualId = parseInt(row.cells[0].innerHTML);

      console.log('table row '+i+' has virtualId of '+virtualId);
      // document.getElementById(virtualId.toString()+"-commit")ghh
      if(MainControls._chordmapId=="CHARACHORDER"){
        setTimeout(pressCommitButton,i*200,virtualId);//Fiddle with this
      } else{
        setTimeout(pressCommitButton,i*50,virtualId);//Fiddle with this
      }
      //rows would be accessed using the "row" variable assigned in the for loop
   }
  }
  
  export function PressCommit(): ReactElement {
    return (
      <React.Fragment>

      <button
      className="sc-bYwzuL text-white rounded p-2 mb-4 inline-block ml-2 bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222]"
      color="pink"
      onClick={() => commitAll()}
      >Commit All </button>
      </React.Fragment>
    );
  }