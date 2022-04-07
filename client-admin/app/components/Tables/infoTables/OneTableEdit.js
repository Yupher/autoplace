import React, { useState } from 'react'
import PropTypes from 'prop-types';


import TableCell from '@material-ui/core/TableCell';
import withWidth from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import styles from '../tableStyle-jss';
import css from 'enl-styles/Table.scss';
import TextField from '@material-ui/core/TextField';

import img from '../../../../public/images/avatars/pp_boy4.svg'
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import BlockIcon from '@material-ui/icons/Block';
import Delete from '@material-ui/icons/HighlightOff';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import SendSharpIcon from '@material-ui/icons/SendSharp';

import { Link } from 'react-router-dom'

const get = (item, name) => {

    let value = null;

    Object.keys(item).forEach((key) => {
        if (key === name) {
            value = item[key];
        }
    });

    return value;

}

const OneTableEdit = (props) => {

    const { theme, inputType, item, itemCell, blockRow, token, user, deleteRow, setCurrentFamilies, setCurrentVehicle } = props;

    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [unblock, setUnblock] = useState(false);

    const agreeBlock = () => {
        blockRow(item.id, token, false);
        setOpen(false);
    }

    const agreeUnblock = () => {
        blockRow(item.id, token, true);
        setUnblock(false);
    }

    const agreeDeleteAdmin = () => {
        deleteRow({ user: item.id, token })
        setOpen2(false);
    }


    switch (inputType) {

        case 'text':
            return (
                <TableCell className='info-tables-row'>
                    <TextField
                        placeholder={itemCell.name}
                        name={itemCell.name}
                        className={classNames(css.crudInput, theme.palette.type === 'dark' ? css.lightTxt : css.darkTxt)}
                        // id={cellData.id.toString()}
                        value={get(item, itemCell.name)}
                        // onChange={(event) => handleUpdate(event)}
                        disabled={!get(item, 'edited')}
                        margin="none"
                        inputProps={{
                            'aria-label': 'Description',
                        }}
                    />
                </TableCell>);

        case 'pic':
            return (
                <TableCell className='info-tables-row'>
                    <img src={img} className='info-pic-users' alt='users' />
                </TableCell>);

        case 'add_admin':
            return (
                item.role !== 'admin' || user.role !== 'main_admin' ? <TableCell className='info-tables-row'></TableCell> :
                    <TableCell className='info-tables-row'>
                        <IconButton
                            onClick={() => setOpen2(true)}
                            className="danger-vred danger-hover-vred"
                            // className={classNames((!item.get('edited') ? css.hideAction : ''), classes.button)}
                            aria-label="Done"
                        >
                            <Delete />
                        </IconButton>
                        <Dialog
                            open={open2}
                            onClose={() => setOpen2(false)}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >

                            <DialogTitle id="alert-dialog-title" className="danger-vred danger-after-vred">
                                Delete An Admin
                            </DialogTitle>

                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    <span className="black-vred"> are you sure you delete this admin: {item.lastname + ' ' + item.firstname} ? </span>
                                    the user's account will be (client / vendor) until you add it again.
                                </DialogContentText>
                            </DialogContent>

                            <DialogActions>
                                <Button onClick={() => setOpen2(false)} className="gray-vred">
                                    Disagree
                                </Button>
                                <Button onClick={agreeDeleteAdmin} className="danger-vred">
                                    Agree
                                </Button>
                            </DialogActions>

                        </Dialog>
                    </TableCell>);

        case 'block':
            return (
                <TableCell className='info-tables-row'>
                    <IconButton
                        onClick={() => setOpen(true)}
                        className="danger-vred danger-hover-vred"
                        // className={classNames((!item.get('edited') ? css.hideAction : ''), classes.button)}
                        aria-label="Done"
                    >
                        <BlockIcon />
                    </IconButton>
                    <Dialog
                        open={open}
                        onClose={() => setOpen(false)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >

                        <DialogTitle id="alert-dialog-title" className="danger-vred danger-after-vred">
                            Block A User
                        </DialogTitle>

                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <span className="black-vred"> are you sure you block this user: {item.lastname + ' ' + item.firstname} ? </span>
                                the user's account will be blocked until you reactivate it.
                            </DialogContentText>
                        </DialogContent>

                        <DialogActions>
                            <Button onClick={() => setOpen(false)} className="gray-vred">
                                Disagree
                            </Button>
                            <Button onClick={agreeBlock} className="danger-vred">
                                Agree
                            </Button>
                        </DialogActions>

                    </Dialog>
                </TableCell>);

        case 'unblock':
            return (
                <TableCell className='info-tables-row'>
                    <IconButton
                        onClick={() => setUnblock(true)}
                        color="secondary"
                        // className={classNames((!item.get('edited') ? css.hideAction : ''), classes.button)}
                        aria-label="Done"
                    >
                        <VerifiedUserIcon />
                    </IconButton>
                    <Dialog
                        open={unblock}
                        onClose={() => setUnblock(false)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >

                        <DialogTitle id="alert-dialog-title" className="">
                            Block A User
                        </DialogTitle>

                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <span className="black-vred"> are you sure you unblock this user: {item.lastname + ' ' + item.firstname} ? </span>
                                the user's account will be activated.
                            </DialogContentText>
                        </DialogContent>

                        <DialogActions>
                            <Button onClick={() => setUnblock(false)} className="gray-vred">
                                Disagree
                            </Button>
                            <Button onClick={agreeUnblock} color="secondary">
                                Agree
                            </Button>
                        </DialogActions>

                    </Dialog>
                </TableCell>);

        case 'link':

            return (
                <TableCell className='info-tables-row'>
                    <Link to={itemCell.to}>
                        <IconButton
                            onClick={() => itemCell.to === '/app/pages/families' ? setCurrentFamilies(item) : setCurrentVehicle(item)}
                            color="secondary"
                            // className="danger-vred danger-hover-vred"
                            // className={classNames((!item.get('edited') ? css.hideAction : ''), classes.button)}
                            aria-label="Done"
                        >
                            <SendSharpIcon />
                        </IconButton>
                    </Link>
                </TableCell>
            );

        default:
            return <TableCell className='info-tables-row'> </TableCell>;

    }
}


OneTableEdit.propTypes = {
    theme: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    itemCell: PropTypes.object.isRequired,
};


export default withWidth()(withStyles(styles, { withTheme: true })(OneTableEdit));