// Sending a request from a content script
/*
chrome.extension.sendMessage({msg: "I'm content-script"}, function (response) {
    console.log(response);
});
*/
(function() {
  if (window.location.hostname == 'www.facebook.com') {
    if (localStorage.requestSent) {
      let now = new Date();
      let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      if (localStorage.requestSent == today) {
        return;
      }
    }
    var reminder, people, name;
    var reminders = document.getElementsByClassName('fbRemindersStory');
    for (var i = 0, len = reminders.length; i < len; i++) {
      reminder = reminders[i].getElementsByClassName('fbRemindersIcon');
      if (reminder[0].classList.contains('sp_RX49PX1k27y_2x')) {
        var link = reminders[i].getElementsByTagName('a');
        link[0].click();
        // wait 3 seconds for the form to open
        setTimeout(function() {
          var birthdays = document.querySelectorAll('._5j06');
          for (var j = 0, lenj = birthdays.length; j < lenj; j++) {
            day = birthdays[j];
            day.querySelectorAll('textarea')[0].value = getGreetingText();
            person = day.querySelectorAll('._5j0a a')[0].innerHTML;
            console.log(person);
            if (confirm('Publish the Bd congrats to ' + person + '?')) {
                console.log('published!');
                //day.querySelectorAll('button._42ft').click();
            } else {
              day.querySelectorAll('textarea')[0].value = '';
            }
          }
          localStorage.requestSent = today;
        }, 2500);
      }
    }

    function getGreetingText() {
			var greeting = [
				"Happy Birthday with cookies!",
				"Hey, It's Your Birthday, It's Your Birthday, We're gonna party like it's Your Birthday!",
				"On this cheerful and awesome day, I say Happy Birthday!",
				"They say it's an awesome day, because it's Your Birthday!",
				"The time has come, Happy Birthday to You!"
			];

			var wishes = [
				"enjoy the happy moments of life and share them with your loved ones",
				"always begin your day with a smile in your soul",
				"friends that will be there for you in the time of need and joy",
				"colored emotions every day",
				"to experience as many various life experiences on your path",
				"to meet as many awesome and inspiring people as you can",
				"to make your dreams become a reality",
				"to taste life in it's many varieties it comes",
				"lots of hugs, kisses and adventures",
				"sunny days full of joy and laughs",
				"to climb each day at least one step to make your life and others a bit better",
				"to continue doing what you love and do best",
				"to experience adventures that you will later on tell your grandchildren ",
				"say Yes as often as possible for new adventures",
				"to take any travel opportunity life gives"
			];

			var prewish = [
				"On this amazing day I wish You ",
				"Without further to do, I wish You ",
				"For this day and the next to be 364 awesome I wish You ",
			]

			var invites = [
				'coffee',
				'wine',
				'pizza',
			];

			var smiles = [
			'😘','🙂','😊','☺','😄','😁','😃','😀','😎','🤠','😺','😸',
			'😼','👏','👍','🍰','🎂','🍮','🍭','🍬','🍫','🍩','🍪','🍧',
			'🍨','🍦','🥂','🍺','🍷','🍹','🍾','🏅','🎸','🎷','❗']


			function getInvite() {
				return invites[Math.floor(Math.random() * invites.length)];
			}

			function getGreeting() {
				return greeting[Math.floor(Math.random() * greeting.length)]
			}

			function getPrewish() {
				return prewish[Math.floor(Math.random() * prewish.length)];
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
				for (var i = 1; i < number_of_items; i++) {
					var ind = Math.floor(Math.random() * localArr.length);
					text += localArr[ind];
					if (separators && separators[i]) {
						text += separators[i];
					}
					localArr.splice(ind, 1);
				}
				return text;
			}

			text = getGreeting() + ' ' + getPrewish();
			text += getWish(3, [', ', ' and ', '! ']);
			text += 'Besides that I would like to meet with you over' + getInvite();
			text +=  ' when we both have the time.';
			text += ' ' + getSmiles(5);
			return text;
		}

  }
})();

// Receiving message from a background page
/*
chrome.extension.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.greeting === "Do you hear me?") {
            sendResponse({answer: "Yes"});
        }
    }
);
*/