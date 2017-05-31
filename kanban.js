$(function() {
    $("#board").hide().delay(500).fadeIn(2000);
    function Column(name){
        var self = this;
        this.id = randomString();
        this.name = name;
        this.$element = createColumn();
        function createColumn(){
            var $column = $("<div>").addClass("column");    //CREATING ELEMENTS OF COLUMN
            var $columnTitle = $("<h2>").addClass("column-title").text(self.name);
            var $columnCardList = $("<ul>").addClass("column-card-list");
            var $columnDelete = $("<button>").addClass("btn-delete").text("X");
            var $columnAddCard = $("<button>").addClass("add-card").text("Add card");
            $columnDelete.click(function() {        //ADDING EVENTS
                self.removeColumn();
            });
            $columnAddCard.click(function() {
                var name = prompt("Add card name");
                if (name){
                    self.addCard(new Card(name));}
            });
            $column.append($columnTitle)        //ADDING ELEMENTS TO COLUMN
                .append($columnDelete)
                .append($columnAddCard)
                .append($columnCardList);
            return $column;
        }
    }
    Column.prototype = {
        addCard: function(card){
            this.$element.children("ul").append(card.$element);
            $(card.$element).hide().css("opacity", "0").slideDown(700, function(){$(card.$element.animate({opacity: "1",}, 500));});
        },
        removeColumn: function(){
            var that = this;
            this.$element.animate({opacity: "0",}, 1000);
            setTimeout(function(){that.$element.remove();}, 1500);
        },
    };
    function Card(description) {
        var self = this;
        this.id = randomString();
        this.description = description;
        this.$element = createCard();
        function createCard() {
            var $card = $("<li>").addClass("card");     //CREATING ELEMENTS OF CARD
            var $cardDescription = $("<p>").addClass("card-description").text(self.description);
            var $cardDelete = $("<button>").addClass("btn-delete").text("x");
            $cardDelete.click(function(){       //ADDING EVENTS
                self.removeCard();
            });
            $card.append($cardDelete)       //ADDING ELEMENTS TO CARD
                .append($cardDescription);
            return $card;                 
        }
    }
    Card.prototype = {
        removeCard: function() {
            var that = this;
            this.$element.animate({opacity: "0",}, 500, function(){that.$element.slideUp(700);});
            setTimeout(function(){that.$element.remove();}, 1500);
        },
    };
    var board = {
        name: "Kanban Board",
        addColumn: function(column) {
            this.$element.append(column.$element);
            $(column.$element).css("opacity", "0").animate({opacity: "1",}, 1000);
            initSortable();
        },
        $element: $("#board .column-container"),
    };
    $(".create-column").click(function(){
        var name = prompt("Add column name");
        if (name) {
            var column = new Column(name);
            board.addColumn(column);}
    });
    function initSortable() {       //CAN SORT CARDS IN AND BETWEEN COLUMNS
        $(".column-card-list").sortable({
            connectWith: ".column-card-list",
            placeholder: "card-placeholder",
            forcePlaceholderSize: true,
        }).disableSelection();
    }
    function randomString() {       //CREATE RANDOM NUMBER
        var chars = "0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ";
        var str = "";
        for (var i = 0; i < 10; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    }
    // CREATING STARTING COLUMNS
    var tolearnColumn = new Column("To learn");
    var inprogressColumn = new Column("In progress");
    var understoodColumn = new Column("Understood");

    // ADDING COLUMNS TO BOARD
    board.addColumn(tolearnColumn);
    board.addColumn(inprogressColumn);
    board.addColumn(understoodColumn);

    // CREATING STARTING COLUMN CARDS
    var card1 = new Card("HTML");
    var card2 = new Card("CSS");
    var card3 = new Card("JS");
    var card4 = new Card("JQuery");
    var card5 = new Card("Bootstrap");
    var card7 = new Card("Grunt");
    var card8 = new Card("Git");
    var card9 = new Card("NodeJS");
    var card10 = new Card("React");

    // ADDING COLUMN CARDS
    tolearnColumn.addCard(card9);
    tolearnColumn.addCard(card10);
    inprogressColumn.addCard(card3);
    inprogressColumn.addCard(card5);
    inprogressColumn.addCard(card4);
    understoodColumn.addCard(card1);
    understoodColumn.addCard(card2);
    understoodColumn.addCard(card7);
    understoodColumn.addCard(card8);
    // $(".card").hide().slideDown(500);
});