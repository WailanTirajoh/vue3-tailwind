export function generateId(): string {
  // Generate a timestamp
  const timestamp: string = Date.now().toString();

  // Generate a random number
  const randomNumber: number = Math.floor(Math.random() * 100000);

  // Concatenate the timestamp and random number
  const uniqueId: string = timestamp + randomNumber.toString();

  // Return the unique ID
  return uniqueId;
}
