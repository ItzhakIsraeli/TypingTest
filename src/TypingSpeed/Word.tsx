import {Typography} from "@mui/material";
import React from "react";

interface WordProps {
    text: string,
    isActive: boolean,
    correct: boolean
}

const Word = ({text, isActive, correct}: WordProps) => {

    if (correct) {
        return <Typography color={'green'}>
            {text}
        </Typography>
    } else if (correct === false) {
        return <Typography color={'red'}>
            {text}
        </Typography>
    } else if (isActive) {
        return <Typography fontWeight={'bold'}>
            {text}
        </Typography>
    }
    return <Typography>
        {text}
    </Typography>
}

export default React.memo(Word);