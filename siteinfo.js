module.exports = {
    name: "PonySquare Hall of Fame",
    author: "Comp (alexram1313)",
    mongoDbUri:"mongodb://localhost/MongoDB", //Important if can't use process.env.MONGODB_URI
    votePageHtml:
        "<p>\
            It's the end of the world! However, now's your chance to recognize some of the users that made PonySquare worthwhile to you!\
        </p>\
        <p>\
            You don't need to answer every question -- just leave them blank -- and don't vote for yourself.\
        </p>\
        <p>\
            Your officially recorded answers may be slightly modified for consistency's sake. No actual votes will be changed.\
        </p>",
    aboutPageHtml:
        "<p>\
            Near the time of the inception of My Little Pony: Friendship is Magic, an online social networking site surrounding brony subculture was born – PonySquare. This new website encouraged the old “love and tolerate” fandom motto and especially contributed to the rise of pony roleplaying, while also catering to the moderates who simply sought a haven for their interests. Despite stiff competition from iBrony, PhilomenaMagikz, and Equestria Ever After, PonySquare has continued to be the top pony roleplaying platform with a peak total usership of 42,217. Among the users are countless creative, intellectual, talented, and simply friendly beings. While having its fair share of technical flaws and controversial administrative decisions, including but not limited to the former glitchy implementation of the CometChat instant messaging platform and the 2012 roleplay-social networking split that created BronySquare and the Squares network, the community has mostly remained intact and united throughout the years. To the dismay of many, the Squares have announced the closure of PonySquare set for June 30, 2017.\
        </p>\
        <p>\
            It is obvious that many have strived to make the PonySquare experience worthwhile by developing their character, fine-tuning their creative writing skills, starting hug wars, and by reaching out to others. While the closure of a website would simply cause all of such hard work and dedication to vanish, the goal of this survey is to recognize and preserve the efforts of the most notable, most influential, and most honorable users of all-time. The original survey was conducted on Google Forms and counted a total of 59 official entries voting on the categories listed in the \"HOF Results\" menu. Spam and unconstructive entries have been filtered, while legitimate entries have been slightly edited for counting and display purposes. Witty remarks have been preserved in “Misc. Remarks” The data was originally processed in R and is now processed in real-time in Javascript.\
        </p>",
    aboutPageShowVoteCount:true,
    allowDuplicateEntriesByIp:false
}