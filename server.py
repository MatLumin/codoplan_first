from flask import *;



app = Flask("codoplan");


def read_file_contet(file_path):
    with open(file_path) as f1:
        return f1.read();


@app.route("/main")
def hh__main():
    return read_file_contet("./main.html");
    

app.run();