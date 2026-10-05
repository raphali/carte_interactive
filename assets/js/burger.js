const closebtn = document.getElementById('closebtn');

function closemenu(){
    closebtn.addEventListener('click', function(){
        menuburger.style.display='none';
    });
}

closemenu();