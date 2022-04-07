import React from 'react'
import PropTypes from 'prop-types';

import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import withWidth from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import classNames from 'classnames';
import styles from '../tableStyle-jss';
import css from 'enl-styles/Table.scss';
import Table from '@material-ui/core/Table';

import OneTableEdit from './OneTableEdit'



const get = (item, name) => {

    let value = null;

    Object.keys(item).forEach((key) => {
        if (key === name) {
            value = item[key];
        }
    });

    return value;

}


const TableEdit = (props) => {

    const { classes, theme, anchorTable, dataApi, message, blockRow, token, user, deleteRow, setCurrentFamilies, setCurrentVehicle } = props;



    const getHead = dataArray => dataArray.map((item, index) => {
        if (!item.hidden) {
            return (
                <TableCell padding="none" key={index.toString()} width={item.width}>{item.label}</TableCell>
            );
        }
        return false;
    });



    const getItems = (dataArray) => dataArray.map((item, i) => (
        <tr className={get(item, 'edited') ? css.editing : ''}>
            {renderCell(anchorTable, item)}
        </tr>
    ));


    const renderCell = (dataArray, item) => dataArray.map((itemCell, index) => {

        const inputType = anchorTable[index].type;
        return item.display ? <OneTableEdit inputType={inputType} item={item} itemCell={itemCell} blockRow={blockRow} token={token} user={user} deleteRow={deleteRow} setCurrentFamilies={setCurrentFamilies} setCurrentVehicle={setCurrentVehicle} /> : null

    });


    return (
        <div className={classes.rootTable}>
            <Table className={classNames(css.tableCrud, classes.table, classes.stripped)}>
                <TableHead>
                    <TableRow>
                        {getHead(anchorTable)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {getItems(dataApi)}
                </TableBody>
            </Table>
            {
                dataApi.length === 0 ?
                    <Typography variant="p" >
                        {message}
                    </Typography> : ""
            }
        </div>
    )
}

TableEdit.propTypes = {
    anchorTable: PropTypes.array.isRequired,
    dataApi: PropTypes.array.isRequired,
};



export default withWidth()(withStyles(styles, { withTheme: true })(TableEdit));