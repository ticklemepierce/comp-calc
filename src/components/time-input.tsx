import { ChangeEvent } from 'react';
import { Box, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface IValue {
  minutes: string;
  seconds: string;
  centiseconds: string;
}

const MAX_MAP = {
  minutes: 59,
  seconds: 59,
  centiseconds: 99,
}

const getRandomString = () => (Math.random() + 1).toString(36).substring(7) as string;

export const TimeInput = ({ value, setValue }: {value: IValue, setValue: Function }) => {
  const theme = useTheme();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const type = event.target.labels![0].innerText as keyof IValue;
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
        hiddenLabel
        label={"minutes"}
        name={getRandomString()}
        value={value.minutes}
        variant="standard"
        sx={{
          margin: theme.spacing(2),
          marginLeft: 0,
          width: '75px',
        }}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', autoComplete: "new-password" }}
        InputLabelProps={{ shrink: true }}
        onChange={handleChange}
        autoFocus={true}
      />     
      : 
      <TextField
        hiddenLabel
        label={"seconds"}
        name={getRandomString()}
        value={value.seconds}
        variant="standard"
        sx={{
          margin: theme.spacing(2),
          width: '75px',
        }}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', autoComplete: "new-password" }}
        InputLabelProps={{ shrink: true }}
        onChange={handleChange}
      />
      .
      <TextField
        hiddenLabel
        label={"centiseconds"}
        name={getRandomString()}
        value={value.centiseconds}
        variant="standard"
        sx={{
          margin: theme.spacing(2),
          marginRight: 0,
          width: '75px',
        }}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', autoComplete: "new-password" }}
        InputLabelProps={{ shrink: true }}
        onChange={handleChange}
      />
    </Box>
  )
}