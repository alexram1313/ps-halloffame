# PS Hall of Fame Survey Platform

Initially developed to celebrate the users of a now defunct website, PS Hall of Fame is a MEAN stack-based website that allows survey participants to vote on certain categories and view current results, in a simple and clean manner. Administrators set their own categories and may choose to either display a simple list of entries or a graph of the results with an optional winner.

---

# Install
1. Clone the Git repository.
    `git clone https://github.com/alexram1313/ps-halloffame.git`
2. Go through the setup procedure to follow.
3. Run the application using:
    `node server.js`
    or
    `npm start`
---

# Setup
1. Setup MongoDB on your server
2. Edit siteinfo.js to your liking.
    By default, the file should read:

    ```javascript
    module.exports = {
        name: "PS Hall of Fame",
        author: "alexram1313",
        mongoDbUri:"mongodb://localhost/MongoDB", //Important if can't use process.env.MONGODB_URI
        votePageHtml:"<p>Vote here.</p>",
        aboutPageHtml:"<p>You can vote and view results on this site.</p>",
        aboutPageShowVoteCount:true,
        allowDuplicateEntriesByIp:false
    }
    ```

    Parameters are as followed:
    - `name`: (String) The name of the site. Will display on navigation bar, homepage, and footer.
    - `author`: (String) The author of the site. Will display on footer
    - `mongoDbUri`: (String) In the event process.env.MONGODB_URI cannot be used, specify the MongoDB URI here.
    - `votePageHtml`: (String) This content will be displayed before the entry form on the vote page. You may use Bootstrap classes.
    - `aboutPageHtml`: (String) Will display in the about page. You may use Bootstrap classes.
    - `aboutPageShowVoteCount`: (Boolean) If true, the total number of responses will be displayed on the about page.
    - `allowDuplicateEntriesByIp`: (Boolean) If false, each IP address will be restricted to one vote only. This will be determined using the SHA-256 hash of the entry's associated IP address.


3. Insert your categories into categories.json. It should follow the form:
    ```javascript
    {
        "parents":[
            {
                "name":"parent1Name",
                "shortName":"parent1shortName",
                "code":"parent1Code",
                "categories":[
                    {
                        "name":"cat11name",
                        "shortName":"cat11shortName",
                        "desc":"cat11description",
                        "code":"cat11code",
                        "input":"cat11input",
                        "choices":[],
                        "display":"cat11display"
                    },
                    ...,
                    {
                        "name":"cat1Nname",
                        "shortName":"cat1NshortName",
                        "desc":"cat1Ndescription",
                        "code":"cat1Ncode",
                        "input":"cat1Ninput",
                        "choices":[],
                        "display":"cat1Ndisplay"
                    }
                ]
            },
            ...,
            {
                "name":"parentMName",
                "shortName":"parentMshortName",
                "code":"parentMCode",
                "categories":[
                    {
                        "name":"catM1name",
                        "shortName":"catM1shortName",
                        "desc":"catM1description",
                        "code":"catM1code",
                        "input":"catM1input",
                        "choices":[],
                        "display":"catM1display"
                    },
                    ...,
                    {
                        "name":"catMNname",
                        "shortName":"catMNshortName",
                        "desc":"catMNdescription",
                        "code":"catMNcode",
                        "input":"catMNinput",
                        "choices":[],
                        "display":"catMNdisplay"
                    }
                ]
            }
        ]
    }
    ```

    Parents will contain individual categories. Their shortNames will be displayed in the navigation bar with their child categories as dropdown items.

    - `parents`: (Array) A collection of all parents
    - `name`: (String) The objects full name
    - `shortName`: (String) An abbreviated version of name
    - `code`: (String) A valid URL code for the object
    - `categories`: (Array) A collection containing a parent's child categories

    - `desc`: (String) A child category's description
    - `input`: (String | text, country, choice) The input type of the category. `text` will allow for text input. `country` will display a dropdown menu of countries. `choice` will display a dropdown menu of choices.
    - `choices`: (Array|Only use if input is choice) A collection of all choice strings.
    - `display`: (String | winner, graph, list) Type of results page to use for category. `list` will list all entries. `graph` will display a pie chart for all entries. `winner` will display a graph page and will also display a winner.

4. Customize the homepage at /views/pages/home.ejs. Feel free to use Bootstrap classes and the EJS variable `parents`, representing the parent categories.
5. Put images of possible winners into /public/images. The filename should completely match the name of the winner and should be in png format. For example, if the winner is "Foo Bar" then the image should be named "Foo Bar.png"
---

# Example 
For an example implementation, please see the [ps-specific branch](https://github.com/alexram1313/ps-halloffame/tree/ps-specific) and https://ponysquarehall.herokuapp.com/.

---

# License
PS Hall of Fame is licensed under the [GNU General Public License v3.0](../blob/master/LICENSE). Please see the terms of the license.