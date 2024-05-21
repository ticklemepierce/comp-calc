import { useEffect, useState } from 'react';
import {
  Box,  
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface IRow {
  name: string,
  time: number,
}

const createData = (name: string, time: number) => ({ name, time });

function average(nums: Array<number>) {
  return nums.reduce((a, b) => (a + b)) / nums.length;
}

export const Results = ({times }: {times: Array<number>}) => {
  const theme = useTheme();

  const [rows, setRows] = useState<Array<IRow>>();

  useEffect(() => {
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
  }, [times])


  return (
    <Paper
      sx={{
        width: '50%',
        [theme.breakpoints.down('md')]: {
          width: '100%',
        },
        textAlign: 'center',
        position: 'fixed',
        bottom: 0,
        minHeight: '250px',
        paddingTop: theme.spacing(2),
        borderRadius: theme.spacing(2, 2, 0, 0),
      }}
    >
      <Box sx={{
        maxHeight: '300px',
        overflow: 'scroll',
      }}>
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
      </Box>

    </Paper>
  );
}