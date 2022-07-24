import { useState } from 'react';
import { useIMask } from 'react-imask';
import { TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export const NumberInput = ({ label, id }: { label: string, id: string }) => {
  const theme = useTheme();

  const [error, setError] = useState<string | null>();

  const regex = /^([0-9]{1,2}\:)?[0-9]{1,2}\.[0-9]{2,3}/;

  const handleChange = (value: string) => {
    setValue(value);
    console.log(value);
    if (error && regex.test(value)) {
      setError(null);
    }
  };

  const iMaskOpts = {
    mask: [
      {
        mask: '0[0]{:}00{.}000',
        lazy: true,
        minute: true,
      },
      {
        mask: '0[0]{.}000',
        lazy: true,
        seconds: true,
      },
      {
        mask: '0[0]',
        lazy: true,
        tbd: true,
      }
    ],     
    dispatch: function (appended: string, dynamicMasked: any) {
      let maskToUse = 'tbd';
      if (appended === ':' || dynamicMasked.value.includes(':')) {
        maskToUse = 'minute';
      } else if (appended === '.' || dynamicMasked.value.includes('.')) {
        maskToUse = 'seconds';
      }
      return dynamicMasked.compiledMasks.find(function (m: any) {
        return m[maskToUse];
      }); 
    },
  };

  const {
    ref,
    value,
    setValue,
  } = useIMask(iMaskOpts, { onAccept: handleChange });

  const onBlur = () => {
    if (value)
      if(!regex.test(value)) {
        setError('Invalid number format');
      }
  }

  return (
    <TextField
      label={label}
      value={value}
      name={id}
      variant="outlined"
      fullWidth
      onBlur={onBlur}
      error={!!error}
      helperText={error}
      sx={{
        marginTop: theme.spacing(4),
      }}
      inputRef={ref}
    />
  )
}