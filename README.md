# Take Home Exercise

### [Live Demo](https://rawgit.com/danieltian/take-home-exercise/master/dist/index.html)

## Install and Run

Running the app will automatically open it in your browser.

Yarn (recommended):

```bash
yarn
yarn start
```

npm:

```bash
npm install
npm start
```

## Build

Yarn (recommended):

```bash
yarn build
```

npm:

```
npm build
```

The output will be put into the `dist` folder, with `index.html` as the entry point.

## How To Get Input And Output JSON

They will be displayed on the app at the top (input) and bottom (output). See the [Live Demo](https://rawgit.com/danieltian/take-home-exercise/master/dist/index.html) for an example. The input JSON can be modified either by typing directly into the text box or by dragging the sliders for each individual.

## How Score Is Calculated

I decided to handle the attributes similar to the stats in Dungeons and Dragons, taking 5 to mean an average person, 10 is super-human, and 1 is completely inept.

I start by getting the average of each attribute for each team member. However, directly taking the average does not work because it assumes a linear scale, where a person with 10 strength is only twice as strong as a person with strength 5. However, using the D&D scale, a 10 is considered super-human whereas 5 is only average, so we need to use a polynomial scale instead.

To handle this, I take each person's stat and use a multiplier, where the higher the stat, the higher the multiplier. I calculate a scaled attribute that better represents the difference between each stat point, and use this to calculate the average:

| Attribute | Multiplier | Scaled Attribute |
| --------- | ---------- | ---------------- |
| 1 | 1.00x | 1.00 |
| 2 | 1.11x | 2.22 |
| 3 | 1.22x | 3.67 |
| 4 | 1.33x | 5.33 |
| 5 | 1.44x | 7.22 |
| 6 | 1.56x | 9.33 |
| 7 | 1.66x | 11.67 |
| 8 | 1.78x | 14.22 |
| 9 | 1.89x | 17 |
| 10 |  2.00x | 20 |

Using this scale, a person with strength 5 is 7x stronger than a person with strength 1, and a person with strength 10 is 3x stronger than a person with strength 5. This isn't exactly super-human, but I had to lower the scaling in order to not make a person with a 10 stat completely decimate all the applicants' scores.

Once I have the scaled averages, I then calculate a 'demand' multiplier. This multiplier represents how much in demand a particular attribute is. If there is a lack of that particular attribute, then the multiplier is high, because if every team member's strength is 1, even a strength 4 person will look super-human by comparison. Conversely, if the value is high, then the demand will be very low, and so will the multiplier. This comes out to:

| Team attribute average | Multiplier |
| ---------------------- | ---------- |
| 1 | 2.00x |
| 2 | 1.79x |
| 3 | 1.58x |
| 4 | 1.37x |
| 5 | 1.15x |
| 6 | 0.94x |
| 7 | 0.73x |
| 8 | 0.52x |
| 9 | 0.31x |
| 10 | 0.10x |

Once I have this, I can finally calculate the applicant's score. I take each stat and figure out its multiplier and multiply them together, then I add up everything to get a cumulative score. For example:

| Attribute | Team Average | Multiplier | Applicant Value | Final Value |
|-----------|-----------------|--------------|------------|-------------|
| Strength | 3 | 1.58x | 7 | 1.58 * 7 = 11.06 |
| Intelligence | 8 | 0.52x | 4 | 0.52 * 4 = 2.08 |
| Endurance | 2 | 1.79x | 2 | 1.79 * 2 = 3.58 |
| Spicy Food Tolerance | 5 | 1.15x | 1 | 1.15 * 1 = 1.15 |

Adding up the last column of numbers gives us a cumulative score of 17.87 out of a possible 40 points.

Next, we need to get the final score in the range of 0 to 1. We can simply divide 17.87 by 40 to get 0.44, but this makes the candidate look worse than I feel like their stats represent. If we do the simple division method, the only way for a candidate to get a score higher than 0.8 is if they have 9's or 10's for all their stats and the demand is very high for every stat. In reality, this will never be the case because most applicants will only have one or two high-level stats, and you won't have a team full of incompetents (which makes the demand high for every stat).

Instead of the linear division, I use a logarithmic scale instead to calculate the final score. As the cumulative score increases, the final score will increase rapidly at first, but slow down significantly as it nears the max value. Applicants with one or two high stats will receive a fairly high score (around 0.5 to 0.7), while people with really high stats will be at >0.9, and small differences with really high stats won't affect the score much. The table for that looks like this:

| Cumulative Score (out of 40) | Final Score |
| ---------------------- | ---------- |
| 1 | 0 |
| 5 | 0.44 |
| 10 | 0.63 |
| 15 | 0.73 |
| 20 | 0.81 |
| 25 | 0.87 |
| 30 | 0.92 |
| 35 | 0.96 |
| 40 | 1.00 |

I feel that this makes the final scores match closely with letter grade percentages, and a single stat can make the difference between a C and a B depending if it's low or high. Note that even with just 5 points, the score is 0.44, but this corresponds to an F grade, and at 10 points it's only a D-. This is good enough to weed out the people on the low end while still making the 0.7-0.8 applicants good enough to consider, despite only having half of the max points. Those with scores 30-40 are all >0.9 because at that level, a few points makes little difference (if 10 is super-human, an 8 or a 9 is close enough to it to not matter much).

## Time Taken

~7 hours:
  * ~2 hours - score calculation logic
  * ~1 hour - basic UI setup
  * ~3 hours - improving the UI layout and adding the sliding bar feature, code clean-up and refactoring
  * ~1 hour - typing up this README
