let scene, camera, renderer;

const view = {

    /* Rendering scene using THREE.js library */
    renderScene: function(){
        /* Setting up the scene and camera */
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        camera.position.z = 5;

        renderer = new THREE.WebGLRenderer();
        const container = document.querySelector('.right');
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        /* Adding a cylinder */
        const geometry = new THREE.CylinderGeometry(1, 1, 2, 32);
        const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
        const cylinder = new THREE.Mesh(geometry, material);
        scene.add(cylinder);

        /* Calling 'animate' to be able to actually view
         * the scene + its elements */
        this.animate();
        renderer.render(scene, camera);
    },

    /* Function to animate the scene - binding it to the view */
    animate: function() {
        requestAnimationFrame(this.animate.bind(this));
        renderer.render(scene, camera);
    },

    /* Logic for selecting the month, date, and time*/
    /* Month selection */
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

    /* Date selection - based on month ~ account for 30/31 days + Feb */
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
    populateTimeDropdown: function() {
        const times = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
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


    displaySelectedValues: function(selectedValues, Qcoll, time) {
        // Clear previous content
        const simulatorResultsContent = document.getElementById('simulator-results-content');
        simulatorResultsContent.innerHTML = '';

        // Iterate over the selected values and create content
        for (const key in selectedValues) {
            const { label } = selectedValues[key];
            const getterName = 'get' + key.charAt(0).toUpperCase() + key.slice(1); // Convert the key to the getter function name
            const value = model[getterName](); // Call the corresponding getter function
            const formattedValue = this.formatValue(key, value);
            const content = `${label}: ${formattedValue}`;
            simulatorResultsContent.innerHTML += content + '<br>';
        }

        // Add the calculated result to the content
        const resultContent = `Using the following formula:<br>
                          Qcoll = FR (τα) G − FRUL ΔT<br>
                          we get: ${Qcoll.toFixed(2)} energy generated to heat the water in the system in ${time.toFixed(2)} seconds`;
        simulatorResultsContent.innerHTML += resultContent;
    },

    formatValue: function(key, value) {
        if (key !== 'month' && key !== 'date' && key !== 'time') {
            return parseFloat(value).toFixed(3);
        }
        return value;
    }
};