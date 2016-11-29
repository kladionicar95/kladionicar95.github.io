document.addEventListener("DOMContentLoaded", function() {

	document.getElementById("vstavi-sobo").addEventListener("submit", novaSoba);
	document.getElementById("izracunBtn").addEventListener("click", izracunPanelov);
	document.getElementById("toggle").addEventListener("click", toggleMenu);
	document.getElementById("uplImg").addEventListener("change", naloziSliko);
	window.addEventListener("resize", toggleOnResize, true);
	document.getElementById("saveImgButton").addEventListener("click", shraniWebcam);
	document.getElementById("camOnButton").addEventListener("click",odpriWebcam);

	okrajsavaTexta();

	$("#merilo")
	.resizable({containment: 'parent',handles: "se",stop:resizeStop,resize: function(event, ui) {
		        ui.size.height = ui.originalSize.height;
		    }})
	.draggable({containment: 'parent', stop:dragStop})


	function okrajsavaTexta() {
    	if(document.documentElement.clientWidth>600){
			document.getElementById("st-sten-text").innerHTML = "Število zunanjih sten:";
		}
		else{
			document.getElementById("st-sten-text").innerHTML = "Št. zunanjih sten:";
		}
	}

	function novaSoba(e){
 		var stKvadratov=1;
    	while(document.getElementById('kvadrat'+stKvadratov)){
    		stKvadratov+=1;
    	}
 		var vpisMerila = document.getElementById('meritev').value;
 		var dolzinaDoc = document.getElementById("tloris-div").offsetWidth
 		var dolzinaMerila = document.getElementById("merilo").offsetWidth
 		var pixNaMet =  dolzinaMerila/ vpisMerila;
 		var id = this.id;   	
        e.preventDefault();  //prevent form from submitting
        var data = $("#"+id+" :input").serializeArray();
        console.log(data); //use the console for debugging, F12 in Chrome, not alerts
        console.log(data[0].value);
		var wd = data[1].value;
		var ht = data[2].value;	
		var stene = data[3].value;		
		var namembnost = data[4].value;	
		var div=document.createElement("div");
	    div.setAttribute("id","kvadrat"+stKvadratov);
	    div.setAttribute("class","kvadrat");
	    div.setAttribute("imeSobe",data[0].value);
	    div.setAttribute("visina",ht);
	   	div.setAttribute("sirina",wd);
	   	div.setAttribute("stevilo_sten",stene);
	   	div.setAttribute("namembnost",namembnost);
	   	div.style.position ="absolute";
	    div.style.width =wd*pixNaMet+"px";
	    div.style.height =ht*pixNaMet+"px";
	    div.style.top =20+"px";
		div.style.left =20+"px";
	    div.innerHTML = div.innerHTML + data[0].value;
	   	$('#tloris-div').append(div);
	   	convert_to_percentageKvadrat($('#kvadrat'+stKvadratov));
	   	document.getElementById('kvadrat'+stKvadratov).addEventListener('mousedown', getSobaData, false);
	   	$('#kvadrat'+stKvadratov).draggable({containment: 'parent', stop:dragStopKvadrat});
	}

	function getSobaData(el){
	    document.getElementById('imeSobe').value = document.getElementById(this.id).getAttribute("imeSobe");
	    document.getElementById('merax1').value = document.getElementById(this.id).getAttribute("sirina");
	    document.getElementById('meray1').value = document.getElementById(this.id).getAttribute("visina");
	    document.getElementById('ststen1').value = document.getElementById(this.id).getAttribute("stevilo_sten");
	   	document.getElementById('namembnost1').value = document.getElementById(this.id).getAttribute("namembnost");
	}

  	function izracunPanelov(e){
    	var vpisMerila = document.getElementById('meritev').value;
 		var dolzinaMerila = document.getElementById("merilo").offsetWidth
 		var pixNaMet =  dolzinaMerila/ vpisMerila;
 		var st = 1;
 		var wd = 0.8; var ht = 1.2;
    	while(document.getElementById('kvadrat'+st)){
			var div=document.createElement("div");
		    div.setAttribute("id","panel"+st);
		    div.setAttribute("class","panel");
		    div.style.width =wd*pixNaMet+"px";
		    div.style.height =ht*pixNaMet+"px";
		    div.style.top =($('#kvadrat'+st).height()- ht*pixNaMet)/2.0+"px";
		    div.style.left =($('#kvadrat'+st).width()- wd*pixNaMet)/2.0+"px";		    
		    div.style.position ="absolute";
		    div.innerHTML = div.innerHTML + "700W";
		   	$('#kvadrat'+st).append(div);
		   	convert_to_percentagePanel($('#panel'+st));
		   	$('#panel'+st).draggable({containment: 'parent', stop:dragStopPanel});
		   	st++;
    	}
	}  

	function toggleMenu(e){
		var elem = document.getElementById("sobeDiv");
		console.log(parseInt(getComputedStyle(elem).getPropertyValue("margin-left")));
		if (parseInt(getComputedStyle(elem).getPropertyValue("margin-left"))==0){
			document.getElementById("sobeDiv").style.marginLeft=-160 +"px";
		}
		else{
			document.getElementById("sobeDiv").style.marginLeft=0+"px";
		}
	}

	function naloziSliko(e){
	    for (var i = 0; i < e.srcElement.files.length; i++) {
	        
	        var file = e.srcElement.files[i];

	        var reader = new FileReader();
	        reader.onloadend = function() {
	             document.getElementById('tloris-hidden').src=reader.result;
	             document.getElementById('tloris-div').style.backgroundImage='url('+reader.result+')';	             
	             //console.log(reader.result);
	        }
	        reader.readAsDataURL(file);
	    }		
	}

	function resizeStop(event, ui){
	    convert_to_percentage($(this));
	}

	function dragStop(event, ui){
	    convert_to_percentage($(this));
	}

	function convert_to_percentage(el){
	    var parent = el.parent();
	    console.log(parseInt(el.css('left')),parent.width());
	    el.css({
	        left:parseInt(el.css('left'))/(parent.width()-0.0)*100.0+"%",
	        top: parseInt(el.css('top'))/(parent.height()-0.0)*100.0+"%",
	        width: (el.width()+6)/(parent.width())*100.0+"%",
	        height: (el.height())/(parent.height()+0.0)*100.0+"%"
	    });
	}

	function dragStopKvadrat(event, ui){
	    convert_to_percentageKvadrat($(this));
	}
	function dragStopPanel(event, ui){
	    convert_to_percentagePanel($(this));
	}
	function convert_to_percentageKvadrat(el){
	    var parent = el.parent();
	    console.log(parseInt(el.css('left')),parent.width());
	    el.css({
	        left:parseInt(el.css('left'))/(parent.width()-0.0)*100.0+"%",
	        top: (parseInt(el.css('top'))+1)/(parent.height()-0.0)*100.0+"%",
	        width: (el.width()+4)/(parent.width())*100.0+"%",
	        height: (el.height()+4)/(parent.height()+0.0)*100.0+"%"
	    });
	}

	function convert_to_percentagePanel(el){
	    var parent = el.parent();
	    console.log(parseInt(el.css('left')),parent.width());
	    el.css({
	        left:parseInt(el.css('left'))/(parent.width()-0.0)*100.0+"%",
	        top: (parseInt(el.css('top'))+1)/(parent.height()-0.0)*100.0+"%",
	        width: (el.width()+4)/(parent.width())*100.0+"%",
	        height: (el.height()+4)/(parent.height()+0.0)*100.0+"%"
	    });
	}

	 function odpriWebcam(){

	 	var vidObj = document.getElementById("videoEle");

		errCallBack = function(error) {	// Video Error Handler 	
		console.log("Video  error: ", error.code); 
		};
		
		if(navigator.getUserMedia) { // Standard
				navigator.getUserMedia({"video": true }, function(stream) {
					vidObj.src = stream;
					vidObj.play();
				}, errCallBack);
		} else if(navigator.webkitGetUserMedia) { // For  Chrome
			/*
			console.log("a");
				document.getElementById("videoDiv").style.visibility="visible";
				var video = document.querySelector('video');
				navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
				navigator.oGetUserMedia;
				navigator.getUserMedia({video:true},handleVideo, videoError);
			*/
			alert("Video zajem ni podprt v tem brskalniku.")

		}
		else if(navigator.mozGetUserMedia) { // For Firefox
				console.log("b");
				document.getElementById("videoDiv").style.visibility="visible";
				navigator.mozGetUserMedia({ "video": true }, function(stream){
				vidObj.src = window.URL.createObjectURL(stream);
				vidObj.play();
			}, errCallBack);
		}
		else{
			alert("Video zajem ni podprt v tem brskalniku.")
		}
		function handleVideo(streamVid) {
		    window.stream = streamVid;
		    video.src = URL.createObjectURL(streamVid);
		    video.play();		
		}
		function videoError(e) {
		    document.write("can't use the webcam");
		}

	}


	function toggleOnResize(){
	    if (document.documentElement.clientWidth > 600) {
			document.getElementById("sobeDiv").style.marginLeft=0+"px";
			document.getElementById("toggleDivId").style.width=0+"px";
			document.getElementById("st-sten-text").innerHTML = "Število zunanjih sten:";
	    }
	    else {
			document.getElementById("sobeDiv").style.marginLeft=-160+"px";
			document.getElementById("toggleDivId").style.width=3+"rem";		
			document.getElementById("st-sten-text").innerHTML = "Št. zunanjih sten:";

	    }
	}

	function shraniWebcam(){
		var canvas = document.getElementById("c");
		var video = document.getElementById("videoEle");
		canvas.getContext("2d").drawImage(video, 0, 0, 1280, 960);
		var img = canvas.toDataURL("image/png");
		document.getElementById('tloris-hidden').src=img;
        document.getElementById('tloris-div').style.backgroundImage='url('+img+')';	
		document.getElementById("videoDiv").style.visibility="hidden";
	}

	/* -----FUNKCIJE SE ZA IMPLEMENTACIJO------
    document.getElementById("obrni").addEventListener("click", function(e) {
    	var stKvadratov=1;
		var visina = document.getElementById('kvadrat1').getAttribute("visina");
		var sirina = document.getElementById('kvadrat1').getAttribute("sirina");
		document.getElementById('kvadrat1').style.width
		document.getElementById('kvadrat1').setAttribute("visina",sirina);
		document.getElementById('kvadrat1').setAttribute("sirina",visina);
		var sir = document.getElementById('kvadrat1').style.width;
		var vis = document.getElementById('kvadrat1').style.height;
		console.log(vis);
		console.log(sir);
		document.getElementById('kvadrat1').style.width = vis;
		document.getElementById('kvadrat1').style.height = sir	

    });

	document.getElementById("vpisMerila").addEventListener("submit", function(e) {
			e.preventDefault();  //prevent form from submitting
	        var data1 = $("#vrednost :input").serializeArray();
	        //data1[0].value
	});
	*/
});