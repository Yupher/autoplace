import React from 'react'

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import CounterWidget from '../../Counter/CounterWidget';


import LocalGasStation from '@material-ui/icons/LocalGasStation';
import LocalGasStationOutlined from '@material-ui/icons/LocalGasStationOutlined';
import EvStation from '@material-ui/icons/EvStation';



import Announcement from '@material-ui/icons/Announcement';


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    rootGeneral: {
        padding: theme.spacing(3)
    },
    divider: {
        margin: `${theme.spacing(1.5)}px 0`,
        background: 'none',
        display: 'block',
    },
    sliderWrap: {
        position: 'relative',
        display: 'block',
        boxShadow: theme.shadows[1],
        width: '100%',
        borderRadius: theme.rounded.medium,
        overflow: 'hidden'
    },
    noPadding: {
        paddingTop: '0 !important',
        paddingBottom: '0 !important',
        [theme.breakpoints.up('sm')]: {
            padding: '0 !important'
        }
    },
    counterIcon: {
        color: theme.palette.common.white,
        opacity: 0.7,
        fontSize: 84
    },
});

const Header = (props) => {

    const { classes, energy } = props;

    return (
        <Grid container spacing={3} className={classes.root}>
            <Grid item xs={12}>
                <div className={classes.root}>
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={3}>
                            <CounterWidget
                                color="secondary-dark"
                                start={0}
                                end={energy.FuelOil}
                                duration={3}
                                title='Fuel Oil'
                            >
                                <LocalGasStation className={classes.counterIcon} />
                            </CounterWidget>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <CounterWidget
                                color="secondary-main"
                                start={0}
                                end={energy.gasoline}
                                duration={3}
                                title='Gasoline'
                            >
                                <LocalGasStationOutlined className={classes.counterIcon} />
                            </CounterWidget>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <CounterWidget
                                color="secondary-main"
                                start={0}
                                end={energy.gas}
                                duration={3}
                                title='Gas'
                            >
                                <EvStation className={classes.counterIcon} />
                            </CounterWidget>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <CounterWidget
                                color="secondary-main"
                                start={0}
                                end={energy.empty}
                                duration={3}
                                title='No Available'
                            >
                                <Announcement className={classes.counterIcon} />
                            </CounterWidget>
                        </Grid>
                    </Grid>
                </div>
            </Grid>
        </Grid>
    )
}

export default withStyles(styles)(Header);


