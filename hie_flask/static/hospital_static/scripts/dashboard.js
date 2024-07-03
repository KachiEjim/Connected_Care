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
                            padding: 15px;
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
                            margin-top: -10px;
                            text-align: center;
                        }
                        h2 {
                                text-align: center;
                                color: white;
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
                        .doctor-list {
                            max-height: 400px; /* Set a max height for the doctor list */
                            overflow-y: auto; /* Enable vertical scrolling */
                            overflow-x: auto; /* Enable horizontal scrolling */
                        }
                        .doctor-list table {
                            width: 100%;
                            border-collapse: collapse;
                        }
                        .doctor-list th, .doctor-list td {
                            border: 1px solid #ddd;
                            padding: 12px;
                            text-align: left;
                            transition: background-color 0.3s;
                        }
                        .doctor-list th {
                            background-color: #f2f2f2;
                            font-weight: bold;
                        }
                        .doctor-list tr:hover {
                            background-color: #f1f1f1;
                        }
                        .doctor-list tr {
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
                            margin-top: -10px;
                            text-align: center;
                        }
                        h2 {
                                text-align: center;
                                color: white;
                        }
                    </style>
                    <div id="doctor-management-content">
                        <h2>Doctor Management</h2>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="card">
                                    <div class="card-header">Doctor Registration</div>
                                    <div class="card-body">
                                        <p>Register new doctors and manage their information.</p>
                                        <button class="btn btn-primary" onclick="openDoctorRegistration()">Register Doctor</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="card">
                                    <div class="card-header">Search Doctors</div>
                                    <div class="card-body">
                                        <div class="form-group">
                                            <label><input type="radio" name="search-option" onclick="toggleSearchField('search-id')"> Search by ID</label>
                                            <div id="search-id" class="search-field">
                                                <input type="text" placeholder="Enter Doctor ID">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label><input type="radio" name="search-option" onclick="toggleSearchField('search-email')"> Search by Email</label>
                                            <div id="search-email" class="search-field">
                                                <input type="text" placeholder="Enter Doctor Email">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label><input type="radio" name="search-option" onclick="toggleSearchField('search-first-name')"> Search by First Name</label>
                                            <div id="search-first-name" class="search-field">
                                                <input type="text" placeholder="Enter Doctor First Name">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label><input type="radio" name="search-option" onclick="toggleSearchField('search-last-name')"> Search by Last Name</label>
                                            <div id="search-last-name" class="search-field">
                                                <input type="text" placeholder="Enter Doctor Last Name">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label><input type="radio" name="search-option" onclick="toggleSearchField('search-specialty')"> Search by Specialty</label>
                                            <div id="search-specialty" class="search-field">
                                                <input type="text" placeholder="Enter Doctor Specialty">
                                            </div>
                                        </div>
                                        <button class="btn btn-primary" onclick="searchDoctors()">Search</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col-md-12">
                                <div class="card">
                                    <div class="card-header">Doctors</div>
                                    <div class="card-body doctor-list">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>First Name</th>
                                                    <th>Last Name</th>
                                                    <th>Email</th>
                                                    <th>Specialty</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr onclick="viewDoctorDetails(1)">
                                                    <td>1</td>
                                                    <td>Dr. John</td>
                                                    <td>Doe</td>
                                                    <td>john.doe@example.com</td>
                                                    <td>Cardiology</td>
                                                </tr>
                                                <tr onclick="viewDoctorDetails(2)">
                                                    <td>2</td>
                                                    <td>Dr. Jane</td>
                                                    <td>Smith</td>
                                                    <td>jane.smith@example.com</td>
                                                    <td>Neurology</td>
                                                </tr>
                                                <tr onclick="viewDoctorDetails(3)">
                                                    <td>3</td>
                                                    <td>Dr. Emily</td>
                                                    <td>Johnson</td>
                                                    <td>emily.johnson@example.com</td>
                                                    <td>Orthopedics</td>
                                                </tr>
                                                <tr onclick="viewDoctorDetails(4)">
                                                    <td>4</td>
                                                    <td>Dr. Michael</td>
                                                    <td>Brown</td>
                                                    <td>michael.brown@example.com</td>
                                                    <td>Pediatrics</td>
                                                </tr>
                                                <tr onclick="viewDoctorDetails(5)">
                                                    <td>5</td>
                                                    <td>Dr. Sarah</td>
                                                    <td>Davis</td>
                                                    <td>sarah.davis@example.com</td>
                                                    <td>Oncology</td>
                                                </tr>
                                                <tr onclick="viewDoctorDetails(6)">
                                                    <td>6</td>
                                                    <td>Dr. David</td>
                                                    <td>Wilson</td>
                                                    <td>david.wilson@example.com</td>
                                                    <td>General Surgery</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="list-all-btn">
                            <button class="btn btn-primary" onclick="listAllDoctors()">List All Doctors</button>
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
                        .appointment-list {
                            max-height: 400px; /* Set a max height for the appointment list */
                            overflow-y: auto; /* Enable vertical scrolling */
                            overflow-x: auto; /* Enable horizontal scrolling */
                        }
                        .appointment-list table {
                            width: 100%;
                            border-collapse: collapse;
                        }
                        .appointment-list th, .appointment-list td {
                            border: 1px solid #ddd;
                            padding: 15px;
                            text-align: left;
                            transition: background-color 0.3s;
                        }
                        .appointment-list th {
                            background-color: #f2f2f2;
                            font-weight: bold;
                        }
                        .appointment-list tr:hover {
                            background-color: #f1f1f1;
                        }
                        .appointment-list tr {
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
                            margin-top: -10px;
                            text-align: center;
                        }
                        h2 {
                                text-align: center;
                                color: white;
                        }
                    </style>
                    <div id="appointments-content">
                        <h2>Appointments</h2>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="card">
                                    <div class="card-header">Schedule Appointment</div>
                                    <div class="card-body">
                                        <p>Schedule new appointments and manage existing ones.</p>
                                        <button class="btn btn-primary" onclick="openAppointmentForm()">Schedule Appointment</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="card">
                                    <div class="card-header">Search Appointments</div>
                                    <div class="card-body">
                                        <div class="form-group">
                                            <label><input type="radio" name="search-option" onclick="toggleSearchField('search-id')"> Search by ID</label>
                                            <div id="search-id" class="search-field">
                                                <input type="text" placeholder="Enter Appointment ID">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label><input type="radio" name="search-option" onclick="toggleSearchField('search-patient-name')"> Search by Patient Name</label>
                                            <div id="search-patient-name" class="search-field">
                                                <input type="text" placeholder="Enter Patient Name">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label><input type="radio" name="search-option" onclick="toggleSearchField('search-doctor-name')"> Search by Doctor Name</label>
                                            <div id="search-doctor-name" class="search-field">
                                                <input type="text" placeholder="Enter Doctor Name">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label><input type="radio" name="search-option" onclick="toggleSearchField('search-date')"> Search by Date</label>
                                            <div id="search-date" class="search-field">
                                                <input type="date" placeholder="Enter Date">
                                            </div>
                                        </div>
                                        <button class="btn btn-primary" onclick="searchAppointments()">Search</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col-md-12">
                                <div class="card">
                                    <div class="card-header">Upcoming Appointments</div>
                                    <div class="card-body appointment-list">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Patient Name</th>
                                                    <th>Doctor Name</th>
                                                    <th>Date</th>
                                                    <th>Time</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr onclick="viewAppointmentDetails(1)">
                                                    <td>1</td>
                                                    <td>John Doe</td>
                                                    <td>Dr. Emily Johnson</td>
                                                    <td>2023-10-01</td>
                                                    <td>10:00 AM</td>
                                                    <td>Scheduled</td>
                                                </tr>
                                                <tr onclick="viewAppointmentDetails(2)">
                                                    <td>2</td>
                                                    <td>Jane Smith</td>
                                                    <td>Dr. Michael Brown</td>
                                                    <td>2023-10-02</td>
                                                    <td>11:00 AM</td>
                                                    <td>Scheduled</td>
                                                </tr>
                                                <tr onclick="viewAppointmentDetails(3)">
                                                    <td>3</td>
                                                    <td>David Wilson</td>
                                                    <td>Dr. Sarah Davis</td>
                                                    <td>2023-10-03</td>
                                                    <td>02:00 PM</td>
                                                    <td>Scheduled</td>
                                                </tr>
                                                <tr onclick="viewAppointmentDetails(4)">
                                                    <td>4</td>
                                                    <td>Emily Johnson</td>
                                                    <td>Dr. John Doe</td>
                                                    <td>2023-10-04</td>
                                                    <td>03:00 PM</td>
                                                    <td>Scheduled</td>
                                                </tr>
                                                <tr onclick="viewAppointmentDetails(5)">
                                                    <td>5</td>
                                                    <td>Michael Brown</td>
                                                    <td>Dr. Jane Smith</td>
                                                    <td>2023-10-05</td>
                                                    <td>04:00 PM</td>
                                                    <td>Scheduled</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="list-all-btn">
                            <button class="btn btn-primary" onclick="listAllAppointments()">List All Appointments</button>
                        </div>
                    </div>
                `;
                break;
            case 'statistics-tab':
                content = `
                    <style>
                        #statistics-content {
                            margin-top: 20px;
                        }
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
                        .chart-description {
                            text-align: center;
                            margin-top: 10px;
                            font-style: italic;
                        }
                        h2{
                             text-align: center;
                             color: white;
                        }
                        h2:hover{
                            color: blue;
                            font-style: italic;
                        }
                    </style>
             <section id="statistics-content">
        <h2>Statistics</h2>
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">Patient Statistics</div>
                        <div class="card-body">
                            <canvas id="patient-demographics-chart"></canvas>
                            <p class="chart-description">This chart shows the distribution of patients by age group.</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">Appointment Statistics</div>
                        <div class="card-body">
                            <canvas id="appointment-trends-chart"></canvas>
                            <p class="chart-description">This chart shows the number of appointments scheduled each month.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">Revenue Statistics</div>
                        <div class="card-body">
                            <canvas id="revenue-chart"></canvas>
                            <p class="chart-description">This chart shows the monthly revenue generated by the hospital.</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">Doctor Performance</div>
                        <div class="card-body">
                            <canvas id="doctor-performance-chart"></canvas>
                            <p class="chart-description">This chart shows the number of patients seen by each doctor.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
                `;
                break;
            default:
                content = '<p>Invalid tab selected.</p>';
        }

        // Update the dashboard content
        dashboardContent.innerHTML = content;

        // Initialize charts if the statistics tab is selected
        if (tabId === 'statistics-tab') {
            initializeCharts();
        }
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
    const registrationForm = document.getElementById('registration-form');
    registrationForm.innerHTML = '<p>Loading...</p>'; // Show loading message

    fetch('http://52.91.118.78/patient/signup')
        .then(response => response.text())
        .then(data => {
            registrationForm.innerHTML = data;
        })
        .catch(error => {
            registrationForm.innerHTML = '<p>Error loading form. Please try again later.</p>';
            console.error('Error fetching registration form:', error);
        });
}

function searchPatients() {
    alert('Search Patients');
    // Implement the logic to search patients
}

function listAllPatients() {
    alert('List All Patients');
    // Implement the logic to list all patients
}

function openDoctorRegistration() {
    const registrationForm = document.getElementById('registration-form');
    registrationForm.innerHTML = '<p>Loading...</p>'; // Show loading message

    fetch('http://52.91.118.78/doctor/signup')
        .then(response => response.text())
        .then(data => {
            registrationForm.innerHTML = data;
        })
        .catch(error => {
            registrationForm.innerHTML = '<p>Error loading form. Please try again later.</p>';
            console.error('Error fetching registration form:', error);
        });
}

function searchDoctors() {
    alert('Search Doctors');
    // Implement the logic to search doctors
}

function listAllDoctors() {
    alert('List All Doctors');
    // Implement the logic to list all doctors
}

function viewDoctorDetails(doctorId) {
    alert('View Doctor Details for ID: ' + doctorId);
    // Implement the logic to view doctor details
}

function openAppointmentForm() {
    const appointmentForm = document.getElementById('appointment-form');
    appointmentForm.innerHTML = '<p>Loading...</p>'; // Show loading message

    fetch('http://52.91.118.78/appointment/schedule')
        .then(response => response.text())
        .then(data => {
            appointmentForm.innerHTML = data;
        })
        .catch(error => {
            appointmentForm.innerHTML = '<p>Error loading form. Please try again later.</p>';
            console.error('Error fetching appointment form:', error);
        });
}

function searchAppointments() {
    alert('Search Appointments');
    // Implement the logic to search appointments
}

function listAllAppointments() {
    alert('List All Appointments');
    // Implement the logic to list all appointments
}

function viewAppointmentDetails(appointmentId) {
    alert('View Appointment Details for ID: ' + appointmentId);
    // Implement the logic to view appointment details
}
    // Example chart data


    const patientDemographicsData = {
        labels: ['0-18', '19-35', '36-50', '51+'],
        datasets: [{
            label: 'Patient Demographics',
            data: [100, 150, 200, 50],
            backgroundColor: [
                'rgba(255, 0, 0, 1)',     // Bright Red
                'rgba(0, 128, 0, 1)',     // Bright Green
                'rgba(0, 0, 255, 1)',     // Bright Blue
                'rgba(255, 255, 0, 1)',   // Bright Yellow
                'rgba(255, 165, 0, 1)',   // Bright Orange
                'rgba(75, 0, 130, 1)',    // Bright Indigo
                'rgba(238, 130, 238, 1)', // Bright Violet
                'rgba(0, 255, 0, 1)',     // Bright Lime
                'rgba(255, 20, 147, 1)',  // Bright Deep Pink
                'rgba(0, 191, 255, 1)'    // Bright Deep Sky Blue
            ],
            borderColor: [
            'black'    // Bright Deep Sky Blue
        ],
        }]
    };

    const appointmentTrendsData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Appointments',
            data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
            borderColor: [
                'rgba(0, 191, 255, 1)'    // Bright Deep Sky Blue
            ],
         backgroundColor: [
                'rgba(255, 99, 132, 1)',  // Bright Pink
                'rgba(54, 162, 235, 1)',  // Bright Blue
                'rgba(255, 206, 86, 1)',  // Bright Yellow
                'rgba(75, 192, 192, 1)',  // Bright Teal
                'rgba(153, 102, 255, 1)', // Bright Purple
                'rgba(255, 159, 64, 1)',  // Bright Orange
                'rgba(0, 255, 127, 1)',   // Bright Spring Green
                'rgba(255, 69, 0, 1)',    // Bright Red-Orange
                'rgba(0, 255, 255, 1)',   // Bright Cyan
                'rgba(255, 20, 147, 1)'   // Bright Deep Pink
            ],
            fill: false
        }]
    };

    const revenueData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Revenue ($)',
            data: [5000, 7000, 8000, 6000, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000],
            borderColor: [
                'rgba(0, 191, 255, 1)'    // Bright Deep Sky Blue
            ],
            backgroundColor: [
                'rgba(255, 0, 0, 1)',     // Bright Red
                'rgba(0, 128, 0, 1)',     // Bright Green
                'rgba(0, 0, 255, 1)',     // Bright Blue
                'rgba(255, 255, 0, 1)',   // Bright Yellow
                'rgba(255, 165, 0, 1)',   // Bright Orange
                'rgba(75, 0, 130, 1)',    // Bright Indigo
                'rgba(238, 130, 238, 1)', // Bright Violet
                'rgba(0, 255, 0, 1)',     // Bright Lime
                'rgba(255, 20, 147, 1)',  // Bright Deep Pink
                'rgba(0, 191, 255, 1)'    // Bright Deep Sky Blue
            ],
            fill: false
        }]
    };

    const doctorPerformanceData = {
        labels: ['Dr. John Doe', 'Dr. Jane Smith', 'Dr. Emily Johnson', 'Dr. Michael Brown', 'Dr. Sarah Davis'],
        datasets: [{
            label: 'Patients Seen',
            data: [50, 60, 70, 80, 90],
            backgroundColor: [
                'rgba(255, 0, 0, 1)',     // Bright Red
                'rgba(0, 128, 0, 1)',     // Bright Green
                'rgba(0, 0, 255, 1)',     // Bright Blue
                'rgba(255, 255, 0, 1)',   // Bright Yellow
                'rgba(255, 165, 0, 1)',   // Bright Orange
                'rgba(75, 0, 130, 1)',    // Bright Indigo
                'rgba(238, 130, 238, 1)', // Bright Violet
                'rgba(0, 255, 0, 1)',     // Bright Lime
                'rgba(255, 20, 147, 1)',  // Bright Deep Pink
                'rgba(0, 191, 255, 1)'    // Bright Deep Sky Blue
            ],
        }]
    };

    function initializeCharts() {
        new Chart(document.getElementById('patient-demographics-chart'), {
            type: 'pie',
            data: patientDemographicsData
        });

        new Chart(document.getElementById('appointment-trends-chart'), {
            type: 'doughnut',
            data: appointmentTrendsData
        });

        new Chart(document.getElementById('revenue-chart'), {
            type: 'bar',
            data: revenueData
        });

        new Chart(document.getElementById('doctor-performance-chart'), {
            type: 'polarArea',
            data: doctorPerformanceData
        });
    }