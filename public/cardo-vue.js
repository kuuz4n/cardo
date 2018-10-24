(function() {
  var cardoVue = new Vue({
    el: '#cardoVue',
    data: {
      title: null,
      description: null,
      notes: []
    },
    created: function() {
      var self = this;
      axios.get('http://localhost:3300/api/notes')
        .then(function(res) {
          self.notes = res.data;
        })
        .catch(function(err) {
          self.notes = [];
        });
    },
    methods: {
      addNote: function() {
        var self = this;
        var payload = {
          title: self.title,
          description: self.description
        };
        axios.post('/api/notes', payload)
          .then(function(res) {
            self.notes = res.data;
            self.clear();
            // self.notes.push({
            //   id: 99,
            //   title: self.title,
            //   description: self.description
            // });
          })
          .catch(function(err) {
          });
      },
      clear: function() {
        this.title = null;
        this.description = null;
      },
      deleteNote: function(note) {
        var self = this;
        axios.delete('/api/notes/' + note.id)
          .then(function(res) {
            // self.notes = res.data;
            var index = -1;
            for(var i = 0; i < self.notes.length; ++i) {
              if(Number(self.notes[i].id) === Number(note.id)) {
                index = i;
                break;
              }
            }
            self.notes.splice(index, 1);
          })
          .catch(function(err) {
          });
      }
    }
  });
  console.log(cardoVue);
})();