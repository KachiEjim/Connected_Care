# 🎯 **Connected Care**

## 📝 **Introduction**

**Connected Care** is a comprehensive health information exchange application designed to streamline the secure storage, exchange, and retrieval of medical information. It ensures that patients' medical data is readily available while maintaining strict security protocols, allowing only authorized individuals and institutions access. This project aims to improve patient experiences in hospitals, especially in regions like Africa where healthcare data management is often challenging.

- 🌐 **Deployed Site:** [Connected Care](https://concare.kachy.tech)
- 📄 **Final Project Blog Article:** [Project Blog](https://link.medium.com/uhOKtM5u7Kb)
- 🐦 **Author's Twitter:** [Onyedikachi Ejim](https://twitter.com/ejimvincent)

## 🚀 **Installation**

To set up the project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/kachy/Connected_care
   cd Connected_care
   ```

2. **Create and activate a virtual environment:**

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

3. **Install the required packages:**

   ```bash
   pip install -r requirements.txt
   ```

4. **Set up the database:**

   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Create a superuser for admin access:**

   ```bash
   python manage.py createsuperuser
   ```

6. **Run the development server:**

   ```bash
   python manage.py runserver
   ```

7. **Access the application:**
   Open your browser and go to `http://127.0.0.1:8000`.

## Usage

Connected Care offers a user-friendly interface for both patients and healthcare providers. After logging in, users can:

- **Patients:**

  - View and update personal medical records.
  - Schedule and manage appointments.
  - Access medical history and lab results.

- **Healthcare Providers:**
  - Manage patient information and medical records.
  - Schedule appointments and manage patient visits.
  - Access detailed analytics and visualizations of patient data.

## Contributing

We welcome contributions from the community! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a pull request.

Please ensure your code adheres to our coding standards and includes appropriate tests.
