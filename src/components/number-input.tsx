import { useState, forwardRef, ChangeEvent } from 'react';
import { TextField } from '@mui/material';
import NumberFormat, { InputAttributes } from 'react-number-format';
import { useTheme } from '@mui/material/styles';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const NumberFormatCustom = forwardRef<
  NumberFormat<InputAttributes>,
  CustomProps
>(function NumberFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      isNumericString
      allowNegative={false}
      decimalScale={3}
    />
  );
});

export const NumberInput = ({ label, id }: { label: string, id: string }) => {
  const theme = useTheme();

  const [value, setValue] = useState<string>();
  const [error, setError] = useState<string | null>();

  const regex = /^[0-9]+\.[0-9]{2,3}/;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    if (error && regex.test(event.target.value)) {
      setError(null);
    }
  };

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
      onChange={handleChange}
      name={id}
      InputProps={{
        inputComponent: NumberFormatCustom as any,
      }}
      variant="outlined"
      fullWidth
      onBlur={onBlur}
      error={!!error}
      helperText={error}
      sx={{
        marginTop: theme.spacing(4),
      }}
    />
  );
}