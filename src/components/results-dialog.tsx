import { MouseEventHandler, useEffect, useState } from 'react';
import {  
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';

const createData = (name: string, time: number) => ({ name, time });

function average(nums: Array<number>) {
  return nums.reduce((a, b) => (a + b)) / nums.length;
}

// TODO remove open prop
export const ResultsDialog = ({times, onClose, open }: {times: Array<number>, onClose: MouseEventHandler<HTMLButtonElement>, open: boolean }) => {
  // todo update any type
  const [rows, setRows] = useState<Array<any>>();

  useEffect(() => {
    console.log("Test");
    // TODO this if is probably not needed
    if (times.length) {
      const sortedTimes = times.sort();
      const rowsObj = [];
      console.log(sortedTimes.slice(0,3));
      const bpa = average(sortedTimes.slice(0,3));
      const wpa = average(sortedTimes.slice(1,4));

      rowsObj.push(createData('Best Possible Average', bpa));
      rowsObj.push(createData('Worst Possible Average', wpa));

      const subXPossibilities = [];
      for (var i = Math.ceil(bpa); i <= Math.floor(wpa); i++) {
        subXPossibilities.push(i);
      } 
        
      subXPossibilities.forEach(subXPossible => {
        let needed = (subXPossible) * 3 - sortedTimes[1] - sortedTimes[2];
        if (average([needed, sortedTimes[1], sortedTimes[2]]) === subXPossible) {
          needed -= 0.01
        }
        rowsObj.push(createData(`Needed for sub-${subXPossible}`, needed));
      });
      setRows(rowsObj);
    }
  }, [times])


  return (
    <Dialog
      open={open}
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