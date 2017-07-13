const NUM_OF_CLOUDS = 18;

function init()
{
    var container = document.getElementById('cover-screen-clouds-wrap');
    for (var i = 0; i < NUM_OF_CLOUDS; i++)
    {
        container.appendChild(createClouds());
    }
}

function randomInteger(low, high)
{
    return low + Math.floor(Math.random() * (high - low));
}
function randomFloat(low, high)
{
    return low + Math.random() * (high - low);
}
function pixelValue(value)
{
    return value + 'px';
}
function durationValue(value)
{
    return value + 's';
}
function createClouds()
{
    var cloudDiv = document.createElement('div');
    cloudDiv.classList.add('cloud');
    var image = document.createElement('img');
    image.src = 'img/clouds/cloud-' + randomInteger(1, 6) + '.png';
    cloudDiv.style.top = "-300px";

    /* Position the clouds at a random location along the screen */
    cloudDiv.style.left = pixelValue(randomInteger(-(window.innerWidth/2), (window.innerWidth/2)));

    /* Randomly choose a spin animation */
    var spinAnimationName = (Math.random() < 0.5) ? 'clockwiseSpin' : 'counterclockwiseSpinAndFlip';
    
    /* Set the -webkit-animation-name property with these values */
    cloudDiv.style.webkitAnimationName = 'fade, drop';
    image.style.webkitAnimationName = spinAnimationName;
    
    /* Figure out a random duration for the fade and drop animations */
    var fadeAndDropDuration = durationValue(randomFloat(15, 18));
    
    /* Figure out another random duration for the spin animation */
    var spinDuration = durationValue(randomFloat(330, 400));
    /* Set the -webkit-animation-duration property with these values */
    cloudDiv.style.webkitAnimationDuration = fadeAndDropDuration + ', ' + fadeAndDropDuration;

    var cloudsDelay = durationValue(randomFloat(1, 7));
    cloudDiv.style.webkitAnimationDelay = cloudsDelay + ', ' + cloudsDelay;

    image.style.webkitAnimationDuration = spinDuration;

    cloudDiv.appendChild(image);
    return cloudDiv;
}

window.addEventListener('load', init, false);