import { ChangeEvent } from 'react';
import { Box, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface IValue {
  minutes: string;
  seconds: string;
  milliseconds: string;
}

const MAX_MAP = {
  minutes: 59,
  seconds: 59,
  milliseconds: 999,
}

export const TimeInput = ({ value, setValue }: {value: IValue, setValue: Function }) => {
  const theme = useTheme();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const type = event.target.name as keyof IValue;
    const max = MAX_MAP[type] as number;
    if (event.target.value.includes('.')) {
      return;
    }
    if (!Number.isInteger(Number(event.target.value))) {
      return;
    }
    const val = parseInt(event.target.value, 10);
    if (val > max || Number.isNaN(val)) {
      return;
    }
    setValue((value: IValue) => ({
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
        fontSize: '48px',
        flexBasis: '100%',
        justifyContent: 'center',
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
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
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
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength: 3 }}
        InputLabelProps={{ shrink: true }}
        onChange={handleChange}
      />
    </Box>
  )
}