import './style.css'

document.querySelector('#app').innerHTML = `
  <div class="container">
    <h1 class="title">PING PONG GAME</h1>
    <div class="game-area">
      <button id="pingButton" class="ping-btn">PING</button>
      <div id="message" class="message"></div>
    </div>
    <div id="portWarning" class="warning hidden"></div>
  </div>
`

const pingButton = document.querySelector('#pingButton')
const messageDiv = document.querySelector('#message')

pingButton.addEventListener('click', () => {
  messageDiv.textContent = 'PONG SARITA RODRIGUEZ!'
  messageDiv.classList.add('active')
  
  setTimeout(() => {
    messageDiv.textContent = ''
    messageDiv.classList.remove('active')
  }, 1000)
})

const portWarning = document.querySelector('#portWarning')
const currentPort = window.location.port || '80'
const expectedPort = '5173'

if (currentPort !== expectedPort) {
  portWarning.textContent = `⚠️ URL INCORRECTA: Puerto actual ${currentPort} (debería ser ${expectedPort})`
  portWarning.classList.remove('hidden')
}