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
    }
  });
  console.log(cardoVue);
})();