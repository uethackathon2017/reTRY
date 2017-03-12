export const setColorForCard = (index, answerKey, rightAnswerKey) => {

    let color;

    if (rightAnswerKey == -1) {
        // not have result yet

        if (index === answerKey) {
            color = 'yellow'
        } else {
            color =  'white'
        }
    } else {
        // have result

        if (index === answerKey && answerKey === rightAnswerKey) {
            // true answer
            color = 'green'
        } else if (index === answerKey && answerKey !== rightAnswerKey){
            // wrong answer
            color = 'red'
        } else {
            // other
            color=  'white'
        }
    }

    return color;
};

export const setColorForTransparentCard = (index, answerKey, rightAnswerKey) => {

    let color;

    if (rightAnswerKey == -1) {
        // not have result yet

        if (index === answerKey) {
            color = 'yellow'
        } else {
            color =  'transparent'
        }
    } else {
        // have result

        if (index === answerKey && answerKey === rightAnswerKey) {
            // true answer
            color = 'green'
        } else if (index === answerKey && answerKey !== rightAnswerKey){
            // wrong answer
            color = 'red'
        } else {
            // other
            color=  'transparent'
        }
    }


    console.log(color);
    return color;
};

