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