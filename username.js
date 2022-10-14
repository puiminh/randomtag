if(localStorage.getItem('randomtag-username') !== null) 
    document.getElementById("user-name").textContent = localStorage.getItem('randomtag-username') //nguoi dung luu

document.getElementById("user-name").addEventListener('input', (e) => {
    console.log(e);
    let newName;
    window.onkeyup = (e)=>{
        switch (e.keyCode) {
            case 13:
                console.log("enter");
                newName = document.getElementById("user-name").textContent = localStorage.getItem('randomtag-username');
                return;
            default:
                newName = document.getElementById("user-name").textContent;
                console.log(newName);
                localStorage.setItem('randomtag-username', newName);
                break;
        } 
    }
});

var noCustomTags = localStorage.getItem('no-custom-tag-input');

if(noCustomTags !== null) {
    // console.log('get data from no-custom-tag-input local: ',noCustomTags)
    document.getElementById("no-custom-tag-input").textContent = noCustomTags //nguoi dung luu
}

document.getElementById("no-custom-tag-input").addEventListener('input', (e) => {
    search_focus = true;
    console.log(e);
    let newName;
    window.onkeyup = (e)=>{
        switch (e.keyCode) {
            case 13:
                console.log("enter");
                document.getElementById("no-custom-tag-input").textContent = localStorage.getItem('no-custom-tag-input');
                return;
            default:
                newName = document.getElementById("no-custom-tag-input").textContent;
                localStorage.setItem('no-custom-tag-input', newName);
                break;
        } 
    }
});