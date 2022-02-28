(function(){
    'use strict';
    console.log('reading js');

    Parse.initialize("hJiXQ6wc2TdRMkGA54o1NCiwXXLgWYH1jZD2Ej9G","skZpewzy0S51fkiUHbs9qjXncb4xXY2KfWbw2VKd");
    // Parse server
    Parse.serverURL = 'https://parseapi.back4app.com/';


    let mainPage = document.getElementById('main');
    let uploadPage = document.getElementById('uploadPage');
    let menuButton = document.querySelector('.fa-solid.fa-bars');
    let menuClose = document.querySelector('.fa-solid.fa-xmark');
    let mobileMenu = document.querySelector('#menuOptions');
    let addOption = document.getElementById('addOption');
    let homeOption = document.getElementById('homeOption');

    menuButton.addEventListener('click', function(){
        
        mobileMenu.style.animation = "menuAppear 1s forwards";
        

        addOption.addEventListener('click', function(){
            mainPage.style.display = "none";
            uploadPage.style.display = "flex";
            closeMenu();
        });

        homeOption.addEventListener('click', function(){
            mainPage.style.display = "block";
            uploadPage.style.display = "none";
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
    
        // this is a good place to collect data from the other fields
        if (fileUploadControl.files.length > 0) {
            const file = fileUploadControl.files[0];
            const fileName = fileUploadControl.files[0].name;
            const type = fileUploadControl.files[0].type;
            const size = fileUploadControl.files[0].size;
            const name = nameUploadControl.value;
            const description = descriptionUploadControl.value;
            console.log(name);
            console.log(file);
            console.log(fileName);
            console.log(size);
            console.log(type)
            console.log(description);

            
            uploadPhoto(name, file, description, fileName);
        }

        async function uploadPhoto(name, file, description, fileName){
            const newPhoto = new Parse.Object('uploads');
            newPhoto.set('file', new Parse.File(fileName, file));
            newPhoto.set('name', name);
            newPhoto.set('description', description);
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
        query.equalTo("objectId", photoId);
        try{
          const results = await query.find();
          const photoURL = results[0].get('file').url();
          const photoTitle = results[0].get('name');
          const photoDescription = results[0].get('description');
          // This is a good place to get data from the database fields
          showUploadedPhoto(photoURL, photoTitle, photoDescription);
          // This is a good place to run a function that clears out the form, which you will write below.
          clearForm();
        } catch (error) {
            console.error('Error while getting photo', error);
        } 
      }
      
      function showUploadedPhoto(photoURL, photoTitle, photoDescription){
        let html = `<img src="${photoURL}">`;
        // This is a good place to add more data to the HTML 
        document.querySelector('#shoes .images').innerHTML += html;
      }
      
      // This is a good place to write a function that clears out the form.
      
      function clearForm(){
        document.querySelector('#upload').reset();
      }

})();