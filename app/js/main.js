/**
 * Main scripts
 */
(function(){
    /**
     *  Initilaize main scripts
     */
    function initialize() {
      navigation();
    }

    function navigation() {
      var heart = document.querySelector('.heart');
      var close = document.querySelector('.close');
      var main = document.querySelector('main');

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
