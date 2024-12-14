# Scholarr 
- A web application that provides insights into a scholar's research. By entering the scholar's name, users can access information about their 10 latest publications along with an analysis of their research trends and impact.

## Installation and Set up

> ⚠️ Please follow the steps in the order given below.

```bash

# Clone the repository

git clone https://github.com/likeMike001/Scholarr

cd Scholarr

```

### Set up the Backend 

```bash



cd backend 

# Create a .env file and enter your open-ai api key along with other basic set up


FLASK_APP=app
FLASK_ENV=development
OPENAI_API_KEY= # Enter your key here.


## Create a virtual envoinment and spin up the backend server

python -m venv venv

source venv/bin/activate   # On Linux/Mac
venv\Scripts\activate      # On Windows


## Installing the dependencies

pip install -r requirements.txt

## Run the server

python run.py 
```

### Setting up the Frontend


```bash

cd frontend

## Install the dependencies

npm install


# Start the project 
npm start

```





