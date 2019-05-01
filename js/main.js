var message;
var primes = [11, 17, 23, 31];
var primes2 = [13, 19, 29, 37];

var n;
var p;
var q;
var e;
var pq;
var d;

// Sender Button
$(document).ready(function () {
    $("#sender").hover(function () {
        $("#sender").removeClass("animated bounceInLeft delay-3s");
        $("#sender").addClass("animated heartBeat");
    }, function () {
        $("#sender").removeClass("heartBeat");
    });
});

// Receiver Button
$(document).ready(function () {
    $("#receiver").hover(function () {
        $("#receiver").removeClass("animated bounceInRight delay-3s");
        $("#receiver").addClass("animated heartBeat");
    }, function () {
        $("#receiver").removeClass("heartBeat");
    });
});

// Submit Button
$(document).ready(function () {
    $("#submit").hover(function () {
        $("#submit").removeClass("animated bounceInLeft delay-3s");
        $("#submit").addClass("animated heartBeat");
    }, function () {
        $("#submit").removeClass("heartBeat");
    });
});

// Next Button
$(document).ready(function () {
    $("#next").hover(function () {
        $("#next").removeClass("animated bounceInUp delay-1s");
        $("#next").addClass("animated heartBeat");
    }, function () {
        $("#next").removeClass("heartBeat");
    });
});

function senderNext() {
    document.getElementById("next").onclick = function () {
        senderNext2();
    };
    generateKeys();

    var p1 = document.getElementById("p");
    var p2 = document.getElementById("q");
    var p3 = document.getElementById("n");

    var tutorial = document.getElementById("tutorial");
    tutorial.className = "lead animated flipInX";

    var header = document.getElementById("public");
    header.className = "animated bounceInDown";

    tutorial.innerHTML = "Next, the first half of our public key, n, is calculated by multiplying p and q together:";
    p1.className = "lead col animated bounceInUp";
    p2.className = "lead col animated bounceInUp";
    p3.className = "lead animated bounceInDown slow";

    p1.innerHTML = "p = " + p;
    p2.innerHTML = "q = " + q;
    p3.innerHTML = "n = " + n;
}

function senderNext2() {
    document.getElementById("next").onclick = function () {
        senderNext3();
    };

    var p1 = document.getElementById("p");
    var p2 = document.getElementById("q");
    var p3 = document.getElementById("n");
    p1.innerHTML = "";
    p2.innerHTML = "";
    p3.innerHTML = "";

    var tutorial = document.getElementById("tutorial");
    tutorial.className = "lead animated fadeIn";

    var header = document.getElementById("public");
    header.className = "animated bounceInUp";

    var linebreak = "<br>";
    tutorial.innerHTML = "<br>n' = (p - 1) * (q - 1) = " + "(" + localStorage['p'] + " - 1) * " + "(" + localStorage['q'] + " - 1)" + linebreak + linebreak + "Next, a small number greater than 1, less than n', and is relatively prime to " +
        "n' is chosen for the exponent. This makes up the other half of the key.";

    p1.className = "lead col animated bounceInUp slow";
    p1.innerHTML = "n' = " + localStorage['pq'];
    p2.className = "lead col animated bounceInUp slow";
    p2.innerHTML = "e = " + localStorage['e'];
}

function senderNext3() {
    document.getElementById("next").onclick = function () {
        window.location.href = "privatekey.html";
    };

    var p1 = document.getElementById("p");
    var p2 = document.getElementById("q");
    var p3 = document.getElementById("n");
    p1.innerHTML = "";
    p2.innerHTML = "";
    p3.innerHTML = "";

    var header = document.getElementById("public");
    header.className = "animated bounceInDown";

    var tutorial = document.getElementById("tutorial");
    tutorial.className = "lead animated fadeInUp";
    tutorial.innerHTML = "Now that we've have our public key, we can move on to deriving a private key!";

    p3.className = "lead animated bounceInRight";
    p3.innerHTML = "Public Key (n, e): " + "(" + localStorage['n'] + ", " + localStorage['e'] + ")";
}

