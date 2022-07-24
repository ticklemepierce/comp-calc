import { useState } from 'react';
import {  
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { TimeInput } from './time-input';
import { ResultsDialog } from './results-dialog';

function average(nums: Array<number>) {
  return nums.reduce((a, b) => (a + b)) / nums.length;
}

export const Content = () => {
  const theme = useTheme();

  const [times, setTimes] = useState<Array<number>>([]);

  const handleClose = () => {
    setTimes([]);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));

    const sortedTimes = [
      parseFloat(data.first as string),
      parseFloat(data.second as string),
      parseFloat(data.third as string),
      parseFloat(data.fourth as string),
    ].sort();

    setTimes(sortedTimes);
    
    const bpa = average(sortedTimes.slice(0,3));
    const wpa = average(sortedTimes.slice(1,4));

    const subXPossibilities = [];
    for (var i = Math.ceil(bpa); i <= Math.floor(wpa); i++) {
      subXPossibilities.push(i);
    } 

    console.log("Best possible average: ", bpa.toFixed(2));
    console.log("Worst possible average: ", wpa.toFixed(2));

    subXPossibilities.forEach(subXPossible => {
      let needed = (subXPossible) * 3 - sortedTimes[1] - sortedTimes[2];
      if (average([needed, sortedTimes[1], sortedTimes[2]]) === subXPossible) {
        needed -= 0.01
      }
      console.log(`Needed for sub-${subXPossible}: ${needed.toFixed(2)}`);
    });
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
        }}
      >
        <Box 
          component="form" 
          onSubmit={handleSubmit}
          noValidate
          sx={{
            justifyContent: 'center',
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          <TimeInput label={'first time'} id={'first'}/>
          <TimeInput label={'second time'} id={'second'} />
          <TimeInput label={'third time'} id={'third'} />
          <TimeInput label={'fourth time'} id={'fourth'} />

          <Button 
            type='submit'
            variant="contained" 
            size="large" 
            fullWidth
            sx={{
              marginTop: theme.spacing(3),
            }}
          >
            Calculate best and worst possible averages
          </Button>
        </Box>
      </Paper>

      <ResultsDialog 
        times={times}
        onClose={handleClose}
      />
    </Box>

  );
}