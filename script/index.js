const loadCategories = async () => {
  try {
    const response = await fetch(
      "https://openapi.programming-hero.com/api/phero-tube/categories"
    );
    const data = await response.json();

    displayCategories(data.categories);
  } catch (error) {
    console.log("Error fetching categories:", error);
  }
};

const loadVideos = async () => {
  try {
    const response = await fetch(
      "https://openapi.programming-hero.com/api/phero-tube/videos"
    );
    const data = await response.json();
    removeActiveMode();
    const allBtn = document.getElementById("btn-all");
    allBtn.classList.add("bg-red-500", "text-white");
    displayVideos(data.videos);
  } catch (error) {
    console.log("Error fetching videos:", error);
  }
};
const removeActiveMode = () => {
  const activeBtn = document.getElementsByClassName("bg-red-500");
  Array.from(activeBtn).forEach((btn) => {
    btn.classList.remove("bg-red-500", "text-white");
  });
};
const loadCategoryVideos = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    removeActiveMode();
    const clickedBtn = document.getElementById(`btn-${id}`);
    clickedBtn.classList.add("bg-red-500", "text-white");

    displayVideos(data.category);
  } catch (error) {
    console.log("Error fetching videos:", error);
  }
};

function displayCategories(categories) {
  categories.forEach((element) => {
    const catContainer = document.getElementById("category-container");

    const catBtn = document.createElement("div");
    // catBtn.classList.add("btn", "btn-outline");
    // catBtn.textContent = element.category;
    catBtn.innerHTML = `<button id="btn-${element.category_id}" onclick="loadCategoryVideos(${element.category_id})" class="cat-btn btn btn-outline hover:bg-red-500 hover:text-white">${element.category}</button
        >`;
    catContainer.appendChild(catBtn);
  });
}
function displayVideos(videos) {
  const videoContainer = document.getElementById("videos-container");
  videoContainer.innerHTML = "";
  if (videos.length == 0) {
    videoContainer.innerHTML = `<div
          class="text-center flex justify-center items-center flex-col col-span-full py-24"
        >
          <img src="./assets/images/Icon.png" alt="" />
          <h2 class="text-3xl font-bold">
            Oops!! Sorry, There is no content here
          </h2>
        </div>`;
    return;
  }
  videos.forEach((element) => {
    const isVerified = element.authors[0].verified;
    const videoCard = document.createElement("div");
    videoCard.innerHTML = `
          <div class="card bg-base-100 w-96 cursor-pointer ">
            <figure class="relative h-[200px] rounded-xl">
              <img
                src="${element.thumbnail}"
                alt="${element.title}"
                class="rounded-xl w-[100%]"
              />
              <span class="absolute bottom-3 right-3 bg-slate-900 rounded-md text-white px-1">3hrs 56 min ago</span>
            </figure>
            <div class="card-body flex flex-row gap-2  items-center py-2 px-0">
              <div class="avatar relative -top-3">
                <div class="w-8 rounded-full">
                  <img
                    src="${element.authors[0].profile_picture}"
                  />
                </div>
              </div>
              <div>
                <h2 class="card-title text-bold">${element.title}</h2>
                
                <p class="text-gray-500">${element.authors[0].profile_name} ${
      isVerified
        ? `<i class="fa-solid fa-badge-check" style="color: #006eff;"></i>`
        : ""
    }</p>
                <p class="text-gray-500">${element.others.views} views</p>
              </div>
            </div>
          </div>
        `;
    videoContainer.appendChild(videoCard);
  });
}
loadCategories();
loadVideos();
// document.querySelectorAll(".cat-btn").forEach((button) => {
//   button.addEventListener("click", (event) => {
//     // Remove active styles from all buttons
//     document.querySelectorAll(".cat-btn").forEach((btn) => {
//       btn.classList.remove("bg-red-500", "text-white");
//     });

//     // Add active class only to the clicked button
//     event.target.classList.add("bg-red-500", "text-white");
//   });
// });
