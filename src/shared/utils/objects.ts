export const filterObject = (object: any, removeItems?: string[]): any => {
  const clean_object = { ...object }

  for (const prop in clean_object) {
    if (removeItems?.includes(prop)) delete clean_object[prop]
  }

  return clean_object
}

export function clearObject(object: any, removeItems?: string[]): void {
  for (const prop in object) {
    if (object[prop] === undefined) delete object[prop]
    if (object[prop] === null) delete object[prop]
    if (object[prop] === '') delete object[prop]

    if (removeItems?.includes(prop)) delete object[prop]

    for (const subProp in object[prop]) {
      if (object[prop]?.[subProp] === undefined) delete object[prop]?.[subProp]
      if (object[prop]?.[subProp] === null) delete object[prop]?.[subProp]
      if (object[prop]?.[subProp] === '') delete object[prop]?.[subProp]

      if (removeItems?.includes(subProp)) delete object[prop]?.[subProp]
    }
  }
}
