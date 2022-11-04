import { keyframes } from "styled-components";

const animations = {
    "bounce": {
        animation: keyframes`
                20%,
                53%,
                80%,
                from,
                to {
                    animation-timing-function:cubic-bezier(.215,.61,.355,1);
                    transform:translate3d(0,0,0);
                }
                40%,
                43% {
                    animation-timing-function:cubic-bezier(.755,.050,.855,.060);
                    transform:translate3d(0,-30px,0);
                }
                70% {
                    animation-timing-function:cubic-bezier(.755,.050,.855,.060);
                    transform:translate3d(0,-15px,0);
                }
                90% {
                    transform:translate3d(0,-4px,0);
                }
        `,
        options: `transform-origin:center bottom;`
    },
    "flash": {
        animation: keyframes`
                50%,
                from,
                to {
                    opacity:1;
                }
                25%,
                75% {
                    opacity:0;
                }
        `,
        options: ``
    },
    "pulse": {
        animation: keyframes`
                from,
                to {
                    transform:scale3d(1,1,1);
                }
                50% {
                    transform:scale3d(1.05,1.05,1.05);
                }
        `,
        options: ``
    },
    "rubberBand": {
        animation: keyframes`
                from,
                to {
                    transform:scale3d(1,1,1);
                }
                30% {
                    transform:scale3d(1.25,.75,1);
                }
                40% {
                    transform:scale3d(.75,1.25,1);
                }
                50% {
                    transform:scale3d(1.15,.85,1);
                }
                65% {
                    transform:scale3d(.95,1.05,1);
                }
                75% {
                    transform:scale3d(1.05,.95,1);
                }
        `,
        options: ``
    },
    "shake": {
        animation: keyframes`
                from,
                to {
                    transform:translate3d(0,0,0);
                }
                10%,
                30%,
                50%,
                70%,
                90% {
                    transform:translate3d(-10px,0,0);
                }
                20%,
                40%,
                60%,
                80% {
                    transform:translate3d(10px,0,0);
                }
        `,
        options: ``
    },
    "headShake": {
        animation: keyframes`
                0% {
                    transform:translateX(0);
                }
                6.5% {
                    transform:translateX(-6px) rotateY(-9deg);
                }
                18.5% {
                    transform:translateX(5px) rotateY(7deg);
                }
                31.5% {
                    transform:translateX(-3px) rotateY(-5deg);
                }
                43.5% {
                    transform:translateX(2px) rotateY(3deg);
                }
                50% {
                    transform:translateX(0);
                }
        `,
        options: `animation-timing-function:ease-in-out;`
    },
    "swing": {
        animation: keyframes`
                20% {
                    transform:rotate3d(0,0,1,15deg);
                }
                40% {
                    transform:rotate3d(0,0,1,-10deg);
                }
                60% {
                    transform:rotate3d(0,0,1,5deg);
                }
                80% {
                    transform:rotate3d(0,0,1,-5deg);
                }
                to {
                    transform:rotate3d(0,0,1,0deg);
                }
        `,
        options: `transform-origin:top center;`
    },
    "tada": {
        animation: keyframes`
                from,
                to {
                    transform:scale3d(1,1,1);
                }
                10%,
                20% {
                    transform:scale3d(.9,.9,.9) rotate3d(0,0,1,-3deg);
                }
                30%,
                50%,
                70%,
                90% {
                    transform:scale3d(1.1,1.1,1.1) rotate3d(0,0,1,3deg);
                }
                40%,
                60%,
                80% {
                    transform:scale3d(1.1,1.1,1.1) rotate3d(0,0,1,-3deg);
                }
        `,
        options: ``
    },
    "wobble": {
        animation: keyframes`
                from,
                to {
                    transform:none
                }
                15% {
                    transform:translate3d(-25%,0,0) rotate3d(0,0,1,-5deg);
                }
                30% {
                    transform:translate3d(20%,0,0) rotate3d(0,0,1,3deg);
                }
                45% {
                    transform:translate3d(-15%,0,0) rotate3d(0,0,1,-3deg);
                }
                60% {
                    transform:translate3d(10%,0,0) rotate3d(0,0,1,2deg);
                }
                75%{
                    transform:translate3d(-5%,0,0) rotate3d(0,0,1,-1deg);
                }
        `,
        options: ``
    },
    "jello": {
        animation: keyframes`
                11.1%,
                from,
                to {
                    transform:none;
                }
                22.2% {
                    transform:skewX(-12.5deg) skewY(-12.5deg);
                }
                33.3% {
                    transform:skewX(6.25deg) skewY(6.25deg);
                }
                44.4% {
                    transform:skewX(-3.125deg) skewY(-3.125deg);
                }
                55.5% {
                    transform:skewX(1.5625deg) skewY(1.5625deg);
                }
                66.6% {
                    transform:skewX(-.78125deg) skewY(-.78125deg);
                }
                77.7% {
                    transform:skewX(.390625deg) skewY(.390625deg);
                }
                88.8% {
                    transform:skewX(-.1953125deg) skewY(-.1953125deg);
                }
        `,
        options: `transform-origin:center;`
    },
    "bounceIn": {
        animation: keyframes`
                20%,
                40%,
                60%,
                80%,
                from,
                to {
                    animation-timing-function:cubic-bezier(.215,.61,.355,1);
                }
                0% {
                    opacity:0;
                    transform:scale3d(.3,.3,.3);
                }
                20% {
                    transform:scale3d(1.1,1.1,1.1);
                }
                40% {
                    transform:scale3d(.9,.9,.9);
                }
                60% {
                    opacity:1;
                    transform:scale3d(1.03,1.03,1.03);
                }
                80% {
                    transform:scale3d(.97,.97,.97);
                }
                to {
                    opacity:1;transform:scale3d(1,1,1);
                }
        `,
        options: ``
    },
    "bounceInDown": {
        animation: keyframes`
                60%,
                75%,
                90%,
                from,
                to {
                    animation-timing-function:cubic-bezier(.215,.61,.355,1);
                }
                0% {
                    opacity:0;
                    transform:translate3d(0,-3000px,0);
                }
                60% {
                    opacity:1;
                    transform:translate3d(0,25px,0);
                }
                75% {
                    transform:translate3d(0,-10px,0);
                }
                90% {
                    transform:translate3d(0,5px,0);
                }
                to {
                    transform:none
                }
        `,
        options: ``
    },
    "bounceInLeft": {
        animation: keyframes`
                60%,
                75%,
                90%,
                from,
                to {
                    animation-timing-function:cubic-bezier(.215,.61,.355,1);
                }
                0% {
                    opacity:0;
                    transform:translate3d(-3000px,0,0);
                }
                60% {
                    opacity:1;
                    transform:translate3d(25px,0,0);
                }
                75% {
                    transform:translate3d(-10px,0,0);
                }
                90% {
                    transform:translate3d(5px,0,0);
                }
                to {
                    transform:none;
                }
        `,
        options: ``
    },
    "bounceInRight": {
        animation: keyframes`
                60%,
                75%,
                90%,
                from,
                to {
                    animation-timing-function:cubic-bezier(.215,.61,.355,1);
                }
                from {
                    opacity:0;
                    transform:translate3d(3000px,0,0);
                }
                60% {
                    opacity:1;
                    transform:translate3d(-25px,0,0);
                }
                75% {
                    transform:translate3d(10px,0,0);
                }
                90% {
                    transform:translate3d(-5px,0,0);
                }
                to {
                    transform:none;
                }
        `,
        options: ``
    },
    "bounceInUp": {
        animation: keyframes`
                60%,
                75%,
                90%,
                from,
                to {
                    animation-timing-function:cubic-bezier(.215,.61,.355,1);
                }
                from {
                    opacity:0;
                    transform:translate3d(0,3000px,0);
                }
                60% {
                    opacity:1;
                    transform:translate3d(0,-20px,0);
                }
                75% {
                    transform:translate3d(0,10px,0);
                }
                90% {
                    transform:translate3d(0,-5px,0);
                }
                to {
                    transform:translate3d(0,0,0);
                }
        `,
        options: ``
    },
    "fadeIn": {
        animation: keyframes`
                from {
                    opacity:0;
                }
                to {
                    opacity:1;
                }
        `,
        options: ``
    },
    "fadeInDown": {
        animation: keyframes`
                from {
                    opacity:0;
                    transform:translate3d(0,-100%,0);
                }
                to {
                    opacity:1;
                    transform:none;
                }
        `,
        options: ``
    },
    "fadeInLeft": {
        animation: keyframes`
                from {
                    opacity:0;
                    transform:translate3d(-100%,0,0);
                }
                to {
                    opacity:1;
                    transform:none;
                }
        `,
        options: ``
    },
    "fadeInRight": {
        animation: keyframes`
                from {
                    opacity:0;
                    transform:translate3d(100%,0,0);
                }
                to {
                    opacity:1;
                    transform:none;
                }
        `,
        options: ``
    },
    "fadeInUp": {
        animation: keyframes`
                from {
                    opacity:0;
                    transform:translate3d(0,100%,0);
                }
                to {
                    opacity:1;
                    transform:none;
                }
        `,
        options: ``
    },
    "lightSpeedIn": {
        animation: keyframes`
                from {
                    transform:translate3d(100%,0,0) skewX(-30deg);
                    opacity:0;
                }
                60% {
                    transform:skewX(20deg);
                    opacity:1;
                }
                80% {
                    transform:skewX(-5deg);
                    opacity:1;
                }
                to {
                    transform:none;
                    opacity:1;
                }
        `,
        options: `animation-timing-function:ease-out;`
    },
    "rotateIn": {
        animation: keyframes`
                from {
                    transform-origin:center;
                    transform:rotate3d(0,0,1,-200deg);
                    opacity:0;
                }
                to {
                    transform-origin:center;
                    transform:none;
                    opacity:1
                }
        `,
        options: ``
    },
    "rotateInDownLeft": {
        animation: keyframes`
                from {
                    transform-origin:left bottom;
                    transform:rotate3d(0,0,1,-45deg);
                    opacity:0;
                }
                to {
                    transform-origin:left bottom;
                    transform:none;
                    opacity:1;
                }
        `,
        options: ``
    },
    "rotateInDownRight": {
        animation: keyframes`
                from {
                    transform-origin:right bottom;
                    transform:rotate3d(0,0,1,45deg);
                    opacity:0;
                }
                to {
                    transform-origin:right bottom;
                    transform:none;
                    opacity:1;
                }
        `,
        options: ``
    },
    "rotateInUpLeft": {
        animation: keyframes`
                from {
                    transform-origin:left bottom;
                    transform:rotate3d(0,0,1,45deg);
                    opacity:0;
                }
                to {
                    transform-origin:left bottom;
                    transform:none;
                    opacity:1;
                }
        `,
        options: ``
    },
    "rotateInUpRight": {
        animation: keyframes`
                from {
                    transform-origin:right bottom;
                    transform:rotate3d(0,0,1,-90deg);
                    opacity:0;
                }
                to {
                    transform-origin:right bottom;
                    transform:none;opacity:1;
                }
        `,
        options: ``
    },
    "rollIn": {
        animation: keyframes`
                from {
                    opacity:0;
                    transform:translate3d(-100%,0,0) rotate3d(0,0,1,-120deg);
                }
                to {
                    opacity:1;
                    transform:none;
                }
        `,
        options: ``
    },
    "zoomIn": {
        animation: keyframes`
                from {
                    opacity:0;
                    transform:scale3d(.3,.3,.3);
                }
                50% {
                    opacity:1;
                }
        `,
        options: ``
    },
    "zoomInDown": {
        animation: keyframes`
                from {
                    opacity:0;
                    transform:scale3d(.1,.1,.1) translate3d(0,-1000px,0);
                    animation-timing-function:cubic-bezier(.55,.055,.675,.19);
                }
                60% {
                    opacity:1;
                    transform:scale3d(.475,.475,.475) translate3d(0,60px,0);
                    animation-timing-function:cubic-bezier(.175,.885,.32,1);
                }
        `,
        options: ``
    },
    "zoomInLeft": {
        animation: keyframes`
                from {
                    opacity:0;
                    transform:scale3d(.1,.1,.1) translate3d(-1000px,0,0);
                    animation-timing-function:cubic-bezier(.55,.055,.675,.19);
                }
                60% {
                    opacity:1;
                    transform:scale3d(.475,.475,.475) translate3d(10px,0,0);
                    animation-timing-function:cubic-bezier(.175,.885,.32,1);
                }
        `,
        options: ``
    },
    "zoomInRight": {
        animation: keyframes`
                from {
                    opacity:0;
                    transform:scale3d(.1,.1,.1) translate3d(1000px,0,0);
                    animation-timing-function:cubic-bezier(.55,.055,.675,.19);
                }
                60% {
                    opacity:1;
                    transform:scale3d(.475,.475,.475) translate3d(-10px,0,0);
                    animation-timing-function:cubic-bezier(.175,.885,.32,1);
                }
        `,
        options: ``
    },
    "zoomInUp": {
        animation: keyframes`
                from {
                    opacity:0;
                    transform:scale3d(.1,.1,.1) translate3d(0,1000px,0);
                    animation-timing-function:cubic-bezier(.55,.055,.675,.19);
                }
                60% {
                    opacity:1;
                    transform:scale3d(.475,.475,.475) translate3d(0,-60px,0);
                    animation-timing-function:cubic-bezier(.175,.885,.32,1);
                }
        `,
        options: ``
    },
    "slideInDown": {
        animation: keyframes`
                from {
                    transform:translate3d(0,-100%,0);
                    visibility:visible;
                }
                to {
                    transform:translate3d(0,0,0);
                }
        `,
        options: ``
    },
    "slideInLeft": {
        animation: keyframes`
                from {
                    transform:translate3d(-100%,0,0);
                    visibility:visible;
                }
                to {
                    transform:translate3d(0,0,0);
                }
        `,
        options: ``
    },
    "slideInRight": {
        animation: keyframes`
                from {
                    transform:translate3d(100%,0,0);
                    visibility:visible;
                }
                to {
                    transform:translate3d(0,0,0);
                }
        `,
        options: ``
    },
    "slideInUp": {
            animation: keyframes`
                from {
                    transform:translate3d(0,100%,0);
                    visibility:visible;
                }
                to {
                    transform:translate3d(0,0,0);
                }
        `,
        options: ``
    },
}