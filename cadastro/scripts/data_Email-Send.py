# cadastro/scripts/data_Email-Send.py
from flask import Flask, request, render_template
import yagmail
import os

app = Flask(__name__, template_folder="../templates")
yag = yagmail.SMTP(os.environ["GMAIL_USER"], os.environ["GMAIL_PASS"])

@app.route("/cadastro", methods=["GET"])
def cadastro():
    return render_template("index.html")

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

    return render_template("conclusion.html")

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
