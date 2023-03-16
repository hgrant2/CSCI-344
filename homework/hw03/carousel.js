const data = [
  {
    image_url: "https://picsum.photos/450/300?n=1",
    caption: "Photo 1",
  },
  {
    image_url: "https://picsum.photos/450/300?n=2",
    caption: "Photo 2",
  },
  {
    image_url: "https://picsum.photos/450/300?n=3",
    caption: "Photo 3",
  },
  {
    image_url: "https://picsum.photos/450/300?n=4",
    caption: "Photo 4",
  },
  {
    image_url: "https://picsum.photos/450/300?n=5",
    caption: "Photo 5",
  },
  {
    image_url: "https://picsum.photos/450/300?n=6",
    caption: "Photo 6",
  },
  {
    image_url: "https://picsum.photos/450/300?n=7",
    caption: "Photo 7",
  },
  {
    image_url: "https://picsum.photos/450/300?n=8",
    caption: "Photo 8",
  },
  {
    image_url: "https://picsum.photos/450/300?n=9",
    caption: "Photo 9",
  },
  {
    image_url: "https://picsum.photos/450/300?n=10",
    caption: "Photo 10",
  }
];

let index = 0;
let postion = 0;

function loadSlides(photoList) {
  const location = document.querySelector(".carousel-inner");
  for(let i = 0; i < photoList.length; i++){
    const html = `
      <section id="${i}" class="slide" role="group" aria-label="Slide ${i + 1} 
        of ${photoList.length}" aria-hidden="true">
        <img src="${photoList[i].image_url}" alt="${photoList[i].caption}">
        <p>${photoList[i].caption}</p>
      </section>`;
    location.insertAdjacentHTML("beforeend", html);
  }

}

function next() {
  console.log("the next button has been clicked!");
  console.log("index is " + index);
  index += 1;
  console.log("The index is changed from the next button: " + index); 
  if(index < data.length){
    document.querySelector(".carousel-inner").style.left = ( index *-55) + "vw";
  }else{
    document.querySelector(".carousel-inner").style.left = 0 + "vw";
    index = 0;
  }
}


function previous() {
  console.log("the previous button has been clicked!");
  console.log("index is " + index);
  index -= 1;
  console.log("The index is changed from the previous button: " + index);
  if(index < data.length && index >= 0){
    document.querySelector(".carousel-inner").style.left = (index * -55) + "vw";
    console.log(index * 55);
  }else{
    index = data.length - 1;
    document.querySelector(".carousel-inner").style.left = (index* -55) + "vw";

    
  }

}

loadSlides(data);