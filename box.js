
function BoxPack() {
	var self = this;

	var _def_cards = {card:[
		{population:4, drawn:0, type:"legendary"}, {population:4, drawn:0, type:"legendary"}, {population:4, drawn:0, type:"legendary"}, {population:4, drawn:0, type:"legendary"}, {population:4, drawn:0, type:"legendary"}, {population:4, drawn:0, type:"legendary"}, 
		{population:8, drawn:0, type:"epic"}, {population:8, drawn:0, type:"epic"}, {population:8, drawn:0, type:"epic"}, {population:8, drawn:0, type:"epic"}, {population:8, drawn:0, type:"epic"}, {population:8, drawn:0, type:"epic"}	
	]};

	var cards = _def_cards;

	var _cards_pic = [
	"https://cdn.rawgit.com/TheSench/SIMSpellstone/gh-pages/res/cardImages/High_Knight_Frog_B.jpg",
	"https://cdn.rawgit.com/TheSench/SIMSpellstone/gh-pages/res/cardImages/Ethereal_Angel_B.jpg",
	"https://cdn.rawgit.com/TheSench/SIMSpellstone/2b18a9af0fcb5fc15af04b7dd663958caaf75116/res/cardImages/Goblin_Explosioneer_B.jpg",
	"https://cdn.rawgit.com/TheSench/SIMSpellstone/gh-pages/res/cardImages/Legendary_Chaos_Frog_B.jpg",
	"https://cdn.rawgit.com/TheSench/SIMSpellstone/f53fea9f9180f29104ac24267e7ac1733ba5b30f/res/cardImages/Giant_Sword_Frog_B.jpg",
	"https://cdn.rawgit.com/TheSench/SIMSpellstone/gh-pages/res/cardImages/Rhino_Beast_B.jpg",
	"https://cdn.rawgit.com/TheSench/SIMSpellstone/f53fea9f9180f29104ac24267e7ac1733ba5b30f/res/cardImages/Cloud_Pike_Frog_B.jpg",
	"https://cdn.rawgit.com/TheSench/SIMSpellstone/gh-pages/res/cardImages/Concealed_Dragon_B.jpg",
	"https://cdn.rawgit.com/TheSench/SIMSpellstone/gh-pages/res/cardImages/Spike_Frog_B.jpg",
	"https://cdn.rawgit.com/TheSench/SIMSpellstone/gh-pages/res/cardImages/Spinehead_Undead_B.jpg",
	"https://cdn.rawgit.com/TheSench/SIMSpellstone/gh-pages/res/cardImages/Frog_Shaman_B.jpg",
	"https://cdn.rawgit.com/TheSench/SIMSpellstone/gh-pages/res/cardImages/Huntress_Frog_B.jpg"
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
			$this.css('background-image', 'url(' + _cards_pic[index] + ')');
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
