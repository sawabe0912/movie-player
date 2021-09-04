const video = document.querySelector("video");
const progressRange = document.querySelector(".progress-range");
const progressBar = document.querySelector(".progress-bar");
const playBtn = document.getElementById("play-btn");
const volumeIcon = document.getElementById("volume-icon");
const volumeRange = document.querySelector(".volume-range");
const volumeBar = document.querySelector(".volume-bar");
const currentTime = document.querySelector(".time-elapsed");
const duration = document.querySelector(".time-duration");
const speed = document.querySelector('.player-speed');
const player = document.getElementById("player");
let lastVolume = 1;

//Play & Pause

function showPlayIcon(){
	playBtn.classList.replace("fa-pause", "fa-play");
	playBtn.setAttribute("title", "Play");
}

function togglePlay(){
	if(video.paused){
		video.play();
		playBtn.classList.replace("fa-play", "fa-pause");
		playBtn.setAttribute("title", "Pause");
	}else{
		video.pause();
		showPlayIcon();
	}
}

//calculate display time 
function displayTime(time){
    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    seconds = seconds > 9 ? seconds : `0${seconds}`
    return `${minutes}:${seconds}`;
}
//update progress bar as video play
function updateProgress(){
	progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
	currentTime.textContent = `${displayTime(video.currentTime)} /`;
	duration.textContent = `${displayTime(video.duration)}`;
}

//volume Controls
function changeVolume(e){
    let volume = e.offsetX / volumeRange.offsetWidth;
    if(volume < 0.1){
    	volume = 0;
    }
    if(volume > 0.9){
        volume = 1;
    }
    volumeBar.style.width = `${volume * 100}%`;
    video.volume = volume;
    //change icondepending on volume
    volumeIcon.className = "";
    if(volume > 0.7){
    	volumeIcon.classList.add("fas", "fa-volume-up");
    }else if(volume < 0.7 && volume > 0){
        volumeIcon.classList.add("fas", "fa-volume-down");
    }else if(volume === 0){
    	volumeIcon.classList.add("fas", "fa-volume-off");
    }
    lstVolume = volume;
}

//click to seek whithin the video
function setProgress(e){
	const newTime = e.offsetX / progressRange.offsetWidth;
	progressBar.style.width = `${newTime * 100}%`;
	video.currentTime = newTime * video.duration;
	console.log(newTime);
}

//change to mute or unmute

function muteToggle(){
	volumeIcon.className = "";
	if(video.volume){
        lastVolume = video.volume;
        video.volume = 0;
        volumeBar.style.width = 0;
        volumeIcon.classList.add("fas", "fa-volume-mute");
        volumeIcon.setAttribute("title", "Unmute");
	}else{
		video.volume = lastVolume;
        volumeIcon.classList.add('fas', 'fa-volume-up');
        volumeIcon.setAttribute('title', 'Mute');
        volumeBar.style.width = `${lastVolume * 100}%`;
	}
	
}


function changeSpeed() {
  video.playbackRate = speed.value;
}

video.addEventListener("ended", showPlayIcon);

//EventListeners
speed.addEventListener('change', changeSpeed);
playBtn.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
video.addEventListener("timeupdate", updateProgress);
video.addEventListener("canplay", updateProgress);
progressRange.addEventListener("click", setProgress);
volumeRange.addEventListener("click", changeVolume);
volumeIcon.addEventListener("click", muteToggle);
