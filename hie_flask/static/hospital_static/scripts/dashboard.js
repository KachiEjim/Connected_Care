document.addEventListener('DOMContentLoaded', function() {
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

    function fetchData(tabId) {
        let content = '';

        switch (tabId) {
            case 'overview-tab':
                content = `
                    <style>
                        .card {
                            margin-bottom: 20px;
                            transition: transform 0.3s, box-shadow 0.3s;
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
                        .card-body ul {
                            list-style-type: none;
                            padding: 0;
                        }
                        .card-body ul li {
                            background-color: #f8f9fa;
                            margin: 5px 0;
                            padding: 10px;
                            border-radius: 5px;
                            transition: background-color 0.3s;
                        }
                        .card-body ul li:hover {
                            background-color: #e0e0e0;
                        }
                        .mt-4 h3 {
                            color: #007bff;
                        }
                        .mt-4 ul {
                            list-style-type: none;
                            padding: 0;
                        }
                        .mt-4 ul li {
                            background-color: #f8f9fa;
                            margin: 5px 0;
                            padding: 10px;
                            border-radius: 5px;
                            transition: background-color 0.3s;
                        }
                        .mt-4 ul li:hover {
                            background-color: #e0e0e0;
                        }
                        .map-container {
                            margin: 20px 0;
                            border: 1px solid #ddd;
                            border-radius: 5px;
                            overflow: hidden;
                        }
                    </style>
                    <div class="container mt-5">
                        <!-- Initial content will be the Overview section -->
                        <div id="overview-content">
                            <div class="card">
                                <h2 class="card-header">Overview</h2>
                                <p>Location: XYZ Hospital, 123 Main St, City, Country</p>
                                <div class="map-container">
                                    <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3931.123456789!2d7.497123456789!3d6.497123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1041234567890!2s25%20Moses%20Ogbodo%20Street%2C%20Toplan%2C%20Enugu%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1614311234567!5m2!1sen!2sng"
                                    width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
                                </div>
                                <p>About: XYZ Hospital is a leading healthcare provider...</p>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="card">
                                        <div class="card-header">Services</div>
                                        <div class="card-body">
                                            <ul>
                                                <li>Emergency Care</li>
                                                <li>Outpatient Services</li>
                                                <li>Inpatient Services</li>
                                                <li>Diagnostic Imaging</li>
                                                <li>Laboratory Services</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="card">
                                        <div class="card-header">Departments</div>
                                        <div class="card-body">
                                            <ul>
                                                <li>Cardiology</li>
                                                <li>Neurology</li>
                                                <li>Orthopedics</li>
                                                <li>Pediatrics</li>
                                                <li>Oncology</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="card">
                                        <div class="card-header">Key Staff</div>
                                        <div class="card-body">
                                            <ul>
                                                <li>Dr. John Doe - Chief Medical Officer</li>
                                                <li>Dr. Jane Smith - Head of Cardiology</li>
                                                <li>Dr. Emily Johnson - Head of Neurology</li>
                                                <li>Dr. Michael Brown - Head of Orthopedics</li>
                                                <li>Dr. Sarah Davis - Head of Pediatrics</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-4">
                                <h3>Recent Achievements</h3>
                                <ul>
                                    <li>Accredited as a top hospital in the region for patient care.</li>
                                    <li>Implemented state-of-the-art robotic surgery technology.</li>
                                    <li>Opened a new wing dedicated to pediatric care.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `;
                break;
                case 'patient-management-tab':
                    content = `
                        <style>
                            .card {
                                margin-bottom: 20px;
                                transition: transform 0.3s, box-shadow 0.3s;
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
                            .btn-primary {
                                background-color: #007bff;
                                border-color: #007bff;
                                transition: background-color 0.3s, border-color 0.3s;
                            }
                            .btn-primary:hover {
                                background-color: #0056b3;
                                border-color: #0056b3;
                            }
                            .row {
                                display: flex;
                                flex-wrap: wrap;
                            }
                            .col-md-6 {
                                flex: 0 0 50%;
                                max-width: 50%;
                                padding: 15px;
                            }
                            @media (max-width: 768px) {
                                .col-md-6 {
                                    flex: 0 0 95%;
                                    max-width: 95%;
                                    margin: 0 auto; /* Center the box */
                                }
                            }
                            .patient-list {
                                max-height: 400px; /* Set a max height for the patient list */
                                overflow-y: auto; /* Enable vertical scrolling */
                                overflow-x: auto; /* Enable horizontal scrolling */
                            }
                            .patient-list table {
                                width: 100%;
                                border-collapse: collapse;
                            }
                            .patient-list th, .patient-list td {
                                border: 1px solid #ddd;
                                padding: 8px;
                                text-align: left;
                                transition: background-color 0.3s;
                            }
                            .patient-list th {
                                background-color: #f2f2f2;
                                font-weight: bold;
                            }
                            .patient-list tr:hover {
                                background-color: #f1f1f1;
                            }
                            .patient-list tr {
                                cursor: pointer;
                            }
                            .search-field {
                                display: none;
                                margin-top: 10px;
                            }
                            .search-field input {
                                width: 100%;
                                padding: 5px;
                                margin-top: 5px;
                            }
                            .list-all-btn {
                                margin-top: 20px;
                                text-align: center;
                            }
                        </style>
                        <div id="patient-management-content">
                            <h2>Patient Management</h2>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="card">
                                        <div class="card-header">Patient Registration</div>
                                        <div class="card-body">
                                            <p>Register new patients and manage their information.</p>
                                            <button class="btn btn-primary" onclick="openPatientRegistration()">Register Patient</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="card">
                                        <div class="card-header">Search Patients</div>
                                        <div class="card-body">
                                            <div class="form-group">
                                                <label><input type="radio" name="search-option" onclick="toggleSearchField('search-id')"> Search by ID</label>
                                                <div id="search-id" class="search-field">
                                                    <input type="text" placeholder="Enter Patient ID">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label><input type="radio" name="search-option" onclick="toggleSearchField('search-email')"> Search by Email</label>
                                                <div id="search-email" class="search-field">
                                                    <input type="text" placeholder="Enter Patient Email">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label><input type="radio" name="search-option" onclick="toggleSearchField('search-first-name')"> Search by First Name</label>
                                                <div id="search-first-name" class="search-field">
                                                    <input type="text" placeholder="Enter Patient First Name">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label><input type="radio" name="search-option" onclick="toggleSearchField('search-last-name')"> Search by Last Name</label>
                                                <div id="search-last-name" class="search-field">
                                                    <input type="text" placeholder="Enter Patient Last Name">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label><input type="radio" name="search-option" onclick="toggleSearchField('search-age')"> Search by Age</label>
                                                <div id="search-age" class="search-field">
                                                    <input type="text" placeholder="Enter Patient Age">
                                                </div>
                                            </div>
                                            <button class="btn btn-primary" onclick="searchPatients()">Search</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-4">
                                <div class="col-md-12">
                                    <div class="card">
                                        <div class="card-header">Patients</div>
                                        <div class="card-body patient-list">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>First Name</th>
                                                        <th>Last Name</th>
                                                        <th>Other Names</th>
                                                        <th>Email</th>
                                                        <th>Age</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr onclick="viewPatientDetails(1)">
                                                        <td>1</td>
                                                        <td>John</td>
                                                        <td>Doe</td>
                                                        <td>Michael</td>
                                                        <td>john.doe@example.com</td>
                                                        <td>30</td>
                                                    </tr>
                                                    <tr onclick="viewPatientDetails(2)">
                                                        <td>2</td>
                                                        <td>Jane</td>
                                                        <td>Smith</td>
                                                        <td>Anne</td>
                                                        <td>jane.smith@example.com</td>
                                                        <td>25</td>
                                                    </tr>
                                                    <tr onclick="viewPatientDetails(3)">
                                                        <td>3</td>
                                                        <td>Emily</td>
                                                        <td>Johnson</td>
                                                        <td>Rose</td>
                                                        <td>emily.johnson@example.com</td>
                                                        <td>40</td>
                                                    </tr>
                                                    <tr onclick="viewPatientDetails(4)">
                                                        <td>4</td>
                                                        <td>Michael</td>
                                                        <td>Brown</td>
                                                        <td>James</td>
                                                        <td>michael.brown@example.com</td>
                                                        <td>35</td>
                                                    </tr>
                                                    <tr onclick="viewPatientDetails(5)">
                                                        <td>5</td>
                                                        <td>Sarah</td>
                                                        <td>Davis</td>
                                                        <td>Elizabeth</td>
                                                        <td>sarah.davis@example.com</td>
                                                        <td>28</td>
                                                    </tr>
                                                    <tr onclick="viewPatientDetails(6)">
                                                        <td>6</td>
                                                        <td>David</td>
                                                        <td>Wilson</td>
                                                        <td>Andrew</td>
                                                        <td>david.wilson@example.com</td>
                                                        <td>45</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="list-all-btn">
                                <button class="btn btn-primary" onclick="listAllPatients()">List All Patients</button>
                            </div>
                        </div>
                    `;
                    break;
            case 'doctor-management-tab':
                content = `
                    <div id="doctor-management-content">
                        <h2>Doctor Management</h2>
                        <p>Details about doctor management will go here.</p>
                    </div>
                `;
                break;
            case 'appointments-tab':
                content = `
                    <div id="appointments-content">
                        <h2>Appointments</h2>
                        <p>Details about appointments will go here.</p>
                    </div>
                `;
                break;
            case 'statistics-tab':
                content = `
                    <div id="statistics-content">
                        <h2>Statistics</h2>
                        <p>Charts and statistics will go here.</p>
                    </div>
                `;
                break;
            default:
                content = '<p>Invalid tab selected.</p>';
        }

        // Update the dashboard content
        dashboardContent.innerHTML = content;
    }
});

function toggleSearchField(fieldId) {
    const field = document.getElementById(fieldId);
    if (field.style.display === 'none' || field.style.display === '') {
        field.style.display = 'block';
    } else {
        field.style.display = 'none';
    }
}

function openPatientRegistration() {
    alert('Open Patient Registration Form');
    // Implement the logic to open the patient registration form
}

function searchPatients() {
    alert('Search Patients');
    // Implement the logic to search patients
}

function listAllPatients() {
    alert('List All Patients');
    // Implement the logic to list all patients
}