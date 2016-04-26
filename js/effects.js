function highlightCard(boxIndex, packIndex) {
	var $cards = $('.sim.box').find('.card');
	$cards.removeClass('highlight');
	$cards.eq(boxIndex).addClass('highlight');
	$cards = $('.sim.pack').find('.card');
	$cards.removeClass('highlight');
	$cards.eq(packIndex).addClass('highlight');
}

function toggleButtons(box, pack) {
	$('#selectBox').toggleClass('active', box);
	$('#selectPack').toggleClass('active', pack);
}