function privateKeyNext() {
    document.getElementById("next1").onclick = function () {
        privateKeyNext2();
    };

    var p1 = document.getElementById("p1");
    var p2 = document.getElementById("q1");
    var p3 = document.getElementById("n1");
    var p4 = document.getElementById("privateKey1");
    p1.innerHTML = "";
    p2.innerHTML = "";
    p3.innerHTML = "";
    p4.innerHTML = "";

    var tutorial = document.getElementById("tutorial1");
    tutorial.className = "lead animated flipInX";
    tutorial.innerHTML = "Here's what we end up with. Remember to keep your private key hidden!";

    var header = document.getElementById("header");
    header.className = "animated bounceInDown";

    p3.className = "lead animated bounceInDown delay-1s";
    p4.className = "lead animated bounceInUp delay-2s";

    p1.className = " lead col animated bounceInLeft";
    p2.className = " lead col animated bounceInRight";

    p1.innerHTML = "e = " + localStorage['e'] + ", n' = " + localStorage['pq'];
    p2.innerHTML = "(d * e) mod n' = 1";

    p3.innerHTML = "(d * " + localStorage['e'] + ")" + " mod " + localStorage['pq'] + " = 1";

    p4.innerHTML = "d = " + localStorage['d'];
}

function privateKeyNext2() {
    document.getElementById("next1").onclick = function () {
        window.location.href = "encryptmessage.html";
    };

    var p1 = document.getElementById("p1");
    var p2 = document.getElementById("q1");
    var p3 = document.getElementById("n1");
    var p4 = document.getElementById("privateKey1");

    p1.innerHTML = "";
    p2.innerHTML = "";
    p3.innerHTML = "";
    p4.innerHTML = "";

    var header = document.getElementById("header");
    header.className = "animated flipInX";
    header.innerHTML = "Generated Public and Private Key:";

    var tutorial = document.getElementById("tutorial1");
    tutorial.className = "lead animated flipInY";

    tutorial.innerHTML = "What's next? Let's send out our public key and receive some encrypted messages!";
    p1.className = "lead col animated bounceInDown";
    p2.className = "lead col animated bounceInDown";

    p1.innerHTML = "Public Key: (" + localStorage['n'] + ", " + localStorage['e'] + ")";
    p2.innerHTML = "Private Key: (" + localStorage['d'] + ")";
}

function getMessage() {
    document.getElementById("submit").onclick = function () {
        getMessage2();
    };

    message = document.getElementById("message").value;
    localStorage['message'] = message;

    //alert("ABC".charCodeAt(1));
    var textbox = document.getElementById("message");
    textbox.className = "animated fadeOut";
    if (message.length === 0) {
        alert("Don't leave the text box empty!");
        document.location.reload();
    }
    else {
        $("#message").remove();
    }

    var i = 0;
    var p1 = document.getElementById("p2");
    var p2 = document.getElementById("q2");
    var p3 = document.getElementById("ascii");
    var p4 = document.getElementById("n4");

    var header = document.getElementById("messageheader");
    header.className = "animated fadeInLeft";

    var tutorial = document.getElementById("tutorial2");
    tutorial.className = "lead animated flipInY";
    tutorial.innerHTML = "First, we encode the message letter by letter into ASCII:";

    var button = document.getElementById("submit");
    button.innerHTML = "Next";

    // fading letters
    var textElements = message.split("").map(function(c) {
        return $('<span id="' + c + '">' + c + '</span>');
    });

    var el = $('#letters');
    var delay = 250; // Tune this for different letter delays.
    textElements.forEach(function(e, i) {
        el.append(e);
        el.append(" ");
        e.hide();
        setTimeout(function() {
            e.fadeIn(400)
        }, 100 + i * delay)
    });

    var ascii = convertToASCII(message);

    var el2 = $('#ascii');
    el2.addClass("lead animated fadeIn slower delay-1s");

    for (i = 0; i < ascii.length; i++)
    {
        el2.append(ascii[i]);
        el2.append(" ");
    }

}

