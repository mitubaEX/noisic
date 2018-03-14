var video_array = [];
var title_array = [];
var pauseFlag = false;
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Replace the 'ytplayer' element with an <iframe> and
// YouTube player after the API code downloads.
var player;
function onYouTubePlayerAPIReady() {
  player = new YT.Player('ytplayer', {
    height: '200',
    width: '200',
    videoId: '',
    playerVars: {
      'autoplay': 1,
      'controls': 0,
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  event.target.playVideo();
}
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING) {
    event.target.playVideo();
  } else if(player.getPlayerState() == -1) {
    if(title_array.length != 0){
      document.getElementById('text').innerHTML = title_array[player.getPlaylistIndex()];
    }
    event.target.playVideo();
    document.getElementById('play').className = 'glyphicon glyphicon-pause';
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
  var category = $('input[name=kind]:checked').val() === 'all' ? '' : '&videoCategoryId=10';
  const request = new XMLHttpRequest();
  request.open('GET', 'https://www.googleapis.com/youtube/v3/search?order=viewCount&videoLicense=youtube&part=snippet&key=AIzaSyBVp6gygj55T-J5_PZLawRsOQiqUW_Gn8s&safeSearch=moderate&videoEmbeddable=true&type=video' + category + '&maxResults=40&q=' + document.getElementById('search_form').value);
  request.addEventListener("load", (event) => {
    // console.log(event.target.status); // => 200
    // console.log(event.target.responseText); // => "{...}"
    video_array = JSON.parse(event.target.responseText).items.map((n) => n.id.videoId);
    title_array = JSON.parse(event.target.responseText).items.map((n) => n.snippet.title);
    player.cuePlaylist({playlist: video_array});
  });
  request.send();
}

function nextVideo() {
  if(player.getPlaylistIndex() != video_array.length - 1) {
    player.nextVideo();
  }
}

function previousVideo() {
  if(player.getPlaylistIndex() != 0) {
    player.previousVideo();
  }
}
