export type NationMap = {
  CH: "Swiss";
  ES: "Spanish";
  FR: "French";
  GB: "British";
};

type ValueOf<T> = T[keyof T];

export type NationKeys = keyof NationMap;
export type NationValues = ValueOf<NationMap>;
