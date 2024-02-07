// let arr = [];

// async function fetchApi() {
//   try {
//     const dataApi = await fetch("https://fakestoreapi.com/products");
//     arr = await dataApi.json();
//     console.log(arr);
//     display();
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// }
// fetchApi();
// function display() {
//   const Cardview = document.getElementById("card_container");
//   Cardview.innerHTML = "";
//   for (let i = 0; i < arr.length; i += 3) {
//     // Create a row for every three cards
//     const row = document.createElement("div");
//     row.classList.add("row");
//     for (let j = i; j < i + 3 && j < arr.length; j++) {
//       const item = arr[j];
//       const Cardview = `
//           <div class="col-lg-4">
//             <div class="card mt-3 height" id="card_view">
//               <img class="card-img-top mt-3 image img-fluid" src="${item.image}" alt="Card image cap" />
//               <div class="card-body" style="height: 100%; ">
//                 <h5 class="card-title">${item.title}</h5>
//                 <p class="card-text">${item.description}</p>
//                 <div class="d-flex justify-content-between">
//                 <span>Price $${item.price}</span>
//                  <span>Rating: ${item.rating.rate}</span>
//                  </div>
//               </div>
//             </div>
//           </div>
//         `;

//       row.innerHTML += Cardview;
//     }

//     Cardview.appendChild(row);
//   }
// }

let arr = [];

async function fetchApi() {
  try {
    const dataApi = await fetch("https://fakestoreapi.com/products");
    arr = await dataApi.json();
    console.log(arr);
    display();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
fetchApi();

function display() {
  const cardContainer = document.getElementById("card_container");
  cardContainer.innerHTML = "";

  for (let i = 0; i < arr.length; i += 3) {
    // Create a row for every three cards
    const row = document.createElement("div");
    row.classList.add("row");

    for (let j = i; j < i + 3 && j < arr.length; j++) {
      const item = arr[j];

      // Truncate the description to 20 words
      const truncatedDescription = truncateDescription(item.description, 20);

      const cardView = `
        <div class="col-lg-4">
          <div class="card mt-3 height" id="card_view_${j}">
            <img class="card-img-top mt-3 image img-fluid" src="${item.image}" alt="Card image cap" />
            <div class="card-body" style="height: 100%;">
              <h5 class="card-title">${item.title}</h5>
              <p class="card-text m-0">${truncatedDescription}
              
              <a  class="read-more-link  text-primary" onclick="toggleDescription(${j})">Read More</a>
              
              <span class="full-description " id="fullDescription_${j}" style="display: none;">${item.description}</span>
              <a  class="read-less-link  text-primary" onclick="toggleDescription(${j}, true)" style="display: none;">Read Less</a></p>
              <div class="d-flex justify-content-between">
                <span>Price $${item.price}</span>
                <span>Rating: ${item.rating.rate}</span>
              </div>
            </div>
          </div>
        </div>
      `;

      // Append the card HTML content to the row
      row.innerHTML += cardView;
    }

    // Append the row to the container
    cardContainer.appendChild(row);
  }
}

function truncateDescription(description, wordCount) {
  const words = description.split(" ").slice(0, wordCount);
  return words.join(" ") + " ";
}

function toggleDescription(index, scrollToTop) {
  const fullDescription = document.getElementById(`fullDescription_${index}`);
  const readMoreLink = document.querySelector(
    `#card_view_${index} .read-more-link`
  );
  const readLessLink = document.querySelector(
    `#card_view_${index} .read-less-link`
  );

  if (fullDescription.style.display === "none") {
    fullDescription.style.display = "block";
    readMoreLink.style.display = "none";
    readLessLink.style.display = "inline";
    if (scrollToTop) {
      // Smooth scroll to the top of the card
      document
        .getElementById(`card_view_${index}`)
        .scrollIntoView({ behavior: "smooth" });
    }
  } else {
    fullDescription.style.display = "none";
    readMoreLink.style.display = "inline";
    readLessLink.style.display = "none";
  }
}

// for (var i = 0; i < 5; i++) {
//   var btn = document.createElement("button");
//   btn.appendChild(document.createTextNode("Button " + i));
//   btn.addEventListener("click", function () {
//     console.log(i);
//   });
//   document.body.appendChild(btn);
// }
