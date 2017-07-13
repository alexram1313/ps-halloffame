module.exports = {
    name: "PS Hall of Fame",
    author: "alexram1313",
    mongoDbUri:"mongodb://localhost/MongoDB", //Important if can't use process.env.MONGODB_URI
    votePageHtml:"<p>Vote here.</p>",
    aboutPageHtml:"<p>You can vote and view results on this site.</p>",
    aboutPageShowVoteCount:true,
    allowDuplicateEntriesByIp:false
}