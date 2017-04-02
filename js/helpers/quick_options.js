/**
 * This is a part of Chrome Extensions Box
 * Read more on GitHub - https://github.com/onikienko/chrome-extensions-box
 */
window.addEventListener('load', function () {
    /*This event will dispatch as soon as options page will be ready*/
    var event = new CustomEvent('optionsPageReady');

    function showMessage(msg) {
        var el = document.getElementById(msg === 'error' ? 'error' : 'success');
        el.style.display = 'inline';
        setTimeout(function () {
            el.style.display = 'none';
        }, 2501);
    }

    //     /* Options page is ready. Dispatch event */
    document.dispatchEvent(event);

    //});
}, false);
