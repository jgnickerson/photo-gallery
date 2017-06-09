import Grid from './grid.js';
import firebase from 'firebase-app';
import 'lazysizes';
import './index.css';

// const config = {
//   apiKey: "AIzaSyDAaYXAQCGOvNrVYhhpkbSOOUW91b1m81I",
//   authDomain: "photo-gallery-38650.firebaseapp.com",
//   databaseURL: "https://photo-gallery-38650.firebaseio.com",
//   projectId: "photo-gallery-38650",
//   storageBucket: "photo-gallery-38650.appspot.com",
//   messagingSenderId: "780654496614"
// };
// firebase.initializeApp(config);

let urls = [['https://c1.staticflickr.com/6/5661/22826806478_735a5b3709_o.jpg', 1000, 567],
                  ['https://c1.staticflickr.com/6/5792/30969987556_704d3f7bc2_o.jpg', 1000,646],
                  ['https://c1.staticflickr.com/6/5749/30969987986_cf9b511db4_o.jpg', 1000,604],
                  ['https://c1.staticflickr.com/3/2911/33435250581_3771783871_o.jpg', 627,926],
                  ['https://c1.staticflickr.com/6/5506/30969987906_805b11c0ca_o.jpg', 1000,604],
                  ['https://c1.staticflickr.com/6/5521/22826806218_cff7015524_o.jpg', 1000,607],
                  ['https://c1.staticflickr.com/6/5560/30969987836_406b4aab7e_o.jpg', 1000,672],
                  ['https://c1.staticflickr.com/6/5821/22826805948_3042189999_o.jpg', 1000,667],
                  ['https://c1.staticflickr.com/3/2911/33435250581_3771783871_o.jpg', 627,926],
                  ['https://c1.staticflickr.com/6/5563/30969987696_d85fd0e414_o.jpg', 1000, 667],
                  ['https://c1.staticflickr.com/3/2830/33407254622_2d9521fa3f_o.jpg', 4961, 3585],
                  ['https://c1.staticflickr.com/4/3829/32720628284_148d94b5cb_o.jpg', 1186, 925],
                  ['https://c1.staticflickr.com/3/2911/33435250581_3771783871_o.jpg', 627, 926],
                  ['https://c1.staticflickr.com/4/3678/33435244401_01aa5f1120_o.jpg', 4811, 3360],
                  ['https://c1.staticflickr.com/6/5560/30969987836_406b4aab7e_o.jpg', 1000,672],
                  ['https://c1.staticflickr.com/3/2905/32720602474_b7aee347e8_o.jpg', 5472, 3543]];

let grid = new Grid(document.body, urls);

window.addEventListener("optimizedResize", () => {
  grid.fixPadding();

  //hack to get around breakpoint layout issue
  setTimeout(()=>{
    grid.layout();
  }, 500);
});
