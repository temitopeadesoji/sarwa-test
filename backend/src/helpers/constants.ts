export const getStringEnumValues = <E extends Record<keyof E, string>>(
  e: E
): E[keyof E][] => {
  return (Object.keys(e) as (keyof E)[]).map((k) => e[k]);
};
