const router = require("express").Router();
const friends = require("../data/friends");

router.get("/api/friends", (req, res) => {
  return res.json(friends);
});

router.post("/api/friends", (req, res) => {

  let newFriend = req.body;

  let differences = [];

  for (let i = 0; i < friends.length; i++) {
    differences[i] = 0;
    for (let j = 0; j < 10; j++) {
      let spread = newFriend.scores[j] - friends[i].scores[j];
      if (spread < 0) {
        spread = 0 - spread;
      }
      differences[i] += spread;
    }
    console.log(differences[i]);
  }

  let closestMatch = friends[differences.indexOf(Math.min(...differences))];

  friends.push(newFriend);

  return res.json(closestMatch);

});

module.exports = router;
