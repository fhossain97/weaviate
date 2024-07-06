export const DOG_BREEDS_API = {
  data: [
    {
      id: "68f47c5a-5115-47cd-9849-e45d3c378f12",
      type: "breed",
      attributes: {
        name: "Caucasian Shepherd Dog",
        description:
          "The Caucasian Shepherd Dog is a large and powerful breed of dog from the Caucasus Mountains region. These dogs are large in size, with a thick double coat to protect them from the cold. They have a regal bearing, with a proud and confident demeanor. They are highly intelligent and loyal, making them excellent guard dogs. They are courageous and alert, with an instinct to protect their family and property. They are highly trainable, but require firm and consistent training.",
        life: {
          max: 20,
          min: 15,
        },
        male_weight: {
          max: 90,
          min: 50,
        },
        female_weight: {
          max: 70,
          min: 45,
        },
        hypoallergenic: false,
      },
      relationships: {
        group: {
          data: {
            id: "8000793f-a1ae-4ec4-8d55-ef83f1f644e5",
            type: "group",
          },
        },
      },
    },
    {
      id: "4ddbe251-72af-495e-8e9d-869217e1d92a",
      type: "breed",
      attributes: {
        name: "Bouvier des Flandres",
        description:
          "The Bouvier des Flandres is a large and powerful breed of dog from the Flanders region of Belgium. These dogs are very large in size, with a thick double coat of wire-haired fur. They have a dignified but energetic demeanor, making them excellent working dogs. They are highly intelligent and trainable, with an instinct to protect their family and property. They are brave and loyal, with an independent nature that makes them well suited for herding and guard work.",
        life: {
          max: 14,
          min: 10,
        },
        male_weight: {
          max: 40,
          min: 30,
        },
        female_weight: {
          max: 35,
          min: 25,
        },
        hypoallergenic: false,
      },
      relationships: {
        group: {
          data: {
            id: "b8e4e89d-057f-432a-9e58-0b85b29b693c",
            type: "group",
          },
        },
      },
    },
  ],
  links: {
    self: "https://dogapi.dog/api/v2/breeds",
    current: "https://dogapi.dog/api/v2/breeds?page[number]=1",
    next: "https://dogapi.dog/api/v2/breeds?page[number]=2",
    last: "https://dogapi.dog/api/v2/breeds?page[number]=29",
  },
};

export const formattedAPIDogData = {
  name: "Caucasian Shepherd Dog",
  description:
    "The Caucasian Shepherd Dog is a large and powerful breed of dog from the Caucasus Mountains region. These dogs are large in size, with a thick double coat to protect them from the cold. They have a regal bearing, with a proud and confident demeanor. They are highly intelligent and loyal, making them excellent guard dogs. They are courageous and alert, with an instinct to protect their family and property. They are highly trainable, but require firm and consistent training.",
  // life_span: {
  //   max: 20,
  //   min: 15,
  // },
  // male_weight: {
  //   max: 90,
  //   min: 50,
  // },
  // female_weight: {
  //   max: 70,
  //   min: 45,
  // },
  hypoallergenic: false,
};
