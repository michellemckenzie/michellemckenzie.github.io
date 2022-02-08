(function(){
    'use strict';

    console.log('reading js now');

    let data;
    let dataSelector = ["class1", "class2", "class3", "class4", "class5"];
    const classes = document.querySelectorAll(".class");
    const ratings = document.querySelectorAll(".rating");
    const oneStar = '<span class="fa fa-star checked"></span>';
    const noStar = '<span class="fa fa-star"></span>';
    const maxRating = 5;
    let labelNames = [];
    let starRatings = [];

    async function getData(){
      const classData = await fetch('data.json');
      data = await classData.json();

      for (let i = 0; i < classes.length; i++){
        let courseName = document.createElement("h1");
        courseName.textContent = `${data[dataSelector[i]].course} - ${data[dataSelector[i]].title}`;

        let profName = document.createElement("h2");
        profName.textContent = `${data[dataSelector[i]].term} with ${data[dataSelector[i]].professor}`;

        let courseDesc = document.createElement("h3");
        courseDesc.textContent = `${data[dataSelector[i]].desc}`;
        
        classes[i].append(courseName, profName, courseDesc);

        for (let a = 0; a < data[dataSelector[i]].rating; a++){
          ratings[i].innerHTML += oneStar;
        }

        const remainingStars = maxRating - data[dataSelector[i]].rating;

        for (let b = 0; b < remainingStars; b++){
          ratings[i].innerHTML += noStar;
        }

        labelNames.push(`${data[dataSelector[i]].course}`);
        starRatings.push(data[dataSelector[i]].rating);

        
      }
      createChart();
    }

    getData();



  
    function createChart(){
      const ctx = document.getElementById('myChart').getContext('2d');
      const myChart = new Chart(ctx, {
          type: 'bar',
          data: {
              labels: labelNames,
              datasets: [{
                  label: '# of stars',
                  data: starRatings,
                  backgroundColor: ['#F4CBC6', '#BDF7B7', '#BBDEF0', '#EFCA08', '#F4AFAB']
              }]
          },
          options: {
              scales: {
                  y: {
                      beginAtZero: true,
                      title:{
                        display:true,
                        text: 'Stars'
                      }
                  },
                  x: {
                    beginAtZero: true,
                    title:{
                      display:true,
                      text: 'Courses'
                    }
                }
              },
              plugins: {
                title: {
                    display: true,
                    text: 'Ratings for My Courses'
                }
            }
          }
        }
      );
  }

})();