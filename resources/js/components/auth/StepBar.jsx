import React from 'react';
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";

export default function StepBar({ percent }) {
    return (
        <ProgressBar
            percent={percent}
            filledBackground="radial-gradient(circle, #1CA4A9, #1DA3A8)"
        >
            <Step transition="scale">
                {({ accomplished }) => (
                    <img
                        style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                        width="30"
                        src="/img/icons/elipse1.png"
                    />
                )}
            </Step>
            <Step transition="scale">
                {({ accomplished }) => (
                    <img
                        style={{ filter: `grayscale(${accomplished ? 0 : 100}%)` }}
                        width="30"
                        src="/img/icons/elipse2.png"
                    />
                )}
            </Step>
        </ProgressBar>
    );
};