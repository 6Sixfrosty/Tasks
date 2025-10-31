from flask import Flask, request, send_file
import yagmail
import os

app = Flask(__name__)
yag = yagmail.SMTP("incricaoSenaioficial124@gmail.com", "ucci vmlv osgz tlhv")  

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

@app.route("/cadastro")
def cadastro():
    return send_file(os.path.join(BASE_DIR, "cadastro/index.html"))

@app.route("/enviar_email", methods=["POST"])
def enviar_email():
    name = request.form.get("name")
    surname = request.form.get("surname")
    email = request.form.get("email")
    unit = request.form.get("unit")
    course = request.form.get("course")

    subject = f"Confirmação de inscrição: {course}"
    text_content = f"Olá {name} {surname}, você se inscreveu no curso {course} do polo {unit}."
    html_content = f"<h3>Olá {name} {surname}!</h3><p>Curso: <b>{course}</b> | Polo: <i>{unit}</i></p>"

    yag.send(to=email, subject=subject, contents=[text_content, html_content])

    return send_file(os.path.join(BASE_DIR, "cadastro/SubPages/conclusion.html"))

if __name__ == "__main__":
    app.run(debug=True)
