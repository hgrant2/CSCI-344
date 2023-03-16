/**
* The job of Galleries is to show users the available galleries,
* and let them select the one they want to look at.
*/

import React from "react";

export default function Galleries({galleries, setGalleryIndex}) {
   // some logic at the top:
   console.log(galleries);

   function chooseGallery(idx) {
       console.log("choose new gallery!");
       setGalleryIndex(idx);
   }


   // return some JSX:
   return (
       <section>
           <h2>Available Galleries</h2>
           {
               galleries.map((gallery, idx) => {
                   return (
                       <button onClick={() => {
                           chooseGallery(idx);
                       }}>Click here to show {gallery.name}</button>
                   )
               })
           }
       </section>
   )

}