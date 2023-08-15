document.addEventListener('alpine:init', async () => {
    Alpine.store('brews', {
        breweries: [],
        city: "",
        
        async load(){
            await fetch(`https://api.openbrewerydb.org/v1/breweries?by_city=chicago&per_page=10`, {
                method: 'GET',
            }).then((response) => response.json())
            .then((breweries) => {
                this.breweries = breweries
                console.log(breweries)
            })
        },

        async search(city) {
            
            await fetch(`https://api.openbrewerydb.org/v1/breweries?by_city=${city}&per_page=100`, {
                method: 'GET',
            }).then((response) => response.json())
            .then((breweries) => {
                this.breweries = breweries
            })

            const n = 10;
            const sample = this.breweries
            .map(x => ({ x, r: Math.random() }))
            .sort((a, b) => a.r - b.r)
            .map(a => a.x)
            .slice(0, n);

            this.breweries = sample
        }
    })
})



