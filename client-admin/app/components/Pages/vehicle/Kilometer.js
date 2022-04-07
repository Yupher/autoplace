import React from 'react'

import classNames from 'classnames';


import {
    ComposedChart,
    Line,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from 'recharts';

import styles from '../../Widget/widget-jss';

import colorfull from 'enl-api/palette/colorfull';


import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import LinearProgress from '@material-ui/core/LinearProgress';

import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
import HdrOn from '@material-ui/icons/Build';
import Announcement from '@material-ui/icons/Announcement';
import Settings from '@material-ui/icons/Settings';

const color = ({
    primary: colorfull[0],
    secondary: colorfull[1],
    third: colorfull[2],
    fourth: colorfull[3],
});



const Kilometer = (props) => {

    const { classes, gearBox, power, kilometer } = props;


    return (
        <Grid className={classes.mt_4rem} container spacing={2}>
            <Grid item md={8} xs={12}>
                <ul className={classes.bigResume}>
                    <li>
                        <Avatar className={classNames(classes.avatar, classes.pinkAvatar)}>
                            <FiberManualRecord />
                        </Avatar>
                        <Typography variant="h6">
                            <span className={classes.pinkText}> {gearBox.manuel} % </span>
                            <Typography>
                                Gear Box Manual
                            </Typography>
                        </Typography>
                    </li>
                    <li>
                        <Avatar className={classNames(classes.avatar, classes.purpleAvatar)}>
                            <HdrOn />
                        </Avatar>
                        <Typography variant="h6">
                            <span className={classes.purpleText}> {gearBox.auto} % </span>
                            <Typography>
                                Gear Box Auto
                            </Typography>
                        </Typography>
                    </li>
                    <li>
                        <Avatar className={classNames(classes.avatar, classes.blueAvatar)}>
                            <Announcement />
                        </Avatar>
                        <Typography variant="h6">
                            <span className={classes.blueText}> {gearBox.not} % </span>
                            <Typography>
                                Not Available
                            </Typography>
                        </Typography>
                    </li>
                </ul>
                <div className={classes.chartWrap}>
                    <div className={classes.chartFluid}>
                        <ResponsiveContainer>
                            <ComposedChart
                                data={kilometer}
                                style={{ overflow: 'hidden' }}
                            >
                                <XAxis dataKey="name" tickLine={false} />
                                <YAxis axisLine={false} tickSize={3} tickLine={false} tick={{ stroke: 'none' }} />
                                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                                <Tooltip />
                                <Line type="monotone" dataKey="Kilometer" strokeWidth={2} stroke={color.third} />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </Grid>
            <Grid item md={4} xs={12}>
                <Typography className={classes.smallTitle} variant="button">
                    <Settings className={classes.leftIcon} />
                    Engine Power
                </Typography>
                <Divider className={classes.divider} />
                <ul className={classes.secondaryWrap}>
                    <li>
                        <Typography gutterBottom> 1.2 or less than 1.2 </Typography>
                        <LinearProgress variant="determinate" className={classNames(classes.progress, classes.pinkProgress)} value={power.p_1} />
                    </li>
                    <li>
                        <Typography gutterBottom> 1.4 or less than 1.4 </Typography>
                        <LinearProgress variant="determinate" className={classNames(classes.progress, classes.purpleProgress)} value={power.p_2} />
                    </li>
                    <li>
                        <Typography gutterBottom> 1.6 or less than 1.6 </Typography>
                        <LinearProgress variant="determinate" className={classNames(classes.progress, classes.orangeProgress)} value={power.p_3} />
                    </li>
                    <li>
                        <Typography gutterBottom> 1.7 or more than 1.7 </Typography>
                        <LinearProgress variant="determinate" className={classNames(classes.progress, classes.greenProgress)} value={power.p_4} />
                    </li>
                    <li>
                        <Typography gutterBottom> others </Typography>
                        <LinearProgress variant="determinate" className={classNames(classes.progress, classes.blueProgress)} value={power.other} />
                    </li>
                </ul>
            </Grid>
        </Grid>
    )
}

export default withStyles(styles)(Kilometer);


