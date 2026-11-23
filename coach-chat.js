const startButton = document.querySelector('#start-coach');
const transcript = document.querySelector('#coach-chat');
const form = document.querySelector('#coach-form');
const reply = document.querySelector('#coach-reply');
const questions = [
  'What experience do you have coaching soccer? If you’re new to coaching, tell me about your playing or mentoring experience.',
  'What ages or skill levels would you like to coach, and are you interested in individual sessions, group sessions, or both?',
];
let questionIndex = 0;

function addMessage(speaker, message) {
  const entry = document.createElement('li');
  const name = document.createElement('strong');
  entry.dataset.speaker = speaker;
  name.textContent = speaker;
  entry.append(name, document.createTextNode(' — ' + message));
  transcript.append(entry);
  return entry;
}

startButton.addEventListener('click', () => {
  questionIndex = 0;
  transcript.replaceChildren();
  transcript.hidden = false;
  form.hidden = false;
  startButton.hidden = true;
  addMessage('Train Direct', questions[questionIndex]);
  reply.focus();
});

reply.addEventListener('input', () => reply.setCustomValidity(''));

form.addEventListener('submit', event => {
  event.preventDefault();
  const answer = reply.value.trim();
  if (!answer) {
    reply.setCustomValidity('Enter an answer to continue.');
    reply.reportValidity();
    return;
  }

  addMessage('You', answer);
  form.reset();
  questionIndex += 1;

  if (questionIndex < questions.length) {
    addMessage('Train Direct', questions[questionIndex]);
    reply.focus();
    return;
  }

  const closing = addMessage('Train Direct', 'Thanks for sharing your background! You’ve finished this practice intake. Your answers stay in this chat and aren’t sent to a recruiter.');
  closing.tabIndex = -1;
  form.hidden = true;
  startButton.textContent = 'Start over';
  startButton.hidden = false;
  closing.focus();
});
