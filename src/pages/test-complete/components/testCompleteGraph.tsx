import  ApexCharts from 'apexcharts';
import React, { ReactElement } from 'react';
import styled from 'styled-components';
import usePopover from '../../../hooks/usePopover';
import { useStoreState, useStoreActions } from '../../../store/store';
import { getCumulativeAverageChordTypeTime } from '../../../../src/helpers/aggregation';



//myGraph(wordNames, wordOccurrences, wordPerMinute)

export function myGraph(wordNames : any, wordOccurrences : any , wordPerMinute: any, rawSpeedOfCurrentWord: any){

 const options = {
  chart: {
    type: "area",
    height: 350,
    foreColor: "#FFFFFF",
    stacked: false,
    dropShadow: {
      enabled: false,
      enabledSeries: [0],
      top: -2,
      left: 2,
      blur: 5,
      opacity: 1
    }
    

  },
  colors: ['#22C55E', '#0090FF', 'pink', 'yellow'],
  stroke: {
    curve: "smooth",
    width: 3
  },
  dataLabels: {
    enabled: true,
    style: {
      fontSize: '14px',
      fontFamily: 'Helvetica, Arial, sans-serif',
      fontWeight: 'bold',
      colors: undefined
  },
  background: {
    enabled: true,
    foreColor: '#fff',
    padding: 4,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#fff',
    opacity: 0.9,
    dropShadow: {
      enabled: false,
      top: 1,
      left: 1,
      blur: 1,
      color: '#000',
      opacity: 0.45
    }
  },
  dropShadow: {
      enabled: false,
      top: 1,
      left: 1,
      blur: 1,
      color: '#000',
      opacity: 0.45
  }
  },
  series: [
    {
      name: "Cumulative CPM",
      data: wordPerMinute
    },
    {
      name: "Errors",
      data: wordOccurrences
    },
    {
      name: "Individual CPM",
      data: rawSpeedOfCurrentWord
    },
  ],
  xaxis: {
    categories: wordNames
  },
  yaxis: [
    {
      axisTicks: {
        show: true
      },
      axisBorder: {
        show: true,
        color: "#FF1654"
      },
      labels: {
        style: {
          colors: "#FF1654"
        }
      },
      title: {
        text: "Words Per Minute",
        style: {
          color: "#FF1654"
        }
      }
    },
    {
      opposite: true,
      axisTicks: {
        show: true
      },
      axisBorder: {
        show: true,
        color: "#247BA0"
      },
      labels: {
        style: {
          colors: "#247BA0"
        }
      },
      title: {
        text: "Typing Errors",
        style: {
          color: "#247BA0"
        }
      }
    }
  ],
  grid: {
    padding: {
      left: -5,
      right: 5
    }
  },
  
  tooltip: {
    theme:"dark",
    x: {
      format: 'dd MM yyyy'
    },
  },
  legend: {
    position: 'top',
    horizontalAlign: 'left',
    onItemClick: {
      toggleDataSeries: false
  },
  },
  
};

const chart = new ApexCharts(document.getElementById("timeline-chart"), options);

chart.render();
}

