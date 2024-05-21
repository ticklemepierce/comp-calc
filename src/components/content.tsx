import { useState } from 'react';
import {  
  Box,
  Button,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { TimeInput } from './time-input';
import { Results } from './results';

const SOLVES = ['first', 'second', 'third', 'fourth', 'fifth'];

const DEFAULT_TIMES = {
  minutes: '',
  seconds: '',
  centiseconds: '',
}

function average(nums: Array<number>) {
  console.log(nums);
  return nums.reduce((a, b) => (a + b)) / nums.length;
}

const toOrdinal = (number: number) => SOLVES[number];

const timesInCentiseconds = (minutes: string, seconds: string, centiseconds: string) => {
  const min = parseInt(minutes, 10) || 0;
  const sec = parseInt(seconds, 10) || 0;
  const cs = parseInt(centiseconds, 10) || 0;

  return cs + (min * 60 * 100) + (sec * 100);
};

export const Content = () => {
  const theme = useTheme();

  const [solveNum, setSolveNum] = useState(0);
  const [currentTime, setCurrentTime] = useState(DEFAULT_TIMES);
  const [resultsOpen, setResultsOpen] = useState(false);
  const [finalAverage, setFinalAverage] = useState<number>();

  const [times, setTimes] = useState<Array<number>>([]);

  const advanceToNextSolve = () => {
    setTimes((currentTimes) => ([
      ...currentTimes,
      timesInCentiseconds(currentTime.minutes, currentTime.seconds, currentTime.centiseconds) / 100
    ]));
    
    setCurrentTime(DEFAULT_TIMES);
    setSolveNum(solveNum + 1);
  }

  const handleSubmit = () => {
    advanceToNextSolve();
    setResultsOpen(true);
  }

  const getFinalAverage = () => {
    const finalTimes = [
      ...times,
      timesInCentiseconds(currentTime.minutes, currentTime.seconds, currentTime.centiseconds) / 100
    ]
    setResultsOpen(false);
    setFinalAverage(average(finalTimes.sort().slice(1,-1)));
  }
  
  return (
    <Box>
      <Box 
        sx={{
          width: '50%',
          padding: theme.spacing(4),
          margin: theme.spacing(4, 'auto'),
          [theme.breakpoints.down('md')]: {
            width: '100%',
          },
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" component="h1" mb={4}>Enter time of {toOrdinal(solveNum)} solve</Typography>
        <Box 
          component="form" 
          noValidate
          sx={{
            justifyContent: 'center',
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          <TimeInput value={currentTime} setValue={setCurrentTime} />

          {solveNum < 3 && 
            <Button
              onClick={advanceToNextSolve}
              variant="contained" 
              size="large" 
              fullWidth
              sx={{
                marginTop: theme.spacing(3),
              }}
            >
              Advance to next solve
            </Button>
          }

          {solveNum === 3 && 
            <Button 
              onClick={handleSubmit}
              variant="contained" 
              size="large" 
              fullWidth
              sx={{
                marginTop: theme.spacing(3),
              }}
            >            
              Calculate best and worst possible averages
            </Button>
          }
          {solveNum === 4 && 
            <Button 
              onClick={getFinalAverage}
              variant="contained" 
              size="large" 
              fullWidth
              sx={{
                marginTop: theme.spacing(3),
              }}
            >            
              Get final average
            </Button>
          }
        </Box>
      </Box>

      { resultsOpen &&
        <Results times={times} />
      }
      { finalAverage &&
        <Typography component="p" variant="h5" sx={{textAlign: 'center'}}>
          Awesome! You finished with a final average of {finalAverage.toFixed(2)}!
        </Typography>
      }
    </Box>
  );
}