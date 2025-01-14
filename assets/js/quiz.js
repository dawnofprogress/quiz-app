document.addEventListener('DOMContentLoaded', () => {
    let currentQuestion = 0;
    let score = 0;
    let timer;

    // DOM Elements
    const startScreen = document.getElementById('start-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const resultsScreen = document.getElementById('results-screen');
    const questionNumber = document.getElementById('question-number');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const nextButton = document.getElementById('next-btn');
    const timerDisplay = document.getElementById('timer');
    const scoreDisplay = document.getElementById('score');

    // Event Listeners
    document.getElementById('start-btn').addEventListener('click', startQuiz);
    nextButton.addEventListener('click', nextQuestion);
    document.getElementById('restart-btn').addEventListener('click', restartQuiz);

    function startQuiz() {
        currentQuestion = 0;
        score = 0;
        startScreen.classList.add('hidden');
        quizScreen.classList.remove('hidden');
        loadQuestion();
    }

    function loadQuestion() {
        const question = questions[currentQuestion];
        questionNumber.textContent = `Question ${currentQuestion + 1}/${questions.length}`;
        questionText.textContent = question.question;
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.classList.add('option');
            button.textContent = option;
            button.addEventListener('click', () => checkAnswer(index));
            optionsContainer.appendChild(button);
        });

        nextButton.classList.add('hidden');
        startTimer();
    }

    function startTimer() {
        let timeLeft = 30;
        timerDisplay.textContent = `Time: ${timeLeft}s`;
        
        clearInterval(timer);
        timer = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = `Time: ${timeLeft}s`;
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                checkAnswer(-1);
            }
        }, 1000);
    }

    function checkAnswer(selectedIndex) {
        clearInterval(timer);
        const question = questions[currentQuestion];
        const options = optionsContainer.children;

        Array.from(options).forEach(option => {
            option.style.pointerEvents = 'none';
        });

        if (selectedIndex === question.correct) {
            options[selectedIndex].classList.add('correct');
            score += 10;
        } else {
            if (selectedIndex !== -1) {
                options[selectedIndex].classList.add('wrong');
            }
            options[question.correct].classList.add('correct');
        }

        nextButton.classList.remove('hidden');
    }

    function nextQuestion() {
        currentQuestion++;
        
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }

    function showResults() {
        quizScreen.classList.add('hidden');
        resultsScreen.classList.remove('hidden');
        scoreDisplay.textContent = score;
    }

    function restartQuiz() {
        resultsScreen.classList.add('hidden');
        questions.sort(() => Math.random() - 0.5);
        startQuiz();
    }
});