function wpmDataCalculator (wpmArray : any){

  console.log('This is the very first array '+wpmArray);
  let wpmTemp = 0;
  let localTemp = 0;
  console.log('WPM ARRAY HSDF NJSK FJKSFEKN' + wpmArray + " lENGTH " + wpmArray.length)
  //console.log(wpmArray)
  for (let i =0; i<wpmArray.length; i++){
    if(wpmArray[i] != 0){
    localTemp = 0;
    wpmTemp = parseInt(wpmTemp) + parseInt(wpmArray[i]);
    localTemp = wpmTemp / (i +1);

    console.log('wpmTemp in the new function '+ wpmTemp);
    console.log('localTemp in the new function '+ localTemp);
    console.log('this is the first loop for wpmArray in the new function '+ wpmArray);

    const avgSpeedMilliseconds = localTemp.toFixed(0) * 10;
    const millisecondsPerCharacter = avgSpeedMilliseconds/5.23;
    const averageCharacterPerMin = 60000/millisecondsPerCharacter;
    const wpm = averageCharacterPerMin/5;

    wpmArray[i] = wpm.toFixed(0);
    console.log('WPM in the new function '+ wpm.toFixed(0));
    } else{
      console.log('I skipped over a 0')
    }

  }
  return wpmArray;

}
export function TestCompleteGraph(): ReactElement {

  const currentTrainingSetting = useStoreState((store : any) => store.trainingStatistics);
  const currentTrainingScenario = useStoreState((store) => store.currentTrainingScenario);
  const storedTestTextData = useStoreState((store) => store.storedTestTextData);
  const testTeirHighestWPM= useStoreActions((store) => store.setTestTeirHighestWPM); 



    let wordNames : any = [];
    let wordOccurrences : any = [];
    let wordPerMinute : any = [];
    let rawSpeedOfCurrentWord : any = [];


    let tempConst = 0;
    const chordsToChooseFrom = JSON.parse(localStorage.getItem('chordsToChooseFrom'));
    let iterator = 1;
    let cummulativeWPM = 0;
    currentTrainingSetting.statistics.forEach((d : any) => {

      if(d.displayTitle.length * d.numberOfOccurrences != 0) {
        tempConst += d.averageSpeed;
        //console.log('This is the stored test words '+storedTestTextData);
          wordNames.push(d.displayTitle);
          wordOccurrences.push(d.displayTitle.length * d.numberOfErrors);

         const avgSpeedMilliseconds = d.averageSpeed * 10;
          const millisecondsPerCharacter = avgSpeedMilliseconds/5;
          const averageCharacterPerMin = 60000/millisecondsPerCharacter;
          const wpm = averageCharacterPerMin/5;

          const avgSpeedMilliseconds2 = d.lastSpeed * 10;
          const millisecondsPerCharacter2 = avgSpeedMilliseconds2/5;
          const averageCharacterPerMin2 = 60000/millisecondsPerCharacter2;
          const wpm2 = averageCharacterPerMin2;

          cummulativeWPM += wpm;
          
          wordPerMinute.push(d.averageSpeed.toFixed(0)/5);
          rawSpeedOfCurrentWord.push(wpm2.toFixed(0));
        
       }
      iterator ++;

    });

    const finalErrorsArray =[];
    const finalWPMArray = [];
    const finalRawWPM = [];

    if(currentTrainingScenario == 'CUSTOMTIER'){
      console.log('Only entered if this is custom tier ' + currentTrainingScenario);
    for(let i =0; i<chordsToChooseFrom?.length; i++){
      console.log('Choosey ' + chordsToChooseFrom)
      console.log('Choosey ' +wordNames.indexOf(chordsToChooseFrom[i]));

      finalErrorsArray.push(wordOccurrences[wordNames.indexOf(chordsToChooseFrom[i])]);
      finalWPMArray.push(wordPerMinute[wordNames.indexOf(chordsToChooseFrom[i])]);
      finalRawWPM.push(rawSpeedOfCurrentWord[wordNames.indexOf(chordsToChooseFrom[i])]);

    }

    wordOccurrences = finalErrorsArray;
    wordPerMinute = finalWPMArray;
    wordNames = chordsToChooseFrom;
    rawSpeedOfCurrentWord = finalRawWPM;

  } else{
    let firstWordIndex;
    for(let i =0; i<storedTestTextData?.length; i++){
      if(isNaN(wordPerMinute[wordNames.indexOf(storedTestTextData[i])]) == false){
      finalErrorsArray.push(wordOccurrences[wordNames.indexOf(storedTestTextData[i])]);
      finalWPMArray.push(wordPerMinute[wordNames.indexOf(storedTestTextData[i])]);
      finalRawWPM.push(rawSpeedOfCurrentWord[wordNames.indexOf(storedTestTextData[i])])
      } else {
        firstWordIndex = i;
      }

      if(i== storedTestTextData.length-1){
      finalErrorsArray.splice(0,0, 0);
      finalWPMArray.splice(0,0, 0);
      finalRawWPM.splice(0,0, 0);
      }
    }
    finalErrorsArray.shift();
    wordOccurrences = finalErrorsArray;
    finalWPMArray.shift();
    wordPerMinute = wpmDataCalculator(finalWPMArray);
    console.log('Before Word Names');
    console.log(wordNames);
    //storedTestTextData.shift(); TStored test text data does not need to be shifted
    wordNames = storedTestTextData;
    console.log(wordNames);
    finalRawWPM.shift()
    rawSpeedOfCurrentWord = finalRawWPM;
    //console.log('this is the raw speed '+rawSpeedOfCurrentWord);

    console.log(wordPerMinute)
    console.log(wordNames)
    console.log(rawSpeedOfCurrentWord)
  }

    const handleEvent = () => {
      testTeirHighestWPM(wordPerMinute[wordPerMinute.length-1]);
        myGraph(wordNames, wordOccurrences, wordPerMinute, rawSpeedOfCurrentWord)
        console.log('event handled ' +wordNames)
        console.log(wordOccurrences)
        console.log(wordPerMinute)
      };
  
      React.useEffect(() => {
        handleEvent();
      }, []);
    

  return (
    
    <React.Fragment>


      <div style={{ backgroundColor:"#333", border: "1px solid #000", borderRadius: "5px", borderWidth: '80%'}}>
      <div id="chart" >
     <div id="timeline-chart">{handleEvent}</div>
      </div>
      </div>
    </React.Fragment>
  );
}
  export const AverageSpeed = styled.button.attrs({
    className: `text-white rounded p-2 mb-4 inline-block ml-2 bg-green-500`,
  })``;
  export const ChordsMastered = styled.button.attrs({
    className: `text-white rounded p-2 mb-4 inline-block ml-2 bg-green-500`,
  })``;
  export const TopSpeed = styled.button.attrs({
    className: `text-white rounded p-2 mb-4 inline-block ml-2 bg-green-500`,
  })``;
  export const PracticeStreak = styled.button.attrs({
    className: `text-white rounded p-2 mb-4 inline-block ml-2 bg-green-500`,
  })``;
  export const HorizontalRule = styled.hr.attrs({
    className: `mx-16 border-gray-600 mb-16`,
  })``;