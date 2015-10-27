README
1.) The advantages is that your code becomes much more modular, in that it should be able to be plugged in anywhere and work.
    It also allows for a higher level of abstraction, where once the arguments are submitted to the plugin declaration, the user shouldn't have to worry about how
      how the plugin works.
2.) It adheres to best practices in that it localizes the scope by wrapping the plugin declaration in its own function. This prevents accidental use of global
    variables and such.
3.) No, nothing prevents it. I would record the highest score and once I saw a higher one, I would make an AJAX post to the scoring server with the relevant
    information in a json file. I would then reset the local highest score with the new one. To initialize the highest score, I would make a GET request from the
    score server.
