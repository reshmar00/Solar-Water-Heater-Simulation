/* MVC Architecture */
/**
 * View - Represents the user interface and display of the application.
 * Receives user inputs and displays data.
 * Independent of the logic (physics and math), only focused on presentation.
 */


const view = {

    /* Logic for selecting the month, date, and time*/
    /* Month selection */
    /* Populates a drop-down menu with months of th year
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
        const times = ['01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'];
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

    /* Method to format how values are displayed */
    formatValue: function(key, value) {
        if (key !== 'month' && key !== 'date' && key !== 'time') {
            return parseFloat(value).toFixed(6);
        }
        return value;
    },


    /* Method to display the values selected by the user */
    displaySelectedValues: function(selectedValues) {
        const simulatorResultsContent = document.getElementById('two-d-rendering-content');
        simulatorResultsContent.innerHTML = '';

        const columns = [
            document.createElement('div'),
            document.createElement('div'),
            document.createElement('div')
        ];
        columns.forEach(column => column.className = 'result-column');

        let currentColumn = 0;
        let count = 0;

        for (const key in selectedValues) {
            if ((count === 3 && currentColumn === 0) || (count === 6 && currentColumn === 1)) {
                currentColumn++;  // move to next column after 3 values for the first column, and 6 values total for the second column
            }

            const { label } = selectedValues[key];
            const getterName = 'get' + key.charAt(0).toUpperCase() + key.slice(1); // Convert the key to the getter function name
            const value = model[getterName](); // Call the corresponding getter function
            const formattedValue = this.formatValue(key, value);
            const content = `${label}: ${formattedValue}<br>`;
            columns[currentColumn].innerHTML += content;

            count++;
        }

        columns.forEach(column => simulatorResultsContent.appendChild(column));
    },

    /********************** Chart Code  *************************/

    /* Using chart.js to create a line chart - first initialized without
     * information */
    initEmptyGraph() {
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
                    scales: {
                        x: {
                            beginAtZero: true,
                            display: true,
                            title:{
                                display: true,
                                align: 'center',
                                color: 'rgba(255, 255, 255, 1)',
                                text: 'Time',
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
                                text: 'Temperature',
                                font: {
                                    family: "Bai Jamjuree",
                                    size: 18,
                                    weight: 'bold'
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

    /* Using chart.js to update the initialized graph to show
     * a line chart */
    displayGraph(xArray, yArray) {
        const ctx = document.getElementById('myChart');
        if (this.chartInstance) {
            this.chartInstance.data.labels = xArray;
            this.chartInstance.data.datasets[0].data = yArray;
            this.chartInstance.update();
        }
    }
};