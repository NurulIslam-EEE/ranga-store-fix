const loadProducts = () => {
  const url = 'https://fakestoreapi.com/products';
  fetch(url)
    .then(response => response.json())
    .then(data => showProducts(data))
};
loadProducts();

// ------------show all product in UI -----------

const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  console.log(products[0])
  for (const product of allProducts) {

    const image = product.image;
    const rating = Math.round(product.rating.rate);
    const div = document.createElement("div");
    div.classList.add("product");
    if (rating === 5) {
      div.innerHTML += `
      <div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h5>${product.title}</h5>
      <p>Category: ${product.category}</p>
      <h4>Price: $ ${product.price}</h4>
      <p>  
      <i class="fas fa-star text-warning"></i> 
      <i class="fas fa-star text-warning"></i>
      <i class="fas fa-star text-warning"></i>
      <i class="fas fa-star text-warning"></i>
      <i class="fas fa-star text-warning"></i> 
      ${product.rating.rate} (${product.rating.count} Ratings)</p>
      <button onclick="addToCart(${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button onclick="loadProductsById(${product.id})"  id="details-btn" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Details</button></div>`;
    } else if (rating === 4) {
      div.innerHTML += `
      <div class="single-product">
      <div>
      <img class="product-image" src=${image}></img>
      </div>
      <h5>${product.title}</h5>
      <p>Category: ${product.category}</p>
      <h4>Price: $ ${product.price}</h4>
      <p>  
      <i class="fas fa-star text-warning"></i> 
      <i class="fas fa-star text-warning"></i>
      <i class="fas fa-star text-warning"></i>
      <i class="fas fa-star text-warning"></i>
      <i class="fas fa-star text-muted"></i>
      ${product.rating.rate} (${product.rating.count} Ratings)</p>
      <button onclick="addToCart(${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button onclick="loadProductsById(${product.id})"  id="details-btn" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Details</button></div>`;
    }
    else if (rating === 3) {
      div.innerHTML += `
      <div class="single-product">
      <div>
      <img class="product-image" src=${image}></img>
      </div>
      <h5>${product.title}</h5>
      <p>Category: ${product.category}</p>
      <h4>Price: $ ${product.price}</h4>
      <p>  
      <i class="fas fa-star text-warning"></i> 
      <i class="fas fa-star text-warning"></i>
      <i class="fas fa-star text-warning"></i>
      <i class="fas fa-star text-muted"></i>
      <i class="fas fa-star text-muted"></i>
      ${product.rating.rate} (${product.rating.count} Ratings)</p>
      <button onclick="addToCart(${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button onclick="loadProductsById(${product.id})"  id="details-btn" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Details</button></div>`;
    }
    else if (rating === 2) {
      div.innerHTML += `
      <div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h5>${product.title}</h5>
      <p>Category: ${product.category}</p>
      <h4>Price: $ ${product.price}</h4>
      <p>  
      <i class="fas fa-star text-warning"></i> 
      <i class="fas fa-star text-warning"></i>
      <i class="fas fa-star text-muted"></i>
      <i class="fas fa-star text-muted"></i>
      <i class="fas fa-star text-muted"></i>
      ${product.rating.rate} (${product.rating.count} Ratings)</p>
      <button onclick="addToCart(${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button onclick="loadProductsById(${product.id})"  id="details-btn" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Details</button></div>`;
    }
    else {
      div.innerHTML += `
      <div class="single-product">
      <div>
      <img class="product-image" src=${image}></img>
      </div>
      <h5>${product.title}</h5>
      <p>Category: ${product.category}</p>
      <h4>Price: $ ${product.price}</h4>
      <p>  
      <i class="fas fa-star text-warning"></i> 
      <i class="fas fa-star text-muted"></i>
      <i class="fas fa-star text-muted"></i>
      <i class="fas fa-star text-muted"></i>
      <i class="fas fa-star text-muted"></i>
      ${product.rating.rate} (${product.rating.count} Ratings)</p>
      <button onclick="addToCart(${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button onclick="loadProductsById(${product.id})" id="details-btn" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Details</button></div>`;
    }
    document.getElementById("all-products").appendChild(div);
  }
};

// --------------add to cart -------------

let count = 0;
const addToCart = (price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

// -------------getting inner text ----------------  

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// ----------------- price update function ------------

const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// --------------------set innerText function ----------------

const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value;
};

// -----------------update delivery charge and total Tax ---------------

const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");

  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", (priceConverted * 0.2).toFixed(2));
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", (priceConverted * 0.3).toFixed(2));
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", (priceConverted * 0.4).toFixed(2));
  }
};

//----------------grandTotal update function-------------

const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};



// -----------load products by id-------------
const loadProductsById = (id) => {
  const url = `https://fakestoreapi.com/products/${id}`;
  fetch(url)
    .then(response => response.json())
    .then(data => showDetails(data))
}

// ----------show details---------

const showDetails = (product) => {
  // const title = document.getElementById('mtitle');
  const body = document.getElementById('mbody');
  const span = document.createElement('p');
  console.log(product, title, body);
  // title.innerText = `${product.title}`;
  span.innerText = ` ${product.description}`;
  body.appendChild(span);
}


// const showDetails = (product) => {
//     console.log(product)
//     const parent = document.getElementById('details');
//     parent.innerHTML = '';
//     const detailsDiv = document.createElement('div');
//     detailsDiv.classList.add('details2');
//     detailsDiv.innerHTML = `
//    <h1> ${product.title}</h1>
//    <p> ${product.description}</>
//   `;
//     parent.appendChild(detailsDiv);

// }



