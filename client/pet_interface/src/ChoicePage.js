import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: 300,
        width: '100%',
    },
    image: {
        position: 'relative',
        height: 200,
        [theme.breakpoints.down('xs')]: {
            width: '100% !important', // Overrides inline-style
            height: 100,
        },
        '&:hover, &$focusVisible': {
            zIndex: 1,
            '& $imageBackdrop': {
                opacity: 0.15,
            },
            '& $imageMarked': {
                opacity: 0,
            },
            '& $imageTitle': {
                border: '4px solid currentColor',
            },
        },
    },
    focusVisible: {},
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    },
    imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
        position: 'relative',
        padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
    },
    imageMarked: {
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    },
}));

function SimpleButton(props){
    const classes = useStyles();
    return <ButtonBase
            focusRipple
            key={props.name}
            className={classes.image}
            focusVisibleClassName={classes.focusVisible}
            style={{
                width: props.width,
            }}
            onClick = {()=>(props.changeState(props.name))}
        >
            <span
                className={classes.imageSrc}
                style={{
                    backgroundImage: `url(${props.url})`,
                }}
            />
                <span className={classes.imageBackdrop} />
                <span className={classes.imageButton}>
                    <Typography
                        component="span"
                        variant="subtitle1"
                        color="inherit"
                        className={classes.imageTitle}
                    >
                            {props.name}
                    <span className={classes.imageMarked} />
                </Typography>
            </span>
        </ButtonBase>
}

function handleClick (str) {
    const params = new URLSearchParams();
    params.append('result', str);
    axios({
      method: 'post',
      url: 'http://127.0.0.1:5000/add',
      data: params
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

class Choices extends Component {

    constructor(props){
        super(props);
        this.state = {currentOption : ''};
        this.choices = this.choices.bind(this);
        this.changeState = this.changeState.bind(this);
    }

    changeState(newState){
        this.setState({currentOption : newState}, () => {
          console.log("this is the current state", this.state.currentOption);
          handleClick(this.state.currentOption);
        });
    }

    choices(option) {
        switch(option) {
            case '':
                return (
                    <div>
                        <SimpleButton name={'human'} url={'url'} width={"50%"} changeState={this.changeState}/>
                        <SimpleButton name={'dog'} url={'url'} width={"50%"} changeState={this.changeState}/>
                    </div>);
            case 'human':
                return (
                    <div>
                        <SimpleButton name={'human'} url={'url'} width={"50%"} changeState={this.changeState}/>
                        <SimpleButton name={'dog'} url={'url'} width={"50%"} changeState={this.changeState}/>
                    </div>);
            case 'dog':
                return (
                    <div>
                        <SimpleButton name={'play'} url={'url'} width={"25%"} changeState={this.changeState}/>
                        <SimpleButton name={'eat'} url={'url'} width={"25%"} changeState={this.changeState}/>
                        <SimpleButton name={'drink'} url={'url'} width={"25%"} changeState={this.changeState}/>
                        <SimpleButton name={'restroom'} url={'url'} width={"25%"} changeState={this.changeState}/>
                    </div>);
            default:
                return (
                    <div>
                        <SimpleButton name={'human'} url={'url'} width={"50%"} changeState={this.changeState}/>
                        <SimpleButton name={'dog'} url={'url'} width={"50%"} changeState={this.changeState}/>
                    </div>);
        }
    }

    render(){
        let option = this.state.currentOption;
        return this.choices(option);
    }
}
export default Choices;
