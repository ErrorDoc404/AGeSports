var app = new Vue({
    el: '#roster',
    data() {
        return {
            roster: [],
        }
    },
    created() {
        fetch('/api/roster')
            .then(response => response.json())
            .then(data => (this.roster = data))
            .then(data => console.log(roster))
    }
});