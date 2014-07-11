$(function(){

    window.Entry = Backbone.Model.extend({

        defaults: function() {
            return {
                name: '',
                message: '',
                date: new Date()
            };
        },

        parse: function(raw) {
            return Entry.convert(raw);
        }

    }, {

        // There must be a better way
        convert: function(raw) {
            if (raw.date) {
                raw.date = new Date(raw.date);
            }
            return raw;
        }

    });

    window.EntryList = Backbone.Collection.extend({

        model: Entry,

        url: '/api/guestbook.json',

        parse: function(raw) {
            $.each(raw, function(index, val) {
                Entry.convert(val);
            });
            return raw;
        }
    });

    window.Entries = new EntryList;

    window.EntryView = Backbone.View.extend({

        tagName: "li",

        template: _.template($('#entry-template').html()),
        
        render: function() {
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        }
    });

    
    window.AppView = Backbone.View.extend({

        el: $('body'),

        events: {
            'click #new-entry-submit': 'createEntry'
        },

        initialize: function() {
            Entries.bind('add', this.addOne, this);
            Entries.bind('reset', this.addAll, this);
        },

        addOne: function(entry) {
            var view = new EntryView({model:entry});
            this.$('#entry-list').append(view.render().el);
        },

        addAll: function() {
            Entries.each(this.addOne);
        },

        createEntry: function(e) {
            Entries.create({name: $('#new-entry-name').val(), message: $('#new-entry-message').val(), date: new Date()});
        },

    });

    window.App = new AppView;

    Entries.fetch();

});
