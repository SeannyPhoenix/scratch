function pick<T extends Record<string, unknown>, U extends keyof T>(obj: T, keys: U[]): Pick<T, U> {
  const result = {} as Pick<T, U>;
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }
  return result;
}

function omit<T extends Record<string, unknown>, U extends keyof T>(obj: T, keys: U[]): Omit<T, U> {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result;
}

type Base = {
  a: number;
  b: number;
  c: number;
}

const base: Base = { a: 1, b: 2, c: 3 };

const e = omit(base, ['b', 'c']);
const i = pick(base, ['a', 'b']);

console.log({base, e, i})
