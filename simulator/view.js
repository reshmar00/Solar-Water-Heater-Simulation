let scene, camera, renderer;

const view = {

    renderScene: function(){
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        camera.position.z = 5;

        renderer = new THREE.WebGLRenderer();
        const container = document.querySelector('.left');
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        // Adding a cylinder
        const geometry = new THREE.CylinderGeometry(1, 1, 2, 32);
        const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
        const cylinder = new THREE.Mesh(geometry, material);
        scene.add(cylinder);

        this.animate();
    },

    animate: function() {
        requestAnimationFrame(this.animate.bind(this));
        renderer.render(scene, camera);
    },


    setScreenSplit: function() {
        const leftRatio = 3/5;
        const rightRatio = 2/5;

        document.querySelector('.left').style.width = `${leftRatio * 100}%`;
        document.querySelector('.right').style.width = `${rightRatio * 100}%`;
    },

    populateMonthDropdown: function() {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const monthDropdown = document.getElementById('monthList');

        monthDropdown.innerHTML = '<option>---Choose month---</option>'; // Clear current month options

        months.forEach(month => {
            const option = document.createElement('option');
            option.text = month;
            monthDropdown.appendChild(option);
        });
    },

    temperatureValueElement: document.getElementById('temperature-value'),
    dateListElement: document.getElementById('dateList'),

    updateTemperatureDisplay: function(value) {
        this.temperatureValueElement.textContent = value;
    },

    updateDateOptions: function(month) {
        // Clear current date options
        this.dateListElement.innerHTML = '<option> ---Choose date--- </option>';

        const numDays = model.getDaysInMonth(month - 1); // Subtract 1 to match the array index in our model

        for (let i = 1; i <= numDays; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.text = i;
            this.dateListElement.appendChild(option);
        }
    }
};