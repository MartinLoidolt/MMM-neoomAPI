Module.register("MMM-JokeAPI", {
    defaults: {
        apiKey: "",
        siteId: "",
        fetchInterval: 10 * 1000
    },
    getStyles() {
        return [
            this.file('style.css')
        ]
    },
    stats: null,
    errorText: null,
    notificationReceived(notification, payload, sender) {
        if (notification === 'MODULE_DOM_CREATED') {
            this.getStats();
            setInterval(() => {
                this.getStats()
            }, this.config.fetchInterval);
        }
    },
    getDom() {
        const wrapper = document.createElement("div");

        if(this.errorText !== null) {
            const error = document.createElement("h1");
            error.className = "bright medium light fadeInJoke";
            error.innerHTML = this.errorText;
            wrapper.appendChild(error)

            return wrapper;
        }

        if(this.stats === null) return wrapper;

        this.setupHTMLStructure(wrapper);

        return wrapper;
    },
    setupHTMLStructure(wrapper) {

        const headerText = document.createElement("h1");
        headerText.innerHTML = "neoom Stats";
        wrapper.appendChild(headerText);

        const statsText = document.createElement("h2");
        headerText.innerHTML = `Power Production: ${this.stats.power_production.value} Wh`;
        wrapper.appendChild(statsText);
    },
    getStats() {
        fetch(`https://api.ntuity.io/v1/sites/${this.config.siteId}/energy-flow/latest`, {
            headers: {
                Authorization: `Bearer ${this.config.apiKey}`
            }
        }).then((response) => {

            if(response.status !== 200) {
                this.errorText = "Something went wrong. Check your Internet, ApiKey and SiteId.";
            } else {
                this.errorText = null;
            }

            response.json().then((stats) => {
                this.stats = stats;
                this.updateDom();
            });
        });
    }
});
