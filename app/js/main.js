/**
 * Main scripts
 */
(function(){
    /**
     *  Initilaize main scripts
     */
    function initialize() {
      console.log('initalize')
      navigation();
    }

    function navigation() {
      var main = document.querySelector('main');
      var heart = main.classList.contains('home') ? document.querySelector('.heart-home') : document.querySelector('.heart');
      var close = document.querySelector('.close');

      heart.addEventListener('click', navigationChange, false);
      close.addEventListener('click', navigationChange, false);

      /**
       *  Toggle nav open/close
       */
      function navigationChange(e) {
        e.preventDefault();
        if(main.classList.contains('nav-open')) {
          main.classList.remove('nav-open');
        }
        else {
          main.classList.add('nav-open');
        }
      }
    }

    // Run initalize
    initialize();
})();
