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
                        .fixed-nav-section {
                            white-space: nowrap; /* Prevents wrapping of tabs */
                        }
                        .doctor-picture {
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
                        .doctor-picture img {
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                            border-radius: 50%;
                            filter: grayscale(1);
                            transition: filter 0.3s ease, transform 0.3s ease;
                        }
                        .doctor-picture img:hover {
                            filter: grayscale(0);
                            transform: scale(1.1);
                        }
                        .doctor-picture:hover {
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
                        .doctor-i p {
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
                        .doctor-i p:hover {
                            background-color: #007bff;
                            color: white;
                            cursor: pointer;
                            border-color: #007bff;
                        }
                        .doctor-i p strong {
                            flex: 1;
                            text-align: left;
                            font-style: italic;    
                        }
                        .doctor-i p span {
                            flex: 2;
                            text-align: right;
                            margin-left: 100px;
                         }
                    </style>
                    <div class="container mt-5">
                        <div class="row">
                            <div class="col-md-12 text-center">
                                <div class="doctor-picture">
                                    <img src="../../static/landing_page_static/img/img1.png" alt="Doctor Picture">
                                </div>
                                <div class="card doctor-i">
                                    <div class="card-header">Doctor Information</div>
                                    <div class="card-body">
                                        <p><strong>ID:</strong> <span>12345</span></p>
                                        <p><strong>Name:</strong> <span>Dr. John Smith</span></p>
                                        <p><strong>Specialty:</strong> <span>Cardiology</span></p>
                                        <p><strong>Email:</strong> <span>john.smith@example.com</span></p>
                                        <p><strong>Phone:</strong> <span>(123) 456-7890</span></p>
                                        <p><strong>Office:</strong> <span>Room 101, Main Building</span></p>
                                        <p><strong>Experience:</strong> <span>10 years</span></p>
                                        <p><strong>Education:</strong> <span>Harvard Medical School</span></p>
                                        <p><strong>Languages:</strong> <span>English, Spanish</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                break;

                case 'patients-tab':
                    content = `
                    <style>
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
                        border-radius: 10%;

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
                        background-color: #007bff;
                        color: white;
                        cursor: pointer;
                        border-color: #007bff;
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
                        text-align: center;
                        margin-top: 20px;
                      }
                      h2 {
                        text-align: center;
                        color: white;
                      }
                        .headersinfo{
                        color: black;
                        font-weight: bold;
                        font-style: italic;
                        }
                    </style>
                    <div id="patient-management-content">
                      <h2>Patient Management</h2>
                      <div class="row">
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
                                  <tr class=headersinfo>
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
                                    <td>Alice</td>
                                    <td>Johnson</td>
                                    <td>Marie</td>
                                    <td>alice.johnson@example.com</td>
                                    <td>28</td>
                                  </tr>
                                  <tr onclick="viewPatientDetails(4)">
                                    <td>4</td>
                                    <td>Bob</td>
                                    <td>Brown</td>
                                    <td>James</td>
                                    <td>bob.brown@example.com</td>
                                    <td>35</td>
                                  </tr>
                                  <tr onclick="viewPatientDetails(5)">
                                    <td>5</td>
                                    <td>Michael</td>
                                    <td>White</td>
                                    <td>David</td>
                                    <td>michael.white@example.com</td>
                                    <td>40</td>
                                  </tr>
                                  <tr onclick="viewPatientDetails(6)">
                                    <td>6</td>
                                    <td>Emily</td>
                                    <td>Davis</td>
                                    <td>Rose</td>
                                    <td>emily.davis@example.com</td>
                                    <td>32</td>
                                  </tr>
                                  <tr onclick="viewPatientDetails(7)">
                                    <td>7</td>
                                    <td>David</td>
                                    <td>Wilson</td>
                                    <td>John</td>
                                    <td>david.wilson@example.com</td>
                                    <td>45</td>
                                  </tr>
                                  <tr onclick="viewPatientDetails(8)">
                                    <td>8</td>
                                    <td>Sarah</td>
                                    <td>Miller</td>
                                    <td>Jane</td>
                                    <td>sarah.miller@example.com</td>
                                    <td>38</td>
                                  </tr>
                                  <tr onclick="viewPatientDetails(9)">
                                    <td>9</td>
                                    <td>Chris</td>
                                    <td>Moore</td>
                                    <td>Paul</td>
                                    <td>chris.moore@example.com</td>
                                    <td>29</td>
                                  </tr>
                                  <tr onclick="viewPatientDetails(10)">
                                    <td>10</td>
                                    <td>Patricia</td>
                                    <td>Taylor</td>
                                    <td>Ann</td>
                                    <td>patricia.taylor@example.com</td>
                                    <td>50</td>
                                  </tr>
                                </tbody>
                              </table>
                              <div class="list-all-btn">
                                <button class="btn btn-primary" onclick="listAllPatients()">List All Patients</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>`;
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
                                            <span>Patient</span>
                                            <span>Status</span>
                                        </div>
                                        <div class="appointment">
                                            <span>2023-10-01</span>
                                            <span>10:00 AM</span>
                                            <span>John Doe</span>
                                            <span>Scheduled</span>
                                        </div>
                                        <div class="appointment">
                                            <span>2023-10-02</span>
                                            <span>11:00 AM</span>
                                            <span>Jane Smith</span>
                                            <span>Scheduled</span>
                                        </div>
                                        <div class="appointment">
                                            <span>2023-10-03</span>
                                            <span>01:00 PM</span>
                                            <span>Alice Johnson</span>
                                            <span>Completed</span>
                                        </div>
                                        <div class="appointment">
                                            <span>2023-10-04</span>
                                            <span>02:00 PM</span>
                                            <span>Bob Brown</span>
                                            <span>Cancelled</span>
                                        </div>
                                        <div class="appointment">
                                            <span>2023-10-05</span>
                                            <span>03:00 PM</span>
                                            <span>Michael White</span>
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
                case 'messages-tab':
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
                      .messages .header, .messages .message {
                        text-align: center;
                        padding: 10px;
                        border-bottom: 2px solid #007bff;
                        display: grid;
                        grid-template-columns: 1fr 2fr 1fr 1fr; /* Adjusted for uniform spacing */
                      }
                      @media (max-width: 480px) {
                        .messages .header, .messages .message {
                          width: 250%;
                          grid-template-columns: 1fr 2fr 1fr 1fr; /* Adjusted for uniform spacing */
                        }
                      }
                      @media (min-width: 480px) and (max-width: 750px){
                        .messages .header, .messages .message {
                          width: 170%;
                          grid-template-columns: 1fr 2fr 1fr 1fr; /* Adjusted for uniform spacing */
                        }
                      }
                      .messages .header {
                        font-weight: bold;
                        background-color: #f8f9fa;
                        position: sticky;
                        top: 0;
                        z-index: 1;
                      }
                      .messages .message {
                        margin: 10px 0;
                        transition: background-color 0.3s, color 0.3s;
                        border-radius: 50px;
                        border: 1px solid #ddd;
                        background-color: #ffffff;
                      }
                      .messages .message:hover {
                        background-color: #007bff;
                        color: white;
                        cursor: pointer;
                        border-color: #007bff;
                      }
                      .messages .header span, .messages .message span {
                        display: inline-block;
                      }
                    </style>
                    <div class="container mt-5">
                      <div class="row">
                        <div class="col-md-12">
                          <div class="card">
                            <div class="card-header">Messages</div>
                          </div>
                          <div class="card messages">
                            <div class="card-body">
                              <div class="header">
                                <span>From</span>
                                <span>Message</span>
                                <span>Date</span>
                                <span>Time</span>
                              </div>
                              <div class="message">
                                <span>Lab</span>
                                <span>John's test results are ready.</span>
                                <span>2023-10-01</span>
                                <span>10:00 AM</span>
                              </div>
                              <div class="message">
                                <span>Jane Smith</span>
                                <span>Can we reschedule?</span>
                                <span>2023-10-02</span>
                                <span>11:30 AM</span>
                              </div>
                              <div class="message">
                                <span>Alice Johnson</span>
                                <span>Need a prescription refill.</span>
                                <span>2023-10-03</span>
                                <span>01:15 PM</span>
                              </div>
                              <div class="message">
                                <span>Bob Brown</span>
                                <span>Blood sugar levels are high.</span>
                                <span>2023-10-04</span>
                                <span>02:45 PM</span>
                              </div>
                              <div class="message">
                                <span>Michael White</span>
                                <span>Appointment confirmation.</span>
                                <span>2023-10-05</span>
                                <span>04:00 PM</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>`;
                    break;
                    case 'diagnosis-tab':
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
                            max-height: 450px; /* Set max height */
                            overflow-y: auto; /* Enable vertical scrolling */
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
                              flex: 0 0 100%;
                              max-width: 100%;
                              margin: 0 auto; /* Center the box */
                              
                            }
                          }
                          .diagnosis-form {
                            display: flex;
                            flex-direction: column;
                          }
                          .diagnosis-form label {
                            margin-top: 1em;
                          }
                          .diagnosis-form textarea, .diagnosis-form select, .diagnosis-form button, .diagnosis-form input {
                            margin-top: 0.5em;
                          }
                          .search-patient-card {
                            width: 100%;
                            max-width: 100%;
                            margin-bottom: 20px;
                            margin-left: 15px; /* Add margin to avoid touching the border */
                          }
                          .diagnosis-card {
                            margin-left: 15px; /* Add margin to avoid touching the border */
                            margin-right: 15px; /* Add margin to avoid touching the border */
                          }
                          .btn-submit {
                            width: auto;
                            align-self: center;
                            padding: 10px 20px;
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
                        </style>
                        <div id="diagnosis-management-content">
                          <div class="row">
                            <div class="col-md-6">
                              <div class="card search-patient-card">
                                <div class="card-header">Search Patient</div>
                                <div class="card-body">
                                  <div class="form-group">
                                    <label><input type="radio" name="search-option" onclick="toggleSearchField('search-id')"> Search by ID</label>
                                    <div id="search-id" class="search-field">
                                      <input type="text" placeholder="Enter Patient ID" class="form-control">
                                    </div>
                                  </div>
                                  <div class="form-group">
                                    <label><input type="radio" name="search-option" onclick="toggleSearchField('search-email')"> Search by Email</label>
                                    <div id="search-email" class="search-field">
                                      <input type="text" placeholder="Enter Patient Email" class="form-control">
                                    </div>
                                  </div>
                                  <div class="form-group">
                                    <label><input type="radio" name="search-option" onclick="toggleSearchField('search-first-name')"> Search by First Name</label>
                                    <div id="search-first-name" class="search-field">
                                      <input type="text" placeholder="Enter Patient First Name" class="form-control">
                                    </div>
                                  </div>
                                  <div class="form-group">
                                    <label><input type="radio" name="search-option" onclick="toggleSearchField('search-last-name')"> Search by Last Name</label>
                                    <div id="search-last-name" class="search-field">
                                      <input type="text" placeholder="Enter Patient Last Name" class="form-control">
                                    </div>
                                  </div>
                                  <div class="form-group">
                                    <label><input type="radio" name="search-option" onclick="toggleSearchField('search-age')"> Search by Age</label>
                                    <div id="search-age" class="search-field">
                                      <input type="text" placeholder="Enter Patient Age" class="form-control">
                                    </div>
                                  </div>
                                  <button type="button" class="btn btn-primary mt-2">Search</button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-12">
                              <div class="card diagnosis-card">
                                <div class="card-header">Make Diagnosis</div>
                                <div class="card-body">
                                  <form id="diagnosis-form" class="diagnosis-form">
                                    <label for="patient-select">Select Patient:</label>
                                    <select id="patient-select" class="form-control">
                                      <option value="1">John Doe</option>
                                      <option value="2">Jane Smith</option>
                                      <option value="3">Alice Johnson</option>
                                      <option value="4">Bob Brown</option>
                                      <option value="5">Michael White</option>
                                    </select>
                                    <label for="symptoms">Symptoms:</label>
                                    <textarea id="symptoms" rows="4" cols="50" class="form-control"></textarea>
                                    <label for="diagnosis">Diagnosis:</label>
                                    <textarea id="diagnosis" rows="4" cols="50" class="form-control"></textarea>
                                    <button type="submit" class="btn btn-primary btn-submit mt-3">Submit Diagnosis</button>
                                  </form>
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

        // Handle diagnosis form submission if the diagnosis tab is selected
        if (tabId === 'diagnosis-tab') {
            const diagnosisForm = document.getElementById('diagnosis-form');
            diagnosisForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const selectedPatientId = document.getElementById('patient-select').value;
                const symptoms = document.getElementById('symptoms').value;
                const diagnosis = document.getElementById('diagnosis').value;

                if (selectedPatientId && symptoms && diagnosis) {
                    alert(`Diagnosis submitted for patient ID ${selectedPatientId}:\nSymptoms: ${symptoms}\nDiagnosis: ${diagnosis}`);
                } else {
                    alert('Please fill in all fields.');
                }
            });
        }
    }
});


function toggleSearchField(fieldId) {
  const field = document.getElementById(fieldId);
  const allFields = document.querySelectorAll('.search-field');
  
  // Hide all fields
 

  // Toggle the selected field
  if (field.style.display === 'none' || field.style.display === '') {
    field.style.display = 'block';
  } else {
    field.style.display = 'none';
  }
}
