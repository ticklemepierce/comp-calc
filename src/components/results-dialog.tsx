import { MouseEventHandler, useEffect, useState, useRef } from 'react';
import {  
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { NumberInput } from './number-input';

const createData = (name: string, time: number) => ({ name, time });

function average(nums: Array<number>) {
  return nums.reduce((a, b) => (a + b)) / nums.length;
}

export const ResultsDialog = ({times, onClose }: {times: Array<number>, onClose: MouseEventHandler<HTMLButtonElement> }) => {
  // todo update any type
  const [rows, setRows] = useState<Array<any>>();

  useEffect(() => {
    if (times.length) {
      const rowsObj = [];
      const bpa = average(times.slice(0,3));
      const wpa = average(times.slice(1,4));

      rowsObj.push(createData('Best Possible Average', bpa));
      rowsObj.push(createData('Worst Possible Average', wpa));


      const subXPossibilities = [];
      for (var i = Math.ceil(bpa); i <= Math.floor(wpa); i++) {
        subXPossibilities.push(i);
      } 
        
      subXPossibilities.forEach(subXPossible => {
        let needed = (subXPossible) * 3 - times[1] - times[2];
        if (average([needed, times[1], times[2]]) === subXPossible) {
          needed -= 0.01
        }
        rowsObj.push(createData(`Needed for sub-${subXPossible}`, needed));
      });
      setRows(rowsObj);
    }
  }, [times])


  return (
    <Dialog
      open={!!times.length}
      onClose={onClose}
      scroll={'paper'}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      fullWidth
      maxWidth={'sm'}
    >
      <DialogTitle id="scroll-dialog-title">Results Summary</DialogTitle>
      <Table aria-label="simple table">
        <TableBody>
          {rows?.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.time.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>

  );
}