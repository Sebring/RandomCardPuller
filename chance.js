
function ChancePack() {
	var self = this;

	var _def_cards = {card:[
		{drawn:0, type:"legendary"},{drawn:0, type:"legendary"}, {drawn:0, type:"legendary"}, {drawn:0, type:"legendary"}, {drawn:0, type:"epic"}, 
		{drawn:0, type:"epic"},{drawn:0, type:"epic"}, {drawn:0, type:"epic"}, {drawn:0, type:"epic"}, {drawn:0, type:"epic"}
	]};

	var cards = _def_cards;

	var _cards_pic = [
	"https://cdn.rawgit.com/TheSench/SIMSpellstone/gh-pages/res/cardImages/Dino_Frog_B.jpg",
	"https://cdn.rawgit.com/TheSench/SIMSpellstone/gh-pages/res/cardImages/Winter_Angel_B.jpg",
	"https://cdn.rawgit.com/TheSench/SIMSpellstone/gh-pages/res/cardImages/Flying_Behemoth_B.jpg",
	"https://cdn.rawgit.com/TheSench/SIMSpellstone/gh-pages/res/cardImages/Mystical_Fox_Spirit_B.jpg",
	"https://cdn.rawgit.com/TheSench/SIMSpellstone/gh-pages/res/cardImages/Frozen_Frog_B.jpg",	
	"https://cdn.rawgit.com/TheSench/SIMSpellstone/gh-pages/res/cardImages/Steel_Dragon_B.jpg",
	"https://cdn.rawgit.com/TheSench/SIMSpellstone/gh-pages/res/cardImages/Swiftness_Elemental_B.jpg",
	"https://cdn.rawgit.com/TheSench/SIMSpellstone/gh-pages/res/cardImages/Acid_Elemental_B.jpg",
	"https://cdn.rawgit.com/TheSench/SIMSpellstone/gh-pages/res/cardImages/Shadow_Elemental_B.jpg",
	"https://cdn.rawgit.com/TheSench/SIMSpellstone/gh-pages/res/cardImages/Swamp_Elemental_B.jpg"
	];

	var $content = $('#pack_sim');

	function update() {
		var template = doT.template('<div class="col-xs-1 col-md-1"></div>{{~it.card :value:index}}<div class="col-xs-2 {{? index>4}}col-xs-push-1{{?}}  {{? index==4}}col-md-push-1{{?}} col-md-1 card"><div><div class="{{=value.type}}"><div class="pop text-center badge"><span class="d" data-drawn="{{=value.drawn}}">{{=value.drawn}}</span></div></div></div><div class="level"></div></div>{{~}}<div class="col-xs-1"></div>');
		var data = template(cards);
		$content.html(data);

		checkDualsAndQuads();
		addImages();
	}

	function addImages() {
		$content.find('.card > div').not('.level').each( function(index) {
			var $this = $(this);
			$this.css('background-image', 'url(' + _cards_pic[index] + ')');
		});
	}

	function reset() {
		cards = {card:[
			{drawn:0, type:"legendary"},{drawn:0, type:"legendary"}, {drawn:0, type:"legendary"}, {drawn:0, type:"legendary"}, {drawn:0, type:"epic"},
			{drawn:0, type:"epic"},{drawn:0, type:"epic"}, {drawn:0, type:"epic"}, {drawn:0, type:"epic"}, {drawn:0, type:"epic"}
		]};
		update();
	}

	function hide() {
		$content.hide();
	}
	function show() {
		$content.show();
	}

	function pull() {
		var card = removeCard(getRandom());
		update();
		//Highlight
		$($content.find('.card').get(card)).toggleClass('highlight');
	}

	// card is not removed as they are infinite
	function removeCard(i) {
		cards.card[i].drawn = Number(cards.card[i].drawn) + 1;
		console.log(cards.card[i]);
		return i;
	}

	// get random index from avilable
	function getRandom() {
		return Math.floor(Math.random() * 10);
	}

	self.pull = pull;
	self.hide = hide;
	self.show = show;
	self.reset = reset;
	self.update = update;
};
