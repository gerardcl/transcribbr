var audio = document.getElementById('sample');
var tperiod=5;
var tpointer=0;
var loops=2;
var loopcount=0;
var display = document.getElementById("display_meta");
var progrss = document.getElementById("progrss");
var isNewSource = true;

$('#setsource').click(function() {
	var text = $('#sourcelink').val();
	console.log(text);
	progrss.innerHTML = "searching file...";
	document.getElementById('sample').src = text;
	$('#page-player').fadeOut(200);
	isNewSource = true;
	tpointer = 0;
});

$(document).ready(function() {
	$('#page-player').fadeOut(0);
	$("#page-wrap").fadeOut(0);
	$("#page-wrap").fadeIn(200);
	$("#page-footer").fadeOut(0);
	$("#page-footer").fadeIn(600);
});

$('#setconfig').click(function() {
	loopcount=0;
	audio.currentTime=tpointer;
	loops=$('#audioloops').val();
	tperiod=$('#audioperiod').val();
});

audio.addEventListener('canplaythrough', function() { 
	if(isNewSource){
		audio.pause();
		$('#page-player').fadeOut(200);
		$('#page-player').fadeIn(200);
		isNewSource = false;
	}
}, false);

audio.addEventListener("progress", onProgress, false);
function onProgress() {
	var loaded = (audio.buffered.end(0) / audio.duration) * 100;
	loaded = Math.round(loaded*Math.pow(10,2))/Math.pow(10,2); 
	console.log(audio.buffered.end(0) + " / " + audio.duration + " * 100 = " + loaded);
	progrss.innerHTML = "loading... "+  loaded  +" %";	
}

audio.addEventListener("loadedmetadata", getMetadata, false);
function getMetadata() {
	var channels = audio.mozChannels;
	var rate     = audio.mozSampleRate;
	var Length = audio.duration;
	Length = Math.round(Length*Math.pow(10,2))/Math.pow(10,2);
	var sourcea = audio.src;
	display.innerHTML = "Channels: " + channels +
	"<br/>Rate: " + rate +
	"<br/>Duration: " + Length + " sec" +
	"<br/>Source: " + sourcea;
}

audio.addEventListener('timeupdate', function (){
	if((parseFloat(audio.currentTime) >= (audio.duration))||(parseFloat(audio.currentTime) >= (parseFloat(tperiod) + parseFloat(tpointer)))){
		console.log("LOOPIIING");
		loopcount++;
		if(loopcount>loops){
			console.log("adding period: "+ tperiod);
			tpointer+=tperiod;
			loopcount=0;
			audio.play();
		}
		else if(loopcount>=0){
			audio.currentTime = tpointer;
			audio.play();
		}
	}
	tpointer=parseInt(audio.currentTime/tperiod)*parseInt(tperiod);
	console.log(tpointer+"\t<\t"+audio.currentTime+"\t<\t"+(parseInt(tperiod)+parseInt(tpointer)));
}, false);

