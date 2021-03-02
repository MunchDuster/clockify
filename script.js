var secHand = document.getElementById("secHand");
var minHand = document.getElementById("minHand");
var hrHand = document.getElementById("hrHand");
var time = document.getElementById("time");
var date = document.getElementById("date");
function ticky(){
	var realtime = new Date();
	
	date.innerText =  getDate(realtime.getMonth(),realtime.getFullYear(),realtime.getDay());
	time.innerText = getTime(realtime.getSeconds(),realtime.getMinutes(),realtime.getHours());
	secHand.style.transform = 'rotate(' + (realtime.getSeconds() * 6) +  'deg)';
	minHand.style.transform = 'rotate(' + (realtime.getMinutes() * 6) + 'deg)';
	hrHand.style.transform = 'rotate(' + (realtime.getHours() * 30) + 'deg)';
}
function getTime(seconds,minutes,hours){
	var str;
	var mins = minutes < 10 ? '0' + minutes : minutes;
	if (hours > 12) {
		str = hours - 12 + ":" + mins + " PM";
	}else{
		str = hours + ":" + mins + " AM";
	}
	
	return str;
}
function getDate(month,year,day){
	var str = day + ' ';
	const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
	str += monthNames[month] + ' ' + year;
	return str;
	}
ticky();
setInterval(ticky,1000);
	
	
//add hour Dots
const holder = document.getElementById("dotHolder");
for(var i=0;i<12;i++){
	var dotdiv = document.createElement('div');
	dotdiv.style.position = 'absolute'
	dotdiv.style.display = 'inline - block';
	dotdiv.style.width = '8px';
	dotdiv.style.height = '8px';
	dotdiv.style.backgroundColor = 'white';
	dotdiv.style.borderRadius = '1000px';
	dotdiv.style.top = "calc(50% + "+ (Math.sin((i * Math.PI) / 6) * 100 - 4) + "px)";
	dotdiv.style.right = "calc(50% + " + (Math.cos((i * Math.PI) / 6) * 100 - 4) + "px)";
	document.body.insertBefore(dotdiv,secHand);
	//add sec dots
	//add hour Dots
	for (var j = 1; j < 5; j++) {
		var ndotdiv = document.createElement("div");
		ndotdiv.style.position = "absolute";
    	ndotdiv.style.display = "inline - block";
    	ndotdiv.style.width = "4px";
    	ndotdiv.style.height = "4px";
    	ndotdiv.style.backgroundColor = "white";
    	ndotdiv.style.borderRadius = "1000px";
    	ndotdiv.style.top =
        "calc(50% + " + (Math.sin((i*30 + j*6)* Math.PI / 180) * 100 - 2) + "px)";
    	ndotdiv.style.right =
        "calc(50% + " +
        (Math.cos(((i * 30 + j * 6) * Math.PI) / 180) * 100 - 2) +
        "px)";
		holder.append(ndotdiv);
	}
}