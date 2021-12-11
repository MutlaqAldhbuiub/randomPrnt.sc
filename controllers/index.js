const axios = require('axios');
const jsdom = require("jsdom");

const { JSDOM } = jsdom;

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
        console.error(error);
        return false;
      })
      .then(function () {
        // always executed
        return false;
      });
  }

  async function getImages(count){
    urls=[];
    images=[];
    
    for (let i = 0; i < count; i++) {
      urls.push(generateRandomURL());
    }

    console.info(urls)

    for (let i = 0; i < count; i++) {
       await axios.get(urls[i]).then(response => {
          const dom = new JSDOM(response.data);
          image_url = dom.window.document.querySelector('.screenshot-image').src;
          images.push(image_url);
        })
  }

  return await images;
}

  module.exports = {
    async getIndexData(req, res) {
      let images = await getImages(3);
      return await res.render('index',{title: "Light‑Shot screenshot viewer",images:images,images_size:images.length});
    }  
};