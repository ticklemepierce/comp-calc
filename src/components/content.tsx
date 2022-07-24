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
import { TimeInput, IMaxMap } from './time-input';
import { ResultsDialog } from './results-dialog';

interface ITimeMap {
  first: string;
  second: string;
  third: string;
  fourth: string;
}

function average(nums: Array<number>) {
  return nums.reduce((a, b) => (a + b)) / nums.length;
}

const timesInMilliseconds = (min: number, sec: number, ms: number) => ms + (min * 60 * 1000) + (sec * 1000);

export const Content = () => {
  const theme = useTheme();

  const [times, setTimes] = useState<Array<number>>([]);

  const handleClose = () => {
    setTimes([]);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = Array.from(new FormData(event.currentTarget).entries());

    const reduced = data.reduce(
      (prev, [key, val]) => {
        if (typeof val !== 'string') {
          throw new Error();
        }
        if (val === '') {
          val = '0';
        }
        const _key = key.split('-');
        const time = _key[0] as keyof ITimeMap;
        const type = _key[1] as keyof IMaxMap;
        return {
          ...prev,
          [time]: {
            ...prev[time],
            [type]: parseInt(val, 10)
          }
        }
      }, 
      { 
        'first': {},
        'second': {},
        'third': {},
        'fourth': {},
      }
    );

    const times: number[] = [];

    ['first', 'second', 'third', 'fourth'].forEach(time => {
      const entry = reduced[time as keyof ITimeMap] as IMaxMap;
      const timeInSeconds = timesInMilliseconds(entry.minutes, entry.seconds, entry.milliseconds) / 1000;
      times.push(timeInSeconds);
    });

    setTimes(times);
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
          <TimeInput id={'first'}/>
          <TimeInput id={'second'} />
          <TimeInput id={'third'} />
          <TimeInput id={'fourth'} />

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