export function sumValues(values: number[]) {
  const sum = values.reduce((prev, cur) => {
    return prev + cur;
  }, 0);

  console.log("Sum of all the values:", sum);

  return sum;
}
