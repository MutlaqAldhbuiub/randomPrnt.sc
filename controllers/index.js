const axios = require('axios');
const axiosParallel = require('axios-parallel');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// Debug
const { performance } = require('perf_hooks');




  function getToken(){
        ltr_1=getRandomString().toLowerCase()
        num_1=Math.floor(Math.random() * 999)
        ltr_2=getRandomString().toLowerCase()
        num_2=Math.floor(Math.random() * 10)
        return `${ltr_1}${num_1}${ltr_2}${num_2}`;
  }

  function getRandomString() {
    return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.charAt(Math.floor(Math.random() * 1));
  } 

  function generateRandomURL(){
      return `${process.env.URL_DOMAIN}/${getToken()}`   
  }


  function getImage(URL){
    axios.get(URL)
      .then(async function (response) {
        const dom = await new JSDOM(response.data);
        image_url = await dom.window.document.querySelector('.screenshot-image').src;
        console.log(image_url);
        return image_url
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        return false;
      })
      .then(function () {
        // always executed
        return false;
      });
  }


  async function getImages(count){

    const start = performance.now();
    const MAX_PARALLEL_REQUEST_PER_CPU = 30;


    urls=[];
    images=[];


    for (let i = 0; i < count; i++) {
      urls.push(generateRandomURL());
    }


    const response = await axiosParallel(requests, MAX_PARALLEL_REQUEST_PER_CPU);


    for (let i = 0; i < count; i++) {
       await axios.get(urls[i]).then(response => {
          const dom = new JSDOM(response.data);
          image_url = dom.window.document.querySelector('.screenshot-image').src;
          images.push(image_url);
          // console.log(image_url);
        })
  }

  console.log(images);
  return await images;

}



  module.exports = {
    async getIndexData(req, res) {

      let images = await getImages(10);
      return await res.render('index',{title: "Mutlaq",images:images,images_size:images.length});



    //   axios.get(generateRandomURL()).then(response => {
    //     const dom = new JSDOM(response.data);
    //     image_url = dom.window.document.querySelector('.screenshot-image').src;
    //     console.log(image_url);


    //     return res.render('index',{
    //         title: "Mutlaq",
    //         image:image_url
    //     });
    // });




      // image1 = await getImage(generateRandomURL())
      // console.log(getToken())
      // console.log(generateRandomURL())
      // console.log(getImage(generateRandomURL()));
      // return res.send(image1);
      // return res.render('index', { title: "Mutlaq", image:image1 });
    }  
};