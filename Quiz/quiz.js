document.addEventListener('DOMContentLoaded', (event) => {
    const quizData = [
        {
            question: "1.What is the capital of France?",
            a: "Berlin",
            b: "Madrid",
            c: "Paris",
            d: "Rome",
            correct: "c"
        },
        {
            question: "2.Who is the CEO of Tesla?",
            a: "Jeff Bezos",
            b: "Elon Musk",
            c: "Bill Gates",
            d: "Tony Stark",
            correct: "b"
        },
        {
            question: "3.What is the largest ocean on Earth?",
            a: "Atlantic Ocean",
            b: "Indian Ocean",
            c: "Arctic Ocean",
            d: "Pacific Ocean",
            correct: "d"
        }
    ];

    const quiz = document.getElementById('quiz');
    const submitButton = document.getElementById('submit');
    const resultsContainer = document.getElementById('results');

    function buildQuiz() {
        const output = [];
        quizData.forEach((currentQuestion, questionNumber) => {
            const answers = [];
            for (let letter in currentQuestion) {
                if (letter !== 'question' && letter !== 'correct') {
                    answers.push(
                        `<label>
                            <input type="radio" name="question${questionNumber}" value="${letter}">
                            ${letter} :
                            ${currentQuestion[letter]}
                        </label>`
                    );
                }
            }
            output.push(
                `<div class="question">${currentQuestion.question}</div>
                <div class="answers">${answers.join('')}</div>`
            );
        });
        quiz.innerHTML = output.join('');
    }

    function showResults() {
        const answerContainers = quiz.querySelectorAll('.answers');
        let numCorrect = 0;

        quizData.forEach((currentQuestion, questionNumber) => {
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            if (userAnswer === currentQuestion.correct) {
                numCorrect++;
                answerContainers[questionNumber].style.color = 'lightgreen';
            } else {
                answerContainers[questionNumber].style.color = 'red';
            }
        });

        resultsContainer.innerHTML = `${numCorrect} out of ${quizData.length}`;
    }

    buildQuiz();

    submitButton.addEventListener('click', showResults);
});