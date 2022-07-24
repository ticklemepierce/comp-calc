import { useState, ChangeEvent } from 'react';
import { Box, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface IMaxMap {
  minutes: number;
  seconds: number;
  milliseconds: number;
}

const MAX_MAP: IMaxMap = {
  minutes: 59,
  seconds: 59,
  milliseconds: 999,
}

export const TimeInput = ({ label, id }: { label: string, id: string }) => {
  const theme = useTheme();

  const [value, setValue] = useState({
    minutes: '',
    seconds: '',
    milliseconds: '',
  });
  const [error, setError] = useState<string | null>();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const type = event.target.name as keyof IMaxMap;
    const max = MAX_MAP[type] as number;
    const val = parseInt(event.target.value, 10);
    if (val > max) {
      return;
    }
    setValue((value) => ({
      ...value,
      [event.target.name]: event.target.value
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
        name={"minutes"}
        value={value.minutes}
        variant="outlined"
        sx={{
          margin: theme.spacing(2),
          width: '100px',
        }}
        inputProps={{ inputMode: 'numeric', max: '9' }}
        InputLabelProps={{ shrink: true }}
        onChange={handleChange}
      />     
      : 
      <TextField
        label={"seconds"}
        name={"seconds"}
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
        name={"milliseconds"}
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