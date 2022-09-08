if(localStorage.getItem('randomtag-username') !== null) 
    document.getElementById("user-name").textContent = localStorage.getItem('randomtag-username')

document.getElementById("user-name").addEventListener('input', (e) => {
    console.log(e);
    let newName = document.getElementById("user-name").textContent;
    console.log(newName);
    localStorage.setItem('randomtag-username', newName);
});