var App = {
	numbers: [],
	speech: null,
	speechLang: 'en',
	onInit(){
		let el;
		let cont = ``;
		let start = 1;
		let end = 16;
		let num = 1;
		// BINGO banner
		for(col = 1; col < 6; col++){
			el = document.getElementById(`col${col}`);
			cont = `<ul class="numbers">`;
			for(let i=start; i<end; i++){
				cont += `<li id="num_${i}">${i}</li>`;
				// feed numbers
				this.numbers.push(num);
				num++;
			}
			// adding the tag close
			cont += `</ul>`;

			// content assignment
			el.innerHTML = cont;
			
			// update start + end
			start += 15;
			end += 15;
		}
		// set speech
		this.setSpeech();
	},

	play(){
		// generate a number then check it isn't already registered
		let x = this.getNumber();

		// selected element must be marked as with its correspondent classname
		let el = document.querySelector(`#num_${x}`);
		el.classList.add('selected');

		// say the number
		this.sayNumber(x);

		// check if it's the end
		this.checkEndOfGame();
	},

	getNumber(){
		// get a random element from the array of numbers
		let index = Math.floor(Math.random() * this.numbers.length);
		let n = this.numbers[index];

		// remove the selected element
		this.numbers.splice(index, 1);
		return n;
	},

	sayNumber(num){
		let letter;
		if(num>0 && num <=15){
			letter = 'B';
		}
		else if(num>15 && num <=30){
			letter = 'I';
		}
		else if(num>30 && num <=45){
			letter = 'N';
		}
		else if(num>45 && num <=60){
			letter = 'G';
		}
		else{
			letter = 'O';
		}
		// say it twice
		this.speech.text = `${letter} ${num}... ${letter} ${num}`;

		// start speaking
		window.speechSynthesis.speak(this.speech);
		Vapp.dialog({
			title: 'BingOscar',
			message: `Picked number is: <b>${letter} ${num}</b>`,
		});
	},

	setSpeech(){
		// a new SpeechSynthesisUtterance instance
		this.speech = new SpeechSynthesisUtterance();

		// set speech language
		this.speech.lang = this.speechLang;
	},

	checkEndOfGame(){
		console.log(this.numbers.length);
		if(this.numbers.length == 0){
			// show the banner
			this.showBanner();

			// remove button
			document.getElementById('btn-play').remove();
		}
	},

	showBanner(){
		document.getElementById('banner').classList.add('active');
	},

	playAgain(){
		// just a simple reload!
		window.location.reload();
	}
};

// dialogs
const Vapp = Vue.createApp({
	components:{
		'oa-dialogs': OA_Dialogs
	},
	methods: {
		dialog(obj){
			this.$refs.dialogs.show(obj);
		}
	}
}).mount('#app');

App.onInit();