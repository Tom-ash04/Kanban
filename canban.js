$(function() {
	function Column(name){
        var self = this;
        this.id = randomString();
        this.name = name;
        this.$element = createColumn();
        function createColumn(){
            var $column = $('<div>').addClass('column');    //TWORZYMY ELEMENTY SKŁADOWE
            var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
            var $columnCardList = $('<ul>').addClass('column-card-list');
            var $columnDelete = $('<button>').addClass('btn-delete').text('x');
            var $columnAddCard = $('<button>').addClass('add-card').text('Dodaj kartę');
            $columnDelete.click(function() {        //PODPINAMY ZDARZENIA
                self.removeColumn();
            });
            $columnAddCard.click(function() {
                self.addCard(new Card(prompt("Wpisz nazwę karty")));
            });
            $column.append($columnTitle)        //KONSTRUUJEMY ELEMENT KOLUMNY
                .append($columnDelete)
                .append($columnAddCard)
                .append($columnCardList);
            return $column;     //ZWRACAMY STWORZONY ELEMENT
        }
    };
    Column.prototype = {
        addCard: function(card){
            this.$element.children("ul").append(card.$element);
        },
        removeColumn: function(){
            this.$element.remove();
        }
    };
    function Card(description) {
	    var self = this;
        this.id = randomString();
        this.description = description;
        this.$element = createCard();
        function createCard() {
            var $card = $('<li>').addClass('card');     //TWORZYMY ELEMENTY SKŁADOWE
            var $cardDescription = $('<p>').addClass('card-description').text(self.description);
            var $cardDelete = $('<button>').addClass('btn-delete').text('x');
            $cardDelete.click(function(){       //PODPINAMY ZDARZENIA
                self.removeCard();
            });
            $card.append($cardDelete)       //KONSTRUUJEMY ELEMENT KOLUMNY
                .append($cardDescription);
            return $card;                   //ZWRACAMY STWORZONY ELEMENT
        }
    };
    Card.prototype = {
	    removeCard: function() {
		    this.$element.remove();
        }
    };
    var board = {
        name: 'Tablica Kanban',
        addColumn: function(column) {
            this.$element.append(column.$element);
            initSortable();
        },
    $element: $('#board .column-container')
    };
    $('.create-column').click(function(){
	            var name = prompt('Wpisz nazwę kolumny');
	            var column = new Column(name);
    	        board.addColumn(column);
            });
    function initSortable() {       //UMOŻLIWIA SORTOWANIE ELEMENTÓW POPRZEZ ICH PRZECIĄGANIE
        $('.column-card-list').sortable({
            connectWith: '.column-card-list',
            placeholder: 'card-placeholder'
        }).disableSelection();
    };
    function randomString() {
        var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
        var str = '';
        for (i = 0; i < 10; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    }
    // TWORZENIE KOLUMN
    var todoColumn = new Column('Do zrobienia');
    var doingColumn = new Column('W trakcie');
    var doneColumn = new Column('Skończone');

    // DODAWANIE KOLUMN DO TABLICY
    board.addColumn(todoColumn);
    board.addColumn(doingColumn);
    board.addColumn(doneColumn);

    // TWORZENIE NOWYCH EGZEMPLARZY KART
    var card1 = new Card('Nowe zadanie');
    var card2 = new Card('Stworzyc tablice kanban');

    // DODAWANIE KART DO KOLUMN
    todoColumn.addCard(card1);
    doingColumn.addCard(card2);
});