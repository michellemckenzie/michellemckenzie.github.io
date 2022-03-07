(function(){
    'use strict';
    
    console.log('reading js');

    Parse.initialize("hJiXQ6wc2TdRMkGA54o1NCiwXXLgWYH1jZD2Ej9G","skZpewzy0S51fkiUHbs9qjXncb4xXY2KfWbw2VKd");
    // Parse server
    Parse.serverURL = 'https://parseapi.back4app.com/';



    let mainPage = document.getElementById('mainPage');
    let uploadPage = document.getElementById('uploadPage');
    let aboutPage = document.getElementById("aboutPage");
    let menuButton = document.querySelector('.fa-solid.fa-bars');
    let menuClose = document.querySelector('.fa-solid.fa-xmark');
    let menu = document.querySelector('#menu');
    let addOption = document.getElementById('addOption');
    let homeOption = document.getElementById('homeOption');
    let aboutOption = document.getElementById('aboutOption');
    let currentPage = mainPage;
    let title = document.querySelector('#title');
    let shoeLink = document.querySelector('#shoes h2');
    let shoePage = document.getElementById('shoePage');

    shoeLink.addEventListener('click', function(){
      shoePage.style.display = 'block';
      currentPage.style.display = 'none';
      currentPage = shoePage;
    });

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
        const nameUploadControl = document.querySelector('#name');
        const descriptionUploadControl = document.querySelector('#description');
        const selectedCategory = document.querySelector('#category');
    
        // this is a good place to collect data from the other fields
        if (fileUploadControl.files.length > 0) {
            let file = fileUploadControl.files[0];
            let fileName = fileUploadControl.files[0].name;
            const type = fileUploadControl.files[0].type;
            const size = fileUploadControl.files[0].size;
            const name = nameUploadControl.value;
            const description = descriptionUploadControl.value;
            const category = selectedCategory.value;
            const convertedImg = false;

            if (type == "image/heic" || type == "image/heif"){
              convertPhoto(file);
            }
            else{
              const fileAsDataURL = window.URL.createObjectURL(file);
              handleImg(fileAsDataURL);
              // uploadPhoto(name, file, description, fileName, category, convertedImg);
            }
        } 
    });

    async function uploadPhoto(name, fileName, file, description, category, isResized){
      const photo = new Parse.Object('uploads');
      
      

      if (isResized){
        photo.set('image', new Parse.File(fileName, { base64: resizedFile }));
      }
      else{
        photo.set('image', new Parse.File(fileName, file));
      }

      photo.set('name', name);
      photo.set('description', description);
      photo.set('category',category);


      //This is a good place to save data from the other fields to the database
      try {
        let loadingScreen = document.querySelector('#loadingScreen');
        loadingScreen.style.display = 'flex';
        const result = await newPhoto.save();
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
        let html = `<img src="${photoURL}">`;
        document.querySelector(`#${photoCategory} .images`).innerHTML += html;
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

            let photoURL;

            if (results[i].get('image') === undefined){
              photoURL = results[i].get('convertedImage');
            }
            else{
              photoURL = results[i].get('image').url();
            }
            
            let photoCategory = results[i].get('category');
            showUploadedPhoto(photoURL, photoCategory);
          }
        } catch (error) {
            console.error('Error while getting photo', error);
        } 
      }

      async function convertPhoto(file){
        let convertApi = ConvertApi.auth({secret: 'HDy3UHldQEvnxgbY'});
        let params = convertApi.createParams();
        params.add('file', file);
        let result = await convertApi.convert('heic', 'jpg', params);

        // Get result file URL
        let url = result.files[0];

        handleImg(url.Url);
      //  uploadPhoto("michelle", url.Url, "my desc", url.FileName, "dog", convertedImg);
      }

      async function handleImg(imageUrl){
        const dimensions = await getHeightAndWidthFromDataUrl(imageUrl);
        resizeImg(imageUrl, dimensions);
      }


      async function resizeImg(imageUrl, dimensions){
    
        // make a square thumbnail for any image...
        const image = await Jimp.read(imageUrl);
        let squareThumbnail = resizePhoto(image, 250, 250);

        let resizedImg;
        const image2 = await Jimp.read(imageUrl);

        let optimizeLandscapeWidth = 330;
        let optimizePortraitHeight = 450;

        if (dimensions.height > dimensions.width && dimensions.height > 450){
          resizedImg = resizePhoto(image2, Jimp.AUTO, optimizePortraitHeight);
        }
        else if ((dimensions.height < dimensions.width || dimensions.height == dimensions.width) && dimensions.width > 330){
          resizedImg = resizePhoto(image2, optimizeLandscapeWidth, Jimp.AUTO);
        }
        else{
          resizeImg = imageUrl;
        }

        document.querySelector('#resized-img img').src = resizedImg;
        document.querySelector('#square-img img').src = squareThumbnail;
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

      

})();