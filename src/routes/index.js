const admin = require('firebase-admin')

var serviceAccount = require("../../node-firebase-example-1519d-firebase-adminsdk-3ydxb-af5fa65f04.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://node-firebase-example-1519d.firebaseio.com/'
});

const db = admin.database();

// tu ai si din asta care-ti da optiunile de la obiecte , proprietati , etc golane :))
// pe linux .. pula nu prea ma prind ce vrei sa zici dar pare ca e de bine
// pe linux nu-mi apar optiuni din astea gen cand scriam admin. --> lista cu ce pot scrie dupa...in fine
// Ok , deci aici , in loc de users o sa fie numele tabelei si dupa...gen...pui tu ce mai trebuie , poti da putin in firebase ??deisugr merci mult
// asa trebuie sa arate pagina , ca asta .. , gen asta e baza de date

//ok si fac update 
//dap , intrebarea mea este , esti conectat la exact aceasta baza de date ?

// sau am incurcat eu bazele si e alta defapt ?\
// asta e nazda de date
// shit...trebuie sa modifici numele alea naspa...ca sa poti sa faci update-ul
//admin.database().ref('contracts/' + id_user + '/add_balance').set('NEWVALUE');

const { Router}= require('express');
const router = Router();

router.get('/', (req, res) => {
    console.log("Route /");
    db.ref('contacts').once('value', (snapshot) => {
       data = snapshot.val();
       res.render('index', {contacts: data})
    });
});

router.get('/getContracts', (req,res) => {
    console.log("/getContracts");
    db.ref('contacts').once('value', (snapshot) => {
        data = snapshot.val();
        res.status(200).json({ contracts : data });
     });
});


router.post('/updateContracts', (req,res) => {
    console.log("/updateContracts");
    console.log("Acuma...sper sa mearga totu bine");
});

//cum ar trebui sa caut pe net sa vad exemplu cu un update cum e aici router.post('/update-contact)
//aaaa...aici ai doar creare stergere si listare , si tu ai nevoie si de update , corect ?
//pai hai sa vedem...

//de ce trebuie sa modific?
//daca poti lucra cu ele asa...nicio problem atunci , nu e nevoie , dar ma gandesc...adica...mno...ok..dar hmmm...
//nu prea a timp si de asta mai pun um u[date si o ordonare si sunt gata]
//pai da dar cum faci rost de numele ala ca sa-l pui sa faca update in comanda de sus ?
//nu prea stiu asta ia stai asa...
router.post('/new-contact', (req, res) => {
    console.log("Route /new-contract");
    const newContact = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone
    }
    db.ref('contacts').push(newContact);
    res.redirect('/');
});

// Dai un run acum si testeaza cateva butoane sa vad daca arata output in consola

router.get('/delete-contact/:id', (req, res) => {
    console.log("Route /delete-contract");
    db.ref('contacts/' + req.params.id).remove();
    res.redirect('/');
});

module.exports = router;