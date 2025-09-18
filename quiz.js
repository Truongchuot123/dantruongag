document.addEventListener('DOMContentLoaded', () => {
  // Lấy tên file của trang hiện tại
  const currentPage = window.location.pathname.split('/').pop();

  // Nếu trang hiện tại là 'benhhoc.html', thì dừng lại và không làm gì cả
  if (currentPage === 'benhhoc.html') {
    console.log('Script luyện tập không chạy trên trang benhhoc.html.');
    return; 
  }

  // --- Inject CSS ---
  const style = document.createElement("style");
  style.textContent = `
    .text-gradient {
      background-image: linear-gradient(45deg, #a855f7, #6366f1);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    #quiz-control, #quiz-container, #results-container {
      margin-top: 1rem; /* giảm khoảng cách trên */
    }
    #quiz-container > p {
      font-size: 1.75rem; /* to hơn */
      font-weight: 800;
      text-align: center;
      margin-bottom: 1rem;
      background: linear-gradient(90deg, #a855f7, #6366f1);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-shadow: 2px 2px 6px rgba(0,0,0,0.4);
      letter-spacing: 2px;
      animation: fadeIn 0.8s ease-in-out;
    }

    .quiz-card {
      background-color: #2d3748;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 10px 15px rgba(0, 0, 0, 0.1);
    }
    .quiz-btn {
      background-image: linear-gradient(45deg, #a855f7, #6366f1);
      color: white;
      padding: 12px 24px;
      border-radius: 9999px;
      transition: all 0.2s ease-in-out;
      cursor: pointer;
      font-weight: 500;
    }
    .quiz-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 14px rgba(99, 102, 241, 0.4);
    }
    .quiz-btn:active {
      transform: translateY(0);
    }
    #quiz-container {
      animation: fadeIn 0.5s ease-in-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);

  // --- Inject Practice Section HTML ---
  const practiceSection = document.createElement("div");
  practiceSection.className = "max-w-4xl mx-auto px-4 pt-4 pb-6";

  practiceSection.innerHTML = `
    <div id="quiz-control" class="flex flex-col items-center space-y-4">
      <button id="start-btn" class="quiz-btn">Bắt đầu luyện tập</button>
      <p id="status-message" class="text-lg text-gray-400 hidden"></p>
    </div>
    
    <div id="quiz-container" class="mt-8 hidden">
      <p class="text-xl font-semibold text-center mb-4 text-gray-200">LUYỆN TẬP</p>
      
      <div id="progress-bar-container" class="w-full bg-gray-700 rounded-full h-4 mb-6 relative">
        <div id="progress-bar-fill" class="h-4 rounded-full transition-width duration-500 ease-in-out bg-gradient-to-r from-purple-500 to-indigo-500" style="width: 0%;"></div>
        <div id="progress-text" class="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-200">0/0</div>
      </div>
      
      <div id="question-card" class="quiz-card p-8 md:p-12">
        <p id="question-text" class="text-xl font-semibold mb-6"></p>
        <div class="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <button id="show-answer-btn" class="quiz-btn flex-1">Hiển thị đáp án</button>
          <button id="next-btn" class="quiz-btn hidden flex-1">Câu hỏi tiếp theo</button>
        </div>
        <div id="answer-box" class="mt-6 p-4 rounded-lg bg-gray-700 hidden">
          <p class="text-sm text-gray-400">Đáp án:</p>
          <p id="answer-text" class="text-lg font-medium mt-1 text-purple-300"></p>
        </div>
      </div>
    </div>
    
    <div id="results-container" class="mt-8 text-center hidden">
      <p id="score-text" class="text-3xl font-bold text-gradient mb-4"></p>
      <button id="restart-btn" class="quiz-btn">Làm lại</button>
    </div>
  `;
  const cardContainer = document.getElementById("card-container");
  document.body.insertBefore(practiceSection, cardContainer);


  // --- Quiz Logic ---
  const subjectName = document.title.split('-')[0].trim();
  const lessonName = document.getElementById('subject-title').innerText.trim();
  
  const startBtn = document.getElementById('start-btn');
  const quizControl = document.getElementById('quiz-control');
  const quizContainer = document.getElementById('quiz-container');
  const questionText = document.getElementById('question-text');
  const showAnswerBtn = document.getElementById('show-answer-btn');
  const nextBtn = document.getElementById('next-btn');
  const resultsContainer = document.getElementById('results-container');
  const statusMessage = document.getElementById('status-message');
  const restartBtn = document.getElementById('restart-btn');
  const answerBox = document.getElementById('answer-box');
  const answerText = document.getElementById('answer-text');
  
  const progressBarContainer = document.getElementById('progress-bar-container');
  const progressBarFill = document.getElementById('progress-bar-fill');
  const progressText = document.getElementById('progress-text');

  let currentQuestionIndex = 0;
  let questions = [];

  // Hàm trộn mảng sử dụng thuật toán Fisher-Yates shuffle
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  const scriptUrl = 'https://script.google.com/macros/s/AKfycbwzjWbidENkl-aCiymK83RQ-P_RyDazUQoAsvzVjp46mJabF-JHvZalU2zocG-h85ed/exec';
  
  async function fetchQuestionsFromGoogleSheet() {
    statusMessage.textContent = 'Đang tải câu hỏi...';
    statusMessage.classList.remove('hidden');

    try {
      const response = await fetch(scriptUrl);
      const data = await response.json();
      
      if (data.error) throw new Error(data.error);
      
      // Chuyển đổi tên môn học và tên bài học về chữ thường để so sánh không phân biệt chữ hoa chữ thường
      const lowerCaseSubject = subjectName.toLowerCase();
      const lowerCaseLesson = lessonName.toLowerCase();
      
      // Lọc dữ liệu dựa trên 'Môn học' và 'Tên bài' sau khi đã chuyển đổi
      questions = data.filter(q => 
        q.subject.toLowerCase() === lowerCaseSubject && 
        q.topic.toLowerCase() === lowerCaseLesson
      );

      // Trộn mảng câu hỏi sau khi lọc
      shuffleArray(questions);

      if (questions.length === 0) {
        statusMessage.textContent = `Chưa có câu hỏi để luyện tập cho bài '${lessonName}'.`;
        return;
      }
      
      statusMessage.classList.add('hidden');
      startQuiz();

    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
      statusMessage.textContent = 'Không thể tải câu hỏi. Vui lòng kiểm tra lại Google Sheet hoặc URL.';
    }
  }

  function startQuiz() {
    quizControl.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    progressBarContainer.classList.remove('hidden');
    currentQuestionIndex = 0;
    displayQuestion();
  }

  function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    
    // Thay thế các ký tự xuống dòng (\n) bằng thẻ <br> cho câu hỏi và đáp án
    const formattedQuestion = currentQuestion.question.replace(/\n/g, '<br>');
    const formattedAnswer = currentQuestion.answer.replace(/\n/g, '<br>');
    
    questionText.innerHTML = `Câu hỏi ${currentQuestionIndex + 1}: ${formattedQuestion}`;
    answerText.innerHTML = formattedAnswer;
    
    // Cập nhật thanh tiến độ
    const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBarFill.style.width = `${progressPercentage}%`;
    progressText.textContent = `${currentQuestionIndex + 1} / ${questions.length}`;

    answerBox.classList.add('hidden');
    showAnswerBtn.classList.remove('hidden');
    nextBtn.classList.add('hidden');
  }

  showAnswerBtn.addEventListener('click', () => {
    showAnswerBtn.classList.add('hidden');
    answerBox.classList.remove('hidden');
    nextBtn.classList.remove('hidden');
  });

  nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      displayQuestion();
    } else {
      showResults();
    }
  });

  function showResults() {
    quizContainer.classList.add('hidden');
    resultsContainer.classList.remove('hidden');
    document.getElementById('score-text').textContent = `CHÚC MỪNG BẠN ĐÃ HOÀN THÀNH BÀI HỌC! CHÚC BẠN HỌC TỐT`;
    progressBarContainer.classList.add('hidden');
  }

  function restartQuiz() {
    resultsContainer.classList.add('hidden');
    quizControl.classList.remove('hidden');
    statusMessage.classList.add('hidden');
    currentQuestionIndex = 0;
    progressBarContainer.classList.add('hidden');
  }

  startBtn.addEventListener('click', fetchQuestionsFromGoogleSheet);
  restartBtn.addEventListener('click', restartQuiz);
});