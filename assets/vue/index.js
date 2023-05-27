var app = new Vue({
    el: '#roster',
    data: {
      roster: [],
      loading: false,
      error: null
    },
    created: function() {
      this.fetchRoster();
    },
    methods: {
      fetchRoster: function() {
        this.loading = true;
        var self = this; // Store reference to the Vue instance
  
        fetch('/api/roster')
          .then(function(response) {
            if (!response.ok) {
              throw new Error('Failed to fetch roster');
            }
            return response.json();
          })
          .then(function(data) {
            self.roster = data;
            self.loading = false;
          })
          .catch(function(error) {
            self.error = 'An error occurred while fetching the roster.';
            self.loading = false;
            console.error(error);
          });
      }
    }
});