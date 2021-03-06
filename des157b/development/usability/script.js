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
    let mobileMenu = document.querySelector('#menuOptions');
    let addOption = document.getElementById('addOption');
    let homeOption = document.getElementById('homeOption');
    let aboutOption = document.getElementById('aboutOption');
    let currentPage = mainPage;

    constructPhotoGallery();
    alert('Hello! Thank you for testing my project. There are still issues with uploading HEIF/HEIC images, so the project can only take JPG/PNG at the moment. A workaround for mobile users currently is submitting a screenshot of your image. For user testing, please submit a photo, read the about page, and look at your submitted photo on the homepage. User testing can be observed with the inspection tool open and the screen resized to iPhone X, with the console opened to observe images being uploaded. Images still need to be processed with JIMP and will take a little time to load, so after submission please refresh for now.');

    // render photos from b4a onto the html page into the respective categories

    menuButton.addEventListener('click', function(){
        mobileMenu.style.animation = "menuAppear 1s forwards";
        
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
        mobileMenu.style.animation = "menuDisappear 1s forwards";
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
            const fileName = fileUploadControl.files[0].name;
            const type = fileUploadControl.files[0].type;
            const size = fileUploadControl.files[0].size;
            const name = nameUploadControl.value;
            const description = descriptionUploadControl.value;
            const category = selectedCategory.value;
            console.log(name);
            console.log(file);
            console.log(fileName);
            console.log(size);
            console.log(type)
            console.log(description);
            console.log(selectedCategory.value)
               
            uploadPhoto(name, file, description, fileName, category);
        }

        async function uploadPhoto(name, file, description, fileName, category){
            const newPhoto = new Parse.Object('uploads');
            newPhoto.set('file', new Parse.File(fileName, file));
            newPhoto.set('name', name);
            newPhoto.set('description', description);
            newPhoto.set('category',category);
            //This is a good place to save data from the other fields to the database
            try {
              const result = await newPhoto.save();
              console.log(result.id);
              getNewPhoto(result.id);
              console.log('success!');
            } catch (error) {
              console.error('Error while uploading the photo: ', error);
            }
        }
    });
    
    async function getNewPhoto(photoId){
        const records = Parse.Object.extend('uploads');
        const query = new Parse.Query(records);
        console.log('here');
        console.log(query);
        console.log('end');
        // query.equalTo("objectId", photoId);
        try{
          const results = await query.find();
          console.log(results);
          const photoURL = results[0].get('file').url();
          const photoTitle = results[0].get('name');
          const photoDescription = results[0].get('description');
          let photoCategory = results[i].get('category');
          // This is a good place to get data from the database fields
          showUploadedPhoto(photoURL, photoTitle, photoDescription, photoCategory);
          // This is a good place to run a function that clears out the form, which you will write below.
          clearForm();
        } catch (error) {
            console.error('Error while getting photo', error);
        } 
      }
      
      function showUploadedPhoto(photoURL, photoTitle, photoDescription, photoCategory){
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
          for (let i = 0; i < results.length; i++){
            let photoURL = results[i].get('file').url();
            let photoTitle = results[i].get('name');
            let photoDescription = results[i].get('description');
            let photoCategory = results[i].get('category');
            showUploadedPhoto(photoURL, photoTitle, photoDescription, photoCategory);
          }
        } catch (error) {
            console.error('Error while getting photo', error);
        } 

      }

  

      

})();