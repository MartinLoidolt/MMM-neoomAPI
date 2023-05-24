
Module.register("MMM-neoomAPI", {
    defaults: {
        apiKey: "",
        siteId: "",
        shownStats: [
            "power_production",
            "power_consumption_calc",
            "power_consumption",
            "power_storage",
            "power_grid",
            "power_charging_stations",
            "power_heating",
            "power_appliances",
            "state_of_charge",
            "self_sufficiency"
        ],
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
        headerText.innerHTML = "Photovoltaic Statistics";
        wrapper.appendChild(headerText);

        this.config.shownStats.forEach((statName, index) => {
            wrapper.appendChild(this.getElementFromStatName(statName));

            if(index <= this.config.shownStats.length - 1) {
                wrapper.appendChild(document.createElement("br"));
            }

        });
    },
    getStats() {
        fetch(`https://try.readme.io/https://api.ntuity.io/v1/sites/${this.config.siteId}/energy-flow/latest`, {
            method: 'GET',
            headers: {accept: 'application/json', authorization: `Bearer ${this.config.apiKey}`,},
        }).then(response => {
            return response.json();
        }).then(data => {
            this.errorText = null;
            this.stats = data;
        }).catch(error => {
            this.errorText = error;
        });

        this.updateDom();
    },
    getElementFromStatName(name) {

        let newElement = document.createElement("span");
        newElement.className = "bright medium light";
        newElement.innerHTML = "NAME NOT FOUND";

        if(name === "power_consumption") {
            newElement.innerHTML = `Power Consumption (not calc): ${this.getFormattedWatt(this.stats.power_consumption.value)}`;
        } else if(name === "power_consumption_calc") {
            newElement.innerHTML = `Power Consumption: ${this.getFormattedWatt(this.stats.power_consumption_calc.value)}`;
        } else if(name === "power_production") {
            newElement.innerHTML = `Power Production: ${this.getFormattedWatt(this.stats.power_production.value)}`;
        } else if(name === "power_storage") {
            newElement.innerHTML = `Power Storage: ${this.getFormattedWatt(this.stats.power_storage.value)}`;
        } else if(name === "power_grid") {
            newElement.innerHTML = `Power From Grid: ${this.getFormattedWatt(this.stats.power_grid.value)}`;
        } else if(name === "power_charging_stations") {
            newElement.innerHTML = `Power Charging Stations: ${this.getFormattedWatt(this.stats.power_charging_stations.value)}`;
        } else if(name === "power_heating") {
            newElement.innerHTML = `Power Heating: ${this.getFormattedWatt(this.stats.power_heating.value)}`;
        } else if(name === "power_appliances") {
            newElement.innerHTML = `Power Appliances: ${this.getFormattedWatt(this.stats.power_appliances.value)}`;
        } else if(name === "state_of_charge") {
            newElement.innerHTML = `Storage Charge: ${this.stats.state_of_charge.value + " %"}`;
        } else if(name === "self_sufficiency") {
            newElement.innerHTML = `Self Sufficiency: ${this.stats.self_sufficiency.value + " %"}`;
        }

        return newElement;
    },
    getFormattedWatt(wattAmount) {
        if(wattAmount >= 1000) {
            return (wattAmount / 1000).toFixed(2) + " kW";
        }

        return wattAmount.toFixed(0) + " W"
    }
});
