import React from 'react'


import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import Typography from '@material-ui/core/Typography';
import CardGiftcard from '@material-ui/icons/CardGiftcard';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    CartesianAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart, Pie, Cell,
    Legend
} from 'recharts';

import styles from '../../Widget/widget-jss';

import colorfull from 'enl-api/palette/colorfull';



const color = ({
    primary: colorfull[0],
    secondary: colorfull[1],
    third: colorfull[2],
    fourth: colorfull[3],
});


import EventNote from '@material-ui/icons/EventNote';
import CalendarToday from '@material-ui/icons/CalendarToday';
import Money from '@material-ui/icons/Money';
import Palette from '@material-ui/icons/Palette';




const Years = (props) => {

    const { classes, family, colors, years } = props;


    return (
        <Grid className={classes.mt_4rem} container spacing={2}>
            <Grid item md={8} xs={12}>
                <ul className={classes.bigResume}>
                    <li>
                        <Avatar className={classNames(classes.avatar, classes.pinkAvatar)}>
                            <CalendarToday />
                        </Avatar>
                        <Typography variant="h6">
                            <span className={classes.pinkText}> {family.lastYears} </span>
                            <Typography>
                                Last Years
                            </Typography>
                        </Typography>
                    </li>
                    <li>
                        <Avatar className={classNames(classes.avatar, classes.purpleAvatar)}>
                            <EventNote />
                        </Avatar>
                        <Typography variant="h6">
                            <span className={classes.purpleText}> {family.Kilometer} </span>
                            <Typography>
                                Kilometer
                            </Typography>
                        </Typography>
                    </li>
                    <li>
                        <Avatar className={classNames(classes.avatar, classes.blueAvatar)}>
                            <Money />
                        </Avatar>
                        <Typography variant="h6">
                            <span className={classes.blueText}> {family.da_100} </span>
                            <Typography>
                                - 100 M. DA
                            </Typography>
                        </Typography>
                    </li>
                </ul>
                <div className={classes.chartWrap}>
                    <div className={classes.chartFluid}>
                        <ResponsiveContainer>
                            <BarChart
                                data={years}
                                style={{ overflow: 'hidden' }}
                            >
                                <XAxis dataKey="name" tickLine={false} />
                                <YAxis axisLine={false} tickSize={3} tickLine={false} tick={{ stroke: 'none' }} />
                                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                                <CartesianAxis />
                                <Tooltip />
                                <Bar dataKey="car" fill={color.primary} />
                                <Bar dataKey="kilometer" fill={color.secondary} />
                                <Bar dataKey="da_100" fill={color.third} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </Grid>
            <Grid item md={4} xs={12}>
                <Typography className={classes.smallTitle} variant="button">
                    <Palette className={classes.leftIcon} />
                    Colors Available
                </Typography>
                <Divider className={classes.divider} />
                <Grid container className={classes.secondaryWrap}>
                    <PieChart width={300} height={300}>
                        <Pie
                            data={colors}
                            cx={150}
                            cy={100}
                            dataKey="value"
                            innerRadius={40}
                            outerRadius={80}
                            fill="#FFFFFF"
                            paddingAngle={5}
                            label
                        >
                            {
                                colors.map((entry, index) => <Cell key={index.toString()} fill={entry.color} />)
                            }
                        </Pie>
                        <Legend iconType="circle" verticalALign="bottom" iconSize={10} />
                    </PieChart>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default withStyles(styles)(Years);


