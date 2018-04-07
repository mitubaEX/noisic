var video_array = [];
var title_array = [];
var pauseFlag = false;
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var video_index = 0;

// Replace the 'ytplayer' element with an <iframe> and
// YouTube player after the API code downloads.
var player;
function onYouTubePlayerAPIReady() {
  player = new YT.Player('ytplayer', {
    height: '1',
    width: '1',
    videoId: '',
    playerVars: {
      'autoplay': 1,
      'controls': 0,
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange,
      'onError': onPlayerError
    }
  });
}

function onPlayerReady(event) {
  player.setPlaybackQuality('small');
  event.target.playVideo();
}

var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING) {
    if(title_array.length !== 0){
      document.getElementById('text').innerHTML = title_array[video_index];
    } else {
      document.getElementById('text').innerHTML = 'No Video';
    }
  } else if(player.getPlayerState() === -1) {
    player.playVideo();
    document.getElementById('play').className = 'glyphicon glyphicon-pause';

    // 再生できない動画を飛ばす
    setTimeout(() => {
      if(player.getPlayerState() === -1){
        nextVideo();
      }
    }, 1000);
  } else if(player.getPlayerState() === 5){
    player.playVideo();
  } else if (player.getPlayerState() === 0){
    nextVideo();
  }
}

function stopVideo() {
  player.stopVideo();
}

function pauseVideo() {
  player.pauseVideo();
}

function pause(){
  pauseFlag = pauseFlag ? false : true;
  if(pauseFlag) {
    pauseVideo();
    document.getElementById('play').className = 'glyphicon glyphicon-play';
  } else {
    player.playVideo();
    document.getElementById('play').className = 'glyphicon glyphicon-pause';
  }
}

function search() {
  const request = new XMLHttpRequest();
  request.open('GET', 'https://www.googleapis.com/youtube/v3/search?order=viewCount&videoLicense=youtube&part=snippet&key=AIzaSyBVp6gygj55T-J5_PZLawRsOQiqUW_Gn8s&safeSearch=moderate&videoEmbeddable=true&type=video&maxResults=40&q=' + document.getElementById('search_form').value);
  request.addEventListener("load", (event) => {
    video_array = JSON.parse(event.target.responseText).items.map((n) => n.id.videoId);
    title_array = JSON.parse(event.target.responseText).items.map((n) => n.snippet.title);
    video_index = 0;
    player.loadVideoById({videoId: video_array[video_index]});
  });
  request.send();
}

function nextVideo() {
  if(video_index !== video_array.length - 1) {
    video_index += 1;
    player.loadVideoById(video_array[video_index]);
  }
}

function previousVideo() {
  if(video_index !== 0) {
    video_index -= 1;
    player.loadVideoById(video_array[video_index]);
  }
}

function enter(){
  //EnterキーならSubmit
  if(window.event.keyCode===13){
    search();
  }
}

function onPlayerError(event){
  console.log(event)
}
