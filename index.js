const container = document.querySelector('.container')
const title = document.querySelector('.title')
const progress = document.querySelector('.progress-container')
const proBar = document.querySelector('.progress-percent')
const image = document.querySelector('.img')
const audio = document.querySelector('.audio')
const prev = document.querySelector('.prev')
const next = document.querySelector('.next')
const play  = document.querySelector('.play')

const songs = ['2002', 'bad-guy', 'lovely']
const imgs = ['img1', 'img2', 'img3']
let index = 0
const loadSong = (song, img) => {
  title.textContent = `${song}`
  audio.src = `./playlist/${song}.mp3`
  image.src =  `./images/${img}.jpg` 
}
loadSong(songs[index], imgs[index])

const playSong = () => {
  container.classList.add('start')
  play.querySelector('.fas').classList.remove('fa-play')
  play.querySelector('.fas').classList.add('fa-pause')
  audio.play()
}

const pauseSong = () => {
   container.classList.remove('start')
  play.querySelector('.fas').classList.remove('fa-pause')
  play.querySelector('.fas').classList.add('fa-play')
  audio.pause()
}
const updateProgress= (e) => {
  // const current = e.srcElement.currentTime
  // const du
   const {currentTime, duration} = e.srcElement
   const percent = (currentTime/ duration)* 100;
   proBar.style.width = `${percent}%`
  
}

const nextSong = () => {
  index++
  if(index > songs.length-1){
     index = 0
  }
    loadSong(songs[index], imgs[index])
   audio.play()
  
}
const prevSong = () => {
  index--
  if(index < 0){
    index = songs.length -1
  }
  loadSong(songs[index], imgs[index])
  audio.play()
  
}
const setProgress = (e) => {
  const width = progress.clientWidth
  const position = e.offsetX
  const duration = audio.duration

 audio.currentTime = (position/width) * duration
}

play.addEventListener('click', () => {
  const isOnPlay = container.classList.contains('start')
  if(isOnPlay){
   return  pauseSong()
  }else{
    return playSong()
  }
})

audio.addEventListener('timeupdate', (e) => {
  updateProgress(e)
})


next.addEventListener('click', nextSong)
prev.addEventListener('click', prevSong)
audio.addEventListener('ended', nextSong)

progress.addEventListener('click', setProgress)