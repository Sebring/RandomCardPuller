
var def_box = {cards:[
	{population:4, drawn:0, type:"legendary"}, {population:4, drawn:0, type:"legendary"}, {population:4, drawn:0, type:"legendary"}, {population:4, drawn:0, type:"legendary"}, {population:4, drawn:0, type:"legendary"}, {population:4, drawn:0, type:"legendary"}, 
	{population:8, drawn:0, type:"epic"}, {population:8, drawn:0, type:"epic"}, {population:8, drawn:0, type:"epic"}, {population:8, drawn:0, type:"epic"}, {population:8, drawn:0, type:"epic"}, {population:8, drawn:0, type:"epic"}	
]};

var _box_pic = [
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
	"https://cdn.rawgit.com/TheSench/SIMSpellstone/gh-pages/res/cardImages/Huntress_Frog_B.jpg"];


var _box = def_box;
var _tot_shards = 0;
var _tot_pulls = 0;
$(document).ready(function() {

	resetBox();
	$('#spend').hide();

	$('#num_shards').on('change', calculateNumPulls);

	$('#btnReset').click(function() { resetBox()});
	$('#btnPull').click(function() { pullCard()});
	$('#btnSpend').click(function() { spendAll()});

});

function addImages() {
	$('.card > div').not('.level').each( function(index) {
		var $this = $(this);
		console.log(_box_pic[index]);
		$this.css('background-image', 'url(' + _box_pic[index] + ')');
	});
}

function calculateNumPulls() {
	var shards = $('#num_shards').val();
	var pulls = Math.floor(shards/60);

	$('#num_pulls').val(pulls);
		if (pulls > 0) {
		$('#spend').show();
	} else {
		$('#spend').hide();
	}
}

function chanceToPullLegend() {
	var legs = $('#num_legend').val();
	var epics = $('#num_epic').val();

	var tot = legs * 4 + epics * 8;

	return legs/tot;
}

function chanceToQuadEpic() {

}

function chanceToQuadLegend() {
	var chance = chanceToPullLegend();

}

function chanceToQuadIntEpic() {

}

function chanceToQuadIntLegend() {
		var legs = $('#num_legend').val();

}

function resetBox() {
	_box = {cards:[
		{population:4, drawn:0, type:"legendary"}, {population:4, drawn:0, type:"legendary"}, {population:4, drawn:0, type:"legendary"}, {population:4, drawn:0, type:"legendary"}, {population:4, drawn:0, type:"legendary"}, {population:4, drawn:0, type:"legendary"}, 
		{population:8, drawn:0, type:"epic"}, {population:8, drawn:0, type:"epic"}, {population:8, drawn:0, type:"epic"}, {population:8, drawn:0, type:"epic"}, {population:8, drawn:0, type:"epic"}, {population:8, drawn:0, type:"epic"}	
	]};
	_tot_shards = 0;
	_tot_pulls = 0;
	updateBox();
	updateForm();
}

function updateForm() {
	$('#tot_shards').val(_tot_shards);
	$('#tot_pulls').val(_tot_pulls);
}

function updateBox() {
	var template = doT.template('{{~it.cards :value:index}}<div class="col-xs-2 col-sm-1 card"><div><div class="{{=value.type}}"><div class="pop text-center badge"><span class="d" data-drawn="{{=value.drawn}}">{{=value.drawn}}</span>/<span class="p" data-pop="{{=value.population}}">{{=value.population}}</span></div></div></div><div class="level"></div></div>{{~}}');
	var data = template(_box);
	$('#box_sim').html(data);

	checkDualsAndQuads();
	addImages();

	return data;
}

function checkDualsAndQuads() {
	$('.card').each(function(index, value) {
		var $this = $(this);
		var drawn = $this.find('.d').data('drawn');
		if (drawn == 0) return 'continue';
		if (drawn == 2 || drawn == 3)
			$this.addClass('dual');
		if (drawn > 3)
			$this.addClass('quad');
		if (drawn==1)
			$this.addClass('single');
		if (drawn == $this.find('.p').data('pop')) {
			$this.addClass('full');
		}
	});
}

function pullCard(spendMode) {
	var card = removeCard(getRandomCard());
	updateBox();
	console.log('Pulled ' + card);

	//Highlight
	$($('.card').get(card)).toggleClass('highlight');

	_tot_shards += 60;
	_tot_pulls++;
	
	updateForm();
}

// how many cards are available?
function getNumCardsAvailable() {
	var pop = 0;
	$.each(_box.cards, function() {
		var p  = this.population - this.drawn;
		pop += p;
	});
	return pop;
}

// get random index from avilable
function getRandomCard() {
	var pop = getNumCardsAvailable() +1;
	var rand = Math.floor(Math.random() * (pop - 1 + 1)) + 1;
	return rand-1;
}

// remove one from population of card at index
function removeCard(i) {
	var p=0;
	var idx = -1;
	$.each(_box.cards, function(index) {
		p += this.population - this.drawn;
		if (p!=0 && p >= i) {
			this.drawn +=1;
			idx = index;
			return false;
		}
	});
	return idx;
}

function spendAll() {
	var shards = $('#num_shards').val();
	if (shards > 59) {
		setTimeout(function() {
			pullCard(true);
			spendAll();
		}, 500);
		$('#num_shards').val(Number(shards-60));
		var pulls = $('#num_pulls').val();
		$('#num_pulls').val(Number(--pulls));
	}
	
}