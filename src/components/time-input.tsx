import { useState, ChangeEvent } from 'react';
import { Box, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export interface IMaxMap {
  minutes: number;
  seconds: number;
  milliseconds: number;
}

const MAX_MAP: IMaxMap = {
  minutes: 59,
  seconds: 59,
  milliseconds: 999,
}

export const TimeInput = ({ id }: {id: string }) => {
  const theme = useTheme();

  const [value, setValue] = useState({
    minutes: '',
    seconds: '',
    milliseconds: '',
  });
  const [error, setError] = useState<string | null>();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const type = name.split('-')[1] as keyof IMaxMap;
    const max = MAX_MAP[type] as number;
    const val = parseInt(event.target.value, 10);
    if (val > max) {
      return;
    }
    setValue((value) => ({
      ...value,
      [type]: event.target.value
    }));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        color: 'text.primary',
        borderRadius: 1,
        alignItems: 'center',
        fontSize: '48px'
      }}
    >
      <TextField
        label={"minutes"}
        name={`${id}-minutes`}
        value={value.minutes}
        variant="outlined"
        sx={{
          margin: theme.spacing(2),
          width: '100px',
        }}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        InputLabelProps={{ shrink: true }}
        onChange={handleChange}
      />     
      : 
      <TextField
        label={"seconds"}
        name={`${id}-seconds`}
        value={value.seconds}
        variant="outlined"
        sx={{
          margin: theme.spacing(2),
          width: '100px',
        }}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        InputLabelProps={{ shrink: true }}
        onChange={handleChange}
      />
      .
      <TextField
        label={"milliseconds"}
        name={`${id}-milliseconds`}
        value={value.milliseconds}
        variant="outlined"
        sx={{
          margin: theme.spacing(2),
          width: '100px',
        }}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        InputLabelProps={{ shrink: true }}
        onChange={handleChange}
      />
    </Box>
  )
}