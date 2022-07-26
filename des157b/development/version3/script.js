(function(){

    'use strict';
    console.log('reading js');

    Parse.initialize("hJiXQ6wc2TdRMkGA54o1NCiwXXLgWYH1jZD2Ej9G","skZpewzy0S51fkiUHbs9qjXncb4xXY2KfWbw2VKd");
    // Parse server
    Parse.serverURL = 'https://parseapi.back4app.com/';

  
    let menuButton = document.querySelector('.fa-solid.fa-bars');
    let menuClose = document.querySelector('.fa-solid.fa-xmark');
    let menu = document.querySelector('#menu');

    let addOption = document.getElementById('addOption');
    let homeOption = document.getElementById('homeOption');
    let aboutOption = document.getElementById('aboutOption');

    let backBtn = document.querySelector('.fa-solid.fa-angle-left');

    let title = document.querySelector('#title');

    let shoeLink = document.querySelector('#shoes');
    let foodLink = document.querySelector('#food');
    let natureLink = document.querySelector('#nature');
    let animalLink = document.querySelector('#animals');

    let mainPage = document.getElementById('mainPage');
    let uploadPage = document.getElementById('uploadPage');
    let aboutPage = document.getElementById("aboutPage");
    let shoePage = document.getElementById('shoePage');
    let foodPage = document.getElementById('foodPage');
    let animalPage = document.getElementById('animalPage');
    let naturePage = document.getElementById('naturePage');
    let currentPage = mainPage;

    let loadingScreen = document.querySelector('#loadingScreen');

    let links = [shoeLink, animalLink, foodLink, natureLink];
    let pages = [shoePage,animalPage, foodPage, naturePage];


    backBtn.addEventListener('click', function(){
      currentPage.style.display = 'none';
      backBtn.style.visibility = 'hidden';
      mainPage.style.display = 'block';
      currentPage = mainPage;
      
    });

    for (let i = 0; i < links.length; i++){
      links[i].addEventListener('click', function(){
        currentPage.style.display = 'none';
        pages[i].style.display = 'block';
        currentPage = pages[i];
        backBtn.style.visibility = 'visible';
      });
    }
    

    title.addEventListener('click', function(){
      if(currentPage != mainPage){
        currentPage.style.display = 'none';
        mainPage.style.display = 'flex';
        currentPage = mainPage;
      }
    });

    constructPhotoGallery();

    // render photos from b4a onto the html page into the respective categories

    menuButton.addEventListener('click', function(){
        menu.classList.add("show");
        document.body.style.overflow = "hidden";
        
        addOption.addEventListener('click', function(){
            currentPage.style.display = "none";
            uploadPage.style.display = "flex";
            currentPage = uploadPage;
            closeMenu();
        });

        homeOption.addEventListener('click', function(){
            currentPage.style.display = "none";
            mainPage.style.display = "block";
            currentPage = mainPage;
            closeMenu();
        });

        aboutOption.addEventListener('click', function(){
            currentPage.style.display = "none";
            aboutPage.style.display = "block";
            currentPage = aboutPage;
            closeMenu();
        });
    });

    menuClose.addEventListener('click', closeMenu);
    
    function closeMenu(){
        menu.classList.remove("show");
        document.body.style.overflow = "auto";
    }

    document.querySelector('#upload').addEventListener('submit', function(event){
        event.preventDefault();
    
        const fileUploadControl = document.querySelector('#fileupload');
        const selectedCategory = document.querySelector('#category');
    
        // this is a good place to collect data from the other fields
        if (fileUploadControl.files.length > 0) {
            let file = fileUploadControl.files[0];
            let fileName = fileUploadControl.files[0].name;
            const type = fileUploadControl.files[0].type;
            // const size = fileUploadControl.files[0].size;
            const category = selectedCategory.value;

            if (type == "image/heic" || type == "image/heif"){
              convertPhoto(file, category);
            }
            else{
              const fileAsDataURL = window.URL.createObjectURL(file);
              handleImg(fileAsDataURL, category, fileName);
              // uploadPhoto(name, file, description, fileName, category, convertedImg);
            }
        } 
    });

    async function uploadPhoto(fileName, file, category, isResized){
      const photo = new Parse.Object('uploads');
      
      if (isResized){
        photo.set('image', new Parse.File(fileName, { base64: file }));
      }
      else{
        photo.set('image', new Parse.File(fileName, file));
      }

      photo.set('category',category);


      //This is a good place to save data from the other fields to the database
      try {
        
        loadingScreen.style.display = 'flex';
        const result = await photo.save();
        console.log(result.id);
        getNewPhoto(result.id);

        loadingScreen.style.display='none';
        console.log('success!');

        clearForm();
      } catch (error) {
        console.error('Error while uploading the photo: ', error);
      }
  }
    
    async function getNewPhoto(photoId){
        const records = Parse.Object.extend('uploads');
        const query = new Parse.Query(records);
        console.log(query);
        // query.equalTo("objectId", photoId);
        try{
          const results = await query.find();
          console.log(results);
          // const photoURL = results[0].get('file').url();
          const photoTitle = results[0].get('name');
          const photoDescription = results[0].get('description');
          // let photoCategory = results[i].get('category');
          // This is a good place to get data from the database fields
          showUploadedPhoto(photoURL, photoCategory);
          // This is a good place to run a function that clears out the form, which you will write below.
          clearForm();
        } catch (error) {
            console.error('Error while getting photo', error);
        } 
      }
      
      function showUploadedPhoto(photoURL,photoCategory){
        let html = `<div class = "grid-item"> <img src="${photoURL}" alt = "${photoCategory}"> </div>`;
        document.querySelector(`#${photoCategory}Page .grid`).innerHTML += html;
      }
      
      // This is a good place to write a function that clears out the form.
      
      function clearForm(){
        document.querySelector('#upload').reset();
      }

      async function constructPhotoGallery(){
        const records = Parse.Object.extend('uploads');
        const query = new Parse.Query(records);

        try{
          const results = await query.find();
          for (let i = results.length-1; i >= 0; i--){

            let photoURL = results[i].get('image').url();
            
            let photoCategory = results[i].get('category');
            showUploadedPhoto(photoURL, photoCategory);
          }
        } catch (error) {
            console.error('Error while getting photo', error);
        } 

        let html = '<div class="grid-item grid-item--width2"></div>';
        document.querySelector(`#shoePage .grid`).innerHTML += html;
        document.querySelector(`#animalPage .grid`).innerHTML += html;
        document.querySelector(`#foodPage .grid`).innerHTML += html;
        document.querySelector(`#naturePage .grid`).innerHTML += html;

        var grid = document.querySelectorAll('.grid');

        for (let g of grid){
          var msnry = new Masonry( g, {
            // options
            itemSelector: '.grid-item',
            gutter: 13,
          });
  
          imagesLoaded( g ).on( 'progress', function() {
            // layout Masonry after each image loads
            msnry.layout();
          });
        }
       


        // // vanilla JS
        // var msnry = new Masonry( '.grid', {
        //   columnWidth: 200
        // });

        // msnry.imagesLoaded( function() {
        //   // init Masonry
        //   msnry.masonry({
        //     // options...
        //     itemSelector: '.grid-item',
        //     gutter: 9,
        //   });
        //   // Masonry has been initialized, okay to call methods
        //   msnry.append( $items )
        //     .masonry( 'appended', $items );
        // });

      }

      async function convertPhoto(file, category){
        let convertApi = ConvertApi.auth({secret: 'HDy3UHldQEvnxgbY'});
        let params = convertApi.createParams();
        params.add('file', file);
        loadingScreen.style.display = 'flex';
        let result = await convertApi.convert('heic', 'jpg', params);
        loadingScreen.style.display = 'none';

        // Get result file URL
        let url = result.files[0];

        handleImg(url.Url, category, url.FileName);
      //  uploadPhoto("michelle", url.Url, "my desc", url.FileName, "dog", convertedImg);
      }

      async function handleImg(imageUrl, category, filename){
       
        const dimensions = await getHeightAndWidthFromDataUrl(imageUrl);
        resizeImg(imageUrl, dimensions, category, filename);
      }


      async function resizeImg(imageUrl, dimensions, category, filename){
        loadingScreen.style.display = 'flex';
        let resizedImg;
        let isResized = false;
        const image = await Jimp.read(imageUrl);

        let optimizeLandscapeWidth = 330;
        let optimizePortraitHeight = 450;

        if (dimensions.height > dimensions.width && dimensions.height > 450){
          resizedImg = resizePhoto(image, Jimp.AUTO, optimizePortraitHeight);
          isResized = true;
        }
        else if ((dimensions.height < dimensions.width || dimensions.height == dimensions.width) && dimensions.width > 330){
          resizedImg = resizePhoto(image, optimizeLandscapeWidth, Jimp.AUTO);
          isResized = true;
        }
        else{
          resizeImg = imageUrl;
        }

        loadingScreen.style.display = 'none';

        uploadPhoto(filename, resizedImg, category, isResized);
        
      }
    
      const getHeightAndWidthFromDataUrl = dataURL => new Promise(resolve => {
        const img = new Image();
        img.onload = () => {
          resolve({
            height: img.height,
            width: img.width
          });
        }
        img.src = dataURL;
      });

      function resizePhoto(image, width, height){
        let newImg;
        image.resize(width, height).getBase64('image/jpeg', (err, result) => {
          if(err)
              console.log(err);
          else 
            newImg = result;
        });
        return newImg;
      }

      // window.onload = () => {
      //   var elem = document.querySelector('.grid');
      //   var msnry = new Masonry( elem, {
      //     // options
      //     itemSelector: '.grid-item',
      //     gutter: 11,
      //   });
      // }
    

      

})();