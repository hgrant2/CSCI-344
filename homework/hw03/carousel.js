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

function loadSlides(photoList){
  const imageTagList = photoList.map(
    img => `<img src="${img.image_url}" />`
  );
  console.log(imageTagList);
  const html = imageTagList.join("");
  document.querySelector(".carousel-inner").insertAdjacentHTML('beforeend',html);
  // for( let i = 0; i < this.length; i++){
  //   console.log("the interation number: ", i);
  //   const html = photoList[i];
  //   document.querySelector(".carousel-inner").insertAdjacentHTML('beforeend',html);
  //   console.log("here is the html:",html);
  // }
}
// console.log(data);
// loadSlides(data)
