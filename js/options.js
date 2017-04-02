var main_tabs = new Tabs('#main_tabs');

document.addEventListener('optionsPageReady', function () {
  /* Options page is ready. Write your code here */
  (function($) {
    //storage.area.set({'book':'hello!'});

    function getGreetingText(greetings, prewishes, wishes) {
      var smiles = [
      '😘','🙂','😊','☺','😄','😁','😃','😀','😎','🤠','😺','😸',
      '😼','👏','👍','🍰','🎂','🍮','🍭','🍬','🍫','🍩','🍪','🍧',
      '🍨','🍦','🥂','🍺','🍷','🍹','🍾','🏅','🎸','🎷','❗']

      function getGreeting() {
        return greetings[Math.floor(Math.random() * greetings.length)]
      }

      function getPrewish() {
        return prewishes[Math.floor(Math.random() * prewishes.length)];
      }

      function getWish(number_wishes, separators) {
        return getItemsFromArray(wishes, number_wishes, separators)
      }

      function getSmiles(number_smiles, separators) {
        return getItemsFromArray(smiles, number_smiles, separators)
      }

      function getItemsFromArray(array, number_of_items, separators) {
        var localArr = Array.from(array);
        var text = ''
        for (var i = 0; i < number_of_items; i++) {
          var ind = Math.floor(Math.random() * localArr.length);
          text += localArr[ind];
          if (separators && separators[i]) {
            text += separators[i];
          }
          localArr.splice(ind, 1);
        }
        return text;
      }

      text = getGreeting() + '\n' + getPrewish() + ' ';
      text += getWish(3, [', ', ' and ', '! ']);
      text += ' ' + getSmiles(3);
      return text;
    }
    
    function save_options() {
      var wishes = $('#wishes').val();
      var prewishes = $('#prewishes').val();
      var greetings = $('#greetings').val();

      chrome.storage.sync.set({
        wishes: wishes,
        prewishes : prewishes,
        greetings : greetings
      }, function() {
        // Update status to let user know options were saved.
        console.log('changes saved');
      });
    }

    function restore_options() {
      // Use default value color = 'red' and likesColor = true.
      chrome.storage.sync.get({
        wishes: wishesLocalStorage.default_options.wishes,
        prewishes : wishesLocalStorage.default_options.prewishes,
        greetings : wishesLocalStorage.default_options.greetings
      }, function(items) {

        var wishes = $('#wishes').val(items.wishes);
        var prewishes = $('#prewishes').val(items.prewishes);
        var greetings = $('#greetings').val(items.greetings);
        text = getGreetingText(items.greetings.split('\n'), items.prewishes.split('\n'), items.wishes.split('\n'));
        $('#example').html(text.replace('\n','<br>'));
      });
    }

    restore_options();

    $('.reset-btn').click(function() {
      if (confirm('Are you sure you want to reset to defualts?')) {
        $('#wishes').val(wishesLocalStorage.default_options.wishes);
        $('#prewishes').val(wishesLocalStorage.default_options.prewishes);
        $('#greetings').val(wishesLocalStorage.default_options.greetings);
        save_options();
      }
    });

    $('textarea').on('keyup',function() {
      save_options();
    });

  })(jQuery);
});