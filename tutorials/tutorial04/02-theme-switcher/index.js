// const defaultTheme = ev => {
//     document.querySelector("body").className = "default";

//     // your code here.
// };

// const oceanTheme = ev => {
//     document.querySelector("body").className = "ocean";

//    // your code here.
// };

// const desertTheme = ev => {
//     document.querySelector("body").className = "desert";
//     // alert('buttton clicked');
// };

// const highContrastTheme = ev => {
//     document.querySelector("body").className = "high-contrast";

//     // your code here.
// }; 

const changeTheme = (themeName) => {
    document.querySelector("body").className = themeName;
}

// I also dk wtf this is
const changeTheme1 = (ev) => {
    console.log(ev);
    const btn = ev.currentTarget;
    console.log(btn.dataset);
    document.querySelector("body").className = btn.dataset.theme;
    btn.innerHTML = btn.dataset.ordering;
}


/*
    Hints: 
    1. Attach the event handlers (functions) above to the click event
       of each of the four buttons (#default, #ocean, #desert, 
        and #high-contrast) in index.html.
    2. Then, modify the  body of each function so that it
       sets the className property of the body tag based on 
       the button that was clicked.
*/