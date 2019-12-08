import React from 'react';
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@material-ui/core';

// components
import DeleteButton from './button';


export default function TableComponent({ data }) {
  let keys = Object.keys(data[0]).map(i => i.toUpperCase());
  keys.shift(); // delete "id" key

  return (
    <Table className="mb-0">
      <TableHead>
        <TableRow>
          {keys.map(key => (
            <TableCell key={key}>{key}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(({ id, name, price, marketCap, volume, circulatingSupply, allTimeHigh }) => (
          <TableRow key={id}>
            <TableCell className="pl-3 fw-normal">{name}</TableCell>
            <TableCell>{price}</TableCell>
            <TableCell>{marketCap}</TableCell>
            <TableCell>{volume}</TableCell>
            <TableCell>{circulatingSupply}</TableCell>
            <TableCell>{allTimeHigh}</TableCell>
            <TableCell>
              <DeleteButton
                onClick={this.toggleSubMenu}
              >
              </DeleteButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
