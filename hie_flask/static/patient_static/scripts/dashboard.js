document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.nav-link');
    const dashboardContent = document.getElementById('dashboard-content');


    tabs.forEach(tab => {
        tab.addEventListener('click', function(event) {
            event.preventDefault();
            const tabId = this.id;

            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to the clicked tab
            this.classList.add('active');

            // Fetch data based on the clicked tab

            fetchData(tabId);
        });
    });

    // Load the Overview tab content by default
    fetchData('overview-tab');

    async function fetchData(tabId) {
        let content = '';

        switch (tabId) {
            case 'overview-tab':
                // Define variables for each piece of data
                let pictureUrl = '';
                let name = '';
                let age = '';
                let gender = '';
                let email = '';
                let phone = '';
                let address = '';
                let occupation = '';
                let maritalStatus = '';
                let emergencyContact = '';

                // Fetch data from an API or data source
                const overviewData = await fetchOverviewData();

                if (overviewData) {
                    // Assign data to variables
                    pictureUrl = overviewData.pictureUrl || 'default-picture-url';
                    name = overviewData.name || 'Data not available';
                    age = overviewData.age || 'Data not available';
                    gender = overviewData.gender || 'Data not available';
                    email = overviewData.email || 'Data not available';
                    phone = overviewData.phone || 'Data not available';
                    address = overviewData.address || 'Data not available';
                    occupation = overviewData.occupation || 'Data not available';
                    maritalStatus = overviewData.maritalStatus || 'Data not available';
                    emergencyContact = overviewData.emergencyContact || 'Data not available';
                } else {
                    // Handle case where data is not available
                    pictureUrl = 'default-picture-url';
                    name = 'Data not available';
                    age = 'Data not available';
                    gender = 'Data not available';
                    email = 'Data not available';
                    phone = 'Data not available';
                    address = 'Data not available';
                    occupation = 'Data not available';
                    maritalStatus = 'Data not available';
                    emergencyContact = 'Data not available';
                }

                // Use variables to populate the content
                content = `
                    <style>
                        .fixed-nav-section {
                            white-space: nowrap; /* Prevents wrapping of tabs */
                        }
                        .patient-picture {
                            display: block;
                            margin: 0 auto 20px;
                            width: 300px;
                            height: 300px;
                            border-radius: 50%;
                            overflow: hidden;
                            background-color: blue;
                            transition: transform 0.3s, box-shadow 0.3s;
                            margin-top: 25px;
                        }
                        .patient-picture img {
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                            border-radius: 50%;
                            filter: grayscale(1);
                            transition: filter 0.3s ease, transform 0.3s ease;
                        }
                        .patient-picture img:hover {
                            filter: grayscale(0);
                            transform: scale(1.1);
                        }
                        .patient-picture:hover {
                            transform: scale(1.1);
                            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
                        }
                        .card {
                            margin-bottom: 65px;
                            transition: transform 0.3s, box-shadow 0.3s;
                            z-index: 0;
                            margin-top: 1px;
                            margin-bottom: 10px;
                            border: 1px solid #007bff;
                            border-radius: 10px;
                            background-color: #f8f9fa;
                        }
                        .card:hover {
                            transform: translateY(-10px);
                            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
                        }
                        .card-header {
                            background-color: #007bff;
                            color: white;
                            text-align: center;
                            padding: 15px;
                            font-weight: bold;
                            font-size: 1.5em;
                            border-top-left-radius: 10px;
                            border-top-right-radius: 10px;
                        }
                        .card-body {
                            padding: 20px;
                            max-height: 450px; /* Set max height */
                            overflow-y: auto; /* Enable vertical scrolling */
                        }
                        .patient-i p {
                            margin: 10px 0;
                            padding: 10px;
                            transition: background-color 0.3s, color 0.3s;
                            border-radius: 5px;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            border: 1px solid #ddd;
                            background-color: #ffffff;
                            overflow-x: auto; /* Enable horizontal scrolling */
                            white-space: nowrap; /* Prevent text wrapping */
                        }
                        .patient-i p:hover {
                            background-color: #007bff;
                            color: white;
                            cursor: pointer;
                            border-color: #007bff;
                        }
                        .patient-i p strong {
                            flex: 1;
                            text-align: left;
                            font-style: italic;    
                        }
                        .patient-i p span {
                            flex: 2;
                            text-align: right;
                            margin-left: 100px;
                         }
                    </style>
                    <div class="container mt-5">
                        <div class="row">
                            <div class="col-md-12 text-center">
                                <div class="patient-picture">
                                    <img src="${pictureUrl}" alt="Patient Picture">
                                </div>
                                <div class="card patient-i">
                                    <div class="card-header">Patient Information</div>
                                    <div class="card-body">
                                        <p><strong>Name:</strong> <span>${name}</span></p>
                                        <p><strong>Age:</strong> <span>${age}</span></p>
                                        <p><strong>Gender:</strong> <span>${gender}</span></p>
                                        <p><strong>Email:</strong> <span>${email}</span></p>
                                        <p><strong>Phone:</strong> <span>${phone}</span></p>
                                        <p><strong>Address:</strong> <span>${address}</span></p>
                                        <p><strong>Occupation:</strong> <span>${occupation}</span></p>
                                        <p><strong>Marital Status:</strong> <span>${maritalStatus}</span></p>
                                        <p><strong>Emergency Contact:</strong> <span>${emergencyContact}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                break;
            case 'medical-records-tab':
                content = `
                    <style>
                        .card {
                            margin-bottom: 20px;
                            transition: transform 0.3s, box-shadow 0.3s;
                            border: 1px solid #007bff;
                            border-radius: 10px;
                            background-color: #f8f9fa;
                            margin-top: 20px;
                        }
                        .card:hover {
                            transform: translateY(-10px);
                            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
                        }
                        .card-header {
                            background-color: #007bff;
                            color: white;
                            text-align: center;
                            padding: 15px;
                            font-weight: bold;
                            font-size: 1.5em;
                            border-top-left-radius: 10px;
                            border-top-right-radius: 10px;
                        }
                        .card-body {
                            padding: 20px;
                        }
                        .medical-records p {
                            margin: 10px 0;
                            padding: 10px;
                            transition: background-color 0.3s, color 0.3s;
                            border-radius: 5px;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            border: 1px solid #ddd;
                            background-color: #ffffff;
                            overflow-x: auto; /* Enable horizontal scrolling */
                            white-space: nowrap; /* Prevent text wrapping */
                        }
                        .medical-records p:hover {
                            background-color: #007bff;
                            color: white;
                            cursor: pointer;
                            border-color: #007bff;
                        }
                        .medical-records p strong {
                            flex: 1;
                            text-align: left;
                            font-style: italic;    
                        }
                        .medical-records p span {
                            flex: 2;
                            text-align: right;
                            margin-left: 100px;
                        }
                        .list-all-btn-container {
                            text-align: center;
                            margin-top: 20px;
                            margin-bottom: 20px;
                        }
                        .list-all-btn {
                            background-color: #007bff;
                            color: white;
                            border: none;
                            padding: 10px 20px;
                            font-size: 1em;
                            border-radius: 5px;
                            cursor: pointer;
                            transition: background-color 0.3s, color 0.3s;
                        }
                        .list-all-btn:hover {
                            background-color: #0056b3;
                            color: white;
                        }
                    </style>
                    <div class="container mt-5">
                        <div class="row">
                            <div class="col-md-12">
                                <!-- Medical History Box -->
                                <div class="card medical-records">
                                    <div class="card-header">Medical History</div>
                                    <div class="card-body">
                                        <p><strong>Condition:</strong> <span>Hypertension</span></p>
                                        <p><strong>Condition:</strong> <span>Diabetes Mellitus Type 2</span></p>
                                        <p><strong>Condition:</strong> <span>Asthma</span></p>
                                        <p><strong>Condition:</strong> <span>Hyperlipidemia</span></p>
                                        <p><strong>Condition:</strong> <span>Chronic Kidney Disease</span></p>
                                    </div>
                                </div>
                                <!-- Examination Findings Box -->
                                <div class="card medical-records">
                                    <div class="card-header">Examination Findings</div>
                                    <div class="card-body">
                                        <p><strong>Finding:</strong> <span>Blood Pressure: 140/90 mmHg</span></p>
                                        <p><strong>Finding:</strong> <span>Heart Rate: 80 bpm</span></p>
                                        <p><strong>Finding:</strong> <span>Respiratory Rate: 18 breaths/min</span></p>
                                        <p><strong>Finding:</strong> <span>Temperature: 98.6°F</span></p>
                                        <p><strong>Finding:</strong> <span>Oxygen Saturation: 96%</span></p>
                                    </div>
                                </div>
                                <!-- Treatment Plan Box -->
                                <div class="card medical-records">
                                    <div class="card-header">Treatment Plan</div>
                                    <div class="card-body">
                                        <p><strong>Plan:</strong> <span>Continue Amlodipine 5mg daily</span></p>
                                        <p><strong>Plan:</strong> <span>Start Metformin 500mg twice daily</span></p>
                                        <p><strong>Plan:</strong> <span>Follow-up in 3 months</span></p>
                                        <p><strong>Plan:</strong> <span>Dietary modifications</span></p>
                                        <p><strong>Plan:</strong> <span>Regular exercise</span></p>
                                    </div>
                                </div>
                                <!-- Investigations Box -->
                                <div class="card medical-records">
                                    <div class="card-header">Investigations</div>
                                    <div class="card-body">
                                        <p><strong>Investigation:</strong> <span>Complete Blood Count (CBC)</span></p>
                                        <p><strong>Investigation:</strong> <span>Basic Metabolic Panel (BMP)</span></p>
                                        <p><strong>Investigation:</strong> <span>Chest X-ray</span></p>
                                        <p><strong>Investigation:</strong> <span>Electrocardiogram (ECG)</span></p>
                                        <p><strong>Investigation:</strong> <span>HbA1c</span></p>
                                    </div>
                                </div>
                                <div class="list-all-btn-container">
                                    <button class="list-all-btn">List All Appointments</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                break;
            case 'appointments-tab':
                content = `
                    <style>
                        .card {
                            margin-bottom: 20px;
                            transition: transform 0.3s, box-shadow 0.3s;
                            border: 1px solid #007bff;
                            border-radius: 10px;
                            background-color: #f8f9fa;
                            margin-top: 20px;
                        }
                        .card:hover {
                            transform: translateY(-10px);
                            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
                        }
                        .card-header {
                            background-color: #007bff;
                            color: white;
                            text-align: center;
                            padding: 15px;
                            font-weight: bold;
                            font-size: 1.5em;
                            border-top-left-radius: 10px;
                            border-top-right-radius: 10px;
                        }
                        .card-body {
                            padding: 20px;
                            overflow-x: auto; /* Enable horizontal scrolling */
                            white-space: nowrap; /* Prevent wrapping */
                        }
                        .appointments .header, .appointments .appointment {
                            text-align: center;
                            padding: 10px;
                            border-bottom: 2px solid #007bff;
                        }
                        @media (max-width: 480px) {
                            .appointments .header, .appointments .appointment {
                                width: 250%;
                                display: grid;
                                grid-template-columns: 150px 150px 200px 150px; /* Fixed space between values */
                            }
                        }
                        @media (min-width: 480px) and (max-width: 750px){
                            .appointments .header, .appointments .appointment {
                                width: 170%;
                                display: grid;
                                grid-template-columns: 150px 150px 200px 150px; /* Fixed space between values */
                            }
                        }
                        .appointments .header {
                            font-weight: bold;
                            background-color: #f8f9fa;
                            position: sticky;
                            top: 0;
                            z-index: 1;
                        }
                        .appointments .appointment {
                            margin: 10px 0;
                            transition: background-color 0.3s, color 0.3s;
                            border-radius: 50px;
                            border: 1px solid #ddd;
                            background-color: #ffffff;
                        }
                        .appointments .appointment:hover {
                            background-color: #007bff;
                            color: white;
                            cursor: pointer;
                            border-color: #007bff;
                        }
                        .appointments .header span, .appointments .appointment span {
                            display: inline-block;
                            min-width: 150px; /* Fixed space between values */
                        }
                        .list-all-btn-container {
                            text-align: center;
                            margin-top: 20px;
                            margin-bottom: 20px;
                        }
                        .list-all-btn {
                            background-color: #007bff;
                            color: white;
                            border: none;
                            padding: 10px 20px;
                            font-size: 1em;
                            border-radius: 5px;
                            cursor: pointer;
                            transition: background-color 0.3s, color 0.3s;
                        }
                        .list-all-btn:hover {
                            background-color: #0056b3;
                            color: white;
                        }
                    </style>
                    <div class="container mt-5">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="card">
                                    <div class="card-header">Appointments</div>
                                </div>
                                <div class="card appointments">
                                    <div class="card-body">
                                        <div class="header">
                                            <span>Date</span>
                                            <span>Time</span>
                                            <span>Doctor</span>
                                            <span>Status</span>
                                        </div>
                                        <div class="appointment">
                                            <span>2023-10-01</span>
                                            <span>10:00 AM</span>
                                            <span>Dr. Emily Johnson</span>
                                            <span>Scheduled</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="card appointments">
                                    <div class="card-body">
                                        <div class="header">
                                            <span>Date</span>
                                            <span>Time</span>
                                            <span>Doctor</span>
                                            <span>Status</span>
                                        </div>
                                        <div class="appointment">
                                            <span>2023-11-01</span>
                                            <span>11:00 AM</span>
                                            <span>Dr. Michael Brown</span>
                                            <span>Scheduled</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="card appointments">
                                    <div class="card-body">
                                        <div class="header">
                                            <span>Date</span>
                                            <span>Time</span>
                                            <span>Doctor</span>
                                            <span>Status</span>
                                        </div>
                                        <div class="appointment">
                                            <span>2023-12-01</span>
                                            <span>09:00 AM</span>
                                            <span>Dr. Sarah Davis</span>
                                            <span>Completed</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="card appointments">
                                    <div class="card-body">
                                        <div class="header">
                                            <span>Date</span>
                                            <span>Time</span>
                                            <span>Doctor</span>
                                            <span>Status</span>
                                        </div>
                                        <div class="appointment">
                                            <span>2024-01-01</span>
                                            <span>02:00 PM</span>
                                            <span>Dr. John Doe</span>
                                            <span>Cancelled</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="card appointments">
                                    <div class="card-body">
                                        <div class="header">
                                            <span>Date</span>
                                            <span>Time</span>
                                            <span>Doctor</span>
                                            <span>Status</span>
                                        </div>
                                        <div class="appointment">
                                            <span>2024-02-01</span>
                                            <span>03:00 PM</span>
                                            <span>Dr. Jane Smith</span>
                                            <span>Scheduled</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="list-all-btn-container">
                                    <button class="list-all-btn">List All Appointments</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                break;
            case 'statistics-tab':
                content = `
                    <style>
                        .card {
                            margin-bottom: 20px;
                            transition: transform 0.3s, box-shadow 0.3s;
                            margin-top: 30px;
                        }
                        .card:hover {
                            transform: translateY(-10px);
                            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
                        }
                        .card-header {
                            background-color: #007bff;
                            color: white;
                            text-align: center;
                            padding: 10px;
                            font-weight: bold;
                        }
                        .card-body {
                            padding: 20px;
                        }
                        .health-statistics .chart-description {
                            text-align: center;
                            margin-top: 10px;
                            font-style: italic;
                        }
                    </style>
                    <div class="container mt-5">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="card health-statistics">
                                    <div class="card-header">Health Statistics</div>
                                    <div class="card-body">
                                        <canvas id="blood-pressure-chart"></canvas>
                                        <p class="chart-description">Blood Pressure over time.</p>
                                    </div>
                                </div>
                                <div class="card health-statistics">
                                    <div class="card-header">Heart Rate</div>
                                    <div class="card-body">
                                        <canvas id="heart-rate-chart"></canvas>
                                        <p class="chart-description">Heart Rate trends over time.</p>
                                    </div>
                                </div>
                                <div class="card health-statistics">
                                    <div class="card-header">Blood Sugar Levels</div>
                                    <div class="card-body">
                                        <canvas id="blood-sugar-chart"></canvas>
                                        <p class="chart-description">Blood Sugar levels over time.</p>
                                    </div>
                                </div>
                                <div class="card health-statistics">
                                    <div class="card-header">Cholesterol Levels</div>
                                    <div class="card-body">
                                        <canvas id="cholesterol-chart"></canvas>
                                        <p class="chart-description">Cholesterol levels over time.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                break;
            default:
                content = '<p>Invalid tab selected.</p>';
        }

        // Update the dashboard content
        dashboardContent.innerHTML = content;

        // Initialize charts if the statistics tab is selected
        if (tabId === 'statistics-tab') {
            initializeHealthStatisticsChart();
        }
    }

    // Function to initialize the health statistics charts
    function initializeHealthStatisticsChart() {
        const bloodPressureCtx = document.getElementById('blood-pressure-chart').getContext('2d');
        new Chart(bloodPressureCtx, {
            type: 'line',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [{
                    label: 'Systolic',
                    data: [120, 125, 130, 128, 126, 124, 122],
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    fill: true
                }, {
                    label: 'Diastolic',
                    data: [80, 82, 85, 83, 81, 79, 78],
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    fill: true
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Month'
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Blood Pressure (mmHg)'
                        }
                    }
                }
            }
        });

        const heartRateCtx = document.getElementById('heart-rate-chart').getContext('2d');
        new Chart(heartRateCtx, {
            type: 'line',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [{
                    label: 'Heart Rate',
                    data: [70, 72, 75, 73, 71, 69, 68],
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    fill: true
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Month'
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Heart Rate (bpm)'
                        }
                    }
                }
            }
        });

        const bloodSugarCtx = document.getElementById('blood-sugar-chart').getContext('2d');
        new Chart(bloodSugarCtx, {
            type: 'line',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [{
                    label: 'Fasting Blood Sugar',
                    data: [90, 92, 95, 93, 91, 89, 88],
                    borderColor: 'rgba(255, 206, 86, 1)',
                    backgroundColor: 'rgba(255, 206, 86, 0.2)',
                    fill: true
                }, {
                    label: 'Postprandial Blood Sugar',
                    data: [140, 145, 150, 148, 146, 144, 142],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Month'
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Blood Sugar (mg/dL)'
                        }
                    }
                }
            }
        });

        const cholesterolCtx = document.getElementById('cholesterol-chart').getContext('2d');
        new Chart(cholesterolCtx, {
            type: 'bar',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [{
                    label: 'Total Cholesterol',
                    data: [200, 195, 190, 185, 180, 175, 170],
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }, {
                    label: 'LDL',
                    data: [130, 125, 120, 115, 110, 105, 100],
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }, {
                    label: 'HDL',
                    data: [50, 52, 54, 56, 58, 60, 62],
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }, {
                    label: 'Triglycerides',
                    data: [150, 145, 140, 135, 130, 125, 120],
                    backgroundColor: 'rgba(255, 206, 86, 0.2)',
                    borderColor: 'rgba(255, 206, 86, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Month'
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Cholesterol (mg/dL)'
                        }
                    }
                }
            }
        });
    }
})

async function fetchOverviewData() {
    try {
        const response = await fetch(`https:/concare.kachy.tech/hie_api/v1/patients/${patientData.id}`, {
            credentials: 'include',
            headers: {
                'SameSite': 'None',

              }
        }); 
        if (response.ok) {
            return await response.json();
        } else {
            console.error('Failed to fetch overview data');
            return null;
        }
    } catch (error) {
        console.error('Error fetching overview data:', error);
        return null;
    }
}
