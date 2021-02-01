$(document).ready(function () {
    var LIST = $('.bl-list');
    var ITEM_TEMPLATE = $('#template').html();
    var STAT_TEMPLATE = $('.statsTemplate').html();

   
    addItem("Помідори");
    addItem("Сир");
    addItem("Печиво");
   

    var checkString = function (f) {
        if (f && f.charAt(0) != "") {
            return true;
        }
        return false;
    };

    $(".add").click(function () {
        var f = $(".field").val();
        if (checkString(f)) {
            addItem(f);
        }
        $(".field").val("");
        $(".field").focus();
    });

    function addItem(title) {
        var node = $(ITEM_TEMPLATE); 
        var rightNode = $(STAT_TEMPLATE);
        var rename = node.find('.rename');
        var product = node.find(".bl-product");
        var rightProduct = rightNode.find('.title');
        var buy = true;
        rename.hide();
        product.text(title);
        rightProduct.text(title);
        rightNode.find('.count').text(1);

        product.click(function () {
            if (buy) {
                rename.val(product.text());
                product.hide();
                rename.show();
                rename.focus();
                
                $("input").keyup(function(){
                    if (checkString(rename.val())) { product.text(rename.val());
                rightProduct.text(rename.val());}
                     });
            } 
        });
        
        rename.focusout(function () {
                rename.hide();
                product.show();
            
        });
       
       
}
//---------------Remove all-----------------------------
        node.find(".bl-cancel").click(function () {
            node.slideUp(function () {
                node.remove();
            });
            rightNode.fadeTo(300, 0, function () {
                rightNode.remove();
            });
        });
//--------------Add one --------------------------------
        node.find(".bl-plus").click(function () {
            var thisC = node.find('.bl-label');
            var count = thisC.text();
            if (parseInt(count) === 1)
                node.find('.bl-minus').removeClass("disabled");
            count++;
            thisC.fadeOut(250, function () {
                thisC.text(count);
                thisC.fadeIn(250);
            });
            var r = rightNode.find(".count");
            r.fadeOut(250, function () {
                r.text(count);
                r.fadeIn(250);
            });
        });
//---------------Remove one--------------------------------
        node.find(".bl-minus").click(function () {
            var thisC = node.find('.bl-label');
            var count = thisC.text();
            if (parseInt(count) !== 1) {
                count--;
                thisC.fadeOut(250, function () {
                    thisC.text(count);
                    thisC.fadeIn(250);
                });
                var r = rightNode.find(".count");
                r.fadeOut(250, function () {
                    r.text(count);
                    r.fadeIn(250);
                });
            }
            if (count == 1)
                node.find('.bl-minus').addClass("disabled");
        });
//------------Add the item to the bought-list--------------------
        node.find(".bl-buy").click(function () {
            node.fadeOut(250, function () {
                var thisN = node.find('.bl-product');
                node.find('.bl-minus').toggle();
                node.find('.bl-plus').toggle();
                node.find('.bl-cancel').toggle();
                if (buy) {
                    thisN.addClass("line-through");
                    node.find('.bl-buy').text("Не куплено");
                    node.find('.bl-buy').attr('data-tooltip', 'Повернути товар до списку');
                    rightNode.fadeOut(250, function () {
                        rightNode.remove();
                        $('.stats').append(rightNode);
                        rightNode.find('.title').addClass("line-through");
                        rightNode.fadeIn(250);
                    });
                    buy = false;
                } else {
                    thisN.removeClass("line-through");
                    node.find('.bl-buy').text("Куплено");
                    node.find('.bl-buy').attr('data-tooltip', 'Відмітити як куплене');
                    rightNode.fadeOut(250, function () {
                        rightNode.remove();
                        $('.not-bought').append(rightNode);
                        rightNode.find('.title').removeClass("line-through");
                        rightNode.fadeIn(250);
                    });
                    buy = true;
                }
                node.fadeIn(250);
            });
        });
        LIST.append(node); //Add to the end of the list
        $(".not-bought").append(rightNode);
        
        
    }

    $(".field").keypress(function (event) {
        if (event.which == 13) {
            var f = $(".field").val();
            if (checkString(f)) addItem(f);
            $(".field").val("");
            $(".field").focus();
        }
    });
});