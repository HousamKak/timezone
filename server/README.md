# OrbiMed Portal - Server Setup

## Setup Instructions

1. **Initialize Virtual Environment**
   - Create a virtual environment:
     ```bash
     python -m venv venv
     ```
   - Activate the virtual environment:
     - On Windows:
       ```bash
       venv\Scripts\activate
       ```
   - Install required dependencies:
     ```bash
     pip install -r requirements.txt
     ```

2. **Run Environment Configuration Test**
   - Validate the `.env` file and environment settings:
     ```bash
     python tests/test_env.py
     ```

3. **Initialize the Database**
   - Set up a fresh database schema and load seed data:
     ```bash
     python scripts/init_db.py
     ```

4. **Update the Database**
   - Apply any pending migrations and perform maintenance tasks:
     ```bash
     python scripts/update_db.py
     ```

## Notes
- Ensure the `.env` file is properly configured before running the setup scripts.
- For ongoing updates, use [update_db.py](http://_vscodecontentref_/0)