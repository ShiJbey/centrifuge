const axios = require('axios');
const _ = require('lodash');
const port = 8080;
const fs = require('fs');

async function queryDb(query) {
  try {
    const { data } = await axios.post(`http://localhost:${port}/`, {
      op: 'query',
      query,
    });

    if (data.status === 'ok') {
      return data.results.map((slice) => extractResults(slice));
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error(error.message);
  }
}

/**
 *
 * @param {{sliceId: number, results:any[]}} results
 * @return {number}
 */
function extractResults(slice) {
  results = slice.results;
  if (!results.length) {
    return 0;
  } else {
    return results[0][0];
  }
}

async function getTotalActors() {
  const [response] = await queryDb(
    `[
      :find
      (count ?e)
      :in $ %
      :where (person ?e)
    ]`
  );
  return response[0];
}

async function getEventMetrics() {
  const response = await queryDb(
    `[
      :find
      ?eventType (count ?e)
      :in $ %
      :where
        (event ?e)
        [?e "event/type" ?eventType]
    ]`
  );
  let total = 0;
  let eventTypes = {};
  for (const [type, count] of response) {
    total += count;
    eventTypes[type] = count;
  }
  return {
    total,
    eventTypes,
  };
}

async function getRelationshipMetrics() {
  const response = await queryDb(
    `[
      :find
      ?relType (count ?e)
      :in $ %
      :where
        (relationship ?e)
        [?e "relationship/type" ?relType]
    ]`
  );
  let total = 0;
  let relationshipTypes = {};
  for (const [type, count] of response) {
    total += count;
    relationshipTypes[type] = count;
  }
  return {
    total,
    relationshipTypes,
  };
}

const unrequitedLove = async () => {
  const response = await queryDb(
    `[
      :find
      ?p1 ?p2
      :in $ %
      :where
      (unrequitedLove ?p1 ?p2)
    ]`
  );

  const total = response.length;
  const personIDs = _.union(...response);
  const totalActors = personIDs.length;

  return {
    total,
    totalActors,
  };
};

const loveTriange = async () => {
  const response = await queryDb(
    `[
      :find
      ?e1 ?e2 ?e3
      :in $ %
      :where
      (loveTriangle ?e1 ?e2 ?e3)
    ]`
  );

  const total = response.length;
  const personIDs = _.union(...response);
  const totalActors = personIDs.length;

  return {
    total,
    totalActors,
  };
};

const rivalry = async () => {
  const response = await queryDb(
    `[
      :find
      ?e1 ?e2
      :in $ %
      :where
      (rivalry ?e1 ?e2)
    ]`
  );

  const total = response.length;
  const personIDs = _.union(...response);
  const totalActors = personIDs.length;

  return {
    total,
    totalActors,
  };
};

const misanthropy = async () => {
  const response = await queryDb(
    `[
      :find
      ?e1
      :in $ %
      :where
      (misanthrope ?e1)
    ]`
  );

  const total = response.length;
  const personIDs = _.union(...response);
  const totalActors = personIDs.length;

  return {
    total,
    totalActors,
  };
};

const storyPatternFns = {
  'Unrequited Love': unrequitedLove,
  'Love Triangle': loveTriange,
  Rivalry: rivalry,
  Misanthropy: misanthropy,
};

async function getStoryMetrics() {
  const metrics = {};
  for (const patternName of Object.keys(storyPatternFns)) {
    metrics[patternName] = await storyPatternFns[patternName]();
  }
  return metrics;
}

(async function main() {
  const population = await queryDb(
    `[:find
       (count ?person_0)
      :in $ %
      :where
        (resident ?person_0)
      ]`
  );
  console.log('Residents:', population);

  const loners = await queryDb(
    `[:find
       (count ?person_0)
      :in $ %
      :where
        [?person_0 "sim/type" "person"]
        [?person_0 "person/id" ?person_0_id]
        [?person_1 "sim/type" "person"]
        [?person_1 "person/id" ?person_1_id]
        [?person_0 "person/personality/low_e" true]
        [?person_0 "person/friends" ?person_1_id]
        [?person_0 "person/alive" true]
        [?person_0 "person/departure" -1]
        [?person_1 "person/alive" true]
        [?person_1 "person/departure" -1]
      ]`
  );
  console.log('Loners:', loners);

  const newComerEvents = await queryDb(
    `[:find
       (count ?event_0)
      :in $ %
      :where
        [?event_0 "sim/type" "event"]
        [?event_0 "event/type" "Move"]
        [?event_0 "event/old_home" -1]
      ]`
  );
  console.log('NewComers:', newComerEvents);

  const social_butterflies = await queryDb(
    `[:find
       (count ?person_0)
      :in $ %
      :where
        [?person_0 "sim/type" "person"]
        [?person_0 "person/personality/high_e" true]
        [?person_1 "sim/type" "person"]
        [?person_1 "person/id" ?person_1_id]
        [?person_0 "person/friends" ?person_1_id]
        [?person_0 "person/alive" true]
        [?person_0 "person/departure" -1]
        [?person_1 "person/alive" true]
        [?person_1 "person/departure" -1]
        [(> (count ?person_1) 5)]
      ]`
  );
  console.log('social butterflies:', social_butterflies);

  const male = await queryDb(
    `[:find
       (count ?person_0)
      :in $ %
      :where
        [?person_0 "sim/type" "person"]
        [?person_0 "person/gender" ?person_0_gender]
        [(= ?person_0_gender "male")]
        [?person_0 "person/alive" true]
        [?person_0 "person/departure" -1]
      ]`
  );
  console.log('males:', male);

  const female = await queryDb(
    `[:find
       (count ?person_0)
      :in $ %
      :where
        [?person_0 "sim/type" "person"]
        [?person_0 "person/gender" ?person_0_gender]
        [(= ?person_0_gender "female")]
        [?person_0 "person/alive" true]
        [?person_0 "person/departure" -1]
      ]`
  );
  console.log('Females:', female);

  const underdogs = await queryDb(
    `[
      :find ?person_0
      :in $ %
      :where
        [?person_0 "sim/type" "person"]
        [?person_0 "person/id" ?person_0_id]
        [?person_0 "person/alive" true]
        [?person_0 "person/departure" -1]
        [?occupation_0 "sim/type" "occupation"]
        [?occupation_0 "occupation/id" ?occupation_0_id]
        [?occupation_0 "occupation/level" ?occupation_0_level]
        [?occupation_1 "sim/type" "occupation"]
        [?occupation_1 "occupation/id" ?occupation_1_id]
        [?occupation_1 "occupation/level" ?occupation_1_level]
        [?event_0 "sim/type" "event"]
        [?event_0 "event/type" "Hiring"]
        [?event_0 "event/timestamp" ?event_0_timestamp]
        [?event_0 "event/subject" ?person_0_id]
        [?event_0 "event/occupation" ]
        [?event_1 "sim/type" "event"]
        [?event_1 "event/type" "Hiring"]
        [?event_1 "event/timestamp" ?event_1_timestamp]
        [?event_1 "event/subject" ?person_0_id]
        [(< ?event_0_timestamp ?event_0_timestamp)]
        [(<= ?event_0_level 2)]
        [(<= ?event_1_level 5)]
      ]`
  );
  console.log('underdogs:', underdogs);

  fs.writeFileSync(
    './data/extracted_counts_seed09.json',
    JSON.stringify({
      population,
      loners,
      male,
      female,
      social_butterflies,
      newComerEvents,
      // marriage_coaches,
    })
  );
})();
