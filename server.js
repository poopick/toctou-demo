const express = require('express');
const app = express();
app.use(express.json());

let retestStatus = {
  completed: false,
  timesPaid: 0
};

app.post('/confirm-retest', (req, res) => {
  if (!retestStatus.completed) {
    // Vulnerable timing window here
    setTimeout(() => {
      retestStatus.timesPaid += 1;
      retestStatus.completed = true;
      console.log("User paid! Total:", retestStatus.timesPaid);
    }, 100); // Simulated DB delay
    res.send("Retest confirmed.");
  } else {
    res.status(400).send("Already completed.");
  }
});

app.get('/status', (req, res) => {
  res.json(retestStatus);
});

app.listen(3000, () => console.log('Listening on port 3000'));
