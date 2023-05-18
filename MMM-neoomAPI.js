
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
    errorText: null,
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
            error.className = "error";
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
        headerText.innerHTML = "Photovoltaic Stats";
        wrapper.appendChild(headerText);

        const statsText = document.createElement("h2");
        statsText.className = "bright medium light"

        statsText.innerHTML = `Power Production: ${this.stats.power_production.value / 1000} kW \n`;
        statsText.innerHTML += `Power Consumption: ${this.stats.power_consumption_calc.value / 1000} kW`;
        statsText.innerHTML += `Storage charge: ${this.stats.state_of_charge.value} %`;

        wrapper.appendChild(statsText);

    },
    getStats() {

        fetch(`https://try.readme.io/https://api.ntuity.io/v1/sites/${this.config.siteId}/energy-flow/latest`, {
            method: 'GET',
            headers: {accept: 'application/json', authorization: `Bearer ${this.config.apiKey}`,},
        }).then(response => {
            return response.json();
        }).then(data => {
            this.stats = data;
        })
            .catch(error => {
            this.errorText = error;
        });

        this.updateDom();
    }
});
