let data = [
    { id: 1, titre: 'cable USB', prix: '20 D' },
    { id: 2, titre: 'flashe USB', prix: '30 D' },
];

function getLocalStorageData() {
    const storedData = localStorage.getItem('productData');
    if (storedData) {
        data = JSON.parse(storedData);
    }
}

function updateLocalStorage() {
    localStorage.setItem('productData', JSON.stringify(data));
}
/*********Remplir le tableau *********** */
function createTableRow(item) {
    const row = document.createElement('tr');

    const idCell = document.createElement('td');
    idCell.textContent = item.id;
    row.appendChild(idCell);

    const titreCell = document.createElement('td');
    titreCell.textContent = item.titre;
    row.appendChild(titreCell);

    const prixCell = document.createElement('td');
    prixCell.textContent = item.prix;
    row.appendChild(prixCell);

    const actionsCell = document.createElement('td');
    const addButton = document.createElement('button');
    addButton.textContent = 'Ajouter';
    addButton.className ='add' ;
    addButton.addEventListener('click', () => {
        showForm();
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Supprimer';
    deleteButton.className ='delete';
    deleteButton.addEventListener('click', () => {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
            deleteProduct(item.id);
            updateLocalStorage();
            populateTable();

        }
    });
    const updateButton = document.createElement('button');
    updateButton.textContent = 'Modfier';
    updateButton.className ='update';
    updateButton.addEventListener('click', () => {
        
        const updateProductModal = document.getElementById('updateProduct');
        updateProductModal.style.display = 'block';
        const productId = item.id;
        const productToUpdate = data.find(product => product.id === productId);
    
        document.getElementById('updateId').value = productToUpdate.id;
        document.getElementById('updateTitre').value = productToUpdate.titre;
        document.getElementById('updatePrix').value = productToUpdate.prix;
     
    });
    actionsCell.appendChild(addButton);
    actionsCell.appendChild(deleteButton);
    actionsCell.appendChild(updateButton);
    row.appendChild(actionsCell);

    return row;
}


function populateTable() {
    const table = document.getElementById('table');
    
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }

    data.forEach(item => {
        const row = createTableRow(item);
        table.appendChild(row);
    });
}

window.addEventListener('load', () => {
    getLocalStorageData();
    populateTable(); 
});
const productForm = document.getElementById('productForm');
const addButton = document.querySelector('.addProduct');

productForm.addEventListener('submit', function (e) {
    e.preventDefault(); 

    const id = document.getElementById('id').value;
    const titre = document.getElementById('titre').value;
    const prix = document.getElementById('prix').value;

    const newProduct = { id, titre, prix };

    data.push(newProduct);

    populateTable();

    const addProductModal = document.getElementById('addProduct');
    addProductModal.style.display = 'none';
    updateLocalStorage();

    productForm.reset();
});

function showForm(){
    const addProductModal = document.getElementById('addProduct');
    addProductModal.style.display = 'block';
}
function deleteProduct(productId) {
    data = data.filter(item => item.id !== productId);
}

const updateForm = document.getElementById('updateForm');
const updateButton = document.querySelector('.updateButton');

updateForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const updatedId = document.getElementById('updateId').value;
    const updatedTitre = document.getElementById('updateTitre').value;
    const updatedPrix = document.getElementById('updatePrix').value;
    console.log(updatedId , updatedTitre , updatedPrix);

    const index = data.findIndex(product => product.id === parseInt(updatedId, 10));

    if (index !== -1) {
        data[index].titre = updatedTitre;
        data[index].prix = updatedPrix;

        populateTable();
        updateLocalStorage();

        const updateProductModal = document.getElementById('updateProduct');
        updateProductModal.style.display = 'none';
    }

});
