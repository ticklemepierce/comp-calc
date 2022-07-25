import { useState } from 'react';
import {  
  Box,
  Button,
  Paper,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { TimeInput } from './time-input';
import { ResultsDialog } from './results-dialog';

const SOLVES = ['first', 'second', 'third', 'fourth', 'fifth'];

const DEFAULT_TIMES = {
  minutes: '',
  seconds: '',
  centiseconds: '',
}

const toOrdinal = (number: number) => SOLVES[number];

const timesInCentiseconds = (min: number, sec: number, cs: number) => cs + (min * 60 * 100) + (sec * 100);

export const Content = () => {
  const theme = useTheme();

  const [solveNum, setSolveNum] = useState(0);
  const [currentTime, setCurrentTime] = useState(DEFAULT_TIMES);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [times, setTimes] = useState<Array<number>>([]);

  const advanceToNextSolve = () => {
    const min = parseInt(currentTime.minutes, 10) || 0;
    const sec = parseInt(currentTime.seconds, 10) || 0;
    const cs = parseInt(currentTime.centiseconds, 10) || 0;

    setTimes((currentTimes) => ([
      ...currentTimes,
      timesInCentiseconds(min, sec, cs) / 100
    ]));

    setCurrentTime(DEFAULT_TIMES);
    setSolveNum(solveNum + 1);
  }

  const handleSubmit = () => {
    advanceToNextSolve();
    openDialog();
  }

  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);

  const getFinalAverage = () => {
    //TODO
  }
  
  return (
    <Box>
      <Paper 
        elevation={3}
        sx={{
          width: '50%',
          padding: theme.spacing(4),
          margin: theme.spacing(4, 'auto'),
          [theme.breakpoints.down('md')]: {
            width: '95%',
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
      </Paper>

      { dialogOpen &&
        <ResultsDialog 
          open={dialogOpen}
          times={times}
          onClose={closeDialog}
        />
      }
    </Box>
  );
}