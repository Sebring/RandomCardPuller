
function BoxPack() {
	var self = this;

	var _def_cards = {card:[
		{population:4, drawn:0, type:"legendary"}, {population:4, drawn:0, type:"legendary"}, {population:4, drawn:0, type:"legendary"}, {population:4, drawn:0, type:"legendary"}, {population:4, drawn:0, type:"legendary"}, {population:4, drawn:0, type:"legendary"}, 
		{population:8, drawn:0, type:"epic"}, {population:8, drawn:0, type:"epic"}, {population:8, drawn:0, type:"epic"}, {population:8, drawn:0, type:"epic"}, {population:8, drawn:0, type:"epic"}, {population:8, drawn:0, type:"epic"}	
	]};

	var cards = _def_cards;

	var _cards_pic = [
	"Raptor_Bird_B",
	"Night_Dragon_B",
	"Smoke_Dragon_B",
	"Fuming_Horror_B",
	"Root_Elemental_B",
	"Emperor_Frog_B",
	"Cloud_Pike_Frog_B",
	"Frog_Mage_B",
	"Branding_Metal_Construct_B",
	"Spike_Frog_B",
	"Big_And_Little_B",
	"Water_Manipulator_B"
	];

	var $content = $('#box_sim');


	function update() {
		var template = doT.template('{{~it.card :value:index}}<div class="col-xs-2 col-md-1 card"><div><div class="{{=value.type}}"><div class="pop text-center badge"><span class="d" data-drawn="{{=value.drawn}}">{{=value.drawn}}</span>/<span class="p" data-pop="{{=value.population}}">{{=value.population}}</span></div></div></div><div class="level"></div></div>{{~}}');
		var data = template(cards);
		$content.html(data);

		checkDualsAndQuads();
		addImages();
	}

	function reset() {
		cards = {card:[
			{population:4, drawn:0, type:"legendary"}, {population:4, drawn:0, type:"legendary"}, {population:4, drawn:0, type:"legendary"}, {population:4, drawn:0, type:"legendary"}, {population:4, drawn:0, type:"legendary"}, {population:4, drawn:0, type:"legendary"}, 
			{population:8, drawn:0, type:"epic"}, {population:8, drawn:0, type:"epic"}, {population:8, drawn:0, type:"epic"}, {population:8, drawn:0, type:"epic"}, {population:8, drawn:0, type:"epic"}, {population:8, drawn:0, type:"epic"}	
		]};

		update();
	}

	function addImages() {
		$content.find('.card > div').not('.level').each( function(index) {
			var $this = $(this);
			var url = 'http://cdn.rawgit.com/TheSench/SIMSpellstone/gh-pages/res/cardImages/';
			if (box_pic) {
				$this.css('background-image', 'url(' + url + box_pic[index].pic + '.jpg)');
			} else {
				$this.css('background-image', 'url(' + url + _cards_pic + '.jpg)');
			}
		});
	}

	// get random index from avilable
	function getRandom() {
		return Math.floor(Math.random() * getAvailable());
	}

	function pull() {
		var card = removeCard(getRandom());
		update();
		//console.log('Pulled ' + card);

		//Highlight
		$($content.find('.card').get(card)).toggleClass('highlight');
	}

	// how many cards are available?
	function getAvailable() {
		var pop = 0;
		$.each(cards.card, function() {
			var p  = this.population - this.drawn;
			pop += p;
		});
		return pop;
	}

	// remove one from population of card at index
	function removeCard(i) {
		var p=0;
		var idx = -1;
		$.each(cards.card, function(index) {
			p += this.population - this.drawn;
			if (p!=0 && p >= i) {
				this.drawn +=1;
				idx = index;
				return false;
			}
		});
		return idx;
	}

	function hide() {
		$content.hide();
	}
	function show() {
		$content.show();
	}

	self.pull = pull;
	self.hide = hide;
	self.show = show;
	self.reset = reset;
	self.update = update;
	self.getRandom = getRandom;
	self.addImages = addImages;
}
