import {getData} from "../Data/Data";
import Word from "./Word";
import {Box, Button, Divider, Grid, TextField, Typography} from "@mui/material";
import React from "react";
import {Timer} from "./Timer";

export enum TEST_SITUATIONS {
    WAITING_FOR_TEST = 'WAITING_FOR_TEST',
    IN_TEST = 'IN_TEST',
    TEST_END = 'TEST_END',
    RESTART = 'RESTART'
}

export const TypingSpeed = () => {
    const [testStatus,setTestStatus] = React.useState<TEST_SITUATIONS>(TEST_SITUATIONS.WAITING_FOR_TEST);
    const [input, setInput] = React.useState<string>('');
    const wordBank = React.useRef<string[]>(getData());

    const [wordIndex, setWordIndex] = React.useState<number>(0);
    const [correctWords, setCorrectWords] = React.useState<boolean[]>([]);

    const handleRestart = () => {
        setTestStatus(TEST_SITUATIONS.RESTART);
        setInput('');
        setWordIndex(0);
        setCorrectWords([]);
    }

    const handleChangeInput = (changeInput: string) => {
        setTestStatus(TEST_SITUATIONS.IN_TEST);

        if (changeInput.endsWith(' ')) {

            if (wordIndex === wordBank.current.length - 1) {
                handleTestComplete()
            } else {
                setInput('')
            }

            setWordIndex(prevState => prevState + 1);
            setCorrectWords(prevState => {
                const newResult = [...prevState];
                newResult[wordIndex] = changeInput.trim() === wordBank.current[wordIndex]
                return newResult
            })
        } else {
            setInput(changeInput)
        }
    }

    const handleTestComplete = () => {
        setTestStatus(TEST_SITUATIONS.TEST_END);
        setInput('The Test Complete !');
    }

    return (
        <Box>
            <Typography variant={'h2'} paddingBottom={2} color={'primary'}>
                Typing Speed
            </Typography>
            <Divider/>
            <Grid container gap={5} justifyContent={'center'} paddingTop={2} paddingBottom={2}>
                <TextField value={input} onChange={(e) => handleChangeInput(e.target.value)}
                           color={wordBank.current[wordIndex]?.includes(input) ? 'success' : 'error'}
                           placeholder={'Type the words here...'} disabled={testStatus === TEST_SITUATIONS.TEST_END}/>
                <Grid container gap={2}>
                    {wordBank.current.map((word, index) =>
                        <Word key={index} text={word} isActive={index === wordIndex} correct={correctWords[index]}/>
                    )}
                </Grid>
            </Grid>
            <Divider/>
            <Timer testStatus={testStatus} correctWords={correctWords} handleTestComplete={handleTestComplete}/>

            {
                (testStatus === TEST_SITUATIONS.TEST_END || testStatus === TEST_SITUATIONS.IN_TEST) &&
                <>
                    <Divider/>
                    <Grid container gap={5} justifyContent={'center'} paddingTop={2} paddingBottom={2}>
                        <Button onClick={handleRestart} variant={'contained'}>
                            Restart
                        </Button>
                    </Grid>
                </>
            }
        </Box>
    )
}