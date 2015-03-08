(function($){
    var eventHandlers = {
        focus:function(e){
            $(this).data('styler-select').setActive();
        },
        blur:function(e){
            $(this).data('styler-select').setInactive();
        },
        keydown:function(e){
            switch(e.which) {
                case 37: // left
                    break;

                case 38: // up
                    break;

                case 39: // right
                    break;

                case 40: // down
                    //$(this).data('styler-select').next();
                    break;

                default: return; // exit this handler for other keys
            }
            e.preventDefault(); //
        }
    }

    var template = "<div class='jsb-style-select'>" +
        "<div class='jsb-style-select__heading'>" +
            "<div class='jsb-style-select__title'></div>" +
            "<div class='jsb-style-select__trigger'></div>" +
        "</div>" +
        "<div class='jsb-style-select__dropdown'><ul class='jsb-style-select__list'></ul></div>"
    "</div>";

    var StyleSelect = function(config){
        this.init(config);
    }

    var prototype = {
        init:function(config){
            this.element = config.element;
            this.buildTemplate();
            this.initEvents();
        },

        buildTemplate:function(){
            var
                el = this.element,
                container,
                options,
                list
                ;
            el.before(template);
            container = el.prev();
            el.appendTo(container);

            list = this.buildOptionsHtml(el.find('option'));
            this.list  = container.find('.jsb-style-select__list').html(list);
            this.container = container;
            this.updateContainerHeading();
        },
        buildOptionsHtml:function(options){
            var res = '';
            for(var i=0; i<options.length;i++){
                console.log(options[i].innerText);
                res+="<li data-value='"+options[i].value+"'>"+options[i].text+"</li>";
            }
            return res;
        },
        initEvents:function(){
            this.element.on(eventHandlers,{extra:'time'},{extra:'time'});
            this.container.find('.jsb-style-select__heading').on('click', $.proxy(function(){
                if(this.container.hasClass('is-open')){
                    this.hideList();
                }else{
                    this.showList();
                }
            },this));

            this.container.find('li').on('mouseenter',function(){$(this).addClass('is-hover').siblings().removeClass('is-hover')});
            this.container.find('li').on('click', $.proxy(function(e){var value = $(e.currentTarget).data('value'); this.setValue(value);},this));
            this.container.on('click',function(e){e.stopPropagation()});
            //$('body').on('click', $.proxy(function(){this.hideList()},this));
            $(document).on('click', $.proxy(function(e) {
                if (!$(e.target).parents().hasClass('jsb-style-select') && e.target.nodeName != 'OPTION') {
                   this.hideList();
                }
            },this));
        },
        updateContainerHeading:function(){
            this.container.find('.jsb-style-select__title').text(this.element.find('option:selected').text());
        },
        updateSelectedElement:function(){
            var li = this.container.find("li[data-value="+this.element.val()+"]");
            li.addClass('is-hover').siblings().removeClass('is-hover');
        },
        setValue:function(value){
            this.element.val(value);
            this.updateContainerHeading();
            this.updateSelectedElement();
            this.hideList();
        },
        setActive:function(){
            this.container.addClass('is-active');
        },
        setInactive:function(){
            this.container.removeClass('is-active');
        },
        showList:function(){
            //this.list.show();
            this.container
                .addClass('is-open')
                .find('.jsb-style-select__dropdown').css('top',this.container.outerHeight()-2).show();
        },
        hideList:function(){
            //this.list.hide();
            this.container
                .removeClass('is-open')
                .find('.jsb-style-select__dropdown').hide();
        },
        next:function(){
            var
                el = this.element,
                selected = el.find('option:selected')
                //next = el.find('option:selected').next()
            ;
            console.log(selected);
        }
    }


    StyleSelect.prototype = prototype;


    $.fn.styleSelect = function(){
        this.each(function(){
            var obj = new StyleSelect({element:$(this)})
            $(this).data('styler-select',obj)
        });
    }

})(jQuery)