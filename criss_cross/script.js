const stanjeIgre = document.querySelector('.potez');

let igraUToku = true;
let trenutniIgrac = "X";
let popunjenaPolja = ["", "", "", "", "", "", "", "", ""];

const pobeda = () => `Igrac "${trenutniIgrac}" je pobedio!`;
const nereseno = () => `Neresena partija!`;
const igracNaPotezu = () => `${trenutniIgrac} je na potezu`;

stanjeIgre.innerHTML = igracNaPotezu();

const pobednickaKombinacija = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function odigranoPolje(izabranoPolje, brojIzabranogPolja) {
    
    popunjenaPolja[brojIzabranogPolja] = trenutniIgrac;
    izabranoPolje.innerHTML = trenutniIgrac;

}
function promenaIgraca() {
    trenutniIgrac = trenutniIgrac === "X" ? "O" : "X";
    stanjeIgre.innerHTML = igracNaPotezu();
}
function proveraRezultata() {
    let osvojenaRunda = false;

    for (let i = 0; i <= 7; i++) {
        const pobeda = pobednickaKombinacija[i];
        let a = popunjenaPolja[pobeda[0]];
        let b = popunjenaPolja[pobeda[1]];
        let c = popunjenaPolja[pobeda[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }

        if (a === b && b === c) {
            osvojenaRunda = true;
            break;
        }
    }

    if (osvojenaRunda) {
        stanjeIgre.innerHTML = pobeda();
        igraUToku = false;
        return;
    }

    let neresenaRunda = !popunjenaPolja.includes("");

    if (neresenaRunda) {
        stanjeIgre.innerHTML = nereseno();
        igraUToku = false;
        return;
    }

    promenaIgraca();

}
function klikNaPolje(dogadjaj) {
    
    const izabranoPolje = dogadjaj.target;
    const brojIzabranogPolja = parseInt(izabranoPolje.getAttribute('data-cell-index'));
    if (popunjenaPolja[brojIzabranogPolja] !== "" || !igraUToku) {
        return;
    }
    odigranoPolje(izabranoPolje, brojIzabranogPolja);
    proveraRezultata();

}
function resetIgre() {
    
    igraUToku = true; 
    trenutniIgrac = "X";
    popunjenaPolja = ["", "", "", "", "", "", "", "", ""];
    stanjeIgre.innerHTML = igracNaPotezu();
    document.querySelectorAll('.polje').forEach(polje => polje.innerHTML = "");

}

document.querySelectorAll('.polje').forEach(polje => polje.addEventListener('click', klikNaPolje));
document.querySelector('.resetujIgru').addEventListener('click', resetIgre);