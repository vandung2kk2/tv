window.onload = function(){
	alert("OK");
	var inp = document.getElementById("inputer"),
		ids = document.getElementsByClassName("id");
	var submit = document.getElementById("submit"),
		focus = document.getElementById("ids");
	focus.onclick = function(){
		inp.focus();
	}
	inp.value = "";
	last = 0;
	inp.addEventListener("input", function(){
		let idx=inp.value.length-1;
		if(idx < last){
			ids[last].innerText = "";
		};
		if(idx < 8 && idx >= 0){
			ids[idx].innerText = inp.value[idx];
		}
		last = idx;
	})
	inp.onkeydown = function(k){
		if(k.key == "Enter") submit.click();
		alert("...");
	}
	submit.addEventListener("click",check);
	let clicked = false;
	var url="https://script.google.com/macros/s/AKfycbyYiS6Bne444MQ3-Q9n4K2eM8nQCsi-OdSm0xMQ5XI5OvcH_2eBuXIVVg/exec?id=";
	function check(){
		if(!clicked){
			clicked = true;
			focus.classList.remove("wrong");
			submit.classList.add("clicked");
			submit.innerText = "Processing...";
			let resquest = new XMLHttpRequest();
			resquest.open("GET",url + inp.value.slice(0,8));
			resquest.onreadystatechange = function(){
				if(this.readyState == 4){
					console.log(this.responseText);
					if(this.responseText == "false") focus.classList.add("wrong");
					reset();
					submit.classList.remove("clicked");
					submit.innerText = "Confirm";
					clicked = false;
				}
			}
			resquest.send()
		}
	}
	function reset(){
		for(let i=0; i<8; i++){
			ids[i].innerText = "";
			inp.value="";
			last = 0;
		}
	}
}