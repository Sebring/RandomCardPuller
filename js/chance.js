
function ChancePack() {
	var self = this;

	var _def_cards = {card:[
		{drawn:0, type:"legendary"},{drawn:0, type:"legendary"}, {drawn:0, type:"legendary"}, {drawn:0, type:"legendary"}, {drawn:0, type:"epic"}, 
		{drawn:0, type:"epic"},{drawn:0, type:"epic"}, {drawn:0, type:"epic"}, {drawn:0, type:"epic"}, {drawn:0, type:"epic"}
	]};

	var cards = _def_cards;

	var _cards_pic = [
	"Dino_Frog_B",
	"Winter_Angel_B",
	"Flying_Behemoth_B",
	"Mystical_Fox_Spirit_B",
	"Frozen_Frog_B",	
	"Steel_Dragon_B",
	"Swiftness_Elemental_B",
	"Acid_Elemental_B",
	"Shadow_Elemental_B",
	"Swamp_Elemental_B"
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
			var url = 'http://cdn.rawgit.com/TheSench/SIMSpellstone/gh-pages/res/cardImages/';
			if (chance_pic) {
				$this.css('background-image', 'url(' + url + chance_pic[index].pic + '.jpg)');
			} else {
				$this.css('background-image', 'url(' + url + _cards_pic[index] + '.jpg)');
			}
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
