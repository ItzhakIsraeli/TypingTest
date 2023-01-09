import {Typography} from "@mui/material";
import React from "react";
import {TEST_SITUATIONS} from "./TypingSpeed";

interface TimerProps {
    testStatus: TEST_SITUATIONS,
    correctWords: boolean[],
    handleTestComplete: () => void
}

export const Timer = ({testStatus, correctWords, handleTestComplete}: TimerProps) => {
    const [timePast, setTimePast] = React.useState<number>(0);
    const correctWordsLength = correctWords.filter(Boolean).length;

    React.useEffect(() => {
        let interval: NodeJS.Timeout | undefined;
        if (testStatus === TEST_SITUATIONS.IN_TEST) {
            interval = setInterval(() => {
                if (timePast === 59) {
                    handleTestComplete();
                }
                setTimePast(prevState => prevState + 1);
            }, 1000);
        } else if (testStatus === TEST_SITUATIONS.RESTART) {
            setTimePast(0);
        }
        return () => clearInterval(interval);
    }, [testStatus, timePast]);

    return (
        <>
            <Typography color={'primary'} variant={'h5'}>
                Time: {60 - timePast}
            </Typography>
            <Typography color={'primary'} variant={'h5'}>
                Speed: {((correctWordsLength / (timePast / 60)) || 0).toFixed(2)} WPM
            </Typography>
            <Typography color={'error'} variant={'h5'}>
                Errors: {correctWords.length - correctWordsLength}
            </Typography>
        </>
    )
}