function RandomCardPuller() {
	var self = this;
	
	self.shardsAvailable = ko.observable(0);
	self.shardsSpent = ko.observable(0);
	self.pullsAvailable = ko.computed(function() {
		return Math.floor(self.shardsAvailable()/60);
	});
	self.pullsTotal = ko.computed(function() {
		return Number(self.shardsSpent()/60);
	});
};

function Card(name, rarity, portrait) {
	var self = this;
	
	self.name = name;
	self.rarity = rarity;
	self.portrait = ko.
	self.population = ko.computed(function() {
		return rarity==3? 8 : 4;
	});
	self.drawn = ko.observable(0);
	self.available = ko.computed(function() {
		return self.population - self.drawn;
	});
};

function Box(name, type, cards) {
	var self = this;

	self.name = name;
	self.type = type;
	self.isBox = ko.computed(function() {
		return self.type===1;
	});
	self.isChancePack = ko.computed(function() {
		return self.type===2;
	});
	self.cards = ko.observableArray(cards);
};

ko.applyBindings(new RandomCardPuller());