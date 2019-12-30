import React from 'react';
import './preloader.scss';

export default function Preloader({text}) {
    return (
        <div className="preloader">
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" preserveAspectRatio="xMidYMid">
                <circle cx="84" cy="50" r="0.0204258" fill="#77bffa">
                    <animate attributeName="r" repeatCount="indefinite" dur="0.3623188405797101s" calcMode="spline" keyTimes="0;1" values="10;0" keySplines="0 0.5 0.5 1" begin="0s"/>
                    <animate attributeName="fill" repeatCount="indefinite" dur="1.4492753623188404s" calcMode="discrete" keyTimes="0;0.25;0.5;0.75;1" values="#77bffa;#333333;#5b9740;#de5b31;#77bffa" begin="0s"/>
                </circle>
                <circle cx="83.9305" cy="50" r="10" fill="#77bffa">
                    <animate attributeName="r" repeatCount="indefinite" dur="1.4492753623188404s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="0s"/>
                    <animate attributeName="cx" repeatCount="indefinite" dur="1.4492753623188404s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="0s"/>
                </circle>
                <circle cx="16" cy="50" r="0" fill="#de5b31">
                    <animate attributeName="r" repeatCount="indefinite" dur="1.4492753623188404s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.3623188405797101s"/>
                    <animate attributeName="cx" repeatCount="indefinite" dur="1.4492753623188404s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.3623188405797101s"/>
                </circle>
                <circle cx="16" cy="50" r="9.97955" fill="#5b9740">
                    <animate attributeName="r" repeatCount="indefinite" dur="1.4492753623188404s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.7246376811594202s"/>
                    <animate attributeName="cx" repeatCount="indefinite" dur="1.4492753623188404s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.7246376811594202s"/>
                </circle>
                <circle cx="49.9305" cy="50" r="10" fill="#333333">
                    <animate attributeName="r" repeatCount="indefinite" dur="1.4492753623188404s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-1.0869565217391304s"/>
                    <animate attributeName="cx" repeatCount="indefinite" dur="1.4492753623188404s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-1.0869565217391304s"/>
                </circle>
            </svg>
            {
                text ?
                    <div className="preloader__text" dangerouslySetInnerHTML={{__html: text}}/>
                    :
                    null
            }
        </div>
    )
}