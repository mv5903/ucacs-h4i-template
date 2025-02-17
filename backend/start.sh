#!/bin/bash

# Export environment variables
export FLASK_APP=.
export FLASK_ENV=development

# View routes
flask routes

# Run Flask application
flask run --port 4343