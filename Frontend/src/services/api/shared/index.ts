import { axios } from "../config";

export type SharedData = {
  age?: {
    categories?: object;
    units?: object;
  };
  timeSlots: [
    {
      id: string;
      details: string;
    },
  ];
  supervision?: object;
  supervisor?: object;
  procedure?: {
    skill?: object;
    category?: object;
  };
};

export default async function shared() {
  return axios.get("/shared").then((response) => {
    const data = response.data as any;
    return {
      age: {
        categories: data.AgeCategory,
        units: data.AgeUnits,
      },
      timeSlots: data.Time,
      supervision: data.Supervision,
      supervisor: data.SupervisorRole,
      procedure: {
        skill: data.CoreSkill,
        category: data.CoreSkillCategory,
      },
    } as SharedData;
  });
}