function getMessage2() {
    document.getElementById("submit").onclick = function () {
        getMessage3();
    };

    var i = 0;
    var p1 = document.getElementById("p2");
    var p2 = document.getElementById("q2");
    var p3 = document.getElementById("letters");
    var p4 = document.getElementById("ascii");
    var p5 = document.getElementById("n4");

    var header = document.getElementById("messageheader");
    header.className = "animated fadeInLeftBig";

    var tutorial = document.getElementById("tutorial2");
    tutorial.className = "lead animated flipInX";
    tutorial.innerHTML = "Then, we begin encrypting each letter of the message with our public key using the equation <strong> c ≡ m<sup>e</sup> (mod n)</strong>, " +
        "where c is the encrypted letter and m is the encoded ASCII letter. <br>";

    p3.innerHTML = "c = m" + "<sup>" + localStorage['e'] + "</sup>" + " mod " + localStorage['n'];
    p4.innerHTML = "";


    var el = $('#p2');
    el.addClass("lead col animated bounceInUp")
    //el.append(message);
    for (i = 0; i < message.length; i++)
    {
        el.append(message[i]);
        el.append(" ");
    }
    var ascii = convertToASCII(message);

    var el2 = $('#q2');
    el2.addClass("lead col animated bounceInUp");

    for (i = 0; i < ascii.length; i++)
    {
        el2.append(ascii[i]);
        el2.append(" ");
    }
}

function getMessage3() {
    document.getElementById("submit").onclick = function () {
        window.location.href = "decryptmessage.html";
    };

    var i;
    var p1 = document.getElementById("p2");
    var p2 = document.getElementById("q2");
    var p3 = document.getElementById("letters");
    var p4 = document.getElementById("ascii");
    var p5 = document.getElementById("n4");

    p1.innerHTML = "";
    p2.innerHTML = "";
    p3.innerHTML = "";

    var tutorial = document.getElementById("tutorial2");
    tutorial.className = "lead animated flipInY";
    tutorial.innerHTML = "Now that we have our encrypted message, let's move on to how we can decrypt the message!";

    var ascii = convertToASCII(localStorage['message']);
    var encrypted = encryptMessage(ascii);

    p1.className = "lead col animated bounceInDown";
    p1.innerHTML = "c = m" + "<sup>" + localStorage['e'] + "</sup>" + " mod " + localStorage['n'];

    p2.className = "lead animated bounceInDown";

    var el1 = $('#q2');
    el1.addClass("lead col animated bounceInDown");
    el1.append("ASCII: ");
    for (i = 0; i < ascii.length; i++)
    {
        el1.append(ascii[i]);
        el1.append(" ");
    }

    var el2 = $('#letters');
    el2.addClass("lead animated bounceInUp");
    el2.append("Encrypted Message: ");
    for (i = 0; i < encrypted.length; i++)
    {
        el2.append(encrypted[i]);
        el2.append(" ");
    }

}

function decryptMessage() {
    document.getElementById("decrypt").onclick = function () {
        decryptMessage2();
    };

    var p1 = document.getElementById("p3");
    var p2 = document.getElementById("q3");
    var p3 = document.getElementById("n5");
    var p4 = document.getElementById("n6");
    var p5 = document.getElementById("n7");

    p3.innerHTML = "";
    p4.innerHTML = "";

    var tutorial = document.getElementById("tutorial3");
    tutorial.className = "lead animated fadeIn";
    tutorial.innerHTML = "Just in case you forgot, we'll post our private key and the encrypted message again. " +
        "After we finishing decrypting the message, the last step is to convert the ASCII back into characters!";

    p1.className = "lead col animated bounceInLeft";
    p1.innerHTML = "d = " + localStorage['d'];
    p2.className = "lead col animated bounceInRight";

    var ascii = convertToASCII(localStorage['message']);
    var encrypted = encryptMessage(ascii);
    p2.innerHTML = "c = " + encrypted;

    p3.className = "lead animated bounceInDown";
    p3.innerHTML = "m = c<sup>" + localStorage['d'] + "</sup> mod " + localStorage['n'];

    var button = document.getElementById("decrypt");
    button.innerHTML = "Next";

}

