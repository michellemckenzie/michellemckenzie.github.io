(function(){
    'use strict';
    console.log('reading js');

    const songNum = ['one','two','three','four','five', 'six'];

    const characteristics = {  twenty18: {  pic: 'images/cover1.jpg',
                                            background: 'linear-gradient(180deg, rgba(209,255,183,1) 0%, rgba(255,255,255,1) 100%)'},
                                twenty19: { pic: 'images/cover2.jpg',
                                            background: 'linear-gradient(180deg, rgba(154,229,230,1) 0%, rgba(255,255,255,1) 100%)'},
                                twenty20: { pic: 'images/cover3.jpg',
                                            background: 'linear-gradient(180deg, rgba(70,70,70,1) 0%, rgba(255,255,255,1) 100%)'},
                                twenty21: { pic: 'images/cover4.jpg',
                                            background:'linear-gradient(180deg, rgba(222,139,147,1) 0%, rgba(255,255,255,1) 100%)'}
                            };

    let selectedYear = 'twenty18';

    const songNames = document.getElementsByClassName('songName');
    const artistNames = document.getElementsByClassName('artistName');
    const displayYear = document.getElementById('year');
    const coverPhoto = document.querySelector('img');
    const options = document.querySelector('select');
    const description = document.getElementById('description');
    const topscreen = document.getElementById('topscreen');
    let data;

    options.addEventListener('change', updatePlaylist);

    function updatePlaylist(){
        selectedYear = options.value;

        for (let i = 0; i < songNames.length; i++){
            songNames[i].textContent = `${data[selectedYear][songNum[i]].song}`;
            artistNames[i].textContent = `${data[selectedYear][songNum[i]].artist}`;
            displayYear.textContent = `${data[selectedYear].year}`;
            coverPhoto.src = `${characteristics[selectedYear].pic}`;
            description.textContent = `${data[selectedYear].description}`;
            topscreen.style.background = `${characteristics[selectedYear].background}`;
        }
    }

    async function getData(){
        const songs = await fetch('data.json');
        data = await songs.json();

        updatePlaylist();
    }

    getData();
})();