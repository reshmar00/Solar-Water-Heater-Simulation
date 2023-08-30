/* MVC Architecture */
/**
 * View - Represents the user interface and display of the application.
 * Receives user inputs and displays data.
 * Independent of the logic (physics and math), only focused on presentation.
 */


const view = {

    /* Logic for selecting the month, date, and time*/
    /* Month selection */
    /* Populates a drop-down menu with months of the year
     * Depending on this selection, the user can select a date */
    populateMonthDropdown: function() {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const monthDropdown = document.getElementById('month');

        monthDropdown.innerHTML = '<option>---Choose month---</option>'; // Clear current month options

        months.forEach(month => {
            const option = document.createElement('option');
            option.text = month;
            monthDropdown.appendChild(option);
        });
    },

    /* Date selection - based on the month ~ accounts for 30/31 days + Feb */
    dateListElement: document.getElementById('date'),
    updateDateOptions: function(month) {
        // Clear current date options
        this.dateListElement.innerHTML = '<option> ---Choose date--- </option>';

        let numDays = 31;  // default value
        if (["April", "June", "September", "November"].includes(month)) {
            numDays = 30;
        } else if (month === "February") {
            numDays = 28;
        }

        for (let i = 1; i <= numDays; i++) {
            let option = document.createElement("option");
            option.value = i;
            option.text = i;
            this.dateListElement.appendChild(option);
        }
    },

    /* Time selection */
    /* Populates a drop-down menu with hourly options in a 24-hour */
    populateTimeDropdown: function() {
        const times = ['0100', '0200', '0300', '0400', '0500', '0600', '0700', '0800', '0900', '1000', '1100', '1200', '1300', '1400', '1500', '1600', '1700', '1800', '1900', '2000', '2100', '2200', '2300', '2400'];
        const timeDropdown = document.getElementById('time');

        timeDropdown.innerHTML = '<option>---Choose time---</option>';

        times.forEach(time => {
            const option = document.createElement('option');
            option.text = time;
            timeDropdown.appendChild(option);
        });
    },

    /* Setting up the collector area slider's value... */
    collectorAreaValueElement: document.getElementById('collector-area-value'),
    /* ... and logic for updating its display */
    updateCollectorAreaDisplay: function(value) {
        this.collectorAreaValueElement.textContent = value;
    },

    /* Setting up the collector depth slider's value... */
    collectorDepthValueElement: document.getElementById('collector-depth-value'),
    /* ... and logic for updating its display */
    updateCollectorDepthDisplay: function(value) {
        this.collectorDepthValueElement.textContent = value;
    },

    /* Setting up the collector tilt slider's value... */
    collectorTiltValueElement: document.getElementById('collector-tilt-value'),
    /* ... and logic for updating its display */
    updateCollectorTiltDisplay: function(value) {
        this.collectorTiltValueElement.textContent = value;
    },

    /* Setting up the pipe length slider's value... */
    pipeLengthValueElement: document.getElementById('pipe-length-value'),
    /* ... and logic for updating its display */
    updatePipeLengthDisplay: function(value) {
        this.pipeLengthValueElement.textContent = value;
    },

    /* Setting up the storage tank's volume slider's value... */
    storageTankVolumeElement: document.getElementById('storage-tank-volume-value'),
    /* ... and logic for updating its display */
    updateStorageTankVolumeDisplay: function(value) {
        this.storageTankVolumeElement.textContent = value;
    },

    /* Setting up the temperature slider's value... */
    temperatureValueElement: document.getElementById('temperature-value'),
    /* ... and logic for updating its display */
    updateTemperatureDisplay: function(value) {
        this.temperatureValueElement.textContent = value;
    },

    /* Setting up the temperature slider's value... */
    timeStepValueElement: document.getElementById('time-step-value'),
    /* ... and logic for updating its display */
    updateTimeStepDisplay: function(value) {
        this.timeStepValueElement.textContent = value;
    },

    /* Function to display the values selected by the user */
    displaySelectedValues: function(selectedValues) {
        const simulatorResultsContent = document.getElementById('two-d-rendering-content');
        let totalVolume = model.computeTotalVolume().toFixed(3);
        simulatorResultsContent.innerHTML = "Total Volume: " + totalVolume + " cubic meters\n";
        simulatorResultsContent.innerHTML += "Starting Temperature: " + model.getTemperature() + "°C\n";
        simulatorResultsContent.innerHTML += "Ending Temperature: 85°C\n";

    },

    /********************** Chart Code  *************************/

    /* Using chart.js to create a line chart - first initialized without
     * information */
    initEmptySimulation() {
        const ctx = document.getElementById('myChart');

        // Destroy/delete the old graph instance.
        if (this.chartInstance) {
            this.chartInstance.destroy();
        }

        else{
            // Initialize a new blank graph.
            this.chartInstance = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [{
                        label: 'Temperature (°C)',
                        data: [],
                        borderWidth: 1,
                        borderColor: 'rgba(255, 255, 255, 1)',
                        backgroundColor: 'rgba(255, 255, 255, 1)',
                        pointBackgroundColor: 'rgba(255, 255, 255, 1)',
                        pointRadius: 3,
                    }]
                },
                options: {
                    maintainAspectRatio: false,
                    responsive: true,
                    scales: {
                        x: {
                            beginAtZero: true,
                            display: true,
                            title:{
                                display: true,
                                align: 'center',
                                color: 'rgba(255, 255, 255, 1)',
                                text: 'Time (s)',
                                font: {
                                    family: "Bai Jamjuree",
                                    size: 18,
                                    weight: 'bold'
                                }
                            },
                            ticks: {
                                color: 'rgba(255, 255, 255, 1)' // White color for the x-axis ticks
                            },
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)' // Light grid lines to make it visible on a dark background
                            },
                        },
                        y: {
                            title:{
                                display: true,
                                align: 'center',
                                color: 'rgba(255, 255, 255, 1)',
                                text: 'Temperature (°C)',
                                font: {
                                    family: "Bai Jamjuree",
                                    size: 18,
                                    weight: 'bold',
                                }
                            },
                            ticks: {
                                color: 'rgba(255, 255, 255, 1)' // White color for the y-axis ticks
                            },
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)' // Light grid lines to make it visible on a dark background
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            labels: {
                                color: 'rgba(255, 255, 255, 1)' // White color for the legend labels
                            }
                        },
                        title:{
                            display: true,
                            align: 'center',
                            color: 'rgba(255, 255, 255, 1)',
                            text: 'Solar collector heat transfer efficiency',
                            font: {
                                family: "Bai Jamjuree",
                                size: 18,
                                weight: 'bold'
                            }
                        }
                    }

                }
            });
        }
    },

    /* Using chart.js to update the initialized simulation to show
     * a line chart */
    displaySimulation(xArray, yArray) {
        console.log("Entered displaySimulation");
        const ctx = document.getElementById('myChart');
        if (this.chartInstance) {
            console.log("Entered displaySimulation's if statement");
            this.chartInstance.data.labels = xArray;
            this.chartInstance.data.datasets[0].data = yArray;
            this.chartInstance.update();
            console.log("Updated chart");
        }
    }
};