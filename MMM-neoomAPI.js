
Module.register("MMM-neoomAPI", {
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
    errorText: "HI",
    notificationReceived(notification, payload, sender) {
        if (notification === 'MODULE_DOM_CREATED') {
            this.getStats();
            setInterval(() => {
                this.getStats();
            }, this.config.fetchInterval);
        }
    },
    getDom() {
        const wrapper = document.createElement("div");

        if(this.errorText !== null) {
            const error = document.createElement("h1");
            error.className = "bright medium light fadeInJoke";
            error.innerHTML = this.errorText;
            wrapper.appendChild(error);

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
    async getStats() {

        fetch(`https://api.ntuity.io/v1/sites/${this.config.siteId}/energy-flow/latest/`).then((response) => {

		this.errorText = 'afterfetch';
		this.updateDom();

            
        });
    }
});
