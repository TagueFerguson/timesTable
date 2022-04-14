import './App.css';
import React, { useEffect, useRef, useState } from 'react';
import App from './App';

function Wrapper() {

    const [countdown, setCountdown] = useState(30);

    useEffect(() => {
        setInterval(() => {
            setCountdown(countdown - 1);
        }, 1000)
    }, [countdown]);


    return (
        <div className="Wrapper">
            <App countdown={countdown} />
        </div>
    );
}

export default Wrapper;
