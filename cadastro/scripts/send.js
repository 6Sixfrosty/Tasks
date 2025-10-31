const UserData = {
    name: null,
    surname: null,
    email: null,
    unit: null,
    course: null
};

const form = document.getElementById('form1');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    UserData.name = document.getElementById("name").value;
    UserData.surname = document.getElementById("surname").value;
    UserData.email = document.getElementById("email").value;
    UserData.unit = document.getElementById("unit").value;
    UserData.course = document.getElementById("course").value;
    
    const linkHTML2 = `html2.html?` +
        `name=${encodeURIComponent(UserData.name)}` +
        `&surname=${encodeURIComponent(UserData.surname)}` +
        `&email=${encodeURIComponent(UserData.email)}` +
        `&unit=${encodeURIComponent(UserData.unit)}` +
        `&course=${encodeURIComponent(UserData.course)}`;

    const mailto = `mailto:${UserData.email}?subject=Formulário Preenchido&body=Clique no link para continuar: ${linkHTML2}`;
    window.location.href = mailto;
});