function decryptMessage2() {
    document.getElementById("decrypt").onclick = function () {
        window.location.href = "summary.html";
    };

    var i;
    var p1 = document.getElementById("p3");
    var p2 = document.getElementById("q3");
    var p3 = document.getElementById("n5");
    var p4 = document.getElementById("n6");
    var p5 = document.getElementById("n7");

    p1.innerHTML = "";
    p2.innerHTML = "";
    p3.innerHTML = "";
    p4.innerHTML = "";

    var el1 = $('#p3');
    el1.addClass("lead col animated bounceInRight");
    el1.append("Encrypted ASCII: <br>");

    var ascii = convertToASCII(localStorage['message']);
    var encryptedMessage = encryptMessage(ascii);

    for (i = 0; i < encryptedMessage.length; i++)
    {
        el1.append(encryptedMessage[i]);
        el1.append(" ");
    }

    p2.className = "lead col animated bounceInLeft slow";
    p2.innerHTML = "m = c<sup>" + localStorage['d'] + "</sup> mod " + localStorage['n'];

    var el2 = $('#n5');
    el2.addClass("lead col animated bounceInUp slow");
    el2.append("Decrypted Ascii: <br>");

    var decryptedLetters = new Array(encryptedMessage.length);

    for (i = 0; i < encryptedMessage.length; i++)
    {
        var decrypted = modulo(encryptedMessage[i], localStorage['d'], localStorage['n']);
        decryptedLetters[i] = decrypted;
        el2.append(decrypted);
        el2.append(" ");
    }

    var el3 = $('#n6');
    el3.addClass("lead animated bounceInUp delay-5s slower");
    el3.append("Message: <br>");

    for (i = 0; i < decryptedLetters.length; i++)
    {
        var character = String.fromCharCode(decryptedLetters[i]);
        el3.append(character);
    }
}

function summary() {
    alert('hello');
}

function generateKeys() {

    var i;

    var randomIndex = Math.floor((Math.random() * 4));
    var randomIndex2 = Math.floor((Math.random() * 4));

    p = primes[randomIndex];
    q = primes2[randomIndex2];
    //p = 23;
    //q = 29;

    n = p * q;
    var pq = (p - 1) * (q - 1);

    for (i = 3; i < pq; i++) {
        if (gcd(pq, i) === 1) {
            e = i;
            break;
        }
    }

    var d = modInverse(e, pq);

    localStorage['p'] = p;
    localStorage['q'] = q;
    localStorage['pq'] = pq;
    localStorage['n'] = n;
    localStorage['e'] = e;
    localStorage['d'] = d;
}

function gcd(a, b) {
    var t;
    while (b !== 0) {
        t = a;
        a = b;
        b = t % b;
    }
    return a;
}

function modInverse(a, m) {
    a = a % m;
    for (x = 1; x < m; x++)
        if ((a * x) % m === 1)
            return x;
    return 1;
}

function convertToASCII(text) {
    var ascii = Array(text.length);
    for (var i = 0; i < text.length; i++) {
        ascii[i] = text.charCodeAt(i);
    }
    return ascii;
}

function encryptMessage(text) {
    var encryptedMessage = new Array(text.length);
    for (var i = 0; i < text.length; i++) {
        encryptedMessage[i] = Math.pow(text[i], localStorage['e']) % localStorage['n'];
    }
    return encryptedMessage;
}

function modulo (n, p, m){
    var result = 1;
    while (p--) {
        result = (result * n) % m;
    }

    return result;
}
