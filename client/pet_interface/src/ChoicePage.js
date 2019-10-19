import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'
import Speech from 'speak-tts'

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
            marginTop: "2%",
            marginLeft: "2%",
            height: props.height
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
        this.changeStateAndNotify = this.changeStateAndNotify.bind(this);
        this.changeStateAndCall911 = this.changeStateAndCall911.bind(this);
    }

    changeState(newState){
        this.setState({currentOption : newState})
    }

    changeStateAndCall911(newState){
        this.setState({currentOption : newState}, () => {
            console.log("this is the current state", this.state.currentOption);
            handleClick(this.state.currentOption);
        });
        this.SaySomething("Help!" + newState + " Alert");
    } 

    changeStateAndNotify(newState){
        this.setState({currentOption : newState}, () => {
            console.log("this is the current state", this.state.currentOption);
            handleClick(this.state.currentOption);
        });
        this.SaySomething(newState);
    }

    SaySomething(intext){
        const speech = new Speech()
        if (speech.hasBrowserSupport()){
            console.log("good")
        }
        speech.init().then((data) => {
            console.log("Speech is ready, voices are available", data)
        }).catch(e => {
            console.error("An error occured while initializing : ", e)
        })

        speech.speak({
            text: intext
        }).then(() => {
            console.log("success")
        }).catch(e => {
            console.error("Error",e)
        })
    }

    choices(option) {
        //var msg = new SpeechSynthesisUtterance("Hello");
        //window.speechSynthesis.speak(msg);
        switch(option) {
            case '':
                return (
                    <div>
                        <SimpleButton name={'Human'} url={'https://mir-s3-cdn-cf.behance.net/project_modules/disp/34e3c926759079.5635a07a27584.jpg'} height={"700px"} width={"47%"} changeState={this.changeState}/>
                        <SimpleButton name={'Dog'} url={'https://thehydrant.files.wordpress.com/2015/12/z1.jpg?w=500&h=500'} height={"700px"} width={"47%"} changeState={this.changeState}/>
                        </div>);
            case 'Human':
                return (
                    <div>
                        <SimpleButton name={'Blood Pressure'} url={'https://media.istockphoto.com/vectors/blood-pressure-gauge-instrument-drawing-vector-id472337796?k=6&m=472337796&s=612x612&w=0&h=lLbivvFQ_AjDcu1tmc1bYZLYeEMJZxDk5tgkTlfhOAI='} height={"338px"} width={"47%"} changeState={this.changeState}/>
                        <SimpleButton name={'Blood Sugar'} url={'https://media.gettyimages.com/vectors/blood-glucose-medical-flat-design-themed-icon-set-with-shadow-vector-id1009796528?s=612x612'} height={"338px"} width={"47%"} changeState={this.changeState}/>
                        <SimpleButton name={'Epilepsy'} url={'https://2rdnmg1qbg403gumla1v9i2h-wpengine.netdna-ssl.com/wp-content/uploads/sites/3/2019/05/epilepsyMyths-868954686-770x553-650x428.jpg'} height={"338px"} width={"47%"} changeState={this.changeStateAndCall911}/>   
                        </div>);
            case 'Dog':
                return (
                    <div>
                        <SimpleButton name={'Play'} url={'https://previews.123rf.com/images/chuhail/chuhail1511/chuhail151100039/48538925-cartoon-simple-illustration-vector-sport-ball-and-word-.jpg'} height={"338px"} width={"47%"} changeState={this.changeState}/>
                        <SimpleButton name={'Eat'} url={'https://static.vecteezy.com/system/resources/previews/000/155/844/non_2x/vectors-of-food-icons-in-minimal-design.jpg'} height={"338px"} width={"47%"} changeState={this.changeState}/>
                        <SimpleButton name={'Drink'} url={'https://www.wikihow.com/images/thumb/2/26/Make-Your-Dog-Drink-Water-Step-11.jpg/aid1544758-v4-728px-Make-Your-Dog-Drink-Water-Step-11.jpg'} height={"338px"} width={"47%"} changeState={this.changeState}/>
                        <SimpleButton name={'Restroom'} url={'https://imgs.clipartwiki.com/clipimg/small/81-816488_ca-title-24-unisex-ada-restroom-signs-alpha.png'} height={"338px"} width={"47%"} changeState={this.changeState}/>
                        </div>);
            case 'Blood Pressure':
                return (<div>
                    <SimpleButton name={'High Blood Pressure'} url={'https://us.123rf.com/450wm/cowpland/cowpland1706/cowpland170600010/80179622-stock-vector-blood-pressure-icon.jpg?ver=6'} height={"700px"} width={"47%"} changeState={this.changeStateAndNotify}/>
                    <SimpleButton name={'Low Blood Pressure'} url={'https://previews.123rf.com/images/simmmax/simmmax1608/simmmax160800233/61453412-low-blood-pressure-digital-concept.jpg'} height={"700px"} width={"47%"} changeState={this.changeStateAndNotify}/>   
                    </div>);
            case 'Blood Sugar':
                return (<div>
                    <SimpleButton name={'High Blood Sugar'} url={'https://thumbs.dreamstime.com/z/high-level-blood-sugar-vector-icon-diabetes-sign-81297690.jpg'} height={"700px"} width={"47%"} changeState={this.changeStateAndNotify}/>
                    <SimpleButton name={'Low Blood Sugar'} url={'http://www.wockhardtdiabetic.com/images/complication/Hypoglycemia.png'} height={"700px"} width={"47%"} changeState={this.changeStateAndNotify}/>   
                    </div>);
            default:
                return (
                    <div>
                        <SimpleButton name={'Human'} url={'https://mir-s3-cdn-cf.behance.net/project_modules/disp/34e3c926759079.5635a07a27584.jpg'} height={"700px"} width={"47%"} changeState={this.changeState}/>
                        <SimpleButton name={'Dog'} url={'https://thehydrant.files.wordpress.com/2015/12/z1.jpg?w=500&h=500'} height={"700px"} width={"47%"} changeState={this.changeState}/>
                        </div>);
        }
    }

    render(){
        let option = this.state.currentOption;
        return this.choices(option);
    }
}
export default Choices;
