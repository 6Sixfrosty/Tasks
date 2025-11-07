const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');

let current = ''; 

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const value = btn.id;

        if (value === 'C') {
            current = '';
            display.value = '';
        } else if (value === '=') {
            try {
                current = current.replace(/x/g, '*');
                const result = eval(current);
                display.value = result;
                current = String(result);
            } catch {
                display.value = 'Erro';
                current = '';
            }
        } else {
    const operadores = ['+', '-', 'x', '/'];
    const ultimo = current.slice(-1);
    if (operadores.includes(value) && operadores.includes(ultimo)) {
        return; 
    }
    current += value;
    display.value = current;
}
});});
