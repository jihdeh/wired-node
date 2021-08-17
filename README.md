# Node assessment

You are going to build a script (src/index.js) that transforms an array of expert ids into an array of summaries that shows the total bookings count grouped by the industry role of the experts.

You can use `getBookingsCountFromDb` to fetch the bookings count by expert id.

You can use `getProfileFromDb` to fetch the profile by expert id. The profile contains the industry of the expert.

## Expected outcome
```
[
  { industry: 'automotive', bookings: 15 },
  { industry: 'telecom', bookings: 2 }
]
```

## Extra credits
The db calls are slow, can you make your script run fast?

## Running the script
```
npm start
```

I'm looking forward to your solution!

Best regards,

Jeroen Slor