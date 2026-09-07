requireRole([
    "Administrator",
    "Storekeeper"
]);


console.log("Inventory JS loaded");
async function loadInventory() {
     console.log("Refresh clicked");
    
    try {

        const response = await
            fetch("http://localhost:3000/inventory");

        const inventory = await response.json();

        const tableBody = document.querySelector(
            "#inventoryTable tbody"
        );

        tableBody.innerHTML = "";


        inventory.forEach(item => {


            const status = 
            item.available_stock <= item.minimum_stock
            ? `<span class="low-stock">LOW STOCK</span>`
            : `<span class="available">AVAILABLE</span>`;


            const row = `
        <tr>

    <td>${item.part_number}</td>

    <td>${item.description}</td>

    <td>${item.unit}</td>

    <td>ZMW ${item.selling_price}</td>

    <td>${item.available_stock}</td>

    <td>${status}</td>

    <td>

    <button onclick="editPart(${item.part_id})">
        ✏️ Edit
    </button>


    <button onclick="deletePart(${item.part_id})">
        🗑️ Delete
    </button>

</td>

</tr>
`;
 
            tableBody.innerHTML += row;


        });


    } catch(error) {

        console.error(error);

        alert("Failed to load inventory.");

    }

}



function searchInventory() {


    const searchValue = document
        .getElementById("searchInput")
        .value
        .toUpperCase();


    const rows = document
        .getElementById("inventoryTable")
        .getElementsByTagName("tr");


    for(let i = 1; i < rows.length; i++) {


        const rowText = rows[i]
            .textContent
            .toUpperCase();


        if(rowText.includes(searchValue)) {

            rows[i].style.display = "";

        } else {

            rows[i].style.display = "none";

        }

    }

}



loadInventory();

function openAddPartForm(){

    const form = document.getElementById("addPartSection");

    form.style.display = "block";

}



async function addPart(){


   const part = {

    part_number:
    document.getElementById("part_number").value,

    part_name:
    document.getElementById("part_name").value,

    category_id:
    Number(document.getElementById("category_id").value),

    brand_id:
    Number(document.getElementById("brand_id").value),

    description:
    document.getElementById("description").value,

    unit:
    document.getElementById("unit").value,

    purchase_price:
    Number(document.getElementById("purchase_price").value),

    selling_price:
    Number(document.getElementById("selling_price").value),

    minimum_stock:
    Number(document.getElementById("minimum_stock").value),

    warehouse_location:
    document.getElementById("warehouse_location").value,

    barcode:
    document.getElementById("barcode").value

};



    try{


        const response = await fetch(
            "/parts",
            {

                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify(part)

            }
        );


        const result = await response.json();


        alert(result.message);

        document.getElementById("addPartSection").style.display = "none";

        loadInventory();


    }

    catch(error){

        console.error(error);

        alert("Failed to add part");

    }


}

async function editPart(id){

    document.getElementById("editModal").style.display = "block";


    const response = await fetch(
        `/parts/${id}`
    );


    const part = await response.json();


    document.getElementById("edit_part_id").value = part.part_id;

    document.getElementById("edit_part_number").value = part.part_number;

    document.getElementById("edit_description").value = part.description;

    document.getElementById("edit_unit").value = part.unit;

    document.getElementById("edit_purchase_price").value = part.purchase_price;

    document.getElementById("edit_selling_price").value = part.selling_price;

    document.getElementById("edit_minimum_stock").value = part.minimum_stock;


}

async function updatePart(){

    const id = document.getElementById("edit_part_id").value;


    const part = {

        part_number:
        document.getElementById("edit_part_number").value,

        description:
        document.getElementById("edit_description").value,

        unit:
        document.getElementById("edit_unit").value,

        purchase_price:
        Number(document.getElementById("edit_purchase_price").value),

        selling_price:
        Number(document.getElementById("edit_selling_price").value),

        minimum_stock:
        Number(document.getElementById("edit_minimum_stock").value)

    };


    try{


        const response = await fetch(

            `/parts/${id}`,

            {

                method:"PUT",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify(part)

            }

        );


        const result = await response.json();


        alert(result.message);


        closeEditModal();

        loadInventory();


    }catch(error){

        console.error(error);

        alert("Update failed");

    }

}

function closeEditModal(){

    document.getElementById("editModal").style.display="none";

}

async function deletePart(id){

    const confirmDelete = confirm(
        "Are you sure you want to delete this spare part?"
    );


    if(!confirmDelete){
        return;
    }


    try{

        const response = await fetch(
            `/parts/${id}`,
            {
                method:"DELETE"
            }
        );


        const result = await response.json();


        alert(result.message);


        loadInventory();


    }catch(error){

        console.error(error);

        alert("Delete failed");

    }

}