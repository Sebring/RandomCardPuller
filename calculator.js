
var def_box = {cards:[
	{population:4, drawn:0, type:"legendary"}, {population:4, drawn:0, type:"legendary"}, {population:4, drawn:0, type:"legendary"}, {population:4, drawn:0, type:"legendary"}, {population:4, drawn:0, type:"legendary"}, {population:4, drawn:0, type:"legendary"}, 
	{population:8, drawn:0, type:"epic"}, {population:8, drawn:0, type:"epic"}, {population:8, drawn:0, type:"epic"}, {population:8, drawn:0, type:"epic"}, {population:8, drawn:0, type:"epic"}, {population:8, drawn:0, type:"epic"}	
]};

var _box = def_box;
var _shards = 0;
var _pulls = 0;
$( document ).ready(function() {

	resetBox();

	$('#num_shards').on('change', calculateNumPulls);

	$('#btnReset').click(function() { resetBox()});
	$('#btnPull').click(function() { pullCard()});



});

function calculateNumPulls() {
	$('#num_pulls').val(Math.floor($('#num_shards').val()/60));
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
	_shards = 0;
	_pulls = 0;
	updateBox();
	updateForm();
}

function updateForm() {
	$('#num_shards').val(_shards);
	$('#num_pulls').val(_pulls);
}

function updateBox() {
	var template = doT.template('{{~it.cards :value:index}}<div class="col-sx-1 card"><div class="{{=value.type}}"><div class="pop text-center"><span class="d">{{=value.drawn}}</span>/<span class="p">{{=value.population}}</span></div></div></div>{{~}}');
	var data = template(_box);
	$('#box_sim').html(data);
	return data;
}

function pullCard() {
	var card = removeCard(getRandomCard());
	updateBox();
	console.log('Pulled ' + card);

	//Highlight
	$($('.card').get(card)).toggleClass('highlight');

	_shards += 60;
	_pulls++;
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