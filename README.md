# usacs-h4i-app

1. First, create a virtual environment in the root directory and install the backend dependencies

```
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

2. Then, navigate to the `backend` directory with `cd backend` and initialize the database. We'll be using SQLite. If you every need to reinitialize the database, run this command again.

```
flask --app . init-db
```
3. Then, run the Flask application by running the shell script in `backend`. You may need to run the first command to enable execution permissions

```
chmod +x start.sh
./start.sh
```

4. Then, navigate to the frontend in another terminal using `cd frontend` and run the following commands. This will start the frontend

```
npm install
npm run dev
```

5. Finally, in your browser head to [http://localhost:5173/](http://localhost:5173/) to view the website.
