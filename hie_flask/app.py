#!/usr/bin/python3

 
from flask import Flask, render_template
app = Flask(__name__)


@app.route('/', strict_slashes=False)
def landing_page():
    """ Displays the landing page """
    return render_template('hie.html')

if __name__ == "__main__":
    """ Main Function """
    app.run(host='0.0.0.0', port=5000)
