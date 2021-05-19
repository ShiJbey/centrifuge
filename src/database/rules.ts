export const personRule = `[
  (person ?e)
    [?e "sim/type" "person"]
]`;

export const businessRule = `[
  (business ?e)
    [?e "sim/type" "business"]
]`;

export const eventRule = `[
  (event ?e)
    [?e "sim/type" "event"]
]`;

export const relationshipRule = `[
  (relationship ?rel ?person1 ?person2)
    [?person1 "person/id" ?person1_ID]
    [?person2 "person/id" ?person2_ID]
    [?rel "sim/type" "relationship"]
    [?rel "relationship/owner" ?person1_ID]
    [?rel "relationship/subject" ?person2_ID]
]`;

export const occupationRule = `[
  (occupation ?e)
    [?e "sim/type" "occupation"]
]`;

export const residentRule = `[
  (resident ?e)
    [?e "person/resident" true]
    (person ?e)
]`;

export const likesRule = `[
  (likes ?person1 ?person2)
    (relationship ?rel ?person1 ?person2)
    [?rel "relationship/charge" ?charge]
    [(> ?charge 10)]
]`;

export const dislikesRule = `[
  (dislikes ?person1 ?person2)
    (relationship ?rel ?person1 ?person2)
    [?rel "relationship/charge" ?charge]
    [(< ?charge -8)]
]`;

export const siblingsRule = `[
  (siblings ?e1 ?e2)
    [?e1 "person/siblings" ?e2]
]`;

export const motherAndChildRule = `[
  (motherAndChild ?mother ?child)
    (person ?mother)
    (person ?child)
    [?mother "person/gender" "female"]
    [?mother "person/kids" ?childID]
    [?child  "person/id" ?childID]
]`;

export const onlyChildRule = `[
  (onlyChild ?person)
    (person ?person)
    [(missing? $ ?person "person/siblings")]
]`;

export const loveTriangleRule = `[
  (loveTriangle ?e1 ?e2 ?e3)
    (unrequitedLove ?e1 ?e2)
    (unrequitedLove ?e2 ?e3)
    (unrequitedLove ?e3 ?e1)
]`;

export const captivatedByRule = `[
  (captivatedBy ?e1 ?e2)
    (relationship ?rel ?e1 ?e2)
    [?rel "relationship/spark" ?spark]
    [(> ?spark 20)]
]`;

export const unrequitedLoveRule = `[
  (unrequitedLove ?e1 ?e2)
    (captivatedBy ?e1 ?e2)
    (not (captivatedBy ?e2 ?e1))
]`;

export const extramaritalInterestRule = `[
  (extramaritalInterest ?p1 ?p2)
    [?p1 "person/spouse" ?spouseID]
    [(!= ?spouseID -1)]
    [?p1 "person/love_interest" ?loveInterestID]
    [(!= ?loveInterestID -1)]
    [(!= ?spouseID ?loveInterestID )]
    [?p2 "person/id" ?loveInterestID]
]`;

export const asymmetricFriendshipRule = `[
  (asymmetricFriendship ?person1 ?person2)
    (likes ?person1 ?person2)
    (dislikes ?person2 ?person1)
]`;

export const misanthropeRule = `[
  (misanthrope ?person)
    (dislikes ?person ?other)
    [(> (count ?other) 10)]
]`;

export const rivalryRule = `[
  (rivalry ?e1 ?e2)
    (dislikes ?e1 ?e2)
    (dislikes ?e2 ?e1)
]`;

export const siblingRivalryRule = `[
  (siblingRivalry ?e1 ?e2)
    (siblings ?e1 ?e2)
    (rivalry ?e1 ?e2)
]`;

export const youngAdultRule = `[
  (youngAdult ?e)
    [?e "person/age" ?age]
    [(> ?age 18)]
    [(< ?age 30)]
]`;

export const middleAgedRule = `[
  (middleAged ?e)
    [?e "person/age" ?age]
    [(> ?age 45)]
]`;

export const businessOwnerRule = `[
  (businessOwner ?e)
    [?b "business/owner" ?id]
    [?e "person/id" ?id]
]`;

export const businessRivalryRule = `[
  (businessRivalry ?e1 ?e2)
    (rivalry ?e1 ?e2)
    [?e1 "person/id" ?id1]
    [?e2 "person/id" ?id2]
    [?b1 "business/owner" ?id1]
    [?b2 "business/owner" ?id2]
    [?b1 "business/type" ?businessType]
    [?b2 "business/type" ?businessType]
]`;

export const jealousUncleRule = `[
  (jealousUncle ?uncle ?nephew)
    [?nephew "person/uncles" ?uncleID]
    [?nephew "person/father" ?fatherID]
    [?father "person/id" ?fatherID]
    [?father "person/siblings" ?uncleID]
    (dislikes ?uncle ?father)
]`;

export const allRules = `[${[
  personRule,
  residentRule,
  occupationRule,
  eventRule,
  motherAndChildRule,
  onlyChildRule,
  likesRule,
  relationshipRule,
  dislikesRule,
  loveTriangleRule,
  extramaritalInterestRule,
  unrequitedLoveRule,
  misanthropeRule,
  asymmetricFriendshipRule,
  captivatedByRule,
  rivalryRule,
  siblingRivalryRule,
  siblingsRule,
  youngAdultRule,
  middleAgedRule,
  businessRule,
  businessOwnerRule,
  businessRivalryRule,
  jealousUncleRule,
].join('')}]`;
