// Function Decorator Factory
export function Emoji() {
  return function (target: object, key: string | symbol) {
    let value = (target as any)[key] as string | undefined;

    const getter = () => {
      return value;
    };

    const setter = (newValue: string) => {
      value = "🙏 " + newValue + " 🙏";
    };

    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  };
}

// --------------------------------------

export class User {
  @Emoji()
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  printName() {
    console.log(this.name);
  }
